export const wordCounterFAQs = [
  {
    question: 
                  "How to check word count using this tool?",
    answer: "Simply type or paste your text into the box, and the tool automatically shows the total words. You can also see characters, sentences, and paragraphs instantly."
  },
  {
    question: " What is Flesch reading score?",
    answer: "The Flesch reading score measures how easy your text is to read. Higher scores mean your writing is simple, while lower scores show it’s more complex.."
  },
  {
    question: "How many pages is 1000–3000 words?",
    answer: "If you use standard formatting, 1,000 words is about 2 pages, and 3,000 words fill roughly 6 pages. Spacing and font size can change this slightly."
  },
  {
    question: "How many words are in one page?",

    answer: "On average, one page has around 500 words. This assumes standard font size, spacing, and normal paragraphs."
  },
{
  question: "How many words is 280 characters?",
  answer: "Around 50–60 words fit in 280 characters, depending on word length. Shorter words fit more, longer words fewer."

},
{
  question: "How to count words in an essay?",
  answer: "You can use a word counter tool or check manually by selecting the text in Word, Google Docs, or Pages. It instantly shows your essay’s total words."

},



]



export const characterCounterFAQs = [
  {
    question: "Is this character counter free?",
    answer:
      "Yes. The CountFlows Character Counter is free to use with no sign-up required. You can count characters, words, Unicode text, platform limits, SMS segments, and other text statistics directly in your browser.",
  },

  {
    question: "Do spaces count as characters?",
    answer:
      "Yes. Spaces normally count toward a character limit. CountFlows shows both characters with spaces and characters without spaces, so you can use the number required by your platform, form, or assignment.",
  },

  {
    question: "Do emojis count as one character?",
    answer:
      "It depends on the counting method. CountFlows treats a visible emoji as one grapheme in the main Unicode character count, while some platforms use different rules. For example, X normally gives an emoji a weight of 2 characters.",
  },

  {
    question: "What is a Unicode character counter?",
    answer:
      "A Unicode character counter is designed to handle modern text such as emoji, accented letters, and combined characters more accurately than a simple text-length calculation. CountFlows also shows UTF-16 units and UTF-8 bytes for platforms that use different counting methods.",
  },

  {
    question: "How many words is 2,000 characters?",
    answer:
      "About 330 to 360 words is a useful estimate for typical English text, although the exact number depends on word length, spaces, and punctuation. For an exact result, paste your text into the counter.",
  },

  {
    question: "How many characters can an X post have?",
    answer:
      "A standard X post can contain up to 280 weighted characters. X Premium supports longer posts up to 25,000 characters. X uses weighted counting, and valid URLs normally count as 23 characters regardless of their original length.",
  },

  {
    question: "What is the LinkedIn post character limit?",
    answer:
      "LinkedIn supports up to 3,000 characters for the text of a standard UGC post. Select the LinkedIn preset in the platform analyzer to see how many characters you have used and how many remain.",
  },

  {
    question: "What is the TikTok caption character limit?",
    answer:
      "TikTok's Content Posting API allows up to 2,200 UTF-16 units for a video caption. CountFlows uses the UTF-16 count for its TikTok video caption preset instead of treating every visible character as identical.",
  },

  {
    question: "How many characters can an SMS message have?",
    answer:
      "A single GSM-7 SMS can normally contain up to 160 units. If the message requires Unicode encoding, the single-message limit is normally 70 units. Longer messages are usually split into segments of 153 GSM-7 units or 67 Unicode units.",
  },

  {
    question: "Why can one emoji increase my SMS segment count?",
    answer:
      "Many emojis and other characters are outside the GSM-7 character set. When one of these characters appears, an SMS may switch to Unicode encoding, reducing the available space from 160 units to 70 in a single segment. CountFlows detects the encoding and estimates the number of SMS segments automatically.",
  },

  {
    question: "Is there a fixed Google title or meta description character limit?",
    answer:
      "No. Google does not specify a fixed character limit for title links or meta descriptions. CountFlows uses practical writing ranges for SEO titles and meta descriptions, but Google may truncate search results depending on the query, device, and available display space.",
  },

  {
    question: "Is it safe to paste private text into the character counter?",
    answer:
      "The counting and text analysis in the Character Counter run directly in your browser and do not require an external counting API. Your text is not sent to CountFlows for these calculations.",
  },

  {
    question: "Why does my character count differ from Word or Google Docs?",
    answer:
      "Different tools can count Unicode characters, line breaks, spaces, hidden formatting, and special symbols differently. CountFlows provides Unicode grapheme characters, UTF-16 units, UTF-8 bytes, and characters without spaces so you can see which measurement applies.",
  },
]
const readingTimeFAQs = [
  {
    question: "How Long to Read a Book?",
    answer: "The time to read a book depends on its length and your reading speed. You can use a reading tool to get an instant estimate in minutes or hours."
  },
  {
    question : "Can I Estimate Speaking Time?",
    answer : "Yes, you can convert your text into speaking time. Tools calculate words per minute and show how long your speech will take"
  },
  {
    question : "Does It Work Offline?",

    answer : "Most online calculators need the internet to work, but some apps let you use them offline. Always check the tool’s features before relying on it."
  }
]


