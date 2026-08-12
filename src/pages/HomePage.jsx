import { Link } from 'react-router-dom'
import { profile } from '../content/profile.js'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'

function HomePage() {
  useDocumentTitle()

  return (
    <section className="mx-auto max-w-5xl px-6 py-20 sm:py-28 lg:px-8">
      <div className="grid items-center gap-12 md:grid-cols-[1fr_auto]">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-academic-600">
            Personal academic homepage
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-academic-900 sm:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-5 text-xl font-medium text-slate-700">
            {profile.role}
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            {profile.introduction}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {profile.links.map((link) => (
              <a
                key={link.label}
                className="rounded-full border border-academic-200 bg-academic-50 px-4 py-2 text-sm font-semibold text-academic-700 transition-colors hover:border-academic-600 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-academic-600"
                href={link.href}
                rel="noreferrer"
                target="_blank"
              >
                {link.label}
              </a>
            ))}
            <Link
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:border-academic-600 hover:text-academic-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-academic-600"
              to="/blog"
            >
              Read the blog
            </Link>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="grid size-36 place-items-center rounded-3xl border border-academic-200 bg-academic-50 text-4xl font-semibold tracking-tight text-academic-700 shadow-sm sm:size-44"
        >
          {profile.initials}
        </div>
      </div>

      <div className="mt-20 border-t border-slate-200 pt-10">
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
          Research interests
        </h2>
        <ul className="mt-5 flex flex-wrap gap-x-7 gap-y-3 text-base font-medium text-slate-700">
          {profile.interests.map((interest) => (
            <li key={interest}>{interest}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default HomePage
