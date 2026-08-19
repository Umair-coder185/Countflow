"use client"

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"

import {
  ArrowLeftRight,
  RotateCcw,
} from "lucide-react"

import CompareControls from "./CompareControls"
import CompareEditors from "./CompareEditors"
import CompareResults from "./CompareResults"
import DifferenceStats from "./DifferenceStats"


// ==========================================================
// LOCAL SAFETY LIMITS
//
// These should match the limits used inside compareText.js.
// No external library is required.
// ==========================================================

const MAX_INPUT_CHARS = 250_000

const MAX_FILE_BYTES =
  1_048_576 // 1 MiB


// Hard timeout from the MAIN THREAD.
//
// Even if the worker becomes busy with a pathological
// comparison, we can terminate the entire worker.
//
// This is stronger than relying only on a timer inside
// compareText.js because a synchronous algorithm cannot
// interrupt itself while it is occupying its own thread.

const WORKER_TIMEOUT_MS = 1_800


// ==========================================================
// ALLOWED LOCAL TEXT FILES
// ==========================================================

const allowedExtensions = new Set([
  "txt",
  "md",
  "csv",
  "json",
  "html",
  "htm",
  "css",
  "js",
  "jsx",
  "ts",
  "tsx",
  "xml",
  "yaml",
  "yml",
])


// ==========================================================
// SAMPLE TEXT
// ==========================================================

const sampleOriginal = `A text comparison tool helps writers review revisions.
It can show changes between two versions of the same document.
The original draft may contain wording that changes later.`


const sampleRevised = `An online text comparison tool helps writers and editors review revisions.
It can highlight changes between two versions of the same document.
The revised draft may contain clearer wording.`


// ==========================================================
// CREATE WEB WORKER
//
// IMPORTANT:
// Keep new URL(...) directly inside new Worker(...).
// This allows Next.js/Turbopack/Webpack to recognize the
// worker file during bundling.
// ==========================================================

function createCompareWorker() {
  return new Worker(
    new URL(
      "../../lib/text-compare/textCompareWorker.js",
      import.meta.url
    ),
    {
      type: "module",
      name: "countflows-text-compare",
    }
  )
}


// ==========================================================
// MAIN COMPONENT
// ==========================================================