const sentenceCounterFAQs = [
  {
    question: "Is this sentence counter free?",
    answer :"Yes, most sentence counter  are free to use. You can access basic features without paying anything."
  },{
    question: "Can it detect complex sentences?",
    answer :"Yes, it can spot long or complex sentences. This  simplify your writing easily."
  },
  {
    question: "Does it support multiple languages?",
    answer :"Many tools support multiple languages. However, accuracy may vary depending on the language."
  },
  {
    question: "Can I use it offline?",
    answer :"Most sentence counters work online. Some tools may offer offline versions, but they are limited."
  },
  {
    question: "Does it store my text?",

    answer :"No, most tools do not store your text. They process it instantly and keep your data private."
  },
]
 const keywordDensityFAQs = [

  {
    question: "What is keyword density?",
    answer:
      "Keyword density is the percentage of times a keyword or phrase appears in your text compared to the total number of words. It's calculated as (keyword count ÷ total words) × 100 and helps you understand how focused your content is around a topic.",
  },
  {
    question: "Does keyword density have a direct impact on Google rankings?",
    answer:
      "Not in a direct, measurable way — Google has never published an exact formula. But keywords still need to be present for a page to rank for them. The real goal is to use them naturally and in the right places, rather than chasing a specific percentage.",
  },
  {
    question: "What are 2 and 3-word phrases (n-grams)?",
    answer:
      "N-grams are sequences of words. A 2-word phrase (bigram) like 'keyword density' and a 3-word phrase (trigram) like 'free keyword tool' help you see which multi-word terms appear most often, which is useful for long-tail keyword optimization.",
  },
  {
    question: "What keyword density percentage is considered safe?",
    answer:
      "Most experienced SEOs work within the 1% to 2% range for their primary target keyword. Once you push past 3%, you're entering territory where search engines may start viewing your content as over-optimized.",
  },
  {
    question: "Can I use this tool to analyze a competitor's page?",
    answer:
      "Absolutely. Just paste their URL into the tool the same way you would your own. You'll get a full keyword breakdown of their content — including which phrases they're using most and how their density compares.",
  },
  {
    question:"Will CountFlows save or read my pasted content?",
    answer:"No. Whatever you paste into the text field stays private. We don't store it, we don't read it, and we don't share it. Your content is yours.",
  },
  {
    question:"What's the actual difference between keyword density and keyword frequency?",
    answer:"Frequency is the raw count how many times a word appears. Density turns that count into a percentage relative to your total word count. Both numbers show up in your report, and together they give you the clearest picture of your keyword usage",
  },
  {
    question:"Does content length change what density I should aim for?",

     answer:"It can. Very short pieces are sometimes read with a slightly higher density just because there are fewer total words. Longer articles tend to have lower density even with more total keyword mentions. The advice stays the same either way: write naturally, check the numbers, adjust where needed.",
  }
]
export const caseConverterFAQs = [
  {
    question: "How do I convert upper case to lower case?",
    answer:
      "Paste your text into the converter above and click lower case. Every capital letter becomes a small letter instantly. Click Sentence case instead if you want the first letter of each sentence to stay capitalized.",
  },
  {
    question: "Is this case converter free?",
    answer:
      "Yes. It is completely free, with no registration, no usage limits, and no premium tier. The site is supported by ads, not subscriptions.",
  },
  {
    question: "Is my text uploaded or stored when I convert it?",
    answer:
      "No. The conversion runs in your browser using JavaScript. Your text is never sent to our servers, so there is nothing for us to store, read, or share.",
  },
  {
    question: "What is the difference between Title Case and Capitalized Case?",
    answer:
      "Title Case capitalizes major words but leaves minor words like 'a', 'and', 'the', and 'of' in lowercase \u2014 the style used for book and article titles. Capitalized Case capitalizes the first letter of every word, including the small ones.",
  },
  {
    question: "Can I convert text case in Excel or Word instead?",
    answer:
      "Yes. Excel uses the =UPPER(), =LOWER(), and =PROPER() formulas, and Word has a Change Case button under the Home tab. For text that does not need to stay in a spreadsheet, pasting it into this converter is usually faster.",
  },
  {
    question: "Does the case converter work on phones?",
    answer:
      "Yes. It works in any modern browser on any device \u2014 phone, tablet, or desktop. There is nothing to install.",
  },
  {
    question: "Will it change my numbers, symbols, or emoji?",
    answer:
      "No. Only letters change case. Numbers, punctuation, symbols, and emoji pass through untouched.",
  },
]
export const aiTextCleanerFAQs = [
  {
    question: "How do I remove ChatGPT formatting from text?",
    answer:
      "Paste the text into the cleaner above, keep 'Remove markdown symbols' switched on, and click Clean Text. All the asterisks, hashtags, backticks, and link brackets disappear while every word stays exactly where it was. Copy the result and paste it anywhere as plain text.",
  },
  {
    question: "Why does ChatGPT text paste with asterisks and hashtags?",
    answer:
      "ChatGPT writes in markdown, a formatting language where **text** means bold and ## means a heading. Apps like ChatGPT render those symbols as styling, but when you copy the raw text into a plain editor, an email, or a CMS, the symbols come along as literal characters. This cleaner strips the markdown syntax and keeps only the words.",
  },
  {
    question: "Can this remove em dashes from AI text?",
    answer:
      "Yes. The 'Fix em dashes' option replaces every em dash and en dash: a spaced dash ( \u2014 ) becomes a comma, and a tight dash between words becomes a regular hyphen. The overuse of em dashes is one of the most recognizable habits of AI writing, and this removes it in one click.",
  },
  {
    question: "What are the invisible characters in AI-generated text?",
    answer:
      "AI tools often insert characters you cannot see: zero-width spaces, non-breaking spaces, soft hyphens, and byte-order marks. They break search-and-replace, cause weird line wrapping in Google Docs and Word, and can corrupt code or spreadsheet formulas. The 'Remove invisible characters' option deletes zero-width characters and converts every exotic space back to a normal one.",
  },
  {
    question: "Will cleaning AI text make it pass AI detectors?",
    answer:
      "No, and we do not claim it will. This tool removes formatting artifacts \u2014 markdown symbols, em dashes, invisible characters, and smart quotes \u2014 but it does not rewrite or paraphrase your words. AI detectors analyze the writing itself, not the formatting. If you need different wording, that is an editing job, not a cleaning job.",
  },
  {
    question: "Does it work with Claude, Gemini, and Copilot text?",
    answer:
      "Yes. Claude, Gemini, Copilot, DeepSeek, and Perplexity all output markdown with the same symbols and the same hidden characters as ChatGPT. The cleaner works on any text from any AI tool \u2014 or on messy text from PDFs, emails, and websites.",
  },
  {
    question: "Is my text uploaded or stored when I clean it?",
    answer:
      "No. All cleaning runs in your browser using JavaScript. Your text is never sent to our servers, so there is nothing for us to store, read, or share. You can safely paste confidential drafts, contracts, or client work.",
  },
  {
    question: "Is this AI text cleaner free? Is there a word limit?",
    answer:
      "Yes, it is completely free with no registration, no word limit, and no premium tier. Clean a single sentence or an entire report \u2014 the site is supported by ads, not subscriptions.",
  },
  {
    question: "Can I remove the formatting but keep my bullet points?",
    answer:
      "Yes. 'Remove bullet points' is a separate toggle that is off by default. Leave it off and your lists keep their dashes and numbering; switch it on and every line loses its leading bullet or number, which is handy when you are turning a list back into a paragraph.",
  },
]
export const syllableCounterFAQs = [
  {
    question: "How do you count syllables in a word?",
    answer:
      "Count the vowel sounds, not the vowel letters. Say the word slowly and listen for each beat: cat has one, po-em has two, cho-co-late has two or three depending on how you say it. Silent vowels do not count \u2014 make has one syllable, not two. The counter above does this automatically for every word you type.",
  },
  {
    question: "How many syllables are in fire?",
    answer:
      "Dictionaries count fire as one syllable, but many speakers naturally say it with two (FY-er). Both are accepted \u2014 this is one of English's classic edge cases, along with hour, poem, and chocolate. The counter follows the dictionary count.",
  },
  {
    question: "Does a haiku have to be 5-7-5?",
    answer:
      "For school assignments and traditional English haiku, yes \u2014 three lines of 5, 7, and 5 syllables. Japanese haiku actually count sounds called on rather than syllables, so many modern English haiku poets treat 17 syllables as a maximum rather than a strict target. Haiku mode above checks the strict 5-7-5 pattern.",
  },
  {
    question: "How accurate is the syllable counter?",
    answer:
      "Words found in the built-in dictionary are exact. Unknown words fall back to a vowel-group algorithm that is right for most standard English words but can miss by one on rare words, names, and regional pronunciations. Algorithm-counted words get a dashed marker so you can double-check them.",
  },
  {
    question: "Is this syllable counter free?",
    answer:
      "Yes. It is completely free with no registration, no usage limits, and no premium tier. The site is supported by ads, not subscriptions.",
  },
  {
    question: "Is my text uploaded or stored when I count syllables?",
    answer:
      "No. The counting runs in your browser using JavaScript. Your text is never sent to our servers, so there is nothing for us to store, read, or share.",
  },
  {
    question: "Can I count syllables in a whole poem or song at once?",
    answer:
      "Yes. Paste the full text and you get the total count, a line-by-line breakdown, and a per-word count \u2014 there is no character limit.",
  },
  {
    question: "Does the syllable counter work on phones?",
    answer:
      "Yes. It works in any modern browser on any device \u2014 phone, tablet, or desktop. There is nothing to install.",
  },
]


