"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Clock, Calendar, ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"
import { Logo } from "@/components/layout/logo"
import { blogPosts } from "@/lib/blog-data"
import { Button } from "@/components/ui/button"

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#0d1117] px-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Artículo no encontrado</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">El artículo que buscas no existe o ha sido eliminado.</p>
        <Link href="/#blog">
          <Button variant="outline" className="gap-2">
            <ArrowLeft size={16} /> Volver al inicio
          </Button>
        </Link>
      </div>
    )
  }

  const related = blogPosts.filter((p) => p.slug !== slug)

  return (
    <div className="min-h-screen bg-white dark:bg-[#0d1117]">
      {/* Navbar minimal */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-[#0d1117]/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/">
            <Logo />
          </Link>
          <Link
            href="/#blog"
            className="flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            <ArrowLeft size={16} />
            Volver al inicio
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="relative h-56 sm:h-72 md:h-80 overflow-hidden">
          {post.visual}
          {/* Stretch visual to fill */}
          <div className="absolute inset-0 [&>div]:!h-full" />
        </div>
      </motion.div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-6 -mt-10 relative z-10">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Card header */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#151921] shadow-lg p-6 sm:p-8 mb-8">
            {/* Tag + meta */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`rounded-full ${post.tagBg} px-3 py-1 text-xs font-semibold text-white`}>
                {post.tag}
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                <Calendar size={12} /> {post.date}
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                <Clock size={12} /> {post.readTime} de lectura
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              {post.title}
            </h1>

            {/* Author */}
            <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
              <div className="h-10 w-10 rounded-full bg-trace-600 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                {post.author.initials}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{post.author.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{post.author.role}</p>
              </div>
            </div>
          </div>

          {/* Article body */}
          <div className="prose prose-gray dark:prose-invert max-w-none
            prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-gray-100
            prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4
            prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-p:leading-relaxed prose-p:mb-4
            prose-strong:text-gray-900 dark:prose-strong:text-gray-200
            prose-ul:my-4 prose-ul:space-y-2
            prose-li:text-gray-600 dark:prose-li:text-gray-400
            prose-em:text-gray-500 dark:prose-em:text-gray-400
            prose-a:text-trace-600 dark:prose-a:text-trace-400 prose-a:underline prose-a:underline-offset-2 hover:prose-a:text-trace-700 dark:hover:prose-a:text-trace-300
            [&_h2]:border-b [&_h2]:border-gray-100 dark:[&_h2]:border-gray-800 [&_h2]:pb-2
            [&_ul]:list-disc [&_ul]:pl-5
          ">
            {post.content}
          </div>

        </motion.article>

        {/* Related posts */}
        <div className="mt-16 mb-20">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            Otros artículos que te pueden interesar
          </h3>
          <div className="grid sm:grid-cols-2 gap-5">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/blog/${r.slug}`}
                className="group rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#151921] overflow-hidden hover:shadow-lg transition-all duration-200"
              >
                <div className="relative h-32 overflow-hidden">
                  {r.visual}
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="rounded-full bg-trace-50 dark:bg-trace-950/30 px-2 py-0.5 text-xs font-medium text-trace-700 dark:text-trace-300">
                      {r.tag}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">{r.readTime}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:text-trace-700 dark:group-hover:text-trace-400 transition-colors line-clamp-2">
                    {r.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer minimal */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0d1117] py-8">
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo />
          <p className="text-xs text-gray-400 dark:text-gray-500">© 2026 Trace IT. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
