function AuthorList({ authors }) {
  return authors.map((author, index) => (
    <span key={author}>
      {author === 'Qirui Huang' ? (
        <strong className="font-semibold text-slate-800 underline decoration-slate-400 underline-offset-2">
          {author}
        </strong>
      ) : (
        author
      )}
      {index < authors.length - 1 ? ', ' : null}
    </span>
  ))
}

function PublicationItem({ publication }) {
  const imageLoading = publication.priority ? 'eager' : 'lazy'

  return (
    <article className="border-t border-slate-200 py-8 first:pt-0">
      <div className="grid gap-6 sm:grid-cols-[14rem_minmax(0,1fr)] sm:gap-7 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-8">
        <div className="flex aspect-[16/10] items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-2">
          <img
            alt={publication.image.alt}
            className="h-full w-full object-contain"
            decoding="async"
            fetchPriority={publication.priority ? 'high' : 'auto'}
            height={publication.image.height}
            loading={imageLoading}
            src={publication.image.src}
            width={publication.image.width}
          />
        </div>

        <div className="min-w-0">
          <h3 className="text-xl font-semibold leading-snug tracking-tight text-slate-900 sm:text-[1.35rem]">
            {publication.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            <AuthorList authors={publication.authors} />
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm font-semibold text-academic-700">
            <span>{publication.venue}</span>
            {publication.award ? (
              <span className="rounded-full bg-academic-50 px-2.5 py-1 text-xs text-academic-700 ring-1 ring-inset ring-academic-200">
                {publication.award}
              </span>
            ) : null}
          </div>
          <p className="mt-4 max-w-2xl leading-7 text-slate-600">
            {publication.summary}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1">
            {publication.links.map((link) => (
              <a
                className="inline-flex min-h-10 items-center text-sm font-semibold text-academic-700 underline decoration-academic-200 transition-colors hover:decoration-academic-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-academic-600"
                href={link.href}
                key={link.label}
                rel="noreferrer"
                target="_blank"
              >
                {link.label}
              </a>
            ))}
          </div>

          <details className="mt-1 text-sm text-slate-600">
            <summary className="inline-flex min-h-10 cursor-pointer items-center font-semibold text-academic-700 transition-colors hover:text-academic-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-academic-600">
              BibTeX
            </summary>
            <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-900 p-4 text-xs leading-5 text-slate-100">
              <code>{publication.bibtex}</code>
            </pre>
          </details>
        </div>
      </div>
    </article>
  )
}

export default PublicationItem
