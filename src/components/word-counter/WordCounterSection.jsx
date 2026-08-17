import RelatedTools from "./RelatedTools"
import WordCounterClient from "./WordCounterClient"

export default function WordCounterSection() {
  return (
    <section
      aria-label="Word counter tool"
      className="relative mx-auto max-w-6xl px-4 md:px-8"
    >
      <div className="grid items-start gap-5 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="order-2 lg:order-1 lg:sticky lg:top-24">
          <RelatedTools />
        </aside>

        <div className="order-1 min-w-0 lg:order-2">
          <WordCounterClient />
        </div>
      </div>
    </section>
  )
}