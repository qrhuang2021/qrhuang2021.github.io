import SiteFooter from './components/SiteFooter.jsx'
import SiteHeader from './components/SiteHeader.jsx'
import BlogSection from './sections/BlogSection.jsx'
import HomeSection from './sections/HomeSection.jsx'
import PublicationsSection from './sections/PublicationsSection.jsx'

function App() {
  return (
    <div className="min-h-screen bg-white text-slate-700">
      <SiteHeader />
      <main>
        <HomeSection />
        <PublicationsSection />
        <BlogSection />
      </main>
      <SiteFooter />
    </div>
  )
}

export default App
