import PublicationItem from '../components/PublicationItem.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { publications } from '../content/publications.js'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'

function PublicationsPage() {
  useDocumentTitle('Publications')

  return (
    <section className="min-h-[70vh] bg-academic-50">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24 lg:px-8">
        <SectionHeading
          eyebrow="Research output"
          title="Publications"
          description="Selected work on CAD, boundary representation, and geometric learning."
        />

        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
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
