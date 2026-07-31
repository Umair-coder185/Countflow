/**
 * Single source of truth for every model shown in the AI Token Counter:
 * token-estimation heuristics, context window size, and per-million-token
 * pricing. Update this file — and only this file — when prices change.
 *
 * PRICING VERIFIED: 2026-07-31, against each provider's official page:
 *   OpenAI    -> https://platform.openai.com/docs/pricing
 *   Anthropic -> https://claude.com/pricing
 *   Google    -> https://ai.google.dev/gemini-api/docs/pricing
 * Llama 4 Maverick has no single official price — it's open-weight,
 * self-hosted or run through third-party inference providers at varying
 * rates (roughly $0.20/$0.60 per million tokens as a rough reference).
 *
 * ACTION NEEDED BY 2026-09-01: Claude Sonnet 5 is on introductory pricing
 * ($2 / $10 per MTok) through August 31, 2026. It reverts to standard
 * pricing ($3 / $15 per MTok) on September 1, 2026 — update
 * inputPricePerMillion / outputPricePerMillion for "claude-sonnet-5" then.
 *
 * NOTE ON LONG-CONTEXT TIERS: OpenAI's GPT-5.6 models also price prompts
 * above a length threshold higher, but the exact threshold wasn't
 * confirmed at verification time, so this file applies OpenAI's standard
 * rate uniformly (may slightly understate cost on very long prompts).
 * Gemini's 200K threshold IS confirmed and is modeled below.
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
    lastVerified: "2026-07-31",
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
    lastVerified: "2026-07-31",
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
    lastVerified: "2026-07-31",
  },
  {
    id: "claude-sonnet-5",
    label: "Claude Sonnet 5",
    provider: "Anthropic",
    charsPerToken: 3.6,
    subwordFactor: 1.22,
    contextWindowTokens: 200_000,
    hasFixedPricing: true,
    inputPricePerMillion: 2.0, // introductory — see note above, changes 2026-09-01
    outputPricePerMillion: 10.0, // introductory — see note above, changes 2026-09-01
    lastVerified: "2026-07-31",
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
    lastVerified: "2026-07-31",
  },
  {
    id: "gemini-3-1-pro",
    label: "Gemini 3.1 Pro",
    provider: "Google",
    charsPerToken: 4.0,
    subwordFactor: 1.25,
    contextWindowTokens: 1_000_000,
    hasFixedPricing: true,
    inputPricePerMillion: 2.0,
    outputPricePerMillion: 12.0,
    // Confirmed long-context tier: >200K tokens in a single prompt.
    longContext: {
      thresholdTokens: 200_000,
      inputPricePerMillion: 4.0,
      outputPricePerMillion: 18.0,
    },
    lastVerified: "2026-07-31",
  },
  {
    id: "llama-4-maverick",
    label: "Llama 4 Maverick",
    provider: "Meta (open-weight)",
    charsPerToken: 4.2,
    subwordFactor: 1.2,
    contextWindowTokens: 1_000_000,
    hasFixedPricing: false,
    inputPricePerMillion: null,
    outputPricePerMillion: null,
    pricingNote:
      "Open-weight — self-hosted or run through third-party providers (Together.ai, Fireworks, Groq, etc.) at varying rates, roughly $0.20 / $0.60 per million tokens as a rough reference. No single official price to calculate against.",
    lastVerified: "2026-07-31",
  },
];