export const aitokenCounterFAQs = [
  {
    question: "Why did I hit ChatGPT's token limit even though my text looked short?",
    answer:
      "Token limits include both your input (system prompt + user message) and the model's output. If you have a long system prompt plus conversation history plus your new message, they all add up together. Use this token counter to check your full prompt before sending.",
  },
  {
    question: "Why does Claude show a different token count than GPT for the same text?",
    answer:
      "Claude and GPT use different tokenizers. Anthropic built its own tokenizer for Claude, while OpenAI uses tiktoken. The same sentence can tokenize into slightly different numbers of tokens depending on which model's algorithm you use. Our tool shows GPT-exact counts and Claude estimates clearly labeled.",
  },
  {
    question : "Is this also a token calculator?",
    answer : "Yes — Countflows AI Token Counter also works as a token calculator. It counts tokens for GPT, Claude, and other LLMs, and calculates estimated API costs based on your token count, so you can use it for both token counting and cost calculation in one tool."
  },
  {
    question: "How many tokens is 1,000 words?",
    answer:
      "Approximately 700\u2013800 tokens for standard English text. Code and technical content can be higher. Non-English languages (especially Chinese, Japanese, Arabic) typically produce more tokens per word than English.",
  },
  {
    question: "Do spaces and punctuation count as tokens?",
    answer:
      "Yes. Spaces, commas, periods, quotation marks, brackets, and newlines all count toward your token total. In tiktoken, a space before a word is often merged with that word as a single token.",
  },
  {
    question: "What is the difference between tokens, words, and characters?",
    answer:
      "Characters \u2014 Every letter, space, and symbol. \"Hello\" = 5 characters. Words \u2014 Human-readable word units. \"Hello world\" = 2 words. Tokens \u2014 Model-specific chunks. \"Hello world\" = 2 tokens in GPT. Character count \u00f7 4 gives a rough token estimate, but model-specific counting is more accurate.",
  },
  {
    question: "Can I use this tool to check token count for API requests?",
    answer:
      "Yes. Paste your full prompt \u2014 including system instructions and user message \u2014 and select your model. The count you see is what you'll be billed for (input tokens). Output tokens are counted separately after the response is generated.",
  },
  {
    question: "Is my text saved or stored when I use this tool?",
    answer:
      "No. All token counting happens in your browser. Your text never leaves your device and is never sent to our servers or stored anywhere.",
  },
  {
    question: "Does token count affect AI response quality?",
    answer:
      "Indirectly, yes. If your prompt is too long and gets truncated, the model loses context and produces worse output. Staying within 70\u201380% of the context window gives the model enough room to generate a full, high-quality response.",
  },
  {
    question: "What is the maximum token limit for ChatGPT?",
    answer:
      "It depends on the model. GPT-3.5 Turbo supports up to 16,385 tokens. GPT-4o supports up to 128,000 tokens. GPT-4 Turbo also supports 128,000 tokens. The free version of ChatGPT uses GPT-3.5 by default with the lower limit.",
  },
  {
  question: "How is the AI cost estimate calculated?",
  answer:
    "It multiplies your token count by that model's current per-million-token price, entirely in your browser. Add an expected response length to include estimated output cost too. Pricing is dated on the page and updated periodically — it is not a live quote from the provider.",
},
{
  question: "What happens if my text exceeds a model's context window?",
  answer:
    "The context window bar turns red and tells you by how many tokens you're over. In practice, the model will either reject the request or truncate the oldest part of your input — trim your text or switch to a model with a larger context window.",
},

]

