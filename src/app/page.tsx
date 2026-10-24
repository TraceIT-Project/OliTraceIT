"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Logo } from "@/components/layout/logo"
import { Button, buttonVariants } from "@/components/ui/button"
import { AuthModal, type AuthMode } from "@/components/auth/auth-modal"
import { SupportModal } from "@/components/layout/support-modal"
import { BlogCover } from "@/components/blog/blog-cover"
import { blogPosts } from "@/lib/blog-data"
import { plans } from "@/lib/plans"
import { CONTACT_EMAIL, sendContactForm } from "@/lib/site"
import {
  Sprout, BarChart3, ArrowRight, CheckCircle2,
  MapPin, Leaf, Factory, QrCode, TrendingUp, Users,
  Star, ArrowUpRight, Check, Menu, X, Headset, Mail,
} from "lucide-react"
import { motion } from "framer-motion"

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const navLinks = [
  { href: "#funcionalidades", label: "Funcionalidades" },
  { href: "#planes", label: "Planes" },
  { href: "#casos", label: "Casos de Éxito" },
  { href: "#blog", label: "Blog" },
  { href: "#contacto", label: "Contacto" },
]

const heroPills = ["Cuaderno de campo digital", "Certificados QR", "Conexión almazara", "Predicciones IA", "Gestión de campañas", "Alertas agronómicas"]

const heroStats = [
  { label: "Parcelas activas", value: "8", trend: "+2 esta campaña" },
  { label: "Rendimiento graso", value: "22,4%", trend: "+1,2% vs anterior" },
  { label: "Lotes trazados", value: "34", trend: "+5 este mes" },
  { label: "Score calidad", value: "91/100", trend: "+3 puntos" },
]

const features = [
  {
    icon: Sprout,
    title: "Gestión de Finca Inteligente",
    desc: "Cuadernos de campo digitales, identidad digital de parcela con historial acumulativo y predicciones de producción.",
    items: ["Registro de actividades", "Historial de parcelas", "Alertas agronómicas"],
  },
  {
    icon: QrCode,
    title: "Trazabilidad Completa",
    desc: "Certificados digitales, conexión con almazaras, QR verificable para el consumidor final.",
    items: ["Certificados digitales", "Conexión con almazara", "QR para botella"],
  },
  {
    icon: BarChart3,
    title: "Inteligencia Operativa",
    desc: "Paneles de análisis, comparativas de rendimiento graso, predicción de volumen de campaña.",
    items: ["Dashboard de almazara", "Rankings de calidad", "Predicciones IA"],
  },
]

const steps = [
  { icon: MapPin, title: "Identidad Digital", desc: "Cada parcela tiene su identidad digital con historial acumulativo" },
  { icon: Leaf, title: "Registro de Actividades", desc: "Tratamientos, riegos y labores registrados de forma sencilla" },
  { icon: Factory, title: "Conexión con Almazara", desc: "Lotes trazables con certificado digital verificable" },
  { icon: Users, title: "Transparencia al Consumidor", desc: "QR en botella con información de origen verificada" },
]

const stats = [
  { value: "500+", label: "Agricultores" },
  { value: "2.500+", label: "Parcelas registradas" },
  { value: "15.000+", label: "Lotes trazados" },
  { value: "98%", label: "Satisfacción" },
]

const testimonials = [
  {
    quote: "Con OliTraceIT hemos aumentado nuestro rendimiento graso en un 2% y simplificado toda la burocracia. Ahora puedo demostrar la calidad de mi aceite con datos reales.",
    author: "Antonio López",
    role: "Agricultor · Finca El Olivar, Sevilla",
    metric: "+2% rendimiento graso",
  },
  {
    quote: "La conexión directa con la almazara nos ha ahorrado más de 40 horas al mes en gestión documental. El QR en botella ha sido un éxito con nuestros clientes.",
    author: "María Fernández",
    role: "Directora · Cooperativa La Unión, Jaén",
    metric: "40 h/mes ahorradas",
  },
  {
    quote: "El dashboard de almazara nos permite tomar decisiones basadas en datos reales. El ranking de agricultores ha motivado a toda la cadena de proveedores.",
    author: "Carlos Ruiz",
    role: "Gerente · Almazara del Sur, Córdoba",
    metric: "+15% eficiencia operativa",
  },
]

const contactBenefits = [
  "30 días de prueba gratuita, sin tarjeta de crédito",
  "Setup en menos de 5 minutos",
  "Soporte personalizado durante el onboarding",
]

const emptyContactForm = { nombre: "", email: "", tipo: "Demo de la plataforma", mensaje: "" }

const inputClass = "w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:border-trace-400 focus:outline-hidden focus:ring-2 focus:ring-trace-500/20"

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-14 text-center">
      <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
      <p className="mx-auto mt-3 max-w-2xl text-gray-500">{subtitle}</p>
    </div>
  )
}

