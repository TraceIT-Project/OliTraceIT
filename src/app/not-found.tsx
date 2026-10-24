import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Logo } from "@/components/layout/logo"
import { buttonVariants } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center">
      <Logo className="mb-8" />
      <h1 className="mb-2 text-2xl font-bold text-gray-900">Página no encontrada</h1>
      <p className="mb-6 text-gray-500">La página que buscas no existe o ha sido eliminada.</p>
      <Link href="/" className={buttonVariants({ variant: "outline", className: "gap-2" })}>
        <ArrowLeft size={16} /> Volver al inicio
      </Link>
    </div>
  )
}
