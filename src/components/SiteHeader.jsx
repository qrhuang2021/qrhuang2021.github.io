import { profile } from '../content/profile.js'

const navigation = [
  { label: 'Home', href: '#home' },
  { label: 'Publications', href: '#publications' },
  { label: 'Blog', href: '#blog' },
]

function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-6 py-4 lg:px-8">
        <a
          className="text-base font-semibold tracking-tight text-academic-900 transition-colors hover:text-academic-600"
          href="#home"
        >
          {profile.name}
        </a>

        <nav aria-label="Primary navigation">
          <ul className="flex items-center gap-5 text-sm font-medium text-slate-600 sm:gap-7">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  className="transition-colors hover:text-academic-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-academic-600"
                  href={item.href}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default SiteHeader