export default function LandingPage() {
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState<AuthMode>("login")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [supportOpen, setSupportOpen] = useState(false)
  const [form, setForm] = useState(emptyContactForm)
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")

  const openAuth = (mode: AuthMode) => { setAuthMode(mode); setAuthOpen(true); setMobileMenuOpen(false) }

  async function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("sending")
    try {
      await sendContactForm(form)
      setStatus("sent")
    } catch {
      setStatus("error")
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} mode={authMode} onModeChange={setAuthMode} />
      <SupportModal isOpen={supportOpen} onClose={() => setSupportOpen(false)} />

      <nav className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/" aria-label="OliTraceIT - Inicio">
            <Logo />
          </Link>
          <div className="hidden items-center gap-6 lg:flex xl:gap-8">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900">
                {l.label}
              </a>
            ))}
          </div>
          <div className="hidden items-center gap-3 lg:flex">
            <button
              onClick={() => setSupportOpen(true)}
              aria-label="Contactar soporte"
              title="Contactar soporte"
              className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-600"
            >
              <Headset size={20} />
            </button>
            <Button variant="outline" size="sm" onClick={() => openAuth("login")}>
              Iniciar Sesión
            </Button>
            <Button size="sm" onClick={() => openAuth("register")}>
              Regístrate Gratis
            </Button>
          </div>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100 lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div id="mobile-menu" className="flex flex-col gap-1 border-t bg-white px-4 py-4 sm:px-6 lg:hidden">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="py-2.5 text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <div className="mt-3 flex flex-col gap-2 border-t pt-3 sm:flex-row">
              <Button variant="outline" className="w-full" onClick={() => openAuth("login")}>
                Iniciar Sesión
              </Button>
              <Button className="w-full" onClick={() => openAuth("register")}>
                Regístrate Gratis
              </Button>
            </div>
          </div>
        )}
      </nav>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[#4a6741]">
          <Image
            src="https://images.unsplash.com/photo-1682285116813-8f503995b001?w=1920&q=80"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            preload
          />
          <div className="absolute inset-0 bg-linear-to-r from-white via-white/95 to-white/40" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-19.25 sm:px-6 lg:mb-31.25 lg:mt-17.25 lg:py-0">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <motion.h1
                className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
                {...fadeUp}
                transition={{ delay: 0.1, duration: 0.6 }}
              >
                Trazabilidad y Gestión Digital para el Sector Oleícola
              </motion.h1>

              <motion.p
                className="mt-6 text-lg leading-relaxed text-gray-600"
                {...fadeUp}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Optimiza tu cultivo, certifica tu calidad y conecta con la cadena de valor.
                Del campo a la almazara, en una sola plataforma.
              </motion.p>

              <motion.div
                className="mt-5 flex flex-wrap gap-2"
                {...fadeUp}
                transition={{ delay: 0.25, duration: 0.6 }}
              >
                {heroPills.map((f) => (
                  <span key={f} className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-600 shadow-xs">
                    <Check size={10} className="shrink-0 text-trace-500" /> {f}
                  </span>
                ))}
              </motion.div>

              <motion.div
                className="mt-8 flex flex-col gap-3 sm:flex-row"
                {...fadeUp}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <Button size="lg" className="gap-2 text-base" onClick={() => openAuth("register")}>
                  Empieza Ahora (Gratis 30 días)
                  <ArrowRight size={18} />
                </Button>
                <a href="#funcionalidades" className={buttonVariants({ variant: "outline", size: "lg", className: "text-base" })}>
                  Ver funcionalidades
                </a>
              </motion.div>

              <motion.div
                className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500"
                {...fadeUp}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-trace-600" /> Sin tarjeta de crédito
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-trace-600" /> Empieza a usarlo en minutos
                </span>
              </motion.div>
            </div>

            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              <div className="ml-auto max-w-sm rounded-2xl border border-white/60 bg-white/85 p-5 shadow-2xl backdrop-blur-xs">
                <div className="mb-4 flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-trace-500" />
                  <span className="text-xs font-semibold text-gray-700">Panel · Finca El Olivar</span>
                </div>
                <div className="mb-4 grid grid-cols-2 gap-3">
                  {heroStats.map((item) => (
                    <div key={item.label} className="rounded-xl border bg-gray-50 p-3">
                      <p className="mb-1 text-[10px] text-gray-500">{item.label}</p>
                      <p className="text-xl font-bold text-gray-900">{item.value}</p>
                      <span className="mt-0.5 inline-flex items-center gap-0.5 text-[10px] font-medium text-trace-600">
                        <TrendingUp size={9} /> {item.trend}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-trace-100 bg-trace-50 p-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-trace-600">
                    <QrCode size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-trace-800">Lote AO-2025-034 · Certificado</p>
                    <p className="mt-0.5 text-[10px] text-trace-600">QR generado · Verificable por el consumidor</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="funcionalidades" className="scroll-mt-16 bg-trace-50/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader
            title="Funcionalidades Principales"
            subtitle="Una plataforma integral que transforma la gestión del olivar desde la parcela hasta el consumidor final"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((item, i) => (
              <motion.div
                key={item.title}
                className="card-hover rounded-2xl border bg-white p-6 lg:p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl border border-trace-100 bg-trace-50">
                  <item.icon size={26} className="text-trace-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-gray-500">{item.desc}</p>
                <ul className="space-y-1.5">
                  {item.items.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-gray-600">
                      <Check size={12} className="shrink-0 text-trace-500" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader
            title="Del campo al consumidor"
            subtitle="Cada paso del ciclo productivo queda registrado, verificado y conectado"
          />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((item, i) => (
              <motion.div
                key={item.title}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-trace-600 text-white">
                  <item.icon size={28} />
                  <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-trace-200 bg-white text-xs font-bold text-trace-700">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mb-1.5 text-base font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-trace-700 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="mt-1 text-sm text-trace-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="planes" className="scroll-mt-16 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader
            title="Planes y Precios"
            subtitle="Elige el plan que mejor se adapte a tu explotación. Todos incluyen 30 días de prueba gratuita."
          />
          <div className="mx-auto grid max-w-md gap-6 md:max-w-5xl md:grid-cols-3">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.id}
                className={`relative flex flex-col rounded-2xl border p-6 ${plan.popular
                  ? "border-trace-300 bg-trace-50/30 shadow-lg shadow-trace-100/50 ring-1 ring-trace-200"
                  : "bg-white"
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-trace-600 px-3 py-1 text-xs font-semibold text-white">
                    Más popular
                  </span>
                )}
                <div className="mb-3 flex items-center gap-2">
                  <plan.icon size={20} className={plan.popular ? "text-trace-600" : "text-gray-500"} />
                  <h3 className="text-lg font-semibold text-gray-900">{plan.id}</h3>
                </div>
                <div className="mb-1">
                  <span className="text-3xl font-bold text-gray-900">{plan.price} €</span>
                  <span className="text-sm text-gray-500">/mes</span>
                </div>
                <p className="mb-5 text-sm text-gray-500">{plan.tagline}</p>
                <ul className="mb-6 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f.label} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-trace-600" />
                      {f.label}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  {plan.id === "Empresa" ? (
                    <a href="#contacto" className={buttonVariants({ variant: "outline", className: "w-full" })}>
                      Contactar Ventas
                    </a>
                  ) : (
                    <Button
                      className="w-full"
                      variant={plan.popular ? "default" : "outline"}
                      onClick={() => openAuth("register")}
                    >
                      {plan.price === 0 ? "Empezar Gratis" : "Probar 30 días Gratis"}
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="casos" className="scroll-mt-16 bg-trace-50/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader title="Casos de Éxito" subtitle="Agricultores y cooperativas que ya confían en OliTraceIT" />
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.figure
                key={t.author}
                className="flex flex-col rounded-2xl border bg-white p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="mb-3 flex items-center gap-1" aria-label="5 de 5 estrellas">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={14} className="text-amber-400" fill="#fbbf24" />
                  ))}
                </div>
                <blockquote className="flex-1 text-sm italic leading-relaxed text-gray-600">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4 border-t pt-4">
                  <p className="text-sm font-semibold text-gray-900">{t.author}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                  <span className="mt-2 inline-flex items-center rounded-full border border-trace-200 bg-trace-50 px-2.5 py-1 text-xs font-medium text-trace-700">
                    <TrendingUp size={10} className="mr-1" /> {t.metric}
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <section id="blog" className="scroll-mt-16 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader title="Blog y Recursos" subtitle="Noticias, guías y mejores prácticas del sector oleícola" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`} className="card-hover group flex h-full flex-col overflow-hidden rounded-2xl border bg-white">
                  <BlogCover
                    cover={post.cover}
                    className="aspect-[16/10]"
                    sizes="(min-width: 1280px) 400px, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    tag={{ label: post.tag, className: post.tagBg }}
                    zoomOnHover
                  />
                  <div className="flex flex-1 flex-col p-5">
                    <p className="mb-2 text-xs text-gray-500">{post.date} · {post.readTime} de lectura</p>
                    <h3 className="mb-2 line-clamp-2 font-sans text-base font-semibold text-gray-900 transition-colors group-hover:text-trace-700">
                      {post.title}
                    </h3>
                    <p className="line-clamp-2 text-sm text-gray-500">{post.excerpt}</p>
                    <span className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-medium text-trace-600">
                      Leer más <ArrowUpRight size={14} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="contacto" className="scroll-mt-16 overflow-x-clip bg-trace-50/50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="mb-6 inline-flex items-center rounded-full border border-trace-200 bg-trace-50 px-3 py-1 text-xs font-medium text-trace-700">
                Contacto
              </span>
              <h2 className="mb-4 text-3xl font-bold text-gray-900">
                Empieza a digitalizar tu explotación hoy
              </h2>
              <p className="mb-8 leading-relaxed text-gray-500">
                Únete a cientos de agricultores que ya confían en OliTraceIT. Si tienes dudas o quieres una demo
                personalizada, escríbenos — respondemos en menos de 24 horas.
              </p>

              <ul className="mb-10 space-y-3">
                {contactBenefits.map((b) => (
                  <li key={b} className="flex items-center gap-2.5 text-sm text-gray-700">
                    <CheckCircle2 size={15} className="shrink-0 text-trace-600" />
                    {b}
                  </li>
                ))}
              </ul>

              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="group inline-flex max-w-full items-center gap-3 rounded-xl border bg-white px-4 py-3 shadow-xs transition-shadow hover:shadow-sm"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-trace-100 bg-trace-50">
                  <Mail size={16} className="text-trace-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] text-gray-500">Correo electrónico</p>
                  <p className="truncate text-sm font-semibold text-trace-700 underline-offset-2 group-hover:underline">
                    {CONTACT_EMAIL}
                  </p>
                </div>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="rounded-2xl border bg-white p-6 shadow-xs sm:p-8">
                {status === "sent" ? (
                  <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-trace-100 bg-trace-50">
                      <CheckCircle2 size={32} className="text-trace-600" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-sans text-lg font-semibold text-gray-900">¡Mensaje enviado!</h3>
                      <p className="text-sm text-gray-500">Te responderemos en menos de 24 horas en <span className="font-medium">{form.email}</span>.</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => { setStatus("idle"); setForm(emptyContactForm) }}>
                      Enviar otro mensaje
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <h3 className="mb-1 font-sans text-base font-semibold text-gray-900">Envíanos un mensaje</h3>
                      <p className="text-xs text-gray-500">Respuesta garantizada en menos de 24 horas.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div>
                        <label htmlFor="contact-nombre" className="mb-1.5 block text-xs font-medium text-gray-700">Nombre <span className="text-red-400">*</span></label>
                        <input
                          id="contact-nombre"
                          type="text"
                          required
                          autoComplete="name"
                          placeholder="Nombre completo"
                          value={form.nombre}
                          onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="mb-1.5 block text-xs font-medium text-gray-700">Email <span className="text-red-400">*</span></label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          autoComplete="email"
                          placeholder="Correo electrónico"
                          value={form.email}
                          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-tipo" className="mb-1.5 block text-xs font-medium text-gray-700">Tipo de consulta</label>
                      <select
                        id="contact-tipo"
                        value={form.tipo}
                        onChange={(e) => setForm((f) => ({ ...f, tipo: e.target.value }))}
                        className={`${inputClass} bg-white`}
                      >
                        <option>Demo de la plataforma</option>
                        <option>Soporte técnico</option>
                        <option>Partnership / Almazara</option>
                        <option>Otra consulta</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="contact-mensaje" className="mb-1.5 block text-xs font-medium text-gray-700">Mensaje</label>
                      <textarea
                        id="contact-mensaje"
                        rows={4}
                        placeholder="Cuéntanos sobre tu explotación, número de parcelas o qué funcionalidad te interesa..."
                        value={form.mensaje}
                        onChange={(e) => setForm((f) => ({ ...f, mensaje: e.target.value }))}
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    {status === "error" && (
                      <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                        No se pudo enviar el mensaje. Inténtalo de nuevo o escríbenos a {CONTACT_EMAIL}.
                      </p>
                    )}

                    <Button type="submit" disabled={status === "sending"} className="w-full gap-2">
                      {status === "sending" ? "Enviando..." : <>Enviar mensaje <ArrowRight size={16} /></>}
                    </Button>
                    <p className="text-center text-[11px] text-gray-500">Sin spam. Tus datos no se comparten con terceros.</p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="border-t bg-white py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 sm:px-6 lg:flex-row lg:justify-between">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 sm:gap-y-2 lg:justify-start">
            <Logo size="sm" />
            <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 lg:justify-start" aria-label="Pie de página">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} className="py-1 text-sm text-gray-500 hover:text-gray-900">{l.label}</a>
              ))}
            </nav>
          </div>
          <p className="text-center text-sm text-gray-500 lg:text-right">© 2026 OliTraceIT. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
