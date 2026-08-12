import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading.jsx'
import { posts } from '../content/posts.js'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'
import { formatPostDate } from '../lib/formatPostDate.js'

function BlogIndexPage() {
  useDocumentTitle('Blog')

  return (
    <section className="mx-auto min-h-[70vh] max-w-5xl px-6 py-20 sm:py-24 lg:px-8">
      <SectionHeading
        eyebrow="Notes"
        title="Blog"
        description="Occasional notes on research, implementation, and ideas in progress."
      />

      <div className="mt-10 border-t border-slate-200">
        {posts.length > 0 ? (
          posts.map((post) => (
            <article key={post.slug} className="border-b border-slate-200 py-7">
              <time className="text-sm text-slate-500" dateTime={post.date}>
                {formatPostDate(post.date)}
              </time>
              <h2 className="mt-2 text-xl font-semibold text-slate-900">
                <Link
                  className="transition-colors hover:text-academic-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-academic-600"
                  to={`/blog/${post.slug}`}
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-slate-600">
                {post.summary}
              </p>
              <Link
                className="mt-4 inline-flex text-sm font-semibold text-academic-700 hover:underline"
                to={`/blog/${post.slug}`}
              >
                Read article →
              </Link>
            </article>
          ))
        ) : (
          <p className="py-8 text-slate-500">Notes are coming soon.</p>
        )}
      </div>
    </section>
  )
}

export default BlogIndexPage
