import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'

function NotFoundPage() {
  useDocumentTitle('Page not found')

  return (
    <section className="mx-auto min-h-[70vh] max-w-5xl px-6 py-20 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-academic-600">
        404
      </p>
      <h1 className="mt-3 text-3xl font-semibold text-academic-900">
        Page not found
      </h1>
      <p className="mt-4 text-slate-600">
        The page you requested does not exist.
      </p>
      <Link className="mt-6 inline-flex font-semibold text-academic-700 hover:underline" to="/">
        ← Return home
      </Link>
    </section>
  )
}

export default NotFoundPage
