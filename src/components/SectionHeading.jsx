function SectionHeading({ as: Heading = 'h2', eyebrow, title, description }) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-academic-600">
        {eyebrow}
      </p>
      <Heading className="mt-3 text-3xl font-semibold tracking-tight text-academic-900 sm:text-4xl">
        {title}
      </Heading>
      {description ? (
        <p className="mt-4 leading-7 text-slate-600">{description}</p>
      ) : null}
    </div>
  )
}

export default SectionHeading
