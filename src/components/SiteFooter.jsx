import { profile } from '../content/profile.js'

function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-academic-50">
      <div className="mx-auto max-w-5xl px-4 py-7 text-sm text-slate-500 sm:px-6 sm:py-8 lg:px-8">
        <p>© {new Date().getFullYear()} {profile.name}</p>
      </div>
    </footer>
  )
}

export default SiteFooter
