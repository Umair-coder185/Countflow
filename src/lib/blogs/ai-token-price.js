const millionTokenPrice = `


<article>
  

  <p>
    AI pricing looks simple until you try to calculate a real bill. You see a price per million tokens, but input and output often have very different rates. So, how much does 1 million tokens cost? Among the current GPT, Claude, and Gemini models compared below, standard or current promotional rates range from $0.20 to $5 for input and $1.20 to $25 for output. The model and type of usage decide what you actually pay.
  </p>

  <nav aria-label="Table of contents">
    <h2>Table of Contents</h2>
    <ol>
      <li><a href="#quick-answer">Quick answer</a></li>
      <li><a href="#no-single-token-price">Why there is no single token price</a></li>
      <li><a href="#current-ai-token-cost-comparison">Current AI token cost comparison</a></li>
      <li><a href="#openai-token-pricing">OpenAI token pricing</a></li>
      <li><a href="#claude-token-pricing">Claude token pricing</a></li>
      <li><a href="#gemini-token-pricing">Gemini token pricing</a></li>
      <li><a href="#input-vs-output-cost">Input vs output cost</a></li>
      <li><a href="#caching-reduce-spending">How caching can reduce spending</a></li>
      <li><a href="#what-token-amount-represents">What this token amount represents</a></li>
      <li><a href="#calculate-real-api-bill">How to calculate your real API bill</a></li>
      <li><a href="#when-to-use-calculator">When to use a token price calculator</a></li>
      <li><a href="#frequently-asked-questions">Frequently asked questions</a></li>
    </ol>
  </nav>

  <section>
    <h2 id="quick-answer">Quick Answer: What Does This Amount Cost?</h2>

    <p>
      There isn't one universal price for a million AI tokens. Providers charge different rates for each model, and they usually separate input tokens from output tokens. The text you send counts as input, while the model's response counts as output.
    </p>

    <p>
      For example, GPT-5.6 Luna currently costs $0.20 per MTok for input and $1.20 for output. Claude Opus 4.8 costs $5 for input and $25 for output. That means the same token volume can have a very different price depending on the model and direction.
    </p>

  <p class="my-6 rounded-lg border-l-4 border-blue-600 bg-blue-50 px-5 py-4 leading-7 text-blue-950 shadow-sm">
  <strong class="text-blue-700">Quick rule:</strong>
  Never calculate AI cost from token quantity alone. You need the model, input amount, and expected output amount.
</p>
  </section>

  <section>
    <h2 id="no-single-token-price">Why Isn't There One AI Token Price?</h2>

    <p>
      Think of tokens like electricity usage. Knowing how many units you consume isn't enough until you know the price charged for each unit. AI APIs work in a similar way because every model has its own token pricing.
    </p>

    <p>
      Moreover, providers may offer several rates for the same model. Regular prompt usage, cached prompts, long-context requests, batch processing, and output generation can all carry different prices. That is why a simple search for AI token cost often produces several correct answers instead of one fixed number.
    </p>
  </section>

  <section>
    <h2 id="current-ai-token-cost-comparison">AI Token Cost Comparison for 2026</h2>

    <p>
      The table below uses current provider pricing checked on August 25, 2026. It focuses on text pricing for models relevant to the CountFlows calculator.
    </p>

    <table>
      <thead>
        <tr>
          <th scope="col">Model</th>
          <th scope="col">Input / MTok</th>
          <th scope="col">Output / MTok</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>GPT-5.6 Sol</td>
          <td>$4.00<sup>*</sup></td>
          <td>$20.00<sup>*</sup></td>
        </tr>
        <tr>
          <td>GPT-5.6 Terra</td>
          <td>$2.00</td>
          <td>$12.00</td>
        </tr>
        <tr>
          <td>GPT-5.6 Luna</td>
          <td>$0.20</td>
          <td>$1.20</td>
        </tr>
        <tr>
          <td>Claude Opus 4.8</td>
          <td>$5.00</td>
          <td>$25.00</td>
        </tr>
        <tr>
          <td>Claude Sonnet 5</td>
          <td>$2.00<sup>**</sup></td>
          <td>$10.00<sup>**</sup></td>
        </tr>
        <tr>
          <td>Claude Haiku 4.5</td>
          <td>$1.00</td>
          <td>$5.00</td>
        </tr>
        <tr>
          <td>Gemini 3.6 Flash</td>
          <td>$1.50</td>
          <td>$7.50</td>
        </tr>
        <tr>
          <td>Gemini 3.5 Flash-Lite</td>
          <td>$0.30</td>
          <td>$2.50</td>
        </tr>
        <tr>
          <td>Gemini 3.1 Pro Preview</td>
          <td>$2.00<sup>***</sup></td>
          <td>$12.00<sup>***</sup></td>
        </tr>
      </tbody>
    </table>

    <p>
      <small>
        * OpenAI currently describes GPT-5.6 Sol's $4 / $20 rate as promotional pricing, available at least through November 21, 2026.
      </small>
    </p>

    <p>
      <small>
        ** Claude Sonnet 5 introductory pricing of $2 / $10 applies through August 31, 2026. Anthropic lists $3 / $15 starting September 1.
      </small>
    </p>

    <p>
      <small>
        *** Gemini 3.1 Pro Preview charges $2 input and $12 output for prompts up to 200K tokens. Google lists higher rates above that threshold.
      </small>
    </p>

    <p>
      For the latest provider rates, check the official
      <a href="https://developers.openai.com/api/docs/models/compare?utm_source=chatgpt.com" target="_blank" rel="noopener noreferrer">OpenAI model pricing</a>,
      <a href="https://platform.claude.com/docs/en/about-claude/pricing?utm_source=chatgpt.com" target="_blank" rel="noopener noreferrer">Anthropic pricing documentation</a>,
      and
      <a href="https://ai.google.dev/gemini-api/docs/pricing?utm_source=chatgpt.com" target="_blank" rel="noopener noreferrer">Google Gemini API pricing</a>
      before making a production budget.
    </p>
  </section>

  <section>
    <h2 id="openai-token-pricing">How Much Do OpenAI Tokens Cost?</h2>

    <p>
      OpenAI's GPT-5.6 family shows how wide pricing can become within one provider. GPT-5.6 Sol currently lists $4 per MTok for prompt usage and $20 per MTok for generated responses. Terra drops those rates to $2 and $12, while Luna costs $0.20 and $1.20.
    </p>

    <p>
      Choosing between them isn't only about finding the lowest number. A cheaper model may suit high-volume, simple work, while a stronger model may handle a difficult task more effectively. Use the
      <a href="https://countflows.com/tools/ai-token-counter" target="_blank" rel="noopener noreferrer">AI Token Counter &amp; Cost Calculator</a>
      to compare your own prompt and response usage rather than relying on list prices alone.
    </p>
  </section>

  <section>
    <h2 id="claude-token-pricing">How Much Do Claude Tokens Cost?</h2>

    <p>
      Anthropic also separates model tiers clearly. Claude Opus 4.8 currently costs $5 per MTok for prompt usage and $25 per MTok for generated responses. Claude Haiku 4.5 costs $1 and $5, making its raw token rate much lower.
    </p>

    <p>
      Claude Sonnet 5 needs extra attention right now. Its introductory rate is $2 for input and $10 for output through August 31, 2026. Anthropic says the standard rate becomes $3 and $15 from September 1, so an article or calculator that stores pricing should account for that scheduled change.
    </p>
  </section>

  <section>
    <h2 id="gemini-token-pricing">How Much Do Gemini Tokens Cost?</h2>

    <p>
      Google's Gemini pricing also changes by model and processing mode. Gemini 3.6 Flash Standard currently lists a rate of $1.50 per MTok for prompt usage and $7.50 per MTok for generated responses. Its Batch rate is lower at $0.75 and $3.75.
    </p>

    <p>
      Gemini 3.1 Pro Preview adds another factor: prompt length. Google lists $2 per MTok for prompt usage and $12 per MTok for generated responses when prompts stay at or below 200K tokens. Above that level, the rates rise to $4 and $18 respectively. Once the prompt exceeds 200K tokens, context size becomes relevant to cost, not only to whether your prompt fits.
    </p>
  </section>

  <section>
    <h2 id="input-vs-output-cost">Input Tokens vs Output Tokens: Why the Difference Matters</h2>

    <p>
      Input tokens include the content you send to the model. This can include your prompt, system instructions, chat history, retrieved documents, or other context. Output tokens cover the text the model generates in response.
    </p>

    <p>
      Output often costs considerably more in the models shown above. For GPT-5.6 Terra, one MTok of input costs $2 while the same amount of output costs $12. A workload with short prompts and long generated reports can therefore cost much more than one with long prompts and short answers.
    </p>

    <h3>A Simple Cost Example</h3>

    <p>Suppose one month of API usage includes:</p>

    <ul>
      <li>5 million input tokens.</li>
      <li>1 million output tokens.</li>
      <li>GPT-5.6 Terra.</li>
      <li>$2 input rate.</li>
      <li>$12 output rate.</li>
    </ul>

    <p>The calculation is:</p>

    <ul>
      <li>Input: 5 × $2 = $10.</li>
      <li>Output: 1 × $12 = $12.</li>
      <li>Estimated total = $22.</li>
    </ul>

    <p>
      Notice that output represents only one sixth of the token usage, yet it contributes more than half of the estimated bill.
    </p>
  </section>

  <section>
    <h2 id="caching-reduce-spending">Can Cached Tokens Reduce the Cost?</h2>

    <p>
      Yes, when a provider and model support cheaper cached input. Caching can help when you repeatedly send the same system prompt, instructions, large reference document, or other reusable context.
    </p>

    <p>
      For example, OpenAI currently lists GPT-5.6 Sol cached prompt usage at $0.40 per MTok, compared with $4 per MTok for regular prompt usage. Anthropic lists Claude Opus 4.8 cache hits at $0.50 compared with a $5 base input rate. The exact caching rules matter, so don't assume every repeated prompt automatically receives the lower rate.
    </p>
  </section>

  <section>
    <h2 id="what-token-amount-represents">What Does This Token Volume Represent in Words?</h2>

    <p>
      Cost becomes easier to understand when you can picture the amount of text. For normal English, one million token units are roughly equal to 750,000 words using the common planning estimate of about 0.75 words per token.
    </p>

    <p>
      If you want the full conversion into words, pages, characters, and code, see the
      <a href="https://countflows.com/blog/1-million-tokens-to-words" target="_blank" rel="noopener noreferrer">1 million tokens to words guide</a>.
      For the reverse calculation, the
      <a href="https://countflows.com/blog/how-many-tokens-is-1000-words" target="_blank" rel="noopener noreferrer">1,000 words to tokens guide</a>
      explains why 1,000 English words often produce roughly 1,300 to 1,500 AI tokens.
    </p>
  </section>

  <section>
    <h2 id="calculate-real-api-bill">How to Calculate Your Real AI API Cost</h2>

    <p>The basic formula is simple:</p>

    <p>
      <code>Input cost = input tokens ÷ 1,000,000 × input rate</code>
    </p>

    <p>
      <code>Output cost = output tokens ÷ 1,000,000 × output rate</code>
    </p>

    <p>Then add both results.</p>

    <p>
      For example, imagine one request uses 2,000 input tokens and produces 500 output tokens. If the selected model charges $2 per MTok for input and $10 for output, the request costs about:
    </p>

    <ul>
      <li>Input: 2,000 ÷ 1,000,000 × $2 = $0.004.</li>
      <li>Output: 500 ÷ 1,000,000 × $10 = $0.005.</li>
      <li>Total = $0.009.</li>
    </ul>

    <p>
      One request looks inexpensive. At 100,000 similar requests, however, the same pattern would reach roughly $900 before considering caching, tools, search calls, or other provider charges.
    </p>
  </section>

  <section>
    <h2 id="when-to-use-calculator">When Should You Use a Token Price Calculator?</h2>

    <p>
      Manual math works when you only want to check one simple example. A token price calculator becomes more useful when you need to compare several models, change response length, check context usage, or estimate a monthly workload.
    </p>

    <p>
      Instead of guessing from the price card, paste your real prompt into the
      <a href="https://countflows.com/tools/ai-token-counter" target="_blank" rel="noopener noreferrer">CountFlows calculator</a>.
      You can estimate its token size, select a supported model, add expected output, and compare the likely cost before sending the request.
    </p>

    <p>
      <strong>Best rule:</strong> Use provider prices for verification and your real workload for budgeting.
    </p>
  </section>

  <section>
    <h2 id="frequently-asked-questions">Frequently Asked Questions</h2>

    <h3>How much does 1 million tokens cost?</h3>

    <p>
      There is no single price. Among the current GPT, Claude, and Gemini models compared here, input rates range from $0.20 to $5 per MTok and output rates range from $1.20 to $25.
    </p>

    <h3>How much does OpenAI charge for this amount?</h3>

    <p>
      It depends on the GPT model. Current GPT-5.6 rates range widely, with Luna at $0.20 input and $1.20 output, while Sol currently lists promotional rates of $4 and $20.
    </p>

    <h3>What is the Claude cost per MTok?</h3>

    <p>
      Claude pricing depends on the model. Opus 4.8 currently lists $5 input and $25 output, while Haiku 4.5 lists $1 and $5.
    </p>

    <h3>What does Gemini charge per MTok?</h3>

    <p>
      Gemini prices vary by model and processing mode. Gemini 3.6 Flash Standard currently lists $1.50 input and $7.50 output, while Batch processing costs less.
    </p>

    <h3>Are prompt and response tokens charged at the same rate?</h3>

    <p>
      Usually not for the models covered here. Output is generally more expensive, so response length can have a large effect on the final API bill.
    </p>

    <h3>Does ChatGPT Plus include API token usage?</h3>

    <p>
      ChatGPT subscriptions and API usage are separate products. API costs depend on the model and metered usage rather than your ChatGPT subscription.
    </p>

    <h3>Is an AI token cost calculator exact?</h3>

    <p>
      It provides an estimate based on token counts and configured pricing. Your provider's final usage record and invoice remain the authoritative billing source.
    </p>
  </section>

  <section>
    <h2 id="final-takeaway">Final Takeaway</h2>

    <p>
      The answer to how much does 1 million tokens cost depends mainly on the model and the balance between prompt usage and generated responses. Current major-model rates differ enough that choosing a model can change the bill substantially.
    </p>

    <p>
      Caching, long prompts, batch processing, and response length can change the calculation further. That is why a single “price per million” number doesn't describe a real production workload very well.
    </p>

    <p>
      Before budgeting an application, measure the actual prompt and expected response. Then compare those numbers in the
      <a href="https://countflows.com/tools/ai-token-counter" target="_blank" rel="noopener noreferrer">AI Token Counter &amp; Cost Calculator</a>
      against current official provider pricing.
    </p>
  </section>
</article>

`

export default millionTokenPrice;