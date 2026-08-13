import { Link, NavLink } from 'react-router-dom'
import { profile } from '../content/profile.js'
import { publications } from '../content/publications.js'

const navigation = [
  { label: 'Home', to: '/' },
  ...(publications.length > 0
    ? [{ label: 'Publications', to: '/publications' }]
    : []),
  { label: 'Blog', to: '/blog' },
]

function navLinkClassName({ isActive }) {
  const base =
    'inline-flex min-h-8 items-center border-b-2 border-transparent transition-colors hover:text-academic-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-academic-600'

  return isActive
    ? `${base} border-academic-600 text-academic-700`
    : base
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-col gap-1 px-4 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6 sm:py-3 lg:px-8">
        <Link
          className="inline-flex min-h-8 items-center text-base font-semibold tracking-tight text-academic-900 transition-colors hover:text-academic-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-academic-600"
          to="/"
        >
          {profile.name}
        </Link>

        <nav aria-label="Primary navigation" className="w-full sm:w-auto">
          <ul className="flex items-center justify-between gap-4 text-sm font-medium text-slate-600 sm:justify-start sm:gap-7">
            {navigation.map((item) => (
              <li key={item.to}>
                <NavLink
                  className={navLinkClassName}
                  end={item.to === '/'}
                  to={item.to}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default SiteHeader
