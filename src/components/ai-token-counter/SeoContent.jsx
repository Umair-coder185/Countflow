import Link from "next/link"

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
            <p className={pClass}>You can count tokens for ChatGPT, Claude, and Gemini in three simple steps:</p>
            <ol className="list-decimal pl-6 space-y-2 text-gray-600 dark:text-gray-300 mb-4 leading-7">
                <li>
                    <strong>Paste or type your text</strong> into the input box above.
                </li>
                <li>
                    <strong>Select your AI model</strong> from the dropdown (GPT-4o, GPT-3.5, Claude 3, Gemini, etc.).
                </li>
                <li>
                    <strong>View your counts instantly</strong>: your token count, character count, and word count appear automatically — no button click needed.
                </li>
            </ol>
            <p className={pClass}>
                That&apos;s it. No signup, no rate limits, and no data stored.
            </p>

            <h2 className={h2Class}>What Is an AI Token Counter?</h2>
            <p className={pClass}>
                An AI token counter is a tool which counts the number of tokens in your prompt before submitting it to an AI model such as ChatGPT, Claude, or Gemini.
            </p>
            <p className={pClass}>
                Tokens are different from words. AI models don&apos;t read text like humans. They split text into smaller pieces known as tokens. Tokens may be a whole word, a fragment of a word, a space, or even a punctuation mark. On average, 1,000 words is equivalent to roughly 750 tokens.
            </p>
            <p className={pClass}>
                Why does this matter? Each artificial intelligence model comes with a token limit. If your prompt goes beyond the token limit, the model will either truncate your text, lose context, or return an error. It is always important to know how many tokens you have.
            </p>

            <h2 className={h2Class}>Why Token Count Matters for Your AI Workflow</h2>
            <p className={pClass}>
                Counting tokens isn&apos;t just a technical detail—it directly impacts your results and your wallet. Here is why token budgeting is essential:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 mb-4 leading-7">
                <li>
                    <strong>API cost control</strong> — OpenAI, Anthropic, and Google charge per token. More tokens equals a higher bill.
                </li>
                <li>
                    <strong>Context window management</strong> — GPT-4o has a 128K context limit. Claude 3.5 Sonnet supports 200K. Gemini 1.5 Pro goes up to 1M. Knowing where you stand prevents silent truncation.
                </li>
                <li>
                    <strong>Prompt optimization</strong> — Tighter prompts lead to faster responses and lower costs.
                </li>
                <li>
                    <strong>RAG pipelines</strong> — When building retrieval-augmented generation apps, token budgeting is critical for chunking documents correctly.
                </li>
                <li>
                    <strong>Fine-tuning datasets</strong> — Token count directly impacts your training cost.
                </li>
            </ul>

            <h2 className={h2Class}>Token Limits by AI Model</h2>
            <p className={pClass}>
                Here is a quick reference for the context windows and tokenization methods used by major AI models.
            </p>
            <div className="overflow-x-auto mb-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <table className="w-full min-w-[640px] text-left text-sm md:text-base">
                    <thead className="bg-cyan-50 dark:bg-cyan-900/30">
                        <tr>
                            <th className={thClass}>AI Model</th>
                            <th className={thClass}>Context Window</th>
                            <th className={thClass}>Tokenizer</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 dark:text-gray-300">
                        <tr className={trClass}>
                            <td className={tdClass}>GPT-4o</td>
                            <td className={tdClass}>128,000 tokens</td>
                            <td className={tdClass}>cl100k_base (exact)</td>
                        </tr>
                        <tr className={trClass}>
                            <td className={tdClass}>GPT-4 Turbo</td>
                            <td className={tdClass}>128,000 tokens</td>
                            <td className={tdClass}>cl100k_base (exact)</td>
                        </tr>
                        <tr className={trClass}>
                            <td className={tdClass}>GPT-3.5 Turbo</td>
                            <td className={tdClass}>16,385 tokens</td>
                            <td className={tdClass}>cl100k_base (exact)</td>
                        </tr>
                        <tr className={trClass}>
                            <td className={tdClass}>Claude 3.5 Sonnet</td>
                            <td className={tdClass}>200,000 tokens</td>
                            <td className={tdClass}>Estimated</td>
                        </tr>
                        <tr className={trClass}>
                            <td className={tdClass}>Claude 3 Opus</td>
                            <td className={tdClass}>200,000 tokens</td>
                            <td className={tdClass}>Estimated</td>
                        </tr>
                        <tr className={trClass}>
                            <td className={tdClass}>Gemini 1.5 Pro</td>
                            <td className={tdClass}>1,000,000 tokens</td>
                            <td className={tdClass}>Estimated</td>
                        </tr>
                        <tr className={trClass}>
                            <td className={tdClass}>Gemini 1.5 Flash</td>
                            <td className={tdClass}>1,000,000 tokens</td>
                            <td className={tdClass}>Estimated</td>
                        </tr>
                        <tr className={trClass}>
                            <td className={tdClass}>Llama 3 (70B)</td>
                            <td className={tdClass}>8,192 tokens</td>
                            <td className={tdClass}>Estimated</td>
                        </tr>
                        <tr className={trClass}>
                            <td className={tdClass}>Mistral Large</td>
                            <td className={tdClass}>32,000 tokens</td>
                            <td className={tdClass}>Estimated</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <p className={pClass}>
                <strong>Transparency note:</strong> GPT token counts on this tool are exact — we use the same tiktoken tokenizer that OpenAI uses. Claude and Gemini counts are close estimates, because Anthropic and Google do not publish their tokenizers publicly. No other free token counter tells you this. We do.
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
                Check prompt size before making API calls. Avoid hitting token limits mid-conversation in multi-turn chat apps. Budget tokens correctly in LangChain, LlamaIndex, or custom RAG pipelines.
            </p>

            <h3 className={h3Class}>Content Writers & SEO Professionals</h3>
            <p className={pClass}>
                Paste blog posts, articles, or briefs to check length before feeding them into ChatGPT or Claude for rewriting. Understand why some prompts get cut off midway. Then run the text through the{" "}
                <Link href="/tools/keyword-density-checker" className={linkClass}>
                    Keyword Density Checker
                </Link>{" "}
                to keep the wording natural.
            </p>

            <h3 className={h3Class}>Prompt Engineers</h3>
            <p className={pClass}>
                Test and trim prompts. Compare the same prompt across different models to see how token counts change. Optimize system prompts to reduce cost at scale.
            </p>

            <h3 className={h3Class}>Students & Researchers</h3>
            <p className={pClass}>
                Check dissertation sections, research papers, or study notes against model input limits before using AI summarization tools. Verify the length with the{" "}
                <Link href="/tools/word-counter" className={linkClass}>
                    Word Counter
                </Link>{" "}
                to ensure your text fits.
            </p>

            <h3 className={h3Class}>Business Teams Using AI Tools</h3>
            <p className={pClass}>
                Ensure documents, contracts, and reports fit within the context window of your AI assistant before uploading.
            </p>

            <h2 className={h2Class}>Your Text Never Leaves Your Browser</h2>
            <p className={pClass}>
                Like every CountFlows tool, the AI Token Counter runs entirely on your device. Your text is never uploaded to a server, never logged, and never stored. Paste a confidential report or an unpublished draft; close the tab, and it is gone. There is no word limit, no sign-up wall, and no premium tier.
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


            <h2 className={h2Class}>Why Use Countflows AI Token Counter?</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 mb-4 leading-7">
                <li>
                    <strong>Uses real tiktoken, not estimates</strong> — We use the exact same tokenizer OpenAI uses for GPT models, ensuring your token counts are 100% accurate.
                </li>
                <li>
                    <strong>Supports 10+ models</strong> — Count tokens for GPT-4o, Claude 3.5, Gemini 1.5, Llama 3, Mistral, and more in one place.
                </li>
                <li>
                    <strong>Counts tokens, words, and characters simultaneously</strong> — See all your metrics at a glance without needing separate tools.
                </li>
                <li>
                    <strong>Runs entirely in your browser, zero data collection</strong> — Your text is never uploaded or stored. It stays securely on your device.
                </li>
                <li>
                    <strong>Free forever, no sign-up or paywall</strong> — Use it as often as you need with zero restrictions.
                </li>
                <li>
                    <strong>Honest about accuracy</strong> — We clearly tell you which counts are exact (GPT) and which are close estimates (Claude, Gemini) because other tools won't.
                </li>
            </ul>
        </section>
    )
}