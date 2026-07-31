import Link from "next/link"

// PRICING NOTE: The figures in this copy mirror lib/modelPricing.ts and must
// be reviewed together with that file. Verify against each provider's
// official pricing page monthly — AI pricing changes fast:
//   OpenAI    -> platform.openai.com/docs/pricing
//   Anthropic -> anthropic.com/pricing
//   Google    -> ai.google.dev/pricing
// Figures below last checked: 2026-07-31.

const h2Class =
    "text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mt-12 mb-4"
const h3Class =
    "text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-2"
const pClass = "text-gray-600 dark:text-gray-300 leading-7 mb-4"
const linkClass =
    "text-cyan-600 dark:text-cyan-400 font-medium hover:underline"
const thClass = "px-4 py-3 font-semibold text-gray-900 dark:text-gray-100"
const tdClass = "px-4 py-3 align-top"
const trClass = "border-t border-gray-200 dark:border-gray-700"

export default function SeoContent() {
    return (
        <section className="max-w-4xl mx-auto px-4 md:px-8 py-8">
            <h2 className={h2Class}>How to Use the AI Token Counter</h2>
            <p className={pClass}>
                Count tokens, estimate API cost, and check context window usage for ChatGPT, Claude, and Gemini in four simple steps:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-gray-600 dark:text-gray-300 mb-4 leading-7">
                <li>
                    <strong>Paste or type your text</strong> into the input box above.
                </li>
                <li>
                    <strong>Select your AI model</strong> from the dropdown (GPT-5.6, Claude Sonnet 5, Gemini 3.1 Pro, and more).
                </li>
                <li>
                    <strong>View your counts instantly</strong>: token count, character count, word count, estimated cost, and context window usage all update as you type — no button click needed.
                </li>
                <li>
                    <strong>Plan ahead</strong> with the Token Budget Planner to see how many requests your monthly budget covers on any model.
                </li>
            </ol>
            <p className={pClass}>
                That&apos;s it. No signup, no rate limits, and no data stored — every calculation, including cost and budget estimates, runs in your browser.
            </p>

            <h2 className={h2Class}>What Is an AI Token Counter?</h2>
            <p className={pClass}>
                An AI token counter is a tool that counts the number of tokens in your prompt before you send it to a model like ChatGPT, Claude, or Gemini — and, increasingly, tells you what that prompt will cost and whether it fits the model&apos;s context window.
            </p>
            <p className={pClass}>
                Tokens are different from words. AI models don&apos;t read text like humans do. They split text into smaller pieces called tokens — a whole word, a fragment of a word, a space, or a punctuation mark. On average, 1,000 words is roughly 750 tokens.
            </p>
            <p className={pClass}>
                Token count matters for two reasons. First, every model has a context window limit — go over it and your prompt gets truncated, loses context, or the request fails outright. Second, API providers bill by the token, so token count is directly tied to your bill. That is why this tool now shows token count, dollar cost, and context window usage together instead of token count alone.
            </p>

            <h2 className={h2Class}>Why Token Count Matters for Your AI Workflow</h2>
            <p className={pClass}>
                Counting tokens isn&apos;t just a technical detail — it directly impacts your results and your wallet. Here is why token budgeting is essential:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 mb-4 leading-7">
                <li>
                    <strong>API cost control</strong> — OpenAI, Anthropic, and Google all charge per token, with input and output priced separately. More tokens, especially output tokens, means a bigger bill.
                </li>
                <li>
                    <strong>Context window management</strong> — most current flagship models (GPT-5.6, Claude Sonnet 5, Claude Opus 4.8, Gemini 3.1 Pro) support around 1M tokens of context, but smaller and older models cap out far lower. Knowing where you stand prevents silent truncation.
                </li>
                <li>
                    <strong>Budget forecasting</strong> — if you know your average prompt size, you can work out roughly how many requests a fixed monthly budget actually buys on each model.
                </li>
                <li>
                    <strong>Prompt optimization</strong> — tighter prompts mean faster responses and lower costs.
                </li>
                <li>
                    <strong>RAG pipelines</strong> — when building retrieval-augmented generation apps, token budgeting is critical for chunking documents correctly.
                </li>
                <li>
                    <strong>Fine-tuning datasets</strong> — token count directly impacts your training cost.
                </li>
            </ul>

            <h2 className={h2Class}>AI Model Pricing and Context Windows (2026)</h2>
            <p className={pClass}>
                Here is a quick reference for current per-token pricing and context windows on the major model families this tool supports. Rates are shown in USD per 1 million tokens, input / output. Providers change these numbers often — the table below and the calculator above both reflect our most recent manual check, but always confirm against the provider&apos;s pricing page before committing a production budget.
            </p>
            <div className="overflow-x-auto mb-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <table className="w-full min-w-[640px] text-left text-sm md:text-base">
                    <thead className="bg-cyan-50 dark:bg-cyan-900/30">
                        <tr>
                            <th className={thClass}>AI Model</th>
                            <th className={thClass}>Context Window</th>
                            <th className={thClass}>Price per 1M Tokens (In / Out)</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 dark:text-gray-300">
                        <tr className={trClass}>
                            <td className={tdClass}>GPT-5.6 Sol</td>
                            <td className={tdClass}>1.05M tokens</td>
                            <td className={tdClass}>$5.00 / $30.00</td>
                        </tr>
                        <tr className={trClass}>
                            <td className={tdClass}>GPT-5.6 Terra</td>
                            <td className={tdClass}>1.05M tokens</td>
                            <td className={tdClass}>$2.50 / $15.00</td>
                        </tr>
                        <tr className={trClass}>
                            <td className={tdClass}>GPT-5.6 Luna</td>
                            <td className={tdClass}>1.05M tokens</td>
                            <td className={tdClass}>$1.00 / $6.00</td>
                        </tr>
                        <tr className={trClass}>
                            <td className={tdClass}>Claude Opus 4.8</td>
                            <td className={tdClass}>1M tokens</td>
                            <td className={tdClass}>$5.00 / $25.00</td>
                        </tr>
                        <tr className={trClass}>
                            <td className={tdClass}>Claude Sonnet 5</td>
                            <td className={tdClass}>1M tokens</td>
                            <td className={tdClass}>$2.00 / $10.00*</td>
                        </tr>
                        <tr className={trClass}>
                            <td className={tdClass}>Claude Haiku 4.5</td>
                            <td className={tdClass}>200K tokens</td>
                            <td className={tdClass}>$1.00 / $5.00</td>
                        </tr>
                        <tr className={trClass}>
                            <td className={tdClass}>Gemini 3.1 Pro</td>
                            <td className={tdClass}>1M tokens</td>
                            <td className={tdClass}>$2.00 / $12.00**</td>
                        </tr>
                        <tr className={trClass}>
                            <td className={tdClass}>Gemini 3.6 Flash</td>
                            <td className={tdClass}>1M tokens</td>
                            <td className={tdClass}>$1.50 / $7.50</td>
                        </tr>
                        <tr className={trClass}>
                            <td className={tdClass}>Gemini 3.5 Flash-Lite</td>
                            <td className={tdClass}>1M tokens</td>
                            <td className={tdClass}>$0.30 / $2.50</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p className={pClass}>
                * Claude Sonnet 5 is priced at an introductory $2.00 / $10.00 per 1M tokens through August 31, 2026; standard pricing of $3.00 / $15.00 begins September 1, 2026. ** Gemini 3.1 Pro rates above apply to prompts up to 200K tokens; longer prompts bill at $4.00 / $18.00 per 1M tokens. Both are handled automatically by the calculator above.
            </p>
            <p className={pClass}>
                <strong>Transparency note:</strong> GPT token counts on this tool are exact — we use the same tiktoken-family tokenizer OpenAI publishes. Claude and Gemini counts are close estimates, because Anthropic and Google do not publish their tokenizers publicly. Cost figures inherit that same precision: GPT cost estimates are exact given current pricing, Claude and Gemini cost estimates are close approximations. No other free token counter tells you this. We do.
            </p>

            <h2 className={h2Class}>How AI Cost Estimation Works</h2>
            <p className={pClass}>
                The Cost Estimator above turns your token count into a dollar figure using each model&apos;s published input and output rate:
            </p>
            <p className={pClass}>
                <code>inputCost = (inputTokens ÷ 1,000,000) × inputPricePerMillion</code>, and the same formula for output tokens, summed for a total. If you haven&apos;t specified an expected response length, we estimate cost on your pasted text as input only — add a short, medium, or long response estimate to see a full round-trip cost.
            </p>
            <p className={pClass}>
                Cost and budget estimates are calculated entirely in your browser from the token counts above — nothing is sent anywhere.
            </p>

            <h2 className={h2Class}>Context Window Usage: Will Your Prompt Fit?</h2>
            <p className={pClass}>
                Context window usage shows what percentage of each model&apos;s total token limit your current text occupies, with a simple color-coded bar: green under 50% used, amber between 50–85%, and red above 85%. If your text exceeds a model&apos;s context window entirely, the tool shows a clear warning instead of a confusing negative number — that model simply can&apos;t process your prompt as-is, and you&apos;ll need to shorten it, chunk it, or switch to a model with a larger window.
            </p>

            <h2 className={h2Class}>Token Budget Planner: How Many Requests Can You Afford?</h2>
            <p className={pClass}>
                Set a monthly budget, your typical input and output tokens per request, and a model, and the planner tells you approximately how many requests that budget covers per month — for example, &quot;At this rate, your budget covers approximately 4,200 requests/month on Claude Sonnet 5.&quot; It&apos;s a quick sanity check before you commit to a model in production, especially useful when comparing cheaper high-volume tiers like GPT-5.6 Luna or Gemini 3.5 Flash-Lite against flagship models.
            </p>

            <h2 className={h2Class}>How Many Tokens Is My Text?</h2>
            <p className={pClass}>
                Here are quick reference benchmarks people search for:
            </p>
            <div className="overflow-x-auto mb-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <table className="w-full min-w-[640px] text-left text-sm md:text-base">
                    <thead className="bg-cyan-50 dark:bg-cyan-900/30">
                        <tr>
                            <th className={thClass}>Text Length</th>
                            <th className={thClass}>Approximate Token Count</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 dark:text-gray-300">
                        <tr className={trClass}>
                            <td className={tdClass}>1 sentence</td>
                            <td className={tdClass}>15–25 tokens</td>
                        </tr>
                        <tr className={trClass}>
                            <td className={tdClass}>1 paragraph (100 words)</td>
                            <td className={tdClass}>70–85 tokens</td>
                        </tr>
                        <tr className={trClass}>
                            <td className={tdClass}>500 words</td>
                            <td className={tdClass}>350–400 tokens</td>
                        </tr>
                        <tr className={trClass}>
                            <td className={tdClass}>1,000 words</td>
                            <td className={tdClass}>700–800 tokens</td>
                        </tr>
                        <tr className={trClass}>
                            <td className={tdClass}>5,000 words</td>
                            <td className={tdClass}>3,500–4,000 tokens</td>
                        </tr>
                        <tr className={trClass}>
                            <td className={tdClass}>10,000 words</td>
                            <td className={tdClass}>7,000–8,000 tokens</td>
                        </tr>
                        <tr className={trClass}>
                            <td className={tdClass}>75,000 words (novel)</td>
                            <td className={tdClass}>~100,000 tokens</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p className={pClass}>
                These numbers vary based on vocabulary, language, and model. English prose tokenizes differently than code, JSON, or non-Latin scripts (Arabic, Chinese, and Japanese use more tokens per character).
            </p>

            <h2 className={h2Class}>Who Should Use an AI Token Counter?</h2>

            <h3 className={h3Class}>Developers & Engineers</h3>
            <p className={pClass}>
                Check prompt size and estimated cost before making API calls. Avoid hitting token limits mid-conversation in multi-turn chat apps. Budget tokens correctly in LangChain, LlamaIndex, or custom RAG pipelines, and use the budget planner to sanity-check a monthly API spend before shipping.
            </p>

            <h3 className={h3Class}>Content Writers & SEO Professionals</h3>
            <p className={pClass}>
                Paste blog posts, articles, or briefs to check length and estimated processing cost before feeding them into ChatGPT or Claude for rewriting. Understand why some prompts get cut off midway. Then run the text through the{" "}
                <Link href="/tools/keyword-density-checker" className={linkClass}>
                    Keyword Density Checker
                </Link>{" "}
                to keep the wording natural.
            </p>

            <h3 className={h3Class}>Prompt Engineers</h3>
            <p className={pClass}>
                Test and trim prompts. Compare the same prompt across different models to see how token counts, cost, and context window usage change. Optimize system prompts to reduce cost at scale.
            </p>

            <h3 className={h3Class}>Students & Researchers</h3>
            <p className={pClass}>
                Check dissertation sections, research papers, or study notes against model input limits before using AI summarization tools. Verify the length with the{" "}
                <Link href="/tools/word-counter" className={linkClass}>
                    Word Counter
                </Link>{" "}
                to ensure your text fits.
            </p>

            <h3 className={h3Class}>Business Teams & Founders Budgeting AI Spend</h3>
            <p className={pClass}>
                Ensure documents, contracts, and reports fit within the context window of your AI assistant before uploading, and use the Token Budget Planner to estimate what a given monthly AI budget realistically covers before signing an API contract.
            </p>

            <h2 className={h2Class}>Your Text Never Leaves Your Browser</h2>
            <p className={pClass}>
                Like every CountFlows tool, the AI Token Counter runs entirely on your device. Your text is never uploaded to a server, never logged, and never stored — and that includes the cost estimate, context window bar, and budget planner, which all run on the token counts already computed in your browser. Paste a confidential report or an unpublished draft, close the tab, and it is gone. There is no word limit, no sign-up wall, and no premium tier.
            </p>

            

            <h2 className={h2Class}>More Free Text Tools</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 leading-7">
                <li>
                    <Link href="/tools/word-counter" className={linkClass}>
                        Word Counter
                    </Link>{" "}
                    - count words, characters, and sentences as you type.
                </li>
                <li>
                    <Link href="/tools/character-counter" className={linkClass}>
                        Character Counter
                    </Link>{" "}
                    - check your cleaned text against platform character limits.
                </li>
                <li>
                    <Link href="/tools/ai-text-cleaner" className={linkClass}>
                        AI Text Cleaner
                    </Link>{" "}
                    - strip markdown, em dashes, and invisible characters from AI output.
                </li>
                <li>
                    <Link href="/tools/keyword-density-checker" className={linkClass}>
                        Keyword Density Checker
                    </Link>{" "}
                    - keep keyword usage natural before you publish.
                </li>
                <li>
                    <Link href="/tools/case-converter" className={linkClass}>
                        Case Converter
                    </Link>{" "}
                    - fix capitalization: sentence case, title case, and more.
                </li>
            </ul>

            <h2 className={h2Class}>Why Use CountFlows&apos; AI Token Counter?</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 mb-4 leading-7">
                <li>
                    <strong>Uses real tiktoken, not estimates</strong> — we use the same tokenizer family OpenAI uses for GPT models, so token counts are highly accurate.
                </li>
                <li>
                    <strong>Cost, not just count</strong> — see estimated dollar cost per model side by side, not just a raw token number.
                </li>
                <li>
                    <strong>Context window checks built in</strong> — instantly see whether your text fits GPT-5.6, Claude Sonnet 5, Gemini 3.1 Pro, and more, with a visual usage bar.
                </li>
                <li>
                    <strong>Budget planning, not just estimating</strong> — the Token Budget Planner converts a monthly dollar budget into an approximate number of requests per model.
                </li>
                <li>
                    <strong>Supports the current model lineup</strong> — GPT-5.6, Claude Sonnet 5 and Opus 4.8, Gemini 3.1 Pro and 3.6 Flash, and more, in one place.
                </li>
                <li>
                    <strong>Runs entirely in your browser, zero data collection</strong> — your text, cost estimates, and budget inputs are never uploaded or stored.
                </li>
                <li>
                    <strong>Free forever, no sign-up or paywall</strong> — use it as often as you need with zero restrictions.
                </li>
                <li>
                    <strong>Honest about accuracy</strong> — we clearly tell you which token counts and cost estimates are exact (GPT) and which are close estimates (Claude, Gemini), and note where pricing has tiers or promotional rates. Other tools won&apos;t.
                </li>
            </ul>
        </section>
    )
}