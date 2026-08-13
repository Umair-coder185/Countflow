


"use client"

import { useEffect, useMemo, useState } from "react"

import {
  AlertTriangle,
  AtSign,
  Check,
  CheckCircle2,
  Clock3,
  Copy,
  Download,
  FileText,
  Gauge,
  Hash,
  Link2,
  MessageSquareText,
  Scissors,
  Sparkles,
  Target,
  Trash2,
  Type,
} from "lucide-react"

/* -------------------------------------------------------------------------- */
/*                              PLATFORM PRESETS                              */
/* -------------------------------------------------------------------------- */

/*
  sourceType:
  - "Official" = verified from current platform documentation.
  - "Guide"    = useful writing target / commonly used publishing guideline,
                 NOT presented as an official hard platform restriction.

  mode:
  - grapheme   = user-visible Unicode characters
  - utf16      = JavaScript UTF-16 code units
  - x          = pure-JS X weighted estimate
  - googleAds  = double-width-aware ad character estimate
  - sms        = GSM-7 / Unicode SMS segment logic
*/

const PLATFORM_PRESETS = [
  /* ---------------------------------------------------------------------- */
  /* SOCIAL                                                                 */
  /* ---------------------------------------------------------------------- */

  {
    id: "x-post",
    name: "X Post",
    shortName: "X",
    category: "Social",
    max: 280,
    mode: "x",
    sourceType: "Official",
    description: "Standard X post",
  },

  {
    id: "x-premium",
    name: "X Premium",
    shortName: "X+",
    category: "Social",
    max: 25000,
    mode: "x",
    sourceType: "Official",
    description: "Longer post for X Premium subscribers",
  },

  {
    id: "linkedin-post",
    name: "LinkedIn Post",
    shortName: "in",
    category: "Social",
    max: 3000,
    mode: "grapheme",
    sourceType: "Official",
    description: "LinkedIn post text",
  },

  {
    id: "bluesky-post",
    name: "Bluesky",
    shortName: "BS",
    category: "Social",
    max: 300,
    mode: "grapheme",
    sourceType: "Official",
    description: "300 Unicode grapheme clusters",
  },

  {
    id: "instagram-caption",
    name: "Instagram Caption",
    shortName: "IG",
    category: "Social",
    max: 2200,
    mode: "grapheme",
    sourceType: "Guide",
    description: "Commonly used Instagram caption limit",
  },

  {
    id: "threads-post",
    name: "Threads",
    shortName: "@",
    category: "Social",
    max: 500,
    mode: "grapheme",
    sourceType: "Guide",
    description: "Common Threads writing limit",
  },

  {
    id: "tiktok-caption",
    name: "TikTok Caption",
    shortName: "TT",
    category: "Social",
    max: 2200,
    mode: "utf16",
    sourceType: "Official",
    description: "TikTok video caption · UTF-16 units",
  },

  /* ---------------------------------------------------------------------- */
  /* VIDEO                                                                  */
  /* ---------------------------------------------------------------------- */

  {
    id: "youtube-title",
    name: "YouTube Title",
    shortName: "YT",
    category: "Video",
    max: 100,
    mode: "grapheme",
    sourceType: "Official",
    description: "YouTube video title",
  },

  {
    id: "youtube-description",
    name: "YouTube Description",
    shortName: "YT",
    category: "Video",
    max: 5000,
    mode: "grapheme",
    sourceType: "Official",
    description: "YouTube video description",
  },

  /* ---------------------------------------------------------------------- */
  /* GOOGLE ADS                                                             */
  /* ---------------------------------------------------------------------- */

  {
    id: "google-ads-headline",
    name: "Google Ads Headline",
    shortName: "Ads",
    category: "Ads",
    max: 30,
    mode: "googleAds",
    sourceType: "Official",
    description: "Responsive Search Ad headline",
  },

  {
    id: "google-ads-description",
    name: "Google Ads Description",
    shortName: "Ads",
    category: "Ads",
    max: 90,
    mode: "googleAds",
    sourceType: "Official",
    description: "Responsive Search Ad description",
  },

  /* ---------------------------------------------------------------------- */
  /* SEO GUIDANCE                                                           */
  /* ---------------------------------------------------------------------- */

  {
    id: "seo-title",
    name: "SEO Title",
    shortName: "SEO",
    category: "SEO",
    min: 50,
    max: 60,
    mode: "grapheme",
    sourceType: "Guide",
    description: "Common writing target, not a Google hard limit",
  },

  {
    id: "meta-description",
    name: "Meta Description",
    shortName: "SEO",
    category: "SEO",
    min: 140,
    max: 155,
    mode: "grapheme",
    sourceType: "Guide",
    description: "Writing target, not a fixed Google character limit",
  },

  /* ---------------------------------------------------------------------- */
  /* MESSAGING                                                              */
  /* ---------------------------------------------------------------------- */

  {
    id: "sms",
    name: "SMS",
    shortName: "SMS",
    category: "Messaging",
    max: 160,
    mode: "sms",
    sourceType: "Standard",
    description: "Dynamic GSM-7 or Unicode SMS analysis",
  },
]

const CATEGORIES = ["Social", "Video", "Ads", "SEO", "Messaging"]

// Keep locale-sensitive output identical between server pre-render and browser hydration.
const LOCALE = "en-US"

/* -------------------------------------------------------------------------- */
/*                            UNICODE / TEXT HELPERS                          */
/* -------------------------------------------------------------------------- */

function getGraphemeSegments(value) {
  if (!value) return []

  /*
    Intl.Segmenter is built into modern browsers.
    No npm library required.

    Grapheme mode handles user-visible characters better than text.length.

    Examples:
    👨‍👩‍👧‍👦
    🇵🇰
    é
  */

  if (typeof Intl !== "undefined" && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter(LOCALE, {
      granularity: "grapheme",
    })

    return Array.from(
      segmenter.segment(value),
      (segment) => segment.segment
    )
  }

  // Fallback: Unicode code points
  return Array.from(value)
}

function countGraphemes(value) {
  return getGraphemeSegments(value).length
}