export const removeLineBreaksFAQs = [
  {
    question: "Is this tool free?",
    answer: "Yes. No account, no word limit, no paid tier. Paste as much text as you want, use any mode, and copy the result without ever signing up.",
  },
  {
    question: "Does it work on mobile?",
    answer: "Yes. The tool works in any modern browser, including mobile Safari and Chrome. The input and output boxes are touch-friendly and resize to fit your screen.",
  },
  {
    question: "Will it change my punctuation or spelling?",
    answer: "Never. The tool only touches line break characters (\\n, \\r\\n, \\r). Every word, comma, period, and apostrophe stays exactly as you pasted it.",
  },
  {
    question: "What is the difference between a line break and a paragraph break?",
    answer: "A line break (\\n or \\r\\n) moves text to the next line within the same paragraph. A paragraph break is two or more consecutive line breaks (\\n\\n) that create visible spacing between blocks of text. The Preserve Paragraphs mode removes single line breaks while keeping the double-break paragraph spacing intact.",
  },
  {
    question: "Can I remove carriage returns online?",
    answer: "Yes. Carriage returns (\\r) are handled automatically across all three modes. Windows-style \\r\\n line endings are treated as a single break, so you do not need to worry about which operating system the text came from.",
  },
  {
    question: "What if removing breaks fuses two words together?",
    answer: "The tool inserts a space at every break point when joining lines. If words are still fusing, the source text had no space before the break. You can add one manually in the output box, or switch to Preserve Paragraphs mode which is more conservative about joining.",
  },
  {
    question: "Can I keep some line breaks and remove others?",
    answer: "Not in a single pass with the Remove All mode. However, the Preserve Paragraphs mode does exactly this: it removes single line breaks (the ones breaking sentences mid-paragraph) while keeping the double line breaks that separate paragraphs. For finer control, use Custom Separator mode and choose what replaces each break.",
  },
]



