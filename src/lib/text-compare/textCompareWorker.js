// lib/text-compare/textCompareWorker.js
//
// Runs the comparison outside the browser's main UI thread.
// No external library.
// No API.
// No backend.

import { compareText } from "./compareText"

self.onmessage = (event) => {
  const {
    id,
    original,
    revised,
    mode,
    options,
  } = event.data || {}

  try {
    const result = compareText(
      original,
      revised,
      mode,
      options
    )

    self.postMessage({
      id,
      result,
    })
  } catch {
    self.postMessage({
      id,
      result: {
        error:
          "The comparison could not be completed. Try Line mode or compare smaller sections.",
      },
    })
  }
}