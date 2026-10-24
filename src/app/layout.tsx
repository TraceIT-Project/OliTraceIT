import type { Metadata, Viewport } from "next"
import { DM_Sans, Playfair_Display } from "next/font/google"
import { PageScrollbar } from "@/components/layout/page-scrollbar"
import "./globals.css"

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" })

export const metadata: Metadata = {
  title: {
    default: "OliTraceIT - Trazabilidad y Gestión Digital Oleícola",
    template: "%s · OliTraceIT",
  },
  description: "Plataforma de trazabilidad, integración y análisis predictivo para el sector oleícola",
  applicationName: "OliTraceIT",
}

export const viewport: Viewport = {
  themeColor: "#1c611f",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${dmSans.variable} ${playfair.variable}`}>
      <body className="antialiased">
        {children}
        <PageScrollbar />
      </body>
    </html>
  )
}