function getWordTokens(value) {
  if (!value.trim()) return []

  if (typeof Intl !== "undefined" && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter(LOCALE, {
      granularity: "word",
    })

    return Array.from(segmenter.segment(value))
      .filter((segment) => segment.isWordLike)
      .map((segment) => segment.segment)
  }

  return (
    value.match(
      /[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*/gu
    ) || []
  )
}

function countSentences(value) {
  if (!value.trim()) return 0

  if (typeof Intl !== "undefined" && Intl.Segmenter) {
    try {
      const segmenter = new Intl.Segmenter(LOCALE, {
        granularity: "sentence",
      })

      return Array.from(segmenter.segment(value))
        .map((segment) => segment.segment.trim())
        .filter(Boolean).length
    } catch {
      // Some browsers may not support sentence segmentation.
    }
  }

  const matches = value
    .trim()
    .match(/[^.!?]+(?:[.!?]+|$)/gu)

  return matches
    ? matches.filter((sentence) => sentence.trim()).length
    : 0
}

function countParagraphs(value) {
  if (!value.trim()) return 0

  return value
    .trim()
    .split(/\n\s*\n/u)
    .filter((paragraph) => paragraph.trim()).length
}

function countLines(value) {
  if (!value) return 0

  return value.split(/\r\n|\r|\n/u).length
}

function countRegexMatches(value, regex) {
  return value.match(regex)?.length || 0
}

/* -------------------------------------------------------------------------- */
/*                           X WEIGHTED COUNT — PURE JS                       */
/* -------------------------------------------------------------------------- */

/*
  IMPORTANT:

  X officially recommends twitter-text for perfect parity.

  You said you do NOT want another library, so this function implements
  X's published core behavior:

  - NFC normalization
  - URLs ≈ 23 characters
  - emoji = 2
  - common Unicode range = 1
  - other Unicode = 2

  This is therefore displayed as:
  "X weighted estimate"

  rather than pretending it covers every parser edge case.
*/

const X_WEIGHT_ONE_RANGES = [
  [0, 4351],
  [8192, 8205],
  [8208, 8223],
  [8242, 8247],
]

function isXWeightOne(codePoint) {
  return X_WEIGHT_ONE_RANGES.some(
    ([start, end]) =>
      codePoint >= start && codePoint <= end
  )
}

function getXCharacterWeight(character) {
  const codePoint = character.codePointAt(0)

  return isXWeightOne(codePoint) ? 1 : 2
}

function getXChunkWeight(value) {
  let total = 0

  for (const grapheme of getGraphemeSegments(value)) {
    /*
      Complex emoji sequences should be treated as one emoji unit
      in our approximation.
    */
    if (/\p{Extended_Pictographic}/u.test(grapheme)) {
      total += 2
      continue
    }

    /*
      Non-emoji grapheme may still contain more than one code point.
    */
    for (const character of Array.from(grapheme)) {
      total += getXCharacterWeight(character)
    }
  }

  return total
}

/*
  Browser-only URL detector.
  It intentionally focuses on normal web URLs.

  Exact twitter-text URL parsing is more complicated.
*/
const X_URL_REGEX =
  /\b(?:https?:\/\/|www\.)[^\s<>"']*[^\s<>"'.,!?;:)\]]/giu

function countXWeighted(value) {
  if (!value) return 0

  const normalized = value.normalize("NFC")

  const regex = new RegExp(
    X_URL_REGEX.source,
    X_URL_REGEX.flags
  )

  let total = 0
  let lastIndex = 0
  let match

  while ((match = regex.exec(normalized)) !== null) {
    total += getXChunkWeight(
      normalized.slice(lastIndex, match.index)
    )

    // X shortened URL length
    total += 23

    lastIndex = match.index + match[0].length
  }

  total += getXChunkWeight(
    normalized.slice(lastIndex)
  )

  return total
}

/* -------------------------------------------------------------------------- */
/*                       GOOGLE ADS DOUBLE-WIDTH COUNT                        */
/* -------------------------------------------------------------------------- */

function isCjkCodePoint(codePoint) {
  return (
    // Hiragana / Katakana
    (codePoint >= 0x3040 && codePoint <= 0x30ff) ||

    // CJK Unified Ideographs
    (codePoint >= 0x3400 && codePoint <= 0x4dbf) ||
    (codePoint >= 0x4e00 && codePoint <= 0x9fff) ||

    // Hangul
    (codePoint >= 0xac00 && codePoint <= 0xd7af) ||

    // Fullwidth forms
    (codePoint >= 0xff01 && codePoint <= 0xff60)
  )
}

function countGoogleAdsCharacters(value) {
  if (!value) return 0

  let total = 0

  for (const character of Array.from(value.normalize("NFC"))) {
    const codePoint = character.codePointAt(0)

    total += isCjkCodePoint(codePoint) ? 2 : 1
  }

  return total
}

/* -------------------------------------------------------------------------- */
/*                             SMS SEGMENT LOGIC                              */
/* -------------------------------------------------------------------------- */

const GSM_7_BASIC = new Set(
  Array.from(
    `@£$¥èéùìòÇ
Øø
ÅåΔ_ΦΓΛΩΠΨΣΘΞ\u001bÆæßÉ !"#¤%&'()*+,-./0123456789:;<=>?¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà`
  )
)

const GSM_7_EXTENDED = new Set([
  "\f",
  "^",
  "{",
  "}",
  "\\",
  "[",
  "~",
  "]",
  "|",
  "€",
])

function getSmsInfo(value) {
  if (!value) {
    return {
      encoding: "GSM-7",
      units: 0,
      segments: 0,
      singleLimit: 160,
      multiLimit: 153,
      capacity: 160,
      remaining: 160,
    }
  }

  let gsmCompatible = true
  let gsmUnits = 0

  for (const character of Array.from(value)) {
    if (GSM_7_BASIC.has(character)) {
      gsmUnits += 1
      continue
    }

    if (GSM_7_EXTENDED.has(character)) {
      /*
        GSM extension table characters consume two septets.
      */
      gsmUnits += 2
      continue
    }

    gsmCompatible = false
    break
  }

  const encoding = gsmCompatible
    ? "GSM-7"
    : "Unicode"

  /*
    UTF-16 code units are useful here because emoji outside BMP
    often consume two Unicode units.
  */
  const units = gsmCompatible
    ? gsmUnits
    : value.length

  const singleLimit = gsmCompatible
    ? 160
    : 70

  const multiLimit = gsmCompatible
    ? 153
    : 67

  const segments =
    units === 0
      ? 0
      : units <= singleLimit
        ? 1
        : Math.ceil(units / multiLimit)

  const capacity =
    segments <= 1
      ? singleLimit
      : segments * multiLimit

  return {
    encoding,
    units,
    segments,
    singleLimit,
    multiLimit,
    capacity,
    remaining: Math.max(capacity - units, 0),
  }
}

/* -------------------------------------------------------------------------- */
/*                          GENERAL TEXT ANALYSIS                             */
/* -------------------------------------------------------------------------- */

function analyzeText(value) {
  const graphemeSegments =
    getGraphemeSegments(value)

  const graphemes =
    graphemeSegments.length

  const charactersNoSpaces =
    countGraphemes(
      value.replace(/\s/gu, "")
    )

  const words =
    getWordTokens(value)

  const normalizedWords =
    words.map((word) =>
      word.toLocaleLowerCase(LOCALE)
    )

  const uniqueWords =
    new Set(normalizedWords).size

  const sentences =
    countSentences(value)

  const paragraphs =
    countParagraphs(value)

  const lines =
    countLines(value)

  const bytes =
    typeof TextEncoder !== "undefined"
      ? new TextEncoder().encode(value).length
      : 0

  const emojis =
    graphemeSegments.filter((segment) =>
      /\p{Extended_Pictographic}/u.test(segment)
    ).length

  const hashtags =
    countRegexMatches(
      value,
      /(?:^|\s)#[\p{L}\p{N}_]+/gu
    )

  const mentions =
    countRegexMatches(
      value,
      /(?:^|\s)@[\p{L}\p{N}_.-]+/gu
    )

  const urls =
    countRegexMatches(
      value,
      /\bhttps?:\/\/[^\s]+/giu
    )

  const letters =
    countRegexMatches(
      value,
      /\p{L}/gu
    )

  const digits =
    countRegexMatches(
      value,
      /\p{N}/gu
    )

  const whitespace =
    countRegexMatches(
      value,
      /\s/gu
    )

  const punctuation =
    countRegexMatches(
      value,
      /\p{P}/gu
    )

  const avgWordLength =
    words.length > 0
      ? charactersNoSpaces / words.length
      : 0

  const readingMinutes =
    words.length > 0
      ? words.length / 238
      : 0

  const speakingMinutes =
    words.length > 0
      ? words.length / 130
      : 0

  return {
    graphemes,
    utf16: value.length,
    charactersNoSpaces,

    words: words.length,
    uniqueWords,

    sentences,
    paragraphs,
    lines,

    bytes,

    emojis,
    hashtags,
    mentions,
    urls,

    letters,
    digits,
    whitespace,
    punctuation,

    avgWordLength,

    readingMinutes,
    speakingMinutes,

    xWeighted:
      countXWeighted(value),

    googleAds:
      countGoogleAdsCharacters(value),
  }
}

/* -------------------------------------------------------------------------- */
/*                            DISPLAY UTILITIES                               */
/* -------------------------------------------------------------------------- */

function formatNumber(value) {
  return Number(value || 0).toLocaleString(LOCALE)
}

function formatTime(minutes) {
  if (!minutes) return "0 min"

  if (minutes < 1) return "< 1 min"

  return `${Math.ceil(minutes)} min`
}

function getPresetCount(
  preset,
  stats,
  sms
) {
  switch (preset.mode) {
    case "x":
      return stats.xWeighted

    case "utf16":
      return stats.utf16

    case "googleAds":
      return stats.googleAds

    case "sms":
      return sms.units

    default:
      return stats.graphemes
  }
}

function getPresetLimit(
  preset,
  sms
) {
  if (preset.mode === "sms") {
    return sms.capacity
  }

  return preset.max
}

/* -------------------------------------------------------------------------- */
/*                             COMPONENT START                                */
/* -------------------------------------------------------------------------- */

export default function CharacterCounterTool() {
  const [text, setText] = useState("")

  const [selectedPresetId, setSelectedPresetId] =
    useState("x-post")

  const [activeCategory, setActiveCategory] =
    useState("Social")

  const [customLimit, setCustomLimit] =
    useState(500)

  const [goal, setGoal] =
    useState(2000)

  const [copied, setCopied] =
    useState(false)

  const [copyError, setCopyError] =
    useState(false)

  /*
    Hydration safety:
    Next.js can pre-render Client Components on the server.
    We render a stable shell until the component mounts in the browser,
    then show the full interactive analyzer.

    This prevents mismatches caused by:
    - browser/server Intl differences
    - browser extensions modifying textarea attributes before hydration
    - browser-only DOM behavior
  */
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  /* ---------------------------------------------------------------------- */
  /* ANALYSIS                                                               */
  /* ---------------------------------------------------------------------- */

  const stats = useMemo(
    () => analyzeText(text),
    [text]
  )

  const sms = useMemo(
    () => getSmsInfo(text),
    [text]
  )

  /* ---------------------------------------------------------------------- */
  /* SELECTED PRESET                                                        */
  /* ---------------------------------------------------------------------- */

  const selectedPreset =
    selectedPresetId === "custom"
      ? {
        id: "custom",
        name: "Custom Limit",
        shortName: "Custom",
        category: "Custom",
        max: Math.max(
          Number(customLimit) || 1,
          1
        ),
        mode: "grapheme",
        sourceType: "Custom",
        description:
          "Your own character target",
      }
      : PLATFORM_PRESETS.find(
        (preset) =>
          preset.id === selectedPresetId
      ) || PLATFORM_PRESETS[0]

  const currentCount =
    getPresetCount(
      selectedPreset,
      stats,
      sms
    )

  const currentLimit =
    getPresetLimit(
      selectedPreset,
      sms
    )

  const remaining =
    currentLimit - currentCount

  const isOver =
    selectedPreset.mode !== "sms" &&
    currentCount > currentLimit

  const progress =
    currentLimit > 0
      ? Math.min(
        (currentCount / currentLimit) * 100,
        100
      )
      : 0

  const goalProgress =
    goal > 0
      ? Math.min(
        (stats.graphemes / goal) * 100,
        100
      )
      : 0

  /* ---------------------------------------------------------------------- */
  /* TEXT QUALITY                                                           */
  /* ---------------------------------------------------------------------- */

  const qualityChecks =
    useMemo(
      () => [
        {
          label:
            "No leading or trailing spaces",
          passed:
            !text ||
            text === text.trim(),
        },

        {
          label:
            "No repeated spaces",
          passed:
            !/[^\S\r\n]{2,}/u.test(text),
        },

        {
          label:
            "No excessive blank lines",
          passed:
            !/\n\s*\n\s*\n/u.test(text),
        },

        {
          label:
            "No tab characters",
          passed:
            !/\t/u.test(text),
        },

        {
          label:
            "No zero-width spaces",
          passed:
            !/[\u200B\uFEFF]/u.test(text),
        },
      ],
      [text]
    )

  const passedQualityChecks =
    qualityChecks.filter(
      (check) => check.passed
    ).length

  /* ---------------------------------------------------------------------- */
  /* CROSS-PLATFORM FIT                                                     */
  /* ---------------------------------------------------------------------- */

  const crossPlatformItems =
    PLATFORM_PRESETS
      .filter(
        (preset) =>
          preset.mode !== "sms"
      )
      .map((preset) => {
        const count =
          getPresetCount(
            preset,
            stats,
            sms
          )

        return {
          ...preset,
          count,
          fits:
            count <= preset.max,
          difference:
            preset.max - count,
        }
      })

  const fitCount =
    crossPlatformItems.filter(
      (preset) => preset.fits
    ).length

  /* ---------------------------------------------------------------------- */
  /* ACTIONS                                                                */
  /* ---------------------------------------------------------------------- */

  const handleClear = () => {
    setText("")
    setCopied(false)
    setCopyError(false)
  }

  const handleCopy = async () => {
    if (!text) return

    setCopyError(false)

    try {
      if (
        navigator.clipboard &&
        window.isSecureContext
      ) {
        await navigator.clipboard.writeText(
          text
        )
      } else {
        /*
          Fallback for environments where Clipboard API
          is unavailable.
        */
        const textarea =
          document.createElement("textarea")

        textarea.value = text

        textarea.style.position = "fixed"
        textarea.style.opacity = "0"

        document.body.appendChild(textarea)

        textarea.focus()
        textarea.select()

        const success =
          document.execCommand("copy")

        textarea.remove()

        if (!success) {
          throw new Error(
            "Copy command failed"
          )
        }
      }

      setCopied(true)

      window.setTimeout(
        () => setCopied(false),
        1800
      )
    } catch {
      setCopyError(true)

      window.setTimeout(
        () => setCopyError(false),
        2000
      )
    }
  }

  const handleDownload = () => {
    if (!text) return

    const blob =
      new Blob(
        [text],
        {
          type:
            "text/plain;charset=utf-8",
        }
      )

    const url =
      URL.createObjectURL(blob)

    const anchor =
      document.createElement("a")

    anchor.href = url
    anchor.download =
      "countflows-text.txt"

    document.body.appendChild(anchor)

    anchor.click()
    anchor.remove()

    window.setTimeout(
      () =>
        URL.revokeObjectURL(url),
      0
    )
  }

  const handleCleanSpacing = () => {
    if (!text) return

    const cleaned =
      text
        .split(/\r\n|\r|\n/u)
        .map((line) =>
          line
            .replace(/[ \t]+/gu, " ")
            .trimEnd()
        )
        .join("\n")
        .replace(/\n{3,}/gu, "\n\n")
        .trim()

    setText(cleaned)
  }

  /* ---------------------------------------------------------------------- */
  /* CATEGORY FILTER                                                        */
  /* ---------------------------------------------------------------------- */

  const visiblePresets =
    PLATFORM_PRESETS.filter(
      (preset) =>
        preset.category ===
        activeCategory
    )

  /* ---------------------------------------------------------------------- */
  /* PROGRESS COLOR                                                         */
  /* ---------------------------------------------------------------------- */

  const progressColor =
    isOver
      ? "from-red-500 to-rose-500"
      : progress >= 90
        ? "from-amber-400 to-orange-500"
        : "from-cyan-500 to-sky-500"

  /* ---------------------------------------------------------------------- */
  /* ACTIVE STATUS TEXT                                                     */
  /* ---------------------------------------------------------------------- */

  let statusText = ""

  if (selectedPreset.mode === "sms") {
    statusText =
      sms.segments === 0
        ? `Ready · ${sms.encoding}`
        : `${sms.segments} ${sms.segments === 1
          ? "segment"
          : "segments"
        } · ${sms.encoding}`
  } else if (
    selectedPreset.sourceType === "Guide" &&
    selectedPreset.min
  ) {
    if (currentCount < selectedPreset.min) {
      statusText =
        `${formatNumber(
          selectedPreset.min - currentCount
        )} below suggested range`
    } else if (currentCount <= selectedPreset.max) {
      statusText =
        "Within suggested range"
    } else {
      statusText =
        `${formatNumber(
          currentCount - selectedPreset.max
        )} above suggested range`
    }
  } else {
    statusText =
      isOver
        ? `${formatNumber(
          Math.abs(remaining)
        )} over limit`
        : `${formatNumber(
          remaining
        )} remaining`
  }

  /* ---------------------------------------------------------------------- */
  /* HYDRATION-SAFE INITIAL SHELL                                           */
  /* ---------------------------------------------------------------------- */

  /*
    Server render and the browser's first render return the exact same markup.
    After hydration completes, useEffect sets mounted=true and the full tool
    is rendered. Do not remove this guard if hydration warnings return.
  */
  if (!mounted) {
    return (
      <section
        aria-label="Character counter tool"
        className="relative mx-auto mb-16 max-w-6xl px-4 md:px-8"
      >
        <div
          className="
            relative overflow-hidden
            rounded-[2rem]
            border border-cyan-100
            bg-white/95
            shadow-2xl shadow-cyan-950/10
            dark:border-cyan-900/50
            dark:bg-gray-900/95
            dark:shadow-black/40
          "
        >
          <div className="p-4 sm:p-6 md:p-8">
            <div className="animate-pulse">
              <div className="h-6 w-44 rounded-full bg-cyan-100 dark:bg-cyan-950/50" />

              <div className="mt-5 h-8 w-72 max-w-full rounded-xl bg-gray-200 dark:bg-gray-800" />

              <div className="mt-3 h-4 w-full max-w-2xl rounded bg-gray-100 dark:bg-gray-800/70" />
              <div className="mt-2 h-4 w-4/5 max-w-xl rounded bg-gray-100 dark:bg-gray-800/70" />

              <div className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-24 rounded-2xl border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900"
                  />
                ))}
              </div>

              <div className="mt-7 h-[300px] rounded-3xl border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950" />
            </div>

            <p className="sr-only">Loading character counter…</p>
          </div>
        </div>
      </section>
    )
  }

  /* ---------------------------------------------------------------------- */
  /* RENDER                                                                 */
  /* ---------------------------------------------------------------------- */

  return (
    <section
      aria-label="Character counter tool"
      className="relative mx-auto mb-16 max-w-6xl px-4 md:px-8"
    >
      <div
        className="
          relative overflow-hidden
          rounded-[2rem]
          border border-cyan-100
          bg-white/95
          shadow-2xl shadow-cyan-950/10
          backdrop-blur-xl
          dark:border-cyan-900/50
          dark:bg-gray-900/95
          dark:shadow-black/40
        "
      >
        {/* Decorative background */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute
            -right-24 -top-24
            h-72 w-72
            rounded-full
            bg-cyan-200/30
            blur-3xl
            dark:bg-cyan-500/10
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute
            -bottom-32 -left-20
            h-72 w-72
            rounded-full
            bg-sky-200/30
            blur-3xl
            dark:bg-sky-500/10
          "
        />

        <div className="relative p-4 sm:p-6 md:p-8">
          {/* -------------------------------------------------------------- */}
          {/* TOOL HEADER                                                    */}
          {/* -------------------------------------------------------------- */}

          <header
            className="
              flex flex-col gap-5
              border-b border-gray-100
              pb-6
              dark:border-gray-800
              md:flex-row
              md:items-center
              md:justify-between
            "
          >
            <div>
              <div
                className="
                  mb-3 inline-flex items-center gap-2
                  rounded-full
                  border border-cyan-200
                  bg-cyan-50
                  px-3 py-1.5
                  text-xs font-semibold
                  text-cyan-700
                  dark:border-cyan-800
                  dark:bg-cyan-950/50
                  dark:text-cyan-300
                "
              >
                <Sparkles
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                />

                Advanced browser analysis
              </div>

              <h2
                className="
                  text-xl font-black
                  tracking-tight
                  text-gray-950
                  dark:text-white
                  md:text-2xl
                "
              >
                Character & Platform Analyzer
              </h2>

              <p
                className="
                  mt-2 max-w-2xl
                  text-sm leading-6
                  text-gray-600
                  dark:text-gray-400
                "
              >
                Paste once and analyze characters,
                Unicode, publishing limits, SMS length,
                text composition and writing quality.
              </p>
            </div>

            <div
              className="
                flex items-center gap-3
                rounded-2xl
                border border-cyan-100
                bg-cyan-50/80
                px-4 py-3
                dark:border-cyan-900
                dark:bg-cyan-950/30
              "
            >
              <Gauge
                className="
                  h-5 w-5
                  text-cyan-600
                  dark:text-cyan-400
                "
                aria-hidden="true"
              />

              <div>
                <p
                  className="
                    text-xs
                    text-gray-500
                    dark:text-gray-400
                  "
                >
                  Cross-platform fit
                </p>

                <p
                  className="
                    font-black
                    text-gray-950
                    dark:text-white
                  "
                >
                  {fitCount}/
                  {crossPlatformItems.length}
                </p>
              </div>
            </div>
          </header>

          {/* -------------------------------------------------------------- */}
          {/* CATEGORY TABS                                                  */}
          {/* -------------------------------------------------------------- */}

          <div className="mt-7">
            <div
              className="
                flex flex-wrap
                items-center gap-2
              "
            >
              {CATEGORIES.map(
                (category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() =>
                      setActiveCategory(
                        category
                      )
                    }
                    className={`
                      rounded-full
                      px-4 py-2
                      text-sm font-bold
                      transition
                      ${activeCategory ===
                        category
                        ? `
                            bg-cyan-600
                            text-white
                            shadow-lg
                            shadow-cyan-500/20
                          `
                        : `
                            border
                            border-gray-200
                            bg-white
                            text-gray-600
                            hover:border-cyan-300
                            hover:text-cyan-700
                            dark:border-gray-700
                            dark:bg-gray-800
                            dark:text-gray-300
                            dark:hover:border-cyan-700
                          `
                      }
                    `}
                  >
                    {category}
                  </button>
                )
              )}

              <button
                type="button"
                onClick={() =>
                  setSelectedPresetId(
                    "custom"
                  )
                }
                className={`
                  rounded-full
                  border border-dashed
                  px-4 py-2
                  text-sm font-bold
                  transition
                  ${selectedPresetId ===
                    "custom"
                    ? `
                        border-cyan-600
                        bg-cyan-600
                        text-white
                      `
                    : `
                        border-cyan-300
                        bg-cyan-50
                        text-cyan-700
                        hover:bg-cyan-100
                        dark:border-cyan-800
                        dark:bg-cyan-950/30
                        dark:text-cyan-300
                      `
                  }
                `}
              >
                Custom
              </button>
            </div>

            {/* ------------------------------------------------------------ */}
            {/* PRESET CARDS                                                 */}
            {/* ------------------------------------------------------------ */}

            <div
              className="
                mt-4 grid gap-2
                sm:grid-cols-2
                lg:grid-cols-3
              "
            >
              {visiblePresets.map(
                (preset) => {
                  const active =
                    selectedPresetId ===
                    preset.id

                  return (
                    <button
                      key={preset.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() =>
                        setSelectedPresetId(
                          preset.id
                        )
                      }
                      className={`
                        rounded-2xl
                        border p-4
                        text-left
                        transition
                        ${active
                          ? `
                              border-cyan-500
                              bg-cyan-50
                              shadow-md
                              shadow-cyan-500/10
                              dark:border-cyan-500
                              dark:bg-cyan-950/30
                            `
                          : `
                              border-gray-200
                              bg-white
                              hover:border-cyan-300
                              hover:bg-cyan-50/40
                              dark:border-gray-700
                              dark:bg-gray-800/70
                              dark:hover:border-cyan-800
                            `
                        }
                      `}
                    >
                      <div
                        className="
                          flex items-start
                          justify-between
                          gap-3
                        "
                      >
                        <div>
                          <p
                            className="
                              text-sm font-bold
                              text-gray-950
                              dark:text-gray-100
                            "
                          >
                            {preset.name}
                          </p>

                          <p
                            className="
                              mt-1 text-xs
                              text-gray-500
                              dark:text-gray-400
                            "
                          >
                            {preset.mode === "sms"
                              ? "Dynamic limit"
                              : `${formatNumber(
                                preset.max
                              )} characters`}
                          </p>
                        </div>

                        <SourceBadge
                          type={
                            preset.sourceType
                          }
                        />
                      </div>

                      <p
                        className="
                          mt-3 text-xs
                          leading-5
                          text-gray-500
                          dark:text-gray-400
                        "
                      >
                        {preset.description}
                      </p>
                    </button>
                  )
                }
              )}
            </div>

            {/* ------------------------------------------------------------ */}
            {/* CUSTOM LIMIT                                                 */}
            {/* ------------------------------------------------------------ */}

            {selectedPresetId ===
              "custom" && (
                <div
                  className="
                  mt-4 flex
                  flex-col gap-3
                  rounded-2xl
                  border border-cyan-200
                  bg-cyan-50/70
                  p-4
                  dark:border-cyan-900
                  dark:bg-cyan-950/20
                  sm:flex-row
                  sm:items-center
                "
                >
                  <label
                    htmlFor="custom-character-limit"
                    className="
                    text-sm font-bold
                    text-gray-800
                    dark:text-gray-200
                  "
                  >
                    Custom character limit
                  </label>

                  <input
                    id="custom-character-limit"
                    type="number"
                    min="1"
                    value={customLimit}
                    onChange={(event) =>
                      setCustomLimit(
                        Math.max(
                          Number(
                            event.target.value
                          ) || 1,
                          1
                        )
                      )
                    }
                    className="
                    w-full
                    rounded-xl
                    border border-cyan-200
                    bg-white
                    px-4 py-2.5
                    text-sm font-bold
                    text-gray-900
                    outline-none
                    focus:border-cyan-500
                    focus:ring-2
                    focus:ring-cyan-500/20
                    dark:border-gray-700
                    dark:bg-gray-900
                    dark:text-white
                    sm:w-40
                  "
                  />
                </div>
              )}
          </div>

          {/* -------------------------------------------------------------- */}
          {/* ACTIVE LIMIT                                                   */}
          {/* -------------------------------------------------------------- */}

          <section
            aria-label="Current character limit"
            className="
              mt-7 rounded-3xl
              border border-gray-200
              bg-gray-50/80
              p-5
              dark:border-gray-700
              dark:bg-gray-950/50
              md:p-6
            "
          >
            <div
              className="
                flex flex-col gap-4
                sm:flex-row
                sm:items-end
                sm:justify-between
              "
            >
              <div>
                <p
                  className="
                    text-xs font-bold
                    uppercase
                    tracking-[0.16em]
                    text-cyan-600
                    dark:text-cyan-400
                  "
                >
                  Active preset
                </p>

                <h3
                  className="
                    mt-1 text-xl
                    font-black
                    text-gray-950
                    dark:text-white
                  "
                >
                  {selectedPreset.name}
                </h3>

                <p
                  className="
                    mt-1 text-sm
                    text-gray-500
                    dark:text-gray-400
                  "
                >
                  {selectedPreset.description}
                </p>
              </div>

              <div
                className="
                  text-left
                  sm:text-right
                "
              >
                <p
                  className="
                    text-3xl font-black
                    tracking-tight
                    text-gray-950
                    dark:text-white
                  "
                >
                  {formatNumber(currentCount)}

                  <span
                    className="
                      mx-1
                      text-lg font-medium
                      text-gray-400
                    "
                  >
                    /
                  </span>

                  <span
                    className="
                      text-lg font-bold
                      text-gray-500
                    "
                  >
                    {formatNumber(currentLimit)}
                  </span>
                </p>

                <p
                  aria-live="polite"
                  className={`
                    mt-1 text-sm
                    font-bold
                    ${isOver
                      ? `
                          text-red-600
                          dark:text-red-400
                        `
                      : `
                          text-cyan-700
                          dark:text-cyan-300
                        `
                    }
                  `}
                >
                  {statusText}
                </p>
              </div>
            </div>

            {/* Progress */}
            <div
              className="
                mt-5 h-3
                overflow-hidden
                rounded-full
                bg-gray-200
                dark:bg-gray-800
              "
            >
              <div
                className={`
                  h-full rounded-full
                  bg-gradient-to-r
                  ${progressColor}
                  transition-[width]
                  duration-300
                `}
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            <div
              className="
                mt-3 flex
                flex-wrap
                items-center
                justify-between
                gap-2
                text-xs
                text-gray-500
                dark:text-gray-400
              "
            >
              <span>
                {Math.round(progress)}% of current allowance
              </span>

              <span>
                {selectedPreset.mode === "x"
                  ? "X weighted estimate"
                  : selectedPreset.mode === "utf16"
                    ? "UTF-16 counting"
                    : selectedPreset.mode === "sms"
                      ? `${sms.encoding} SMS`
                      : selectedPreset.mode === "googleAds"
                        ? "Ad character counting"
                        : "Unicode grapheme counting"}
              </span>
            </div>
          </section>

          {/* -------------------------------------------------------------- */}
          {/* TEXTAREA                                                       */}
          {/* -------------------------------------------------------------- */}

          <div className="mt-7">
            <label
              htmlFor="character-counter-input"
              className="sr-only"
            >
              Enter or paste text to count
              characters
            </label>

            <div
              className="
                overflow-hidden
                rounded-3xl
                border border-gray-200
                bg-white
                shadow-inner
                transition
                focus-within:border-cyan-400
                focus-within:ring-4
                focus-within:ring-cyan-500/10
                dark:border-gray-700
                dark:bg-gray-950
              "
            >
              <textarea
                id="character-counter-input"
                value={text}
                onChange={(event) =>
                  setText(
                    event.target.value
                  )
                }
                placeholder="Start typing or paste your text here..."
                spellCheck="true"
                className="
                  min-h-[260px]
                  w-full resize-y
                  bg-transparent
                  p-5
                  text-base leading-7
                  text-gray-900
                  outline-none
                  placeholder:text-gray-400
                  dark:text-gray-100
                  md:min-h-[340px]
                  md:p-6
                  md:text-lg
                "
              />

              {/* Live footer */}
              <div
                aria-live="polite"
                className="
                  flex flex-wrap
                  items-center
                  gap-x-5 gap-y-2
                  border-t
                  border-gray-100
                  bg-gray-50/80
                  px-5 py-3
                  text-xs
                  text-gray-500
                  dark:border-gray-800
                  dark:bg-gray-900/70
                  dark:text-gray-400
                "
              >
                <span>
                  {formatNumber(
                    stats.graphemes
                  )}{" "}
                  characters
                </span>

                <span>
                  {formatNumber(
                    stats.words
                  )}{" "}
                  words
                </span>

                <span>
                  {formatNumber(
                    stats.lines
                  )}{" "}
                  lines
                </span>

                <span>
                  {formatNumber(
                    stats.bytes
                  )}{" "}
                  UTF-8 bytes
                </span>
              </div>
            </div>
          </div>

          {/* -------------------------------------------------------------- */}
          {/* ACTION BUTTONS                                                 */}
          {/* -------------------------------------------------------------- */}

          <div
            className="
              mt-4 flex flex-wrap gap-2
            "
          >
            <button
              type="button"
              disabled={!text}
              onClick={handleCopy}
              className="
                inline-flex items-center
                gap-2 rounded-xl
                bg-cyan-600
                px-4 py-2.5
                text-sm font-bold
                text-white
                shadow-md
                shadow-cyan-500/20
                transition
                hover:bg-cyan-700
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              {copied ? (
                <Check
                  className="h-4 w-4"
                  aria-hidden="true"
                />
              ) : (
                <Copy
                  className="h-4 w-4"
                  aria-hidden="true"
                />
              )}

              {copied
                ? "Copied"
                : copyError
                  ? "Copy failed"
                  : "Copy"}
            </button>

            <button
              type="button"
              disabled={!text}
              onClick={handleCleanSpacing}
              className="
                inline-flex items-center
                gap-2 rounded-xl
                border border-cyan-200
                bg-cyan-50
                px-4 py-2.5
                text-sm font-bold
                text-cyan-700
                transition
                hover:bg-cyan-100
                disabled:cursor-not-allowed
                disabled:opacity-40
                dark:border-cyan-900
                dark:bg-cyan-950/30
                dark:text-cyan-300
              "
            >
              <Scissors
                className="h-4 w-4"
                aria-hidden="true"
              />

              Clean spacing
            </button>

            <button
              type="button"
              disabled={!text}
              onClick={handleDownload}
              className="
                inline-flex items-center
                gap-2 rounded-xl
                border border-gray-200
                bg-white
                px-4 py-2.5
                text-sm font-bold
                text-gray-700
                transition
                hover:border-cyan-300
                hover:text-cyan-700
                disabled:cursor-not-allowed
                disabled:opacity-40
                dark:border-gray-700
                dark:bg-gray-800
                dark:text-gray-300
              "
            >
              <Download
                className="h-4 w-4"
                aria-hidden="true"
              />

              Download
            </button>

            <button
              type="button"
              disabled={!text}
              onClick={handleClear}
              className="
                inline-flex items-center
                gap-2 rounded-xl
                border border-gray-200
                bg-white
                px-4 py-2.5
                text-sm font-bold
                text-gray-600
                transition
                hover:border-red-200
                hover:bg-red-50
                hover:text-red-600
                disabled:cursor-not-allowed
                disabled:opacity-40
                dark:border-gray-700
                dark:bg-gray-800
                dark:text-gray-300
                dark:hover:border-red-900
                dark:hover:bg-red-950/20
              "
            >
              <Trash2
                className="h-4 w-4"
                aria-hidden="true"
              />

              Clear
            </button>
          </div>

          {/* -------------------------------------------------------------- */}
          {/* MAIN METRIC CARDS                                              */}
          {/* -------------------------------------------------------------- */}

          <section
            aria-label="Text statistics"
            className="
              mt-8 grid
              grid-cols-2 gap-3
              md:grid-cols-4
            "
          >
            <MetricCard
              icon={Type}
              label="Characters"
              value={stats.graphemes}
            />

            <MetricCard
              icon={FileText}
              label="Words"
              value={stats.words}
            />

            <MetricCard
              icon={MessageSquareText}
              label="Sentences"
              value={stats.sentences}
            />

            <MetricCard
              icon={Hash}
              label="Paragraphs"
              value={stats.paragraphs}
            />

            <MetricCard
              icon={Sparkles}
              label="Emojis"
              value={stats.emojis}
            />

            <MetricCard
              icon={Hash}
              label="Hashtags"
              value={stats.hashtags}
            />

            <MetricCard
              icon={AtSign}
              label="Mentions"
              value={stats.mentions}
            />

            <MetricCard
              icon={Link2}
              label="URLs"
              value={stats.urls}
            />
          </section>

          {/* -------------------------------------------------------------- */}
          {/* ADVANCED METRICS + GOAL                                        */}
          {/* -------------------------------------------------------------- */}

          <div
            className="
              mt-8 grid gap-5
              lg:grid-cols-2
            "
          >
            {/* Advanced metrics */}
            <section
              className="
                rounded-3xl
                border border-gray-200
                bg-white p-5
                dark:border-gray-700
                dark:bg-gray-900
              "
            >
              <div
                className="
                  flex items-center gap-2
                "
              >
                <Gauge
                  className="
                    h-5 w-5
                    text-cyan-600
                  "
                  aria-hidden="true"
                />

                <h3
                  className="
                    font-black
                    text-gray-950
                    dark:text-white
                  "
                >
                  Advanced metrics
                </h3>
              </div>

              <div
                className="
                  mt-5 divide-y
                  divide-gray-100
                  text-sm
                  dark:divide-gray-800
                "
              >
                <MetricRow
                  label="Characters without spaces"
                  value={
                    stats.charactersNoSpaces
                  }
                />

                <MetricRow
                  label="UTF-16 units"
                  value={stats.utf16}
                />

                <MetricRow
                  label="UTF-8 bytes"
                  value={stats.bytes}
                />

                <MetricRow
                  label="Unique words"
                  value={stats.uniqueWords}
                />

                <MetricRow
                  label="Average word length"
                  value={`${stats.avgWordLength.toFixed(
                    1
                  )} chars`}
                />

                <MetricRow
                  label="Reading time"
                  value={formatTime(
                    stats.readingMinutes
                  )}
                />

                <MetricRow
                  label="Speaking time"
                  value={formatTime(
                    stats.speakingMinutes
                  )}
                />
              </div>
            </section>

            {/* Goal */}
            <section
              className="
                rounded-3xl
                border border-gray-200
                bg-white p-5
                dark:border-gray-700
                dark:bg-gray-900
              "
            >
              <div
                className="
                  flex items-center gap-2
                "
              >
                <Target
                  className="
                    h-5 w-5
                    text-cyan-600
                  "
                  aria-hidden="true"
                />

                <h3
                  className="
                    font-black
                    text-gray-950
                    dark:text-white
                  "
                >
                  Character goal
                </h3>
              </div>

              <p
                className="
                  mt-2 text-sm
                  text-gray-500
                  dark:text-gray-400
                "
              >
                Create a personal writing target
                separately from the active platform
                limit.
              </p>

              <div
                className="
                  mt-5 flex
                  items-center gap-3
                "
              >
                <input
                  type="number"
                  min="1"
                  value={goal}
                  aria-label="Character goal"
                  onChange={(event) =>
                    setGoal(
                      Math.max(
                        Number(
                          event.target.value
                        ) || 1,
                        1
                      )
                    )
                  }
                  className="
                    w-32
                    rounded-xl
                    border border-gray-200
                    bg-gray-50
                    px-4 py-2.5
                    text-sm font-bold
                    text-gray-900
                    outline-none
                    focus:border-cyan-400
                    focus:ring-2
                    focus:ring-cyan-500/20
                    dark:border-gray-700
                    dark:bg-gray-950
                    dark:text-white
                  "
                />

                <span
                  className="
                    text-sm
                    text-gray-500
                  "
                >
                  characters
                </span>
              </div>

              <div
                className="
                  mt-6 h-3
                  overflow-hidden
                  rounded-full
                  bg-gray-200
                  dark:bg-gray-800
                "
              >
                <div
                  className="
                    h-full rounded-full
                    bg-gradient-to-r
                    from-cyan-500
                    to-sky-500
                    transition-[width]
                    duration-300
                  "
                  style={{
                    width:
                      `${goalProgress}%`,
                  }}
                />
              </div>

              <div
                className="
                  mt-3 flex
                  items-center
                  justify-between
                  text-xs
                  text-gray-500
                  dark:text-gray-400
                "
              >
                <span>
                  {formatNumber(
                    stats.graphemes
                  )}{" "}
                  /{" "}
                  {formatNumber(goal)}
                </span>

                <span>
                  {Math.round(
                    goalProgress
                  )}
                  % complete
                </span>
              </div>
            </section>
          </div>

          {/* -------------------------------------------------------------- */}
          {/* TEXT COMPOSITION                                               */}
          {/* -------------------------------------------------------------- */}

          <section
            className="
              mt-8 rounded-3xl
              border border-gray-200
              bg-white p-5
              dark:border-gray-700
              dark:bg-gray-900
            "
          >
            <div>
              <h3
                className="
                  font-black
                  text-gray-950
                  dark:text-white
                "
              >
                Character composition
              </h3>

              <p
                className="
                  mt-1 text-xs
                  text-gray-500
                  dark:text-gray-400
                "
              >
                See what your text is made of.
              </p>
            </div>

            <div
              className="
                mt-5 grid
                grid-cols-2 gap-3
                sm:grid-cols-4
              "
            >
              <SmallStat
                label="Letters"
                value={stats.letters}
              />

              <SmallStat
                label="Numbers"
                value={stats.digits}
              />

              <SmallStat
                label="Whitespace"
                value={stats.whitespace}
              />

              <SmallStat
                label="Punctuation"
                value={stats.punctuation}
              />
            </div>
          </section>

          {/* -------------------------------------------------------------- */}
          {/* SMS ANALYZER                                                   */}
          {/* -------------------------------------------------------------- */}

          <section
            className="
              mt-8 rounded-3xl
              border border-cyan-200
              bg-gradient-to-br
              from-cyan-50
              to-sky-50
              p-5
              dark:border-cyan-900
              dark:from-cyan-950/30
              dark:to-sky-950/20
              md:p-6
            "
          >
            <div
              className="
                flex flex-col gap-4
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <div>
                <div
                  className="
                    flex items-center
                    gap-2
                  "
                >
                  <MessageSquareText
                    className="
                      h-5 w-5
                      text-cyan-600
                      dark:text-cyan-400
                    "
                    aria-hidden="true"
                  />

                  <h3
                    className="
                      font-black
                      text-gray-950
                      dark:text-white
                    "
                  >
                    SMS Segment Analyzer
                  </h3>
                </div>

                <p
                  className="
                    mt-2 max-w-2xl
                    text-sm leading-6
                    text-gray-600
                    dark:text-gray-400
                  "
                >
                  Detect GSM-7 or Unicode text and
                  estimate how many SMS segments the
                  message requires.
                </p>
              </div>

              <div
                className="
                  rounded-2xl
                  bg-white
                  px-5 py-3
                  text-center
                  shadow-sm
                  dark:bg-gray-900
                "
              >
                <p
                  className="
                    text-2xl font-black
                    text-cyan-700
                    dark:text-cyan-300
                  "
                >
                  {sms.segments}
                </p>

                <p
                  className="
                    text-xs
                    text-gray-500
                  "
                >
                  {sms.segments === 1
                    ? "segment"
                    : "segments"}
                </p>
              </div>
            </div>

            <div
              className="
                mt-5 grid
                grid-cols-2 gap-3
                sm:grid-cols-4
              "
            >
              <SmallStat
                label="Encoding"
                value={sms.encoding}
              />

              <SmallStat
                label="Units"
                value={sms.units}
              />

              <SmallStat
                label="Per segment"
                value={
                  sms.segments > 1
                    ? sms.multiLimit
                    : sms.singleLimit
                }
              />

              <SmallStat
                label="Remaining"
                value={sms.remaining}
              />
            </div>
          </section>

          {/* -------------------------------------------------------------- */}
          {/* TEXT QUALITY + PLATFORM FIT                                    */}
          {/* -------------------------------------------------------------- */}

          <div
            className="
              mt-8 grid gap-5
              lg:grid-cols-[0.8fr_1.2fr]
            "
          >
            {/* Text hygiene */}
            <section
              className="
                rounded-3xl
                border border-gray-200
                bg-white p-5
                dark:border-gray-700
                dark:bg-gray-900
              "
            >
              <div
                className="
                  flex items-center
                  justify-between
                  gap-3
                "
              >
                <div
                  className="
                    flex items-center gap-2
                  "
                >
                  <CheckCircle2
                    className="
                      h-5 w-5
                      text-cyan-600
                    "
                    aria-hidden="true"
                  />

                  <h3
                    className="
                      font-black
                      text-gray-950
                      dark:text-white
                    "
                  >
                    Text hygiene
                  </h3>
                </div>

                <span
                  className="
                    rounded-full
                    bg-cyan-50
                    px-3 py-1
                    text-xs font-black
                    text-cyan-700
                    dark:bg-cyan-950/40
                    dark:text-cyan-300
                  "
                >
                  {passedQualityChecks}/
                  {qualityChecks.length}
                </span>
              </div>

              <div
                className="
                  mt-5 space-y-3
                "
              >
                {qualityChecks.map(
                  (check) => (
                    <div
                      key={check.label}
                      className="
                        flex items-center
                        gap-3 text-sm
                      "
                    >
                      {check.passed ? (
                        <CheckCircle2
                          className="
                            h-4 w-4
                            shrink-0
                            text-cyan-600
                          "
                          aria-hidden="true"
                        />
                      ) : (
                        <AlertTriangle
                          className="
                            h-4 w-4
                            shrink-0
                            text-amber-500
                          "
                          aria-hidden="true"
                        />
                      )}

                      <span
                        className={
                          check.passed
                            ? `
                              text-gray-600
                              dark:text-gray-400
                            `
                            : `
                              font-semibold
                              text-gray-900
                              dark:text-gray-200
                            `
                        }
                      >
                        {check.label}
                      </span>
                    </div>
                  )
                )}
              </div>
            </section>

            {/* Cross-platform fit */}
            <section
              className="
                rounded-3xl
                border border-blue-200
                bg-gradient-to-br
                from-blue-50
                to-indigo-50
                p-5
                dark:border-blue-800
                dark:from-blue-950/30
                dark:to-indigo-950/30
              "
            >
              <div
                className="
                  flex items-center
                  justify-between
                  gap-3
                "
              >
                <div>
                  <h3
                    className="
                      font-black
                      text-gray-950
                      dark:text-white
                    "
                  >
                    Cross-platform fit
                  </h3>

                  <p
                    className="
                      mt-1 text-xs
                      text-gray-500
                      dark:text-gray-400
                    "
                  >
                    Check the same copy across
                    multiple publishing formats
                    instantly.
                  </p>
                </div>

                <span
                  className="
                    text-sm font-black
                    text-cyan-700
                    dark:text-cyan-300
                  "
                >
                  {fitCount}/
                  {crossPlatformItems.length}
                </span>
              </div>

              <div
                className="
                  mt-5 grid gap-2
                  sm:grid-cols-2
                "
              >
                {crossPlatformItems.map(
                  (item) => (
                    <div
                      key={item.id}
                      className="
                        flex items-center
                        justify-between
                        gap-3
                        rounded-xl
                        border
                        border-blue-200
                        bg-gradient-to-br
                        from-blue-50
                        to-indigo-50
                        px-3 py-3
                        shadow-sm
                        dark:border-blue-800
                        dark:from-blue-950/40
                        dark:to-indigo-950/40
                      "
                    >
                      <div className="min-w-0">
                        <p
                          className="
                            truncate
                            text-xs font-bold
                            text-gray-900
                            dark:text-blue-200
                          "
                        >
                          {item.name}
                        </p>

                        <p
                          className="
                            mt-0.5 text-[10px]
                            text-gray-600
                            dark:text-blue-400
                          "
                        >
                          {item.sourceType}
                        </p>
                      </div>

                      <span
                        className={`
                          shrink-0
                          rounded-full
                          px-2.5 py-1
                          text-[11px]
                          font-black
                          ${item.fits
                            ? `
                                bg-cyan-100
                                text-cyan-700
                                dark:bg-cyan-950/60
                                dark:text-cyan-300
                              `
                            : `
                                bg-red-50
                                text-red-600
                                dark:bg-red-950/30
                                dark:text-red-400
                              `
                          }
                        `}
                      >
                        {item.fits
                          ? "Fits"
                          : `+${formatNumber(
                            Math.abs(
                              item.difference
                            )
                          )}`}
                      </span>
                    </div>
                  )
                )}
              </div>
            </section>
          </div>

          {/* -------------------------------------------------------------- */}
          {/* READING + SPEAKING ESTIMATE                                    */}
          {/* -------------------------------------------------------------- */}

          <section
            className="
              mt-8 grid gap-3
              sm:grid-cols-2
            "
          >
            <TimeCard
              title="Estimated reading time"
              value={formatTime(
                stats.readingMinutes
              )}
              subtitle="Based on a general reading-speed estimate"
            />

            <TimeCard
              title="Estimated speaking time"
              value={formatTime(
                stats.speakingMinutes
              )}
              subtitle="Useful for scripts, presentations and voiceovers"
            />
          </section>

          {/* -------------------------------------------------------------- */}
          {/* PRIVACY / TRUST                                                */}
          {/* -------------------------------------------------------------- */}

          <div
            className="
              mt-8 flex
              items-start gap-3
              rounded-2xl
              border border-dashed
              border-cyan-200
              bg-cyan-50/60
              p-4
              dark:border-cyan-900
              dark:bg-cyan-950/20
            "
          >
            <CheckCircle2
              className="
                mt-0.5 h-5 w-5
                shrink-0
                text-cyan-600
                dark:text-cyan-400
              "
              aria-hidden="true"
            />

            <div>
              <p
                className="
                  text-sm font-black
                  text-gray-900
                  dark:text-gray-100
                "
              >
                Private by design
              </p>

              <p
                className="
                  mt-1 text-xs
                  leading-5
                  text-gray-600
                  dark:text-gray-400
                "
              >
                All counting and text analysis in
                this component runs directly in the
                browser. The tool does not need an
                external counting API.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*                          PRESENTATION COMPONENTS                           */
/* -------------------------------------------------------------------------- */

function MetricCard({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div
      className="
        rounded-2xl
        border border-gray-200
        bg-white p-4
        shadow-sm
        transition
        hover:-translate-y-0.5
        hover:border-cyan-300
        hover:shadow-md
        dark:border-gray-700
        dark:bg-gray-900
      "
    >
      <div
        className="
          flex items-center
          justify-between gap-3
        "
      >
        <div
          className="
            flex h-9 w-9
            items-center
            justify-center
            rounded-xl
            bg-cyan-50
            text-cyan-600
            dark:bg-cyan-950/40
            dark:text-cyan-300
          "
        >
          <Icon
            className="h-4 w-4"
            aria-hidden="true"
          />
        </div>

        <span
          className="
            text-lg font-black
            text-gray-950
            dark:text-white
          "
        >
          {formatNumber(value)}
        </span>
      </div>

      <p
        className="
          mt-3 text-xs
          font-medium
          text-gray-500
          dark:text-gray-400
        "
      >
        {label}
      </p>
    </div>
  )
}

function MetricRow({
  label,
  value,
}) {
  return (
    <div
      className="
        flex items-center
        justify-between gap-4
        py-3
        first:pt-0
        last:pb-0
      "
    >
      <span
        className="
          text-gray-500
          dark:text-gray-400
        "
      >
        {label}
      </span>

      <span
        className="
          text-right font-bold
          text-gray-900
          dark:text-gray-100
        "
      >
        {typeof value === "number"
          ? formatNumber(value)
          : value}
      </span>
    </div>
  )
}

function SmallStat({
  label,
  value,
}) {
  return (
    <div
      className="
        rounded-2xl
        border border-white/70
        bg-white/80
        p-3
        text-center
        shadow-sm
        dark:border-gray-800
        dark:bg-gray-900/80
      "
    >
      <p
        className="
          text-base font-black
          text-gray-950
          dark:text-white
        "
      >
        {typeof value === "number"
          ? formatNumber(value)
          : value}
      </p>

      <p
        className="
          mt-1 text-[11px]
          font-medium
          text-gray-500
          dark:text-gray-400
        "
      >
        {label}
      </p>
    </div>
  )
}

function TimeCard({
  title,
  value,
  subtitle,
}) {
  return (
    <div
      className="
        flex items-center gap-4
        rounded-2xl
        border border-gray-200
        bg-white p-4
        dark:border-gray-700
        dark:bg-gray-900
      "
    >
      <div
        className="
          flex h-11 w-11
          shrink-0 items-center
          justify-center
          rounded-2xl
          bg-cyan-50
          text-cyan-600
          dark:bg-cyan-950/40
          dark:text-cyan-300
        "
      >
        <Clock3
          className="h-5 w-5"
          aria-hidden="true"
        />
      </div>

      <div>
        <p
          className="
            text-xs font-medium
            text-gray-500
            dark:text-gray-400
          "
        >
          {title}
        </p>

        <p
          className="
            mt-0.5 text-xl
            font-black
            text-gray-950
            dark:text-white
          "
        >
          {value}
        </p>

        <p
          className="
            mt-1 text-[11px]
            leading-4
            text-gray-400
          "
        >
          {subtitle}
        </p>
      </div>
    </div>
  )
}

function SourceBadge({ type }) {
  const classes =
    type === "Official"
      ? `
        bg-emerald-50
        text-emerald-700
        dark:bg-emerald-950/30
        dark:text-emerald-300
      `
      : type === "Guide"
        ? `
          bg-amber-50
          text-amber-700
          dark:bg-amber-950/30
          dark:text-amber-300
        `
        : `
          bg-gray-100
          text-gray-600
          dark:bg-gray-800
          dark:text-gray-300
        `

  return (
    <span
      className={`
        shrink-0
        rounded-full
        px-2 py-1
        text-[10px]
        font-black
        ${classes}
      `}
    >
      {type}
    </span>
  )
}