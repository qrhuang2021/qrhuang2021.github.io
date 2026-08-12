import { profile } from '../content/profile.js'

function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-academic-50">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-7 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-8 lg:px-8">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <p>Built with React, Vite, and Tailwind CSS.</p>
      </div>
    </footer>
  )
}

export default SiteFooter
