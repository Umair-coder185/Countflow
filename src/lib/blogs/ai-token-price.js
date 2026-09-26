const millionTokenPrice = `




  <p><strong>Last verified: September 26, 2026.</strong> What changed since this was first published (Aug 25, 2026):</p>
  <ul>
    <li>Claude Opus 4.8 → replaced twice: Opus 5 (Jul 24), then Opus 5.5 (Sep 22) at $4/$20, 20% cheaper than Opus 5</li>
    <li>Claude Sonnet 5's planned Sept 1 price increase to $3/$15 was cancelled — still $2/$10</li>
    <li>Gemini 3.6 Flash dropped from $1.50/$7.50 to an introductory $0.75/$3.75, rising again Jan 1, 2027</li>
  </ul>


<p>AI pricing looks simple until you try to calculate a real bill. Input and output tokens are billed at different rates, and those rates change more often than most guides admit — this page was checked against Anthropic, OpenAI, and Google's own pricing pages on September 26, 2026, not copied from another article. Right now, current-generation models range from $0.20 to $10 per million input tokens and $1.20 to $50 per million output tokens. The model, the direction (input vs. output), and the date you're reading this all decide what you actually pay.</p>

<h2>Quick Answer: What Does 1 Million Tokens Cost?</h2>
<p>There is no single price. Every provider splits input and output pricing, and every model tier has its own rate. GPT-5.6 Luna costs $0.20 per million input tokens and $1.20 for output. Claude Fable 5.1, Anthropic's most capable model, costs $10 for input and $50 for output — 50x more per input token than Luna. The same million tokens can cost a few cents or tens of dollars depending on which model sent the bill.</p>
<p><strong>Quick rule:</strong> never estimate AI cost from token count alone. You need the model, the input volume, and the expected output volume.</p>

<h2>Why Isn't There One AI Token Price?</h2>
<p>Treat tokens like electricity: knowing your usage tells you nothing until you know the rate per unit, and every model has its own rate. Providers split pricing further still — a cached prompt, a batch job, and a live request can cost different amounts for the exact same tokens. That's why a search for "AI token cost" surfaces several different correct-sounding numbers instead of one.</p>

<h2>AI Token Cost Comparison — Verified September 26, 2026</h2>
<table>
<thead>
<tr><th>Model</th><th>Input / MTok</th><th>Output / MTok</th><th>Note</th></tr>
</thead>
<tbody>
<tr><td>GPT-5.6 Luna</td><td>$0.20</td><td>$1.20</td><td>Promotional rate through Nov 21, 2026</td></tr>
<tr><td>GPT-5.6 Terra</td><td>$2.00</td><td>$12.00</td><td>Promotional rate through Nov 21, 2026</td></tr>
<tr><td>GPT-5.6 Sol</td><td>$4.00</td><td>$20.00</td><td>Promotional; standard rate is $5 / $30</td></tr>
<tr><td>Claude Haiku 4.5</td><td>$1.00</td><td>$5.00</td><td>Unchanged since launch</td></tr>
<tr><td>Claude Sonnet 5</td><td>$2.00</td><td>$10.00</td><td>Planned Sept 1 increase to $3/$15 was cancelled</td></tr>
<tr><td>Claude Opus 5.5</td><td>$4.00</td><td>$20.00</td><td>Replaced Opus 5 ($5/$25) on Sept 22, 2026</td></tr>
<tr><td>Claude Fable 5.1</td><td>$10.00</td><td>$50.00</td><td>Frontier tier</td></tr>
<tr><td>Gemini 3.5 Flash-Lite</td><td>$0.30</td><td>$2.50</td><td>Cheapest current Gemini model</td></tr>
<tr><td>Gemini 3.6 Flash</td><td>$0.75</td><td>$3.75</td><td>Introductory; rises to $1.50/$7.50 on Jan 1, 2027</td></tr>
<tr><td>Gemini 3.1 Pro Preview</td><td>$2.00 / $4.00</td><td>$12.00 / $18.00</td><td>Higher rate applies above 200K input tokens</td></tr>
</tbody>
</table>
<p>Sources: <a href="https://platform.claude.com/docs/en/about-claude/pricing">Anthropic pricing</a>, <a href="https://developers.openai.com/api/docs/pricing">OpenAI pricing</a>, and <a href="https://ai.google.dev/gemini-api/docs/pricing">Google Gemini pricing</a>. Confirm current rates before budgeting a production workload — three of these ten prices changed in the last month alone.</p>

<h2>How Much Do OpenAI Tokens Cost?</h2>
<p>OpenAI's GPT-5.6 family ships in three tiers instead of one flat rate. Sol is the flagship at a promotional $4 input / $20 output per MTok (standard rate $5/$30 resumes after November 21). Terra sits in the middle at $2/$12, pitched as GPT-5.5-level performance at roughly half the cost. Luna is the volume tier at $0.20/$1.20 — cheap enough that even careless prompting rarely becomes a real bill.</p>

<h2>How Much Do Claude Tokens Cost?</h2>
<p>Anthropic quietly replaced its mid-flagship model on September 22 — <strong>Claude Opus 5.5</strong> now costs $4 input / $20 output per MTok, 20% cheaper than Opus 5's $5/$25 on both input and output. If a guide you're reading still quotes Opus 5 or Opus 4.8, it's already out of date.</p>
<p>Claude Sonnet 5 stays at its introductory $2/$10 rate — Anthropic had scheduled a jump to $3/$15 for September 1, then cancelled it. Claude Haiku 4.5 remains the cheapest Claude model at $1/$5, and Claude Fable 5.1 sits at the top at $10/$50 for the hardest reasoning tasks.</p>

<h2>How Much Do Gemini Tokens Cost?</h2>
<p>Gemini 3.6 Flash currently costs $0.75 input / $3.75 output per MTok — but that's introductory. Google's own pricing page confirms it doubles to $1.50/$7.50 on January 1, 2027, so anything you build on it now gets meaningfully pricier in a few months unless you re-check then. Gemini 3.5 Flash-Lite is the budget option at $0.30/$2.50, and Gemini 3.1 Pro Preview charges $2/$12 for prompts at or under 200K tokens, jumping to $4/$18 above that — one of the few models here where prompt length itself changes your rate.</p>

<h2>Which Model Would We Actually Use?</h2>
<p>Prices alone don't tell you what to pick. For most production apps as of this update, Claude Sonnet 5 at $2/$10 is the best cost-to-capability tradeoff we'd reach for first — it's priced like a mid-tier model but benchmarks closer to what used to require a flagship. Reserve Claude Opus 5.5 or GPT-5.6 Sol for tasks where Sonnet's output needs a manual rework pass; if you're not seeing that, you're likely overpaying. For high-volume, low-stakes work — classification, tagging, routing — GPT-5.6 Luna's $0.20 input rate is hard to beat on pure economics, though Gemini 3.5 Flash-Lite is worth benchmarking against it for your specific task before committing.</p>
<h2>7 Worked Cost Examples</h2>
<table>
<thead><tr><th>Workload</th><th>Model</th><th>Tokens (in/out)</th><th>Estimated cost</th></tr></thead>
<tbody>
<tr><td>Customer support reply bot, 10K conversations/mo</td><td>GPT-5.6 Luna</td><td>5M in / 2M out</td><td>$1.00 + $2.40 = $3.40</td></tr>
<tr><td>Daily blog post generation</td><td>Claude Sonnet 5</td><td>3K in / 1.5K out</td><td>$0.006 + $0.015 = $0.021/post</td></tr>
<tr><td>Codebase refactor session</td><td>Claude Opus 5.5</td><td>150K in / 8K out</td><td>$0.60 + $0.16 = $0.76</td></tr>
<tr><td>Research agent, long documents</td><td>Gemini 3.1 Pro (&gt;200K)</td><td>250K in / 10K out</td><td>$1.00 + $0.18 = $1.18</td></tr>
<tr><td>High-volume data tagging, 1M rows</td><td>Gemini 3.5 Flash-Lite</td><td>50M in / 5M out</td><td>$15.00 + $12.50 = $27.50</td></tr>
<tr><td>Monthly chatbot at scale</td><td>GPT-5.6 Terra</td><td>20M in / 5M out</td><td>$40.00 + $60.00 = $100.00</td></tr>
<tr><td>Frontier reasoning task, one-off</td><td>Claude Fable 5.1</td><td>20K in / 5K out</td><td>$0.20 + $0.25 = $0.45</td></tr>
</tbody>
</table>
<p>These are calculated at list-price rates above — not pulled from an actual invoice. Your real bill will differ once caching, retries, and system-prompt overhead are factored in.</p>

<h2>How Caching Cuts Your Bill</h2>
<p>Every provider here discounts repeated input. Claude Opus 5.5 cache reads run about $0.20 per MTok against a $4 base input rate — roughly a 95% discount on anything reused, like a long system prompt or reference document. OpenAI's GPT-5.6 tiers price cached input at 80–90% off standard, and Gemini's context caching works the same way plus an hourly storage fee for keeping the cache warm. If your app resends the same instructions or documents on every call, caching is the biggest lever you're not pulling.</p>

<h2>How to Calculate Your Blended Rate</h2>
<p><code>Input cost = input tokens ÷ 1,000,000 × input rate</code><br><code>Output cost = output tokens ÷ 1,000,000 × output rate</code></p>
<p>Example: an app sending 5 million input tokens and 1 million output tokens through Claude Sonnet 5 in a month pays 5 × $2 = $10 for input and 1 × $10 = $10 for output — $20 total, even though output is only a sixth of the volume. That pattern holds across nearly every model here: output tokens typically cost 5x input tokens, so long generated answers get expensive fast even with modest prompts.</p>

<h2>Frequently Asked Questions</h2>
<h3>How much does 1 million tokens cost right now?</h3>
<p>Between $0.20 and $10 for input, and $1.20 to $50 for output, depending on the model. See the comparison table above for exact current rates.</p>
<h3>What happened to Claude Opus 5?</h3>
<p>Anthropic replaced it with Claude Opus 5.5 on September 22, 2026, at a 20% lower rate ($4/$20 vs. $5/$25) — the same pattern Anthropic has followed with every Opus refresh.</p>
<h3>Is Claude Sonnet 5 still $2 per million input tokens?</h3>
<p>Yes. Anthropic had planned to raise it to $3/$15 on September 1, 2026, but cancelled that increase.</p>
<h3>Will Gemini 3.6 Flash get more expensive?</h3>
<p>Yes — its $0.75/$3.75 rate is introductory and doubles to $1.50/$7.50 on January 1, 2027, per Google's own pricing page.</p>
<h3>What's the fastest way to cut my AI token bill this month?</h3>
<p>Turn on prompt caching for anything you send repeatedly (system prompts, reference docs), switch high-volume low-stakes tasks to the cheapest tier your provider offers, and check whether your workload's output length — not its prompt length — is what's actually driving the bill.</p>

<h2>Final Takeaway</h2>
<p>Model pricing in this space now shifts every few weeks — three of the ten models in this guide changed price in the last month. Check the model's current rate directly before budgeting a project, and pull your real prompt and response sizes into the <a href="https://countflows.com/tools/ai-token-counter">AI Token Counter &amp; Cost Calculator</a> instead of estimating from a price card alone.</p>
`
export default millionTokenPrice;