import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Trace IT - Trazabilidad y Gestión Digital Oleícola",
  description: "Plataforma de trazabilidad, integración y análisis predictivo para el sector oleícola",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  )
}