export const textRepeaterFAQs = [
  {
    question: "What does a text repeater do?",
    answer:
      "It duplicates text a selected number of times. You enter the original text once, choose a count and separator, and copy the completed output.",
  },
  {
    question: "Can I repeat text 100 or 1,000 times?",
    answer:
      "Yes. Enter the number manually or use a preset if one is available.",
  },
  {
    question: "What is the maximum repeat count?",
    answer:
      "The tool can produce up to 10,000 copies in a single run.",
  },
  {
    question: "Can it repeat emojis?",
    answer:
      "Yes. You can repeat emojis, symbols, accented characters, and text written in supported non-English scripts.",
  },
  {
    question: "Can I repeat a full paragraph?",
    answer:
      "Yes. Paste the paragraph into the input field. Any original line breaks inside it will remain part of each copy.",
  },
  {
    question: "Is the tool free?",
    answer:
      "Yes. There is no account, email requirement, or payment step.",
  },
  {
    question: "Does it work on a phone?",
    answer:
      "Yes. The interface works in modern mobile and desktop browsers.",
  },
  {
    question: "Can I save the output?",
    answer:
      "Yes. Copy it to your clipboard or download it as a plain .txt file.",
  },
  {
    question: "Is there a copy shortcut?",
    answer:
      "Use Ctrl + Enter on Windows or Cmd + Enter on macOS.",
  },
];




export { wordCounterFAQs, characterCounterFAQs, readingTimeFAQs, sentenceCounterFAQs , keywordDensityFAQs, caseConverterFAQs, aiTextCleanerFAQs, syllableCounterFAQs,aitokenCounterFAQs , removeLineBreaksFAQs, textRepeaterFAQs }
