import SectionHeading from '../components/SectionHeading.jsx'
import { posts } from '../content/posts.js'

function BlogSection() {
  return (
    <section id="blog" className="mx-auto max-w-5xl px-6 py-20 sm:py-24 lg:px-8">
      <SectionHeading
        eyebrow="Notes"
        title="Blog"
        description="Occasional notes on research, implementation, and ideas in progress."
      />

      <div className="mt-10 border-t border-slate-200">
        {posts.length > 0 ? (
          posts.map((post) => (
            <article key={post.slug} className="border-b border-slate-200 py-7">
              <p className="text-sm text-slate-500">{post.date}</p>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">
                {post.title}
              </h3>
              <p className="mt-2 leading-7 text-slate-600">{post.summary}</p>
            </article>
          ))
        ) : (
          <p className="py-8 text-slate-500">Notes are coming soon.</p>
        )}
      </div>
    </section>
  )
}

export default BlogSection
