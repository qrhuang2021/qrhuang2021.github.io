import PublicationItem from '../components/PublicationItem.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { publications } from '../content/publications.js'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'

function PublicationsPage() {
  useDocumentTitle('Publications')

  return (
    <section className="min-h-[70vh] bg-academic-50">
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow="Research output"
          title="Publications"
          description="Selected work on CAD, boundary representation, and geometric learning."
        />

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:mt-10 sm:p-6 lg:p-8">
          {publications.length > 0 ? (
            publications.map((publication) => (
              <PublicationItem key={publication.id} publication={publication} />
            ))
          ) : (
            <p className="text-slate-500">Publication list coming soon.</p>
          )}
        </div>
      </div>
    </section>
  )
}

export default PublicationsPage
