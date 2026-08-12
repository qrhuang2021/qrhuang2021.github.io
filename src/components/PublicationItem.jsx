function PublicationItem({ publication }) {
  return (
    <article className="border-t border-slate-200 py-6 first:border-t-0 first:pt-0">
      <p className="text-sm font-medium text-academic-600">
        {publication.year} · {publication.venue}
      </p>
      <h3 className="mt-2 text-lg font-semibold text-slate-900">
        {publication.title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        {publication.authors.join(', ')}
      </p>
    </article>
  )
}

export default PublicationItem
