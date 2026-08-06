const syllableCounter = `

<article>
  

  <p>
    ChatGPT asked to generate a haiku and you'll get three lines without any delay whatsoever. Ask it to verify its syllables and it will often assure you that everything's fine. Usually, everything isn't. Count for yourself: four syllables in the first line, six in the last, not at all 5-7-5.
  </p>

  <p>
    It is no bug that was silently fixed in the last update. This is still going on in 2026 in all major chatbots, and it is something so specific that you could figure out for yourself in less than a minute. It is not about the model being "dumb." Once you understand why it does it, it would only take you thirty seconds to fix the output rather than a pointless back-and-forth.
  </p>

  <section>
    <h2>People Have Been Noticing This for Years</h2>

    <p>
      Writers and developers have been flagging this since GPT-3, and newer models haven't really closed the gap. Ask for a haiku about anything and count it by hand. You'll get 4-6-5 more often than you'd think. Sometimes 7-7-5. The model almost never flags its own miss.
    </p>

    <p>
      What throws people is the confidence. The same chatbot that can explain 5-7-5 in textbook detail, define a syllable correctly, even bring up Japanese poetic tradition unprompted, will then write a haiku that violates its own explanation and defend the count when you push back on it.
    </p>

    <p>
      There's a number behind this, not just anecdotes. One developer ran a chatbot through ten separate haiku prompts and got a correct 5-7-5 pattern only 4 out of 10 times, under 50% accuracy, from a model that recited the rule perfectly on every single attempt (<a href="https://www.fermyon.com/blog/can-we-put-the-ai-in-haiku">Akamai Functions</a>). <a href="https://www.forbes.com/sites/evaamsen/2022/12/06/ai-haikus-are-getting-betterat-least-in-japanese/">Forbes</a> tested a different chatbot and hit the same wall: flawless definition of 5-7-5, followed by a haiku that actually scanned 4-7-6.
    </p>
  </section>

  <section>
    <h2>Why AI Chatbots Can't Count Syllables: Tokens, Not Sounds</h2>

    <p>
      Here's the part most explanations skip. AI chatbots don't read letters and they don't hear sounds. Your text gets chopped into tokens before the model ever "sees" it — chunks that might be a whole word, a fragment of one, or just a handful of letters. The model never encounters "b-e-a-u-t-i-f-u-l" spelled out, and it never hears "beau-ti-ful" spoken out loud. It sees a short string of numbers standing in for pieces like "beaut" and "iful." Whatever shape those pieces happen to take has nothing to do with where the actual syllable breaks fall.
    </p>

    <p>
      Same root cause as AI's other famous blind spot: miscounting the letters in "strawberry." The word might arrive as one or two tokens rather than nine separate characters, so counting individual units isn't something the model was ever built to do well. Syllable counting hits the identical wall from a different direction. Syllables belong to sound. Tokens belong to text compression. Nobody designed those two systems to line up, so they mostly don't.
    </p>

    <p>
      Which means a chatbot writing a haiku isn't counting anything at all. It's pattern-matching against thousands of haiku-shaped examples from training and producing something that looks right — three short lines, seasonal imagery, a familiar rhythm — without ever verifying the count underneath. It can recite the rule because the rule is a memorized fact. It can't apply the rule because applying it means counting something the architecture literally can't see.
    </p>

    <p>
      And there's a second complication layered on top: syllable count is genuinely fuzzy in English to begin with. Fire, hour, chocolate — all of these get pronounced with a different number of syllables depending on the speaker's accent and pace. A person resolves that with a dictionary or their own ear. A model resolves it by guessing at a pattern. Even a theoretically perfect tokenizer wouldn't make AI haiku flawless. Just less wrong.
    </p>
  </section>

  <section>
    <h2>AI-Generated Text Doesn't Always Miscount. Sometimes It Skips a Syllable Entirely</h2>

    <p>
      Miscalculating the sum is the frequent error. But there is also another type. Scan AI-created poems carefully, and you will sometimes find an individual word where the calculation of syllables fails — "different," which is supposed to have three syllables, but the algorithm calculates as having two, or names such as "ChatGPT," which gets miscalculated by one syllable. Same underlying reason: the model is guessing at the shape of a word it has never technically heard spoken, so it skips a syllable about as easily as it adds an extra one. Either direction, the fix doesn't change. Check the line yourself.
    </p>
  </section>

  <section>
    <h2>Why Your Brain Does This Instantly and AI Doesn't</h2>

    <p>
      Say "banana" out loud right now. You'll feel three beats without trying to count anything — your jaw drops once per syllable, almost on autopilot. Your brain processes speech as sound first. Every syllable centers on a vowel sound, and your ear tracks those beats the same effortless way you'd count claps or drumbeats.
    </p>

    <p>
      AI has no ear. It's never heard "banana" spoken in its life. It only ever sees a chunk of text standing in for the word. That's the entire gap, in one sentence: your brain counts syllables as sound, AI counts tokens as text, and nobody built those two systems to agree with each other.
    </p>
  </section>

  <section>
    <h2>It's Not Just Haiku: AI Gets Song Lyrics Wrong Too</h2>

    <p>
      The same blind spot shows up wherever syllable count matters — song lyrics, rap verses, sonnets, limericks. Ask a chatbot for a verse that fits your melody and you'll often get lines that read fine on the page but refuse to scan when sung. One line runs long. The next comes up short. The stress lands in the wrong spot relative to the beat.
    </p>

    <p>
      For songwriters this bites harder than it sounds like it should. A haiku that's one syllable off is a curiosity you laugh at. A verse that's one syllable off just doesn't sit on the melody, and you don't find that out until you're actually trying to sing it in front of someone.
    </p>
  </section>

  <section>
    <h2>Use an AI Syllable Counter, Not the AI Itself</h2>

    <p>
      Since the chatbot can't grade its own work reliably, count separately. Outside the chat window, with something built to count sounds instead of guess at them. Paste the haiku or lyric into the <a href="https://countflows.com/tools/syllable-counter">Syllable Counter</a> and switch on Haiku mode — each line gets its own live count against 5-7-5, and turns green the second it actually fits. No strict target? The per-line breakdown still shows exactly where a line runs long or short, so you're working from real numbers instead of the model's word for it.
    </p>

    <p>
      Asking the same chatbot "are you sure that's 5-7-5?" rarely does much, since you'd be asking the tool that can't count syllables to grade its own syllable count. An outside, deterministic counter is the only thing that actually breaks that loop. Pasted the poem straight out of ChatGPT or Claude? Run it through the <a href="https://countflows.com/tools/ai-text-cleaner">AI Text Cleaner</a> first — AI output tends to carry stray markdown symbols that throw off a clean per-line count. And if the formatting collapsed your stanzas into a single block, <a href="https://countflows.com/tools/remove-line-breaks">Remove Line Breaks</a> sorts that out in one click.
    </p>
  </section>

  <section>
    <h2>How to Fix an AI-Generated Haiku, Line by Line</h2>

    <p>
      Once you know which line is off, this is a small edit, not a rewrite. Find the exact line and the exact gap first — the per-line count tells you whether it needs to lose or gain one syllable, and it's rarely more than one. Then swap a word instead of stuffing in filler: a line running long usually has a word that shrinks, "beautiful" (3) down to "pretty" (2), "underneath" (3) down to "under" (2). A short line takes the reverse swap.
    </p>

    <p>
      Recheck immediately rather than trusting your own count on the way back in. The same accent-dependent words that trip up AI — fire, hour, flower — trip up people counting by hand too. And keep an eye out for chain reactions: fixing line two can quietly throw off a rhyme or an image elsewhere in the poem, so give the whole thing one more pass once all three lines hit target instead of stopping the moment each line individually checks out.
    </p>
  </section>

  <section>
    <h2>A Note on "Real" Haiku Rules</h2>

    <p>
      Worth saying plainly, because it matters for how strict you should be: 5-7-5 is the classroom standard, but it's a convention borrowed imperfectly from Japanese, which counts on sound units rather than English syllables. The two don't map one to one. Plenty of published English-language haiku deliberately run shorter than 17 syllables for exactly this reason. School assignment? Hit 5-7-5 exactly and let the checker keep you precise. Writing for yourself or a magazine? Treat 17 syllables as a ceiling worth respecting, not a rule you're breaking by going under it.
    </p>
  </section>

  <section>
    <h2>How to Fix AI-Generated Song Lyrics the Same Way</h2>

    <p>
      The haiku method scales straight over to lyrics, with one addition: consistency across verses matters more than hitting any single number. If verse one, line one runs eight syllables, verse two's opening line should land close to eight too — even with completely different words — because that's what lets the second verse sit on the same melody without cramming or stretching.
    </p>

    <p>
      Run each verse through the counter line by line and hunt for the outlier, not for everything the AI wrote. Nine times out of ten, one or two lines are doing all the damage while the rest of the verse already scans just fine.
    </p>
  </section>

  <section>
    <h2>FAQ</h2>

    <h3>Will newer AI models fix this on their own?</h3>

    <p>
      More likely not anytime soon. It is a problem in the architecture, not what the model has learned. Unless tokenization takes place on the basis of phonemes/syllables and not on fragments of words, this will continue to be an Achilles' heel for the model regardless of its other abilities.
    </p>

    <h3>Can I just tell the AI to "count carefully"?</h3>

    <p>
      Sometimes it nudges the output a little closer. It doesn't fix the blind spot underneath — the model is still guessing, just guessing a second time with more confidence in its voice. An outside counter is the only way to get an exact answer, not a more polite one.
    </p>

    <h3>Does this affect other languages?</h3>

    <p>
      Yes, though the pattern shifts. Syllable structure varies a lot by language, and tokenizers behave differently for each one. English 5-7-5 haiku just happens to be the most documented, most argued-about case.
    </p>

    <h3>Is this the same reason AI struggles with rhyme?</h3>

    <p>
      Related but not the same thing. Rhyme depends on the ending sound of a word, which tokenization also blurs. Syllable counting depends on the total number of sound units across a whole line — a separate task, guessed at independently.
    </p>

    <h3>Is there an AI syllable counter that actually works?</h3>

    <p>
      Not one built on a language model — that would inherit the exact blind spot this whole article is about. What actually works runs the other way around: a pronunciation dictionary plus a vowel-sound algorithm, counting sounds directly instead of predicting them from text patterns. Call it a syllable counter, not a chatbot, and it holds up either way.
    </p>
  </section>

  <section>
    <h2>Where to Go From Here</h2>

    <p>
      If you write with AI regularly, don't stop using it for haiku or lyrics. Just stop trusting its own math. Approach the generated poem as a rough draft and use the counter to correct it – paste the generated poem to the <a href="https://countflows.com/tools/syllable-counter">Syllable Counter</a>, switch Haiku Mode if necessary, and correct those one or two lines which are incorrect rather than generate the poem again and hope it comes out right this time.
    </p>

    <p>
      A handful of other tools help clean things up before or after that check. <a href="https://countflows.com/tools/ai-text-cleaner">AI Text Cleaner</a> strips the markdown asterisks and stray formatting AI tends to leave behind, so you're counting clean text from the start. <a href="https://countflows.com/tools/remove-line-breaks">Remove Line Breaks</a> fixes a poem that pasted in as one broken block instead of clean stanzas. If you're also matching a length or line-count target and not just a rhythm, <a href="https://countflows.com/tools/word-counter">Word Counter</a> and <a href="https://countflows.com/tools/sentence-counter">Sentence Counter</a> cover that. <a href="https://countflows.com/tools/case-converter">Case Converter</a> fixes it if the output arrived in ALL CAPS when you actually needed Title Case for a lyric sheet, and <a href="https://countflows.com/tools/reading-time">Reading Time Calculator</a> checks the real spoken pace of a verse once the syllable count is right. Curious what's actually happening under the hood? <a href="https://countflows.com/tools/ai-token-counter">AI Token Counter</a> shows you the exact tokens behind a piece of AI text — the root cause this entire article is built around, made visible. And if the draft in question is prose rather than verse, <a href="https://countflows.com/tools/keyword-density-checker">Keyword Density Checker</a> keeps the word repetition natural before you publish.
    </p>
  </section>
</article>

 


`
export default syllableCounter;