import Image from "next/image"
import type { BlogCoverImage } from "@/lib/blog-data"
import { cn } from "@/lib/utils"

interface BlogCoverProps {
  cover: BlogCoverImage
  sizes: string
  className?: string
  tag?: { label: string; className: string }
  preload?: boolean
  zoomOnHover?: boolean
}

export function BlogCover({ cover, sizes, className, tag, preload, zoomOnHover }: BlogCoverProps) {
  return (
    <div className={cn("relative overflow-hidden bg-trace-900", className)}>
      <Image
        src={cover.image}
        alt={cover.alt}
        fill
        sizes={sizes}
        placeholder="blur"
        preload={preload}
        className={cn("object-cover", zoomOnHover && "transition-transform duration-500 ease-out group-hover:scale-105")}
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/45 via-black/5 to-transparent" />
      {tag && (
        <span className={cn("absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm", tag.className)}>
          {tag.label}
        </span>
      )}
    </div>
  )
}
