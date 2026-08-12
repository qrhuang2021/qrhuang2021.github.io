import { Link, NavLink } from 'react-router-dom'
import { profile } from '../content/profile.js'

const navigation = [
  { label: 'Home', to: '/' },
  { label: 'Publications', to: '/publications' },
  { label: 'Blog', to: '/blog' },
]

function navLinkClassName({ isActive }) {
  const base =
    'transition-colors hover:text-academic-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-academic-600'

  return isActive ? `${base} text-academic-700` : base
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6 sm:py-4 lg:px-8">
        <Link
          className="text-base font-semibold tracking-tight text-academic-900 transition-colors hover:text-academic-600"
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
