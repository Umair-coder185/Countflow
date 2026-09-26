const syllableCounter = `
<article>
  <p>
    Ask ChatGPT to generate a haiku, and you'll get three lines without any delay whatsoever. Ask it to verify its own syllables, and it will often confidently assure you that everything is fine. Usually, it isn't. Count it yourself: you might find four syllables in the first line and six in the last—not a 5-7-5 pattern at all.
  </p>

  <p>
    This is not a bug that was silently fixed in the last update. This is still happening across all major chatbots, and it is something so specific that you can figure out the root cause in less than a minute. It is not about the model being "dumb." Once you understand why Large Language Models (LLMs) struggle with this, it only takes thirty seconds to fix the output rather than engaging in a pointless back-and-forth prompt battle.
  </p>

  <section>
    <h2>People Have Been Noticing This for Years</h2>

    <p>
      Writers and developers have been flagging this issue since the early days of GPT-3, and newer models haven't really closed the gap. Ask for a haiku about any topic and count it by hand. You'll get 4-6-5 more often than you'd think. Sometimes 7-7-5. The model almost never flags its own miss.
    </p>

    <p>
      What throws people off is the confidence. The exact same chatbot that can explain the 5-7-5 structure in textbook detail, define a syllable correctly, and even bring up Japanese poetic tradition unprompted, will then write a haiku that violates its own explanation—and defend the count when you push back on it.
    </p>

    <p>
      There are hard numbers behind this, not just anecdotes. One developer ran a chatbot through ten separate haiku prompts and got a correct 5-7-5 pattern only 4 out of 10 times—under 50% accuracy—from a model that recited the rule perfectly on every single attempt (<a href="https://www.fermyon.com/blog/can-we-put-the-ai-in-haiku" target="_blank" rel="noopener noreferrer">Akamai Functions</a>). <a href="https://www.forbes.com/sites/evaamsen/2022/12/06/ai-haikus-are-getting-betterat-least-in-japanese/" target="_blank" rel="noopener noreferrer">Forbes</a> tested a different chatbot and hit the exact same wall: a flawless definition of 5-7-5, followed by a generated poem that actually scanned as 4-7-6.
    </p>
  </section>

  <section>
    <h2>Why Do Large Language Models (LLMs) Struggle to Count Syllables?</h2>

    <p>
      Here is the part most technical explanations skip. AI chatbots don't read letters, and they don't hear sounds. Your text gets chopped into <strong>tokens</strong> before the model ever "sees" it—chunks that might be a whole word, a fragment of one, or just a handful of letters. 
    </p>

    <p>
      The model never encounters "b-e-a-u-t-i-f-u-l" spelled out, and it never hears "beau-ti-ful" spoken out loud. It sees a short string of numbers standing in for compressed text pieces like "beaut" and "iful." Whatever shape those token pieces happen to take has absolutely nothing to do with where the actual phonetic syllable breaks fall.
    </p>

    <p>
      Because it's counting tokens rather than literal words or sounds, it can misestimate or "think" it has counted correctly even when it hasn't. Syllables belong to the realm of human sound. Tokens belong to the realm of text compression. Nobody designed those two distinct systems to line up, so they mostly don't.
    </p>

    <p>
      This means a chatbot writing a haiku isn't counting anything at all. It is pattern-matching against thousands of haiku-shaped examples from its training data and producing something that <em>looks</em> right—three short lines, seasonal imagery, a familiar rhythm—without ever verifying the phonetic count underneath. It can recite the rule because the rule is a memorized text fact. It can't apply the rule because applying it means counting sound waves the architecture literally cannot hear.
    </p>
  </section>

  <section>
    <h2>Why Can't LLMs Count the "R" in Strawberry? (The Letter Problem)</h2>

    <p>
      If you've spent any time on AI forums recently, you've likely seen the viral prompts asking: <em>"Why can't AI count letters in words?"</em> or specifically, <em>"Why can't LLMs count the 'r' in strawberry?"</em>
    </p>

    <p>
      This viral glitch shares the exact same root cause as the syllable problem. The word "strawberry" might arrive at the LLM's processing center as just two tokens (e.g., "straw" and "berry") rather than ten separate characters. Counting individual letters or identifying specific characters inside a compressed token isn't something the model was ever built to do natively. Just like it struggles to count the letter "r," it struggles to count syllables, and it struggles to count to 100 without losing its place.
    </p>
  </section>

  <section>
    <h2>AI-Generated Text Doesn't Always Miscount. Sometimes It Skips a Syllable Entirely</h2>

    <p>
      Miscalculating the sum is the most frequent error. But there is also another type. Scan AI-created poems carefully, and you will sometimes find an individual word where the calculation of syllables fails completely. 
    </p>
    
    <p>
      For example, "different" is supposed to have three syllables, but the algorithm might calculate it as having two. Names such as "ChatGPT" often get miscalculated by an entire syllable. The underlying reason remains the same: the model is guessing at the shape of a word it has never technically heard spoken, so it skips a syllable about as easily as it adds an extra one. Either direction, the fix doesn't change: you must check the line yourself.
    </p>
  </section>

  <section>
    <h2>Why Your Brain Does This Instantly (and AI Doesn't)</h2>

    <p>
      Say "banana" out loud right now. You will feel three distinct beats without trying to count anything—your jaw drops once per syllable, almost on autopilot. Your brain processes human speech as sound first. Every syllable centers on a vowel sound, and your ear tracks those beats the same effortless way you would count hand claps or drumbeats.
    </p>

    <p>
      AI has no ear. It has never heard "banana" spoken in its entire existence. It only ever sees a mathematical token standing in for the word. That is the entire gap, explained in one sentence: <strong>Your brain counts syllables as sound, AI counts tokens as text compression, and nobody built those two systems to agree.</strong>
    </p>
  </section>

  <section>
    <h2>It's Not Just Haikus: AI Gets Song Lyrics Wrong Too</h2>

    <p>
      The same token blind spot shows up wherever syllable count truly matters—song lyrics, rap verses, sonnets, and limericks. Ask a chatbot for a verse that fits a specific melody, and you will often get lines that read beautifully on the page but refuse to scan when actually sung. One line runs long. The next comes up short. The stress lands in the wrong spot relative to the musical beat.
    </p>

    <p>
      For songwriters, this bites much harder than it sounds. A haiku that is one syllable off is a curiosity you laugh at. A verse that is one syllable off just doesn't sit on the melody, and you usually don't find that out until you are actually trying to sing it in the vocal booth.
    </p>
  </section>

  <section>
    <h2>Why Is AI So Bad at Word Count?</h2>

    <p>
      Another frequent frustration is when users ask a chatbot for a 500-word essay, and it delivers 350 words or 800 words instead. <em>Why is AI so bad at word count?</em>
    </p>
    
    <p>
      Again, it comes back to tokens. Chatbots like ChatGPT or Claude predict the next most likely token. They do not have an internal word counter checking the total output in real-time as they generate text. They know roughly what a "short" response versus a "long" response looks like based on token limits, but they cannot inherently guarantee an exact 500-word deliverable.
    </p>
  </section>

  <section>
    <h2>The Solution: Use a Real AI Syllable Counter</h2>

    <p>
      Since the chatbot cannot grade its own phonetic work reliably, you must count it separately. You need to do this outside the chat window, using a tool built to count actual sounds instead of guessing at tokenized text patterns.
    </p>

    <p>
      Paste the generated haiku or lyric into our free <a href="/tools/syllable-counter">Syllable Counter</a> and switch on Haiku mode. Each line gets its own live count verified against the 5-7-5 structure, turning green the second it actually fits. Even if you don't have a strict target, the per-line breakdown shows exactly where a line runs long or short, ensuring you are working from real phonetic numbers instead of the model's hallucinated word for it.
    </p>

    <p>
      Asking the chatbot, <em>"Are you sure that's exactly 5-7-5?"</em> rarely helps. You are asking a tool that fundamentally cannot count syllables to grade its own syllable count. An outside, deterministic counter is the only thing that actually breaks that hallucination loop.
    </p>
  </section>

  <section>
    <h2>How to Fix an AI-Generated Haiku, Line by Line</h2>

    <p>
      Once you know which line is off, fixing it is a small edit, not a massive rewrite. Find the exact line and the exact gap first—the per-line count tells you whether it needs to lose or gain one syllable (it is rarely off by more than one).
    </p>

    <p>
      Then, simply swap a word instead of stuffing in awkward filler. A line running long usually has a word that shrinks easily: "beautiful" (3) can swap down to "pretty" (2); "underneath" (3) can swap down to "under" (2). A short line takes the exact reverse swap.
    </p>

    <p>
      Recheck the line immediately rather than trusting your own mental count on the way back in. The same accent-dependent words that trip up AI—fire, hour, flower, chocolate—trip up humans counting by hand too. Also, keep an eye out for chain reactions: fixing line two can quietly throw off a rhyme or an image elsewhere in the poem.
    </p>
  </section>

  <section>
    <h2>A Note on "Real" Haiku Rules</h2>

    <p>
      It is worth stating plainly, because it matters for how strict you should be with your edits: 5-7-5 is the Western classroom standard, but it is an imperfect convention borrowed from Japanese. Traditional Japanese poetry counts phonetic sound units (<em>on</em>), which do not map one-to-one with English syllables. 
    </p>
    <p>
      Plenty of published, professional English-language haikus deliberately run shorter than 17 syllables for exactly this reason. If it's a strict school assignment, hit 5-7-5 exactly and let the checker keep you precise. But if you are writing for yourself or a literary magazine, treat 17 syllables as a ceiling worth respecting, not a rigid rule you are breaking by going slightly under it.
    </p>
  </section>

  <section>
    <h2>How to Fix AI-Generated Song Lyrics the Same Way</h2>

    <p>
      The haiku editing method scales straight over to lyrics, with one major addition: consistency across verses matters far more than hitting any single target number. If verse one, line one runs exactly eight syllables, verse two's opening line should land remarkably close to eight too—even with completely different words. That symmetry is what allows the second verse to sit cleanly on the same melody without cramming or stretching the vocalist.
    </p>
  </section>

  <section>
    <h2>Frequently Asked Questions</h2>

    <h3>Will newer AI models fix this on their own?</h3>
    <p>
      Most likely not anytime soon. It is a fundamental problem in the LLM architecture, not what the model has "learned." Unless tokenization takes place natively on the basis of phonemes and syllables rather than text fragments, this will continue to be an Achilles' heel for chatbots regardless of their other reasoning abilities.
    </p>

    <h3>Why does AI refuse to count sometimes?</h3>
    <p>
      When users push models hard on exact character or word counts (and point out their failures), models are often prompt-engineered by their creators to refuse the task or offer a disclaimer, rather than failing confidently and causing user frustration.
    </p>

    <h3>Can I just tell the AI to "count carefully"?</h3>
    <p>
      Sometimes it nudges the output a little closer, but it doesn't fix the blind spot underneath. The model is still guessing—just guessing a second time with more confidence in its voice. An outside counter is the only way to get a mathematically exact phonetic answer.
    </p>

    <h3>Does this syllable issue affect other languages?</h3>
    <p>
      Yes, though the failure pattern shifts. Syllable structure varies drastically by language, and tokenizers behave differently for each one. The English 5-7-5 haiku just happens to be the most documented, most heavily argued-about use case on the internet.
    </p>

    <h3>Is this the same reason AI struggles to write rhyming poetry?</h3>
    <p>
      It is related, but not the exact same thing. Rhyme depends heavily on the ending phonetic sound of a word, which text-based tokenization also blurs. Syllable counting depends on the total number of sound units across a whole line—a separate phonetic task that the model guesses at independently.
    </p>
  </section>

  <section>
    <h2>Where to Go From Here</h2>

    <p>
      If you write with AI regularly, don't stop using it for brainstorming haikus or lyric ideas. Just stop trusting its own internal math. Approach the generated poem as a rough draft and use dedicated tools to correct it. Paste the generated poem directly into our <a href="/tools/syllable-counter">Syllable Counter</a>, and manually correct the one or two lines that are off rhythm rather than forcing the chatbot to regenerate the poem endlessly.
    </p>

    <p>
      A handful of other CountFlows tools can help clean things up before or after that check:
    </p>
    <ul>
      <li><a href="/tools/ai-text-cleaner">AI Text Cleaner</a> strips the markdown asterisks and stray formatting AI tends to leave behind, so you're counting clean text from the start.</li>
      <li><a href="/tools/remove-line-breaks">Remove Line Breaks</a> fixes a poem that pasted in as one broken block instead of clean stanzas.</li>
      <li><a href="/tools/word-counter">Word Counter</a> and <a href="/tools/sentence-counter">Sentence Counter</a> cover standard text limits if you need strict length targeting.</li>
      <li><a href="/tools/case-converter">Case Converter</a> fixes output that arrived in ALL CAPS when you actually needed Title Case for a lyric sheet.</li>
      <li><a href="/tools/reading-time">Reading Time Calculator</a> checks the real spoken pace of a verse once the syllable count is dialed in.</li>
      <li>Curious what's actually happening under the hood? Our <a href="/tools/ai-token-counter">AI Token Counter</a> shows you the exact text fragments behind a piece of AI output—the root cause this entire article is built around, finally made visible.</li>
    </ul>
  </section>
</article>
`;

export default syllableCounter;