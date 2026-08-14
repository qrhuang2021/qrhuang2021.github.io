import { HiArrowUpRight } from 'react-icons/hi2'
import SectionHeading from '../components/SectionHeading.jsx'
import { bookmarkSections } from '../content/bookmarks.js'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'

function BookmarkItem({ item }) {
  return (
    <article className="py-6 first:pt-0 last:pb-0 sm:py-7">
      <p className="text-sm font-medium text-slate-500">{item.byline}</p>
      <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">
        <a
          className="inline-flex items-center gap-1.5 transition-colors hover:text-academic-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-academic-600"
          href={item.href}
          rel="noreferrer"
          target="_blank"
        >
          {item.title}
          <HiArrowUpRight aria-hidden="true" className="size-4 shrink-0" />
        </a>
      </h3>
      <p className="mt-3 max-w-2xl leading-7 text-slate-600">{item.note}</p>
      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Topics">
        {item.tags.map((tag) => (
          <li
            className="rounded-full bg-academic-50 px-3 py-1 text-xs font-medium text-academic-700 ring-1 ring-inset ring-academic-100"
            key={tag}
          >
            {tag}
          </li>
        ))}
      </ul>
    </article>
  )
}

function BookmarksPage() {
  useDocumentTitle('Bookmarks')

  return (
    <section className="mx-auto min-h-[70vh] max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <SectionHeading
        as="h1"
        eyebrow="Curated links"
        title="Bookmarks"
        description="A small, opinionated collection of writing, people, and individual pieces that I find valuable."
      />

      <div className="mt-10 space-y-12 sm:mt-12 sm:space-y-14">
        {bookmarkSections.map((section) => (
          <section
            aria-labelledby={`bookmarks-${section.id}`}
            className="grid gap-5 border-t border-slate-200 pt-8 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-10 md:pt-10"
            key={section.id}
          >
            <div>
              <h2
                className="text-xl font-semibold tracking-tight text-academic-900"
                id={`bookmarks-${section.id}`}
              >
                {section.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {section.description}
              </p>
            </div>

            <div className="divide-y divide-slate-200">
              {section.items.map((item) => (
                <BookmarkItem item={item} key={item.href} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  )
}

export default BookmarksPage
