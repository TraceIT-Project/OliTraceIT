import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Clock, Calendar } from "lucide-react"
import { Logo } from "@/components/layout/logo"
import { BlogCover } from "@/components/blog/blog-cover"
import { blogPosts } from "@/lib/blog-data"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return {}
  return { title: post.title, description: post.excerpt }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) notFound()

  const related = blogPosts.filter((p) => p.slug !== slug)

  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/" aria-label="OliTraceIT - Inicio">
            <Logo />
          </Link>
          <Link
            href="/#blog"
            className="flex items-center gap-1.5 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Volver al inicio</span>
            <span className="sm:hidden">Volver</span>
          </Link>
        </div>
      </nav>

      <BlogCover cover={post.cover} className="h-64 sm:h-80 md:h-[26rem]" sizes="100vw" preload />

      <div className="relative z-10 mx-auto -mt-16 max-w-3xl px-4 sm:-mt-24 sm:px-6">
        <article>
          <header className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg sm:p-8">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className={`rounded-full ${post.tagBg} px-3 py-1 text-xs font-semibold text-white`}>
                {post.tag}
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <Calendar size={12} /> {post.date}
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <Clock size={12} /> {post.readTime} de lectura
              </span>
            </div>

            <h1 className="mb-6 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
              {post.title}
            </h1>

            <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-trace-600 text-sm font-semibold text-white">
                {post.author.initials}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
                <p className="text-xs text-gray-500">{post.author.role}</p>
              </div>
            </div>
          </header>

          <div className="prose prose-gray max-w-none
            prose-headings:font-bold prose-headings:text-gray-900
            prose-h2:mb-4 prose-h2:mt-8 prose-h2:text-xl
            prose-p:mb-4 prose-p:leading-relaxed prose-p:text-gray-600
            prose-strong:text-gray-900
            prose-ul:my-4 prose-ul:space-y-2
            prose-li:text-gray-600
            prose-em:text-gray-500
            prose-a:text-trace-600 prose-a:underline prose-a:underline-offset-2 hover:prose-a:text-trace-700
            [&_h2]:border-b [&_h2]:border-gray-100 [&_h2]:pb-2
            [&_ul]:list-disc [&_ul]:pl-5
          ">
            {post.content}
          </div>

          <p className="mt-10 border-t border-gray-100 pt-4 text-xs text-gray-500">
            Imagen de portada:{" "}
            <a href={post.cover.credit.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-gray-700">
              {post.cover.credit.author}
            </a>{" "}
            ·{" "}
            <a href={post.cover.credit.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-gray-700">
              {post.cover.credit.license}
            </a>
          </p>
        </article>

        <section className="mb-20 mt-16">
          <h2 className="mb-6 text-lg font-bold text-gray-900">
            Otros artículos que te pueden interesar
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/blog/${r.slug}`}
                className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-200 hover:shadow-lg"
              >
                <BlogCover cover={r.cover} className="aspect-[16/9]" sizes="(min-width: 640px) 368px, 100vw" zoomOnHover />
                <div className="p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-full bg-trace-50 px-2 py-0.5 text-xs font-medium text-trace-700">
                      {r.tag}
                    </span>
                    <span className="text-xs text-gray-500">{r.readTime}</span>
                  </div>
                  <h3 className="line-clamp-2 font-sans text-sm font-semibold text-gray-900 transition-colors group-hover:text-trace-700">
                    {r.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <footer className="border-t border-gray-200 bg-gray-50 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
          <Logo size="sm" />
          <p className="text-xs text-gray-500">© 2026 OliTraceIT. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
