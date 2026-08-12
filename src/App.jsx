import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop.jsx'
import SiteFooter from './components/SiteFooter.jsx'
import SiteHeader from './components/SiteHeader.jsx'
import BlogIndexPage from './pages/BlogIndexPage.jsx'
import HomePage from './pages/HomePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import PublicationsPage from './pages/PublicationsPage.jsx'

const BlogPostPage = lazy(() => import('./pages/BlogPostPage.jsx'))

function RouteLoading() {
  return (
    <div className="mx-auto min-h-[60vh] max-w-5xl px-6 py-20 text-slate-500 lg:px-8">
      Loading article…
    </div>
  )
}

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-700">
      <ScrollToTop />
      <SiteHeader />
      <main className="flex-1">
        <Suspense fallback={<RouteLoading />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/publications" element={<PublicationsPage />} />
            <Route path="/blog" element={<BlogIndexPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  )
}

export default App