export default function TextCompareTool() {
  // --------------------------------------------------------
  // TEXT STATE
  // --------------------------------------------------------

  const [original, setOriginal] =
    useState("")

  const [revised, setRevised] =
    useState("")


  // --------------------------------------------------------
  // COMPARISON SETTINGS
  // --------------------------------------------------------

  const [mode, setMode] =
    useState("word")

  const [
    ignoreCase,
    setIgnoreCase,
  ] = useState(false)

  const [
    ignoreWhitespace,
    setIgnoreWhitespace,
  ] = useState(true)

  const [view, setView] =
    useState("side")


  // --------------------------------------------------------
  // RESULT STATE
  // --------------------------------------------------------

  const [result, setResult] =
    useState(null)

  const [error, setError] =
    useState("")

  const [
    currentDifference,
    setCurrentDifference,
  ] = useState(0)

  const [copied, setCopied] =
    useState(false)

  const [
    isComparing,
    setIsComparing,
  ] = useState(false)


  // ========================================================
  // WORKER REFS
  // ========================================================

  const workerRef =
    useRef(null)

  const workerTimeoutRef =
    useRef(null)

  const requestIdRef =
    useRef(0)

  const workerBusyRef =
    useRef(false)


  // ========================================================
  // CLEAR HARD TIMEOUT
  // ========================================================

  const clearWorkerTimeout =
    useCallback(() => {
      if (
        workerTimeoutRef.current
      ) {
        window.clearTimeout(
          workerTimeoutRef.current
        )

        workerTimeoutRef.current =
          null
      }
    }, [])


  // ========================================================
  // HANDLE RESULT FROM WORKER
  // ========================================================

  const handleWorkerMessage =
    useCallback(
      (event) => {
        const {
          id,
          result: workerResult,
        } = event.data || {}


        // Ignore outdated results.
        //
        // For example:
        // User starts comparison,
        // edits text,
        // then starts another comparison.

        if (
          id !==
          requestIdRef.current
        ) {
          return
        }


        clearWorkerTimeout()

        workerBusyRef.current =
          false

        setIsComparing(false)


        if (
          !workerResult ||
          workerResult.error
        ) {
          setResult(null)

          setError(
            workerResult?.error ||
              "The comparison could not be completed."
          )

          return
        }


        setError("")

        setResult(
          workerResult
        )

        setCurrentDifference(0)
      },
      [clearWorkerTimeout]
    )


  // ========================================================
  // HANDLE WORKER FAILURE
  // ========================================================

  const handleWorkerError =
    useCallback(
      (event) => {
        // Prevent an unnecessary uncaught worker error
        // appearing in supported browsers.

        event?.preventDefault?.()


        clearWorkerTimeout()


        workerBusyRef.current =
          false


        if (
          workerRef.current
        ) {
          workerRef.current.terminate()

          workerRef.current =
            null
        }


        setIsComparing(false)

        setResult(null)

        setError(
          "The comparison engine stopped unexpectedly. Try again or compare a smaller section."
        )
      },
      [clearWorkerTimeout]
    )


  // ========================================================
  // START A CLEAN WORKER
  // ========================================================

  const startWorker =
    useCallback(() => {
      if (
        typeof window ===
          "undefined" ||
        typeof Worker ===
          "undefined"
      ) {
        return null
      }


      if (
        workerRef.current
      ) {
        workerRef.current.terminate()
      }


      const worker =
        createCompareWorker()


      worker.onmessage =
        handleWorkerMessage

      worker.onerror =
        handleWorkerError


      workerRef.current =
        worker


      return worker
    }, [
      handleWorkerMessage,
      handleWorkerError,
    ])


  // ========================================================
  // CREATE WORKER AFTER CLIENT MOUNT
  // ========================================================

  useEffect(() => {
    startWorker()


    return () => {
      clearWorkerTimeout()


      workerBusyRef.current =
        false


      if (
        workerRef.current
      ) {
        workerRef.current.terminate()

        workerRef.current =
          null
      }
    }
  }, [
    startWorker,
    clearWorkerTimeout,
  ])


  // ========================================================
  // CANCEL AN ACTIVE COMPARISON
  //
  // Used if the user changes text/settings while a worker
  // is still comparing old data.
  // ========================================================

  function cancelActiveComparison() {
    // Invalidate any response already travelling back.

    requestIdRef.current += 1


    clearWorkerTimeout()


    if (
      !workerBusyRef.current
    ) {
      return
    }


    workerBusyRef.current =
      false


    if (
      workerRef.current
    ) {
      workerRef.current.terminate()

      workerRef.current =
        null
    }


    setIsComparing(false)


    // Immediately create a clean worker
    // for the next comparison.

    startWorker()
  }


  // ========================================================
  // INVALIDATE CURRENT RESULT
  // ========================================================

  function invalidateResult() {
    cancelActiveComparison()

    setResult(null)

    setCurrentDifference(0)

    setCopied(false)
  }


  // ========================================================
  // SAFE TEXT SETTER
  // ========================================================

  function setBoundedText(
    setter,
    value
  ) {
    const safeValue =
      String(value ?? "")


    if (
      safeValue.length >
      MAX_INPUT_CHARS
    ) {
      setter(
        safeValue.slice(
          0,
          MAX_INPUT_CHARS
        )
      )


      setError(
        `Text was limited to ${MAX_INPUT_CHARS.toLocaleString()} characters for reliable in-browser comparison.`
      )


      invalidateResult()

      return
    }


    setter(
      safeValue
    )

    setError("")

    invalidateResult()
  }


  // ========================================================
  // EDITORS
  // ========================================================

  function handleOriginalChange(
    value
  ) {
    setBoundedText(
      setOriginal,
      value
    )
  }


  function handleRevisedChange(
    value
  ) {
    setBoundedText(
      setRevised,
      value
    )
  }


  // ========================================================
  // RUN COMPARISON
  // ========================================================

  function handleCompare() {
    setError("")


    // Only prevent completely empty comparison.
    //
    // One side may intentionally be empty,
    // which represents a full addition/removal.

    if (
      !original &&
      !revised
    ) {
      setError(
        "Paste or type text before comparing."
      )

      setResult(null)

      return
    }


    // If another comparison is somehow still running,
    // terminate it rather than queueing expensive work.

    if (
      workerBusyRef.current
    ) {
      cancelActiveComparison()
    }


    let worker =
      workerRef.current


    if (!worker) {
      worker =
        startWorker()
    }


    if (!worker) {
      setError(
        "Web Workers are not available in this browser."
      )

      return
    }


    requestIdRef.current += 1

    const requestId =
      requestIdRef.current


    workerBusyRef.current =
      true

    setIsComparing(true)

    setResult(null)

    setCurrentDifference(0)


    // ------------------------------------------------------
    // SEND TEXT TO WORKER
    // ------------------------------------------------------

    worker.postMessage({
      id: requestId,

      original,

      revised,

      mode,

      options: {
        ignoreCase,

        ignoreWhitespace:
          mode === "character"
            ? false
            : ignoreWhitespace,
      },
    })


    // ------------------------------------------------------
    // HARD TIMEOUT
    //
    // This timer runs on the main browser thread.
    //
    // If the worker takes too long, the worker itself
    // is terminated.
    // ------------------------------------------------------

    clearWorkerTimeout()


    workerTimeoutRef.current =
      window.setTimeout(
        () => {
          // Ignore stale timeout callbacks.

          if (
            requestId !==
            requestIdRef.current
          ) {
            return
          }


          requestIdRef.current += 1


          if (
            workerRef.current
          ) {
            workerRef.current.terminate()

            workerRef.current =
              null
          }


          workerBusyRef.current =
            false


          setIsComparing(false)

          setResult(null)


          setError(
            "This comparison is too complex for the selected mode. Try Line mode or compare the document in smaller sections."
          )


          // Prepare a fresh worker for another attempt.

          startWorker()
        },
        WORKER_TIMEOUT_MS
      )
  }


  // ========================================================
  // RESET
  // ========================================================

  function resetTool() {
    cancelActiveComparison()


    setOriginal("")

    setRevised("")

    setResult(null)

    setError("")

    setCurrentDifference(0)

    setCopied(false)
  }


  // ========================================================
  // SWAP
  // ========================================================

  function swapTexts() {
    cancelActiveComparison()


    setOriginal(
      revised
    )

    setRevised(
      original
    )


    setResult(null)

    setCurrentDifference(0)
  }


  // ========================================================
  // SAMPLE
  // ========================================================

  function loadSample() {
    cancelActiveComparison()


    setOriginal(
      sampleOriginal
    )

    setRevised(
      sampleRevised
    )

    setError("")

    setResult(null)

    setCurrentDifference(0)
  }


  // ========================================================
  // CLIPBOARD
  // ========================================================

  async function pasteInto(
    setter
  ) {
    try {
      const text =
        await navigator.clipboard.readText()


      setBoundedText(
        setter,
        text
      )
    } catch {
      setError(
        "Clipboard access was blocked by your browser. Paste the text manually instead."
      )
    }
  }


  // ========================================================
  // LOCAL FILE READING
  // ========================================================

  async function handleFile(
    event,
    setter
  ) {
    const file =
      event.target.files?.[0]


    // Allows selecting the same file again.

    event.target.value = ""


    if (!file) {
      return
    }


    const extension =
      file.name
        .split(".")
        .pop()
        ?.toLowerCase() ?? ""


    if (
      !allowedExtensions.has(
        extension
      )
    ) {
      setError(
        "Unsupported file type. Use TXT, MD, CSV, JSON, HTML, CSS, JS, TS, XML, YAML, or YML."
      )

      return
    }


    if (
      file.size >
      MAX_FILE_BYTES
    ) {
      setError(
        "For browser performance, local text files are limited to 1 MiB."
      )

      return
    }


    try {
      const text =
        await file.text()


      setBoundedText(
        setter,
        text
      )
    } catch {
      setError(
        "The selected file could not be read as text."
      )
    }
  }


  // ========================================================
  // SETTINGS
  // ========================================================

  function changeMode(
    nextMode
  ) {
    setMode(
      nextMode
    )

    invalidateResult()
  }


  function changeIgnoreCase(
    value
  ) {
    setIgnoreCase(
      value
    )

    invalidateResult()
  }


  function changeIgnoreWhitespace(
    value
  ) {
    setIgnoreWhitespace(
      value
    )

    invalidateResult()
  }


  // ========================================================
  // DIFFERENCE NAVIGATION
  // ========================================================

  function goToDifference(
    direction
  ) {
    if (
      !result?.differenceCount
    ) {
      return
    }


    const next =
      (
        currentDifference +
        direction +
        result.differenceCount
      ) %
      result.differenceCount


    setCurrentDifference(
      next
    )


    window.requestAnimationFrame(
      () => {
        document
          .getElementById(
            `text-difference-${next}`
          )
          ?.scrollIntoView({
            behavior:
              "smooth",

            block:
              "center",
          })
      }
    )
  }


  // ========================================================
  // COPY CHANGED TEXT
  // ========================================================

  async function copyChangedText() {
    try {
      await navigator.clipboard.writeText(
        revised
      )


      setCopied(true)


      window.setTimeout(
        () => {
          setCopied(false)
        },
        1500
      )
    } catch {
      setError(
        "Copy failed. Select the changed text and copy it manually."
      )
    }
  }


  // ========================================================
  // UI
  // ========================================================

  return (
    <section
      aria-label="Text comparison tool"
      className="relative mx-auto max-w-6xl px-4 pb-6 md:px-8"
    >
      <div className="rounded-3xl border border-gray-200 bg-white/95 p-4 shadow-xl shadow-cyan-200/20 backdrop-blur dark:border-gray-700 dark:bg-gray-900/95 dark:shadow-black/20 md:p-6">

        {/* Header */}

        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Compare two texts
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Paste text or load a local text file.
              The comparison runs in your browser.
            </p>
          </div>


          <div className="flex flex-wrap gap-2">

            <button
              type="button"
              onClick={loadSample}
              disabled={isComparing}
              className="rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-cyan-300 hover:text-cyan-700 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-300"
            >
              Try sample
            </button>


            <button
              type="button"
              onClick={swapTexts}
              disabled={isComparing}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-cyan-300 hover:text-cyan-700 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-300"
            >
              <ArrowLeftRight
                className="h-4 w-4"
                aria-hidden="true"
              />

              Swap
            </button>


            <button
              type="button"
              onClick={resetTool}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-cyan-300 hover:text-cyan-700 dark:border-gray-700 dark:text-gray-300"
            >
              <RotateCcw
                className="h-4 w-4"
                aria-hidden="true"
              />

              Clear
            </button>

          </div>
        </div>


        {/* Error */}

        {error ? (
          <div
            role="alert"
            className="mb-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-100"
          >
            {error}
          </div>
        ) : null}


        {/* Running status */}

        {isComparing ? (
          <div
            role="status"
            aria-live="polite"
            className="mb-4 rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm font-medium text-cyan-900 dark:border-cyan-900 dark:bg-cyan-950/40 dark:text-cyan-100"
          >
            Comparing text…
          </div>
        ) : null}


        {/* Editors */}

        <CompareEditors
          original={original}
          revised={revised}

          onOriginalChange={
            handleOriginalChange
          }

          onRevisedChange={
            handleRevisedChange
          }

          onPasteOriginal={() =>
            pasteInto(
              setOriginal
            )
          }

          onPasteRevised={() =>
            pasteInto(
              setRevised
            )
          }

          onOriginalFile={(event) =>
            handleFile(
              event,
              setOriginal
            )
          }

          onRevisedFile={(event) =>
            handleFile(
              event,
              setRevised
            )
          }

          maxCharacters={
            MAX_INPUT_CHARS
          }
        />


        {/* Controls */}

        <CompareControls
          mode={mode}

          ignoreCase={
            ignoreCase
          }

          ignoreWhitespace={
            ignoreWhitespace
          }

          onModeChange={
            changeMode
          }

          onIgnoreCaseChange={
            changeIgnoreCase
          }

          onIgnoreWhitespaceChange={
            changeIgnoreWhitespace
          }

          onCompare={
            handleCompare
          }
        />


        {/* Results */}

        {result ? (
          <div className="mt-6">

            <DifferenceStats
              result={result}
            />


            <CompareResults
              result={result}

              view={view}

              onViewChange={
                setView
              }

              currentDifference={
                currentDifference
              }

              onPreviousDifference={() =>
                goToDifference(-1)
              }

              onNextDifference={() =>
                goToDifference(1)
              }

              onCopyChangedText={
                copyChangedText
              }

              copied={copied}
            />

          </div>
        ) : null}

      </div>
    </section>
  )
}