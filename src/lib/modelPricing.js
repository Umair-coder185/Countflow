/*
 * Single source of truth for models shown in the CountFlows AI Token
 * Calculator & Counter.
 *
 * PRICING VERIFIED: 2026-08-15 against official provider documentation.
 *
 * IMPORTANT:
 * - Keep this file synchronized with SeoContent.
 * - Token counts in the current browser tool are estimates, not provider-side
 *   billing token counts.
 * - Standard text-token pricing is modeled here. Cached-input, batch/flex,
 *   tool-call, search, image/audio, and regional-processing charges are not
 *   included in the main calculator.
 *
 * GPT-5.6 LONG-CONTEXT PRICING:
 * Prompts with more than 272K input tokens are charged at 2x input and
 * 1.5x output rates for the full request.
 *
 * GEMINI 3.1 PRO LONG-CONTEXT PRICING:
 * Prompts above 200K tokens use the higher standard pricing tier.
 *
 * GEMINI 3.6 FLASH:
 * Current Standard API pricing is promotional through 2026-12-31.
 * Recheck on or before 2027-01-01.
 */

export const MODELS = [
  {
    id: "gpt-5.6-sol",
    label: "GPT-5.6 Sol",
    provider: "OpenAI",
    charsPerToken: 4.0,
    subwordFactor: 1.28,
    contextWindowTokens: 1_050_000,
    hasFixedPricing: true,
    inputPricePerMillion: 5.0,
    outputPricePerMillion: 30.0,
    longContext: {
      thresholdTokens: 272_000,
      inputPricePerMillion: 10.0,
      outputPricePerMillion: 45.0,
    },
    lastVerified: "2026-08-15",
  },
  {
    id: "gpt-5.6-terra",
    label: "GPT-5.6 Terra",
    provider: "OpenAI",
    charsPerToken: 4.0,
    subwordFactor: 1.28,
    contextWindowTokens: 1_050_000,
    hasFixedPricing: true,
    inputPricePerMillion: 2.0,
    outputPricePerMillion: 12.0,
    longContext: {
      thresholdTokens: 272_000,
      inputPricePerMillion: 4.0,
      outputPricePerMillion: 18.0,
    },
    lastVerified: "2026-08-15",
  },
  {
    id: "gpt-5.6-luna",
    label: "GPT-5.6 Luna",
    provider: "OpenAI",
    charsPerToken: 4.0,
    subwordFactor: 1.3,
    contextWindowTokens: 1_050_000,
    hasFixedPricing: true,
    inputPricePerMillion: 0.2,
    outputPricePerMillion: 1.2,
    longContext: {
      thresholdTokens: 272_000,
      inputPricePerMillion: 0.4,
      outputPricePerMillion: 1.8,
    },
    lastVerified: "2026-08-15",
  },
  {
    id: "claude-sonnet-5",
    label: "Claude Sonnet 5",
    provider: "Anthropic",
    charsPerToken: 3.6,
    subwordFactor: 1.22,
    contextWindowTokens: 1_000_000,
    hasFixedPricing: true,
    inputPricePerMillion: 2.0,
    outputPricePerMillion: 10.0,
    lastVerified: "2026-08-15",
  },
  {
    id: "claude-haiku-4-5",
    label: "Claude Haiku 4.5",
    provider: "Anthropic",
    charsPerToken: 3.6,
    subwordFactor: 1.22,
    contextWindowTokens: 200_000,
    hasFixedPricing: true,
    inputPricePerMillion: 1.0,
    outputPricePerMillion: 5.0,
    lastVerified: "2026-08-15",
  },
  {
    id: "gemini-3-1-pro",
    label: "Gemini 3.1 Pro",
    provider: "Google",
    charsPerToken: 4.0,
    subwordFactor: 1.25,
    contextWindowTokens: 1_048_576,
    hasFixedPricing: true,
    inputPricePerMillion: 2.0,
    outputPricePerMillion: 12.0,
    longContext: {
      thresholdTokens: 200_000,
      inputPricePerMillion: 4.0,
      outputPricePerMillion: 18.0,
    },
    lastVerified: "2026-08-15",
  },
  {
    id: "gemini-3-6-flash",
    label: "Gemini 3.6 Flash",
    provider: "Google",
    charsPerToken: 4.0,
    subwordFactor: 1.25,
    contextWindowTokens: 1_048_576,
    hasFixedPricing: true,
    inputPricePerMillion: 0.75,
    outputPricePerMillion: 3.75,
    pricingNote:
      "Promotional Standard API pricing through December 31, 2026. Recheck pricing on January 1, 2027.",
    lastVerified: "2026-08-15",
  },
  {
    id: "gemini-3-5-flash-lite",
    label: "Gemini 3.5 Flash-Lite",
    provider: "Google",
    charsPerToken: 4.0,
    subwordFactor: 1.24,
    contextWindowTokens: 1_048_576,
    hasFixedPricing: true,
    inputPricePerMillion: 0.3,
    outputPricePerMillion: 2.5,
    lastVerified: "2026-08-15",
  },
]