import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getDb } from '@/lib/db'

export const metadata: Metadata = {
  title: 'Blog — Robotrading',
  description: 'Artikel über Algo Trading, Strategien und Marktanalysen.',
}

// SSG mit Revalidierung
export const revalidate = 3600

async function getBlogPosts() {
  try {
    const db = getDb()
    return db.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        coverImage: true,
        publishedAt: true,
        tags: true,
        readingTime: true,
      },
    })
  } catch {
    // Build-Zeit ohne DB-Verbindung: leeres Array als Fallback
    return []
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-4 text-4xl font-extrabold text-foreground">Blog</h1>
      <p className="mb-12 text-muted-foreground">
        Insights zu Algo Trading, Strategien und den Märkten.
      </p>

      {posts.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-12 text-center">
          <p className="text-muted-foreground">Noch keine Artikel veröffentlicht.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => {
            const tags = JSON.parse(post.tags) as string[]
            return (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group rounded-xl border border-border bg-card p-6 hover:border-primary/50 transition-all hover:shadow-lg"
            >
              {post.coverImage && (
                <div className="mb-4 aspect-video w-full overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              )}
              <div className="flex flex-wrap gap-2 mb-3">
                {tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                  {post.excerpt}
                </p>
              )}
              <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                {post.publishedAt && (
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString('de-DE')}
                  </span>
                )}
                {post.readingTime && <span>{post.readingTime} Min. Lesezeit</span>}
              </div>
            </Link>
          )})}

        </div>
      )}
    </div>
  )
}
