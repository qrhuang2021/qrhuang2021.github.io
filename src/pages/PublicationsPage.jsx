import PublicationItem from '../components/PublicationItem.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { publications } from '../content/publications.js'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'

const publicationYears = [...new Set(publications.map(({ year }) => year))]

function PublicationsPage() {
  useDocumentTitle('Publications')

  return (
    <section className="mx-auto min-h-[70vh] max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <SectionHeading
        as="h1"
        eyebrow="Research"
        title="Publications"
        description="Selected work in structured 3D reconstruction, CAD, and visual computing."
      />

      <div className="mt-10 space-y-14 sm:mt-12 sm:space-y-16">
        {publicationYears.map((year) => (
          <section
            aria-labelledby={`publications-${year}`}
            className="grid gap-5 md:grid-cols-[4.5rem_minmax(0,1fr)] md:gap-8"
            key={year}
          >
            <h2
              className="text-lg font-semibold tracking-tight text-academic-900 md:pt-0.5 md:text-xl"
              id={`publications-${year}`}
            >
              {year}
            </h2>
            <div className="border-b border-slate-200">
              {publications
                .filter((publication) => publication.year === year)
                .map((publication) => (
                  <PublicationItem
                    key={publication.id}
                    publication={publication}
                  />
                ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  )
}

export default PublicationsPage
