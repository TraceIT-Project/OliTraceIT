"use client"

import { useState } from "react"
import Link from "next/link"
import { Logo } from "@/components/layout/logo"
import { Button } from "@/components/ui/button"
import { AuthModal } from "@/components/auth/auth-modal"
import { SupportModal } from "@/components/layout/support-modal"
import {
  Sprout, BarChart3, ArrowRight, CheckCircle2,
  MapPin, Leaf, Factory, QrCode, TrendingUp, Users,
  Twitter, Facebook, Instagram, Youtube, Star, Zap, Crown,
  ArrowUpRight, Check, Menu, X, Headset,
} from "lucide-react"
import { motion } from "framer-motion"

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

export default function LandingPage() {
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "register">("login")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [supportOpen, setSupportOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [form, setForm] = useState({ nombre: "", email: "", tipo: "Demo de la plataforma", mensaje: "" })

  const openLogin = () => { setAuthMode("login"); setAuthOpen(true); setMobileMenuOpen(false) }
  const openRegister = () => { setAuthMode("register"); setAuthOpen(true); setMobileMenuOpen(false) }

  return (
    <div className="min-h-screen bg-white">
      {/* Auth Modal */}
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        initialMode={authMode}
      />
      <SupportModal isOpen={supportOpen} onClose={() => setSupportOpen(false)} />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Logo />
          <div className="hidden md:flex items-center gap-8">
            <a href="#funcionalidades" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Funcionalidades
            </a>
            <a href="#planes" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Planes
            </a>
            <a href="#casos" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Casos de Éxito
            </a>
            <a href="#blog" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Blog
            </a>
            <a href="#contacto" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Contacto
            </a>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setSupportOpen(true)}
              className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
              title="Contactar soporte"
            >
              <Headset size={20} />
            </button>
            <Button variant="outline" size="sm" onClick={openLogin}>
              Iniciar Sesión
            </Button>
            <Button size="sm" onClick={openRegister}>
              Regístrate Gratis
            </Button>
          </div>
          {/* Hamburger button - mobile only */}
          <button
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white px-6 py-4 flex flex-col gap-1">
            <a
              href="#funcionalidades"
              className="py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Funcionalidades
            </a>
            <a
              href="#planes"
              className="py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Planes
            </a>
            <a
              href="#casos"
              className="py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Casos de Éxito
            </a>
            <a
              href="#blog"
              className="py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </a>
            <a
              href="#contacto"
              className="py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contacto
            </a>
            <div className="mt-3 pt-3 border-t flex flex-col gap-2">
              <Button variant="outline" className="w-full justify-center" onClick={openLogin}>
                Iniciar Sesión
              </Button>
              <Button className="w-full justify-center" onClick={openRegister}>
                Regístrate Gratis
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero - olive grove background */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1682285116813-8f503995b001?w=1920&q=80')`,
              backgroundColor: '#4a6741',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/40" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 lg:py-0 lg:mt-10 lg:mb-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left: copy */}
            <div>
              <motion.div {...fadeUp}>
                <span className="inline-flex items-center rounded-full bg-trace-50 px-3 py-1 text-xs font-medium text-trace-700 border border-trace-200 mb-8">
                  <Leaf size={12} className="mr-1.5" /> Plataforma líder en trazabilidad oleícola
                </span>
              </motion.div>

              <motion.h1
                className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
                style={{ fontFamily: 'var(--font-display)' }}
                {...fadeUp}
                transition={{ delay: 0.1, duration: 0.6 }}
              >
                Trazabilidad y Gestión Digital para el Sector Oleícola
              </motion.h1>

              <motion.p
                className="mt-6 text-lg text-gray-600 leading-relaxed"
                {...fadeUp}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Optimiza tu cultivo, certifica tu calidad y conecta con la cadena de valor.
                Del campo a la almazara, en una sola plataforma.
              </motion.p>

              {/* Feature pills */}
              <motion.div
                className="mt-5 flex flex-wrap gap-2"
                {...fadeUp}
                transition={{ delay: 0.25, duration: 0.6 }}
              >
                {['Cuaderno de campo digital', 'Certificados QR', 'Conexión almazara', 'Predicciones IA', 'Gestión de campañas', 'Alertas agronómicas'].map((f) => (
                  <span key={f} className="inline-flex items-center gap-1.5 rounded-full bg-white border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600 shadow-sm">
                    <Check size={10} className="text-trace-500 flex-shrink-0" /> {f}
                  </span>
                ))}
              </motion.div>

              <motion.div
                className="mt-8 flex flex-col sm:flex-row gap-3"
                {...fadeUp}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <Button size="lg" className="gap-2 text-base" onClick={openRegister}>
                  Empieza Ahora (Gratis 30 días)
                  <ArrowRight size={18} />
                </Button>
                <a href="#funcionalidades">
                  <Button variant="outline" size="lg" className="text-base">
                    Ver funcionalidades
                  </Button>
                </a>
              </motion.div>

              {/* Social proof */}
              <motion.div
                className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-5"
                {...fadeUp}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                {/*
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">+50 agricultores activos</p>
                    <div className="flex items-center gap-0.5 mt-0.5">
                      {[1, 2, 3, 4, 5].map(s => <Star key={s} size={11} fill="#fbbf24" className="text-amber-400" />)}
                      <span className="text-xs text-gray-500 ml-1">4.8/5</span>
                    </div>
                  </div>
                </div>
                <div className="hidden sm:block h-8 w-px bg-gray-200" />
                */}
                <div className="flex gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-trace-600" /> Sin tarjeta de crédito
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-trace-600" /> Empieza a usarlo en minutos
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Right: floating dashboard card — desktop only */}
            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              <div className="rounded-2xl bg-white/85 backdrop-blur-sm border border-white/60 shadow-2xl p-5 max-w-sm ml-auto">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-2.5 w-2.5 rounded-full bg-trace-500" />
                  <span className="text-xs font-semibold text-gray-700">Panel · Finca El Olivar</span>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { label: 'Parcelas activas', value: '8', trend: '+2 esta campaña' },
                    { label: 'Rendimiento graso', value: '22,4%', trend: '+1,2% vs anterior' },
                    { label: 'Lotes trazados', value: '34', trend: '+5 este mes' },
                    { label: 'Score calidad', value: '91/100', trend: '+3 puntos' },
                  ].map((item, i) => (
                    <div key={i} className="rounded-xl bg-gray-50 border p-3">
                      <p className="text-[10px] text-gray-400 mb-1">{item.label}</p>
                      <p className="text-xl font-bold text-gray-900">{item.value}</p>
                      <span className="inline-flex items-center gap-0.5 text-[10px] text-trace-600 font-medium mt-0.5">
                        <TrendingUp size={9} /> {item.trend}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl bg-trace-50 border border-trace-100 p-3 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-trace-600 flex items-center justify-center flex-shrink-0">
                    <QrCode size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-trace-800">Lote AO-2025-034 · Certificado</p>
                    <p className="text-[10px] text-trace-600 mt-0.5">QR generado · Verificable por el consumidor</p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ========== FUNCIONALIDADES ========== */}
      <section id="funcionalidades" className="py-20 bg-trace-50/50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "var(--font-display)" }}>
              Funcionalidades Principales
            </h2>
            <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
              Una plataforma integral que transforma la gestión del olivar desde la parcela hasta el consumidor final
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Sprout,
                title: "Gestión de Finca Inteligente",
                desc: "Cuadernos de campo digitales, identidad digital de parcela con historial acumulativo y predicciones de producción.",
                features: ["Registro de actividades", "Historial de parcelas", "Alertas agronómicas"],
              },
              {
                icon: QrCode,
                title: "Trazabilidad Completa",
                desc: "Certificados digitales, conexión con almazaras, QR verificable para el consumidor final.",
                features: ["Certificados digitales", "Conexión con almazara", "QR para botella"],
              },
              {
                icon: BarChart3,
                title: "Inteligencia Operativa",
                desc: "Paneles de análisis, comparativas de rendimiento graso, predicción de volumen de campaña.",
                features: ["Dashboard de almazara", "Rankings de calidad", "Predicciones IA"],
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="rounded-2xl border bg-white p-8 card-hover"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-trace-50 border border-trace-100">
                  <item.icon size={26} className="text-trace-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{item.desc}</p>
                <ul className="space-y-1.5">
                  {item.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-xs text-gray-600">
                      <Check size={12} className="text-trace-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>
              Del campo al consumidor
            </h2>
            <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
              Cada paso del ciclo productivo queda registrado, verificado y conectado
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: MapPin, title: "Identidad Digital", desc: "Cada parcela tiene su identidad digital con historial acumulativo" },
              { icon: Leaf, title: "Registro de Actividades", desc: "Tratamientos, riegos y labores registrados de forma sencilla" },
              { icon: Factory, title: "Conexión con Almazara", desc: "Lotes trazables con certificado digital verificable" },
              { icon: Users, title: "Transparencia al Consumidor", desc: "QR en botella con información de origen verificada" },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-trace-600 text-white relative">
                  <item.icon size={28} />
                  <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-trace-700 border-2 border-trace-200">
                    {i + 1}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-1.5">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-trace-700">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "500+", label: "Agricultores" },
              { value: "2.500+", label: "Parcelas registradas" },
              { value: "15.000+", label: "Lotes trazados" },
              { value: "98%", label: "Satisfacción" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="mt-1 text-sm text-trace-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PLANES ========== */}
      <section id="planes" className="py-20 scroll-mt-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>
              Planes y Precios
            </h2>
            <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
              Elige el plan que mejor se adapte a tu explotación. Todos incluyen 30 días de prueba gratuita.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: Zap,
                name: "Básico",
                price: "0 €",
                period: "/mes",
                desc: "Para pequeños agricultores",
                features: ["1 parcela", "Registro de actividades", "Trazabilidad básica", "Soporte por email"],
                cta: "Empezar Gratis",
                highlighted: false,
              },
              {
                icon: Star,
                name: "Profesional",
                price: "29 €",
                period: "/mes",
                desc: "Para fincas medianas",
                features: ["Hasta 10 parcelas", "Trazabilidad limitada", "Lotes con QR (limitado)", "Informes y exportación PDF", "Conexión almazara", "Soporte 24 horas"],
                cta: "Probar 30 días Gratis",
                highlighted: true,
              },
              {
                icon: Crown,
                name: "Empresa",
                price: "79 €",
                period: "/mes",
                desc: "Para cooperativas y almazaras",
                features: ["Parcelas ilimitadas", "Trazabilidad completa", "Lotes con QR (ilimitado)", "Informes y exportación PDF", "Dashboard de almazara", "Múltiples usuarios y roles", "API de integración", "Predicción de rendimiento IA", "Soporte prioritario", "Onboarding personalizado"],
                cta: "Contactar Ventas",
                highlighted: false,
              },
            ].map((plan, i) => (
              <motion.div
                key={i}
                className={`rounded-2xl border p-6 relative ${plan.highlighted
                  ? "border-trace-300 bg-trace-50/30 shadow-lg shadow-trace-100/50 ring-1 ring-trace-200"
                  : "bg-white"
                  }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-trace-600 px-3 py-1 text-xs font-semibold text-white">
                    Más popular
                  </span>
                )}
                <div className="flex flex-col h-full">
                <div className="flex items-center gap-2 mb-3">
                  <plan.icon size={20} className={plan.highlighted ? "text-trace-600" : "text-gray-400"} />
                  <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                </div>
                <div className="mb-1">
                  <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-sm text-gray-500">{plan.period}</span>
                </div>
                <p className="text-sm text-gray-500 mb-5">{plan.desc}</p>
                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle2 size={14} className="text-trace-600 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                <Button
                  className="w-full"
                  variant={plan.highlighted ? "default" : "outline"}
                  onClick={openRegister}
                >
                  {plan.cta}
                </Button>
                </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CASOS DE ÉXITO ========== */}
      <section id="casos" className="py-20 bg-trace-50/50 scroll-mt-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>
              Casos de Éxito
            </h2>
            <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
              Agricultores y cooperativas que ya confían en TRACE IT
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "Con TRACE IT hemos aumentado nuestro rendimiento graso en un 2% y simplificado toda la burocracia. Ahora puedo demostrar la calidad de mi aceite con datos reales.",
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
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                className="rounded-2xl border bg-white p-6 flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={14} className="text-amber-400" fill="#fbbf24" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed flex-1 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-xs text-gray-500">{testimonial.role}</p>
                  <span className="inline-flex items-center mt-2 rounded-full bg-trace-50 px-2.5 py-1 text-xs font-medium text-trace-700 border border-trace-200">
                    <TrendingUp size={10} className="mr-1" /> {testimonial.metric}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== BLOG ========== */}
      <section id="blog" className="py-20 scroll-mt-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>
              Blog y Recursos
            </h2>
            <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
              Noticias, guías y mejores prácticas del sector oleícola
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                slug: "produccion-aceite-oliva-espana-2024-25",
                tag: "Trazabilidad",
                tagBg: "bg-emerald-600",
                title: "Cómo la trazabilidad digital está transformando el sector del aceite de oliva",
                excerpt: "La digitalización de la cadena de valor oleícola permite a agricultores y almazaras demostrar la calidad de sus productos con datos verificables...",
                date: "15 Feb 2026",
                readTime: "5 min",
                visual: (
                  <div className="h-44 relative overflow-hidden bg-gradient-to-br from-trace-900 via-trace-800 to-emerald-700">
                    {/* Decorative SVG — traceability chain */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 360 176" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Background leaf shapes */}
                      <ellipse cx="300" cy="30" rx="80" ry="50" fill="white" fillOpacity="0.04" transform="rotate(-30 300 30)" />
                      <ellipse cx="320" cy="160" rx="70" ry="45" fill="white" fillOpacity="0.04" transform="rotate(20 320 160)" />
                      {/* Chain nodes */}
                      <circle cx="55" cy="88" r="22" fill="white" fillOpacity="0.10" stroke="white" strokeOpacity="0.25" strokeWidth="1.5" />
                      <circle cx="55" cy="88" r="12" fill="white" fillOpacity="0.15" />
                      <line x1="77" y1="88" x2="113" y2="88" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="4 3" />
                      <circle cx="135" cy="88" r="22" fill="white" fillOpacity="0.10" stroke="white" strokeOpacity="0.25" strokeWidth="1.5" />
                      <circle cx="135" cy="88" r="12" fill="white" fillOpacity="0.15" />
                      <line x1="157" y1="88" x2="193" y2="88" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="4 3" />
                      <circle cx="215" cy="88" r="22" fill="white" fillOpacity="0.10" stroke="white" strokeOpacity="0.25" strokeWidth="1.5" />
                      <circle cx="215" cy="88" r="12" fill="white" fillOpacity="0.15" />
                      <line x1="237" y1="88" x2="273" y2="88" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="4 3" />
                      <circle cx="295" cy="88" r="22" fill="white" fillOpacity="0.14" stroke="white" strokeOpacity="0.35" strokeWidth="2" />
                      <circle cx="295" cy="88" r="12" fill="white" fillOpacity="0.22" />
                      {/* QR-like icon in last node */}
                      <rect x="289" y="82" width="5" height="5" rx="0.5" fill="white" fillOpacity="0.7" />
                      <rect x="296" y="82" width="5" height="5" rx="0.5" fill="white" fillOpacity="0.7" />
                      <rect x="289" y="89" width="5" height="5" rx="0.5" fill="white" fillOpacity="0.7" />
                      <rect x="296" y="89" width="2" height="2" fill="white" fillOpacity="0.7" />
                      <rect x="300" y="89" width="2" height="2" fill="white" fillOpacity="0.7" />
                      {/* Labels under nodes */}
                      <text x="55" y="120" textAnchor="middle" fontSize="8" fill="white" fillOpacity="0.5">Campo</text>
                      <text x="135" y="120" textAnchor="middle" fontSize="8" fill="white" fillOpacity="0.5">Cosecha</text>
                      <text x="215" y="120" textAnchor="middle" fontSize="8" fill="white" fillOpacity="0.5">Almazara</text>
                      <text x="295" y="120" textAnchor="middle" fontSize="8" fill="white" fillOpacity="0.5">Botella</text>
                      {/* Leaf accent top-right */}
                      <path d="M345 10 C335 20 325 40 340 55 C355 40 355 20 345 10Z" fill="white" fillOpacity="0.08" />
                      <path d="M345 10 L340 55" stroke="white" strokeOpacity="0.12" strokeWidth="1" />
                    </svg>
                    <div className="absolute inset-0 bg-gradient-to-t from-trace-900/70 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 rounded-full bg-emerald-500/90 backdrop-blur-sm px-2.5 py-1 text-[11px] font-semibold text-white">Trazabilidad</span>
                    <span className="absolute bottom-3 right-3 text-[10px] text-white/40">15 Feb 2026 · 5 min</span>
                  </div>
                ),
              },
              {
                slug: "reglamento-europeo-cuaderno-campo-digital-2024",
                tag: "Normativa",
                tagBg: "bg-indigo-600",
                title: "Nueva normativa europea de cuaderno de campo digital: lo que necesitas saber",
                excerpt: "A partir de 2027 será obligatorio el cuaderno de campo digital. Te explicamos los requisitos y cómo prepararte con tiempo...",
                date: "8 Feb 2026",
                readTime: "7 min",
                visual: (
                  <div className="h-44 relative overflow-hidden bg-gradient-to-br from-indigo-900 via-indigo-800 to-blue-700">
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 360 176" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* EU stars circle */}
                      {Array.from({ length: 12 }, (_, k) => {
                        const angle = (k * 30 - 90) * (Math.PI / 180)
                        const cx = 80 + Math.cos(angle) * 38
                        const cy = 88 + Math.sin(angle) * 38
                        return <circle key={k} cx={cx} cy={cy} r="4" fill="white" fillOpacity="0.5" />
                      })}
                      <circle cx="80" cy="88" r="22" fill="white" fillOpacity="0.06" stroke="white" strokeOpacity="0.15" strokeWidth="1" />
                      {/* Document shape */}
                      <rect x="155" y="38" width="110" height="100" rx="6" fill="white" fillOpacity="0.08" stroke="white" strokeOpacity="0.2" strokeWidth="1.5" />
                      <rect x="168" y="55" width="68" height="3.5" rx="2" fill="white" fillOpacity="0.35" />
                      <rect x="168" y="66" width="52" height="3" rx="1.5" fill="white" fillOpacity="0.2" />
                      <rect x="168" y="80" width="16" height="3" rx="1.5" fill="white" fillOpacity="0.2" />
                      <rect x="188" y="80" width="36" height="3" rx="1.5" fill="white" fillOpacity="0.2" />
                      {/* Checkmarks */}
                      <circle cx="172" cy="99" r="6" fill="white" fillOpacity="0.15" stroke="white" strokeOpacity="0.3" strokeWidth="1" />
                      <path d="M169 99 L171 101 L175 97" stroke="white" strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <rect x="182" y="96" width="40" height="3" rx="1.5" fill="white" fillOpacity="0.2" />
                      <circle cx="172" cy="113" r="6" fill="white" fillOpacity="0.15" stroke="white" strokeOpacity="0.3" strokeWidth="1" />
                      <path d="M169 113 L171 115 L175 111" stroke="white" strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <rect x="182" y="110" width="28" height="3" rx="1.5" fill="white" fillOpacity="0.2" />
                      {/* Decorative glow */}
                      <circle cx="310" cy="40" r="55" fill="white" fillOpacity="0.03" />
                    </svg>
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/70 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 rounded-full bg-indigo-500/90 backdrop-blur-sm px-2.5 py-1 text-[11px] font-semibold text-white">Normativa</span>
                    <span className="absolute bottom-3 right-3 text-[10px] text-white/40">8 Feb 2026 · 7 min</span>
                  </div>
                ),
              },
              {
                slug: "aceite-oliva-salud-cardiovascular-predimed",
                tag: "Guía práctica",
                tagBg: "bg-amber-600",
                title: "Optimización del rendimiento graso: 5 claves para mejorar tu producción",
                excerpt: "Factores como el momento de cosecha, la variedad y los tratamientos aplicados determinan el rendimiento graso de tu aceituna...",
                date: "1 Feb 2026",
                readTime: "4 min",
                visual: (
                  <div className="h-44 relative overflow-hidden bg-gradient-to-br from-amber-800 via-amber-700 to-trace-700">
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 360 176" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Rising bar chart */}
                      <rect x="60" y="120" width="28" height="30" rx="3" fill="white" fillOpacity="0.12" />
                      <rect x="100" y="100" width="28" height="50" rx="3" fill="white" fillOpacity="0.15" />
                      <rect x="140" y="78" width="28" height="72" rx="3" fill="white" fillOpacity="0.18" />
                      <rect x="180" y="58" width="28" height="92" rx="3" fill="white" fillOpacity="0.22" />
                      <rect x="220" y="38" width="28" height="112" rx="3" fill="white" fillOpacity="0.28" />
                      {/* Trend line */}
                      <polyline points="74,120 114,100 154,78 194,58 234,38" stroke="white" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      {/* Dots on trend */}
                      {[[74, 120], [114, 100], [154, 78], [194, 58], [234, 38]].map(([x, y], k) => (
                        <circle key={k} cx={x} cy={y} r="4" fill="white" fillOpacity="0.8" />
                      ))}
                      {/* Oil drop on the right */}
                      <path d="M295 55 C295 55 270 85 270 105 C270 120 281.5 132 295 132 C308.5 132 320 120 320 105 C320 85 295 55 295 55Z" fill="white" fillOpacity="0.10" stroke="white" strokeOpacity="0.2" strokeWidth="1.5" />
                      <path d="M295 80 C295 80 280 100 280 110 C280 118 287 124 295 124 C303 124 310 118 310 110 C310 100 295 80 295 80Z" fill="white" fillOpacity="0.08" />
                      {/* % label */}
                      <text x="295" y="107" textAnchor="middle" fontSize="14" fontWeight="700" fill="white" fillOpacity="0.6">%</text>
                      {/* Grid lines */}
                      <line x1="50" y1="150" x2="260" y2="150" stroke="white" strokeOpacity="0.12" strokeWidth="1" />
                    </svg>
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-900/70 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 rounded-full bg-amber-500/90 backdrop-blur-sm px-2.5 py-1 text-[11px] font-semibold text-white">Guía práctica</span>
                    <span className="absolute bottom-3 right-3 text-[10px] text-white/40">1 Feb 2026 · 4 min</span>
                  </div>
                ),
              },
            ].map((post, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`} className="block rounded-2xl border bg-white overflow-hidden card-hover group cursor-pointer">
                  {post.visual}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="rounded-full bg-trace-50 px-2 py-0.5 text-xs font-medium text-trace-700">{post.tag}</span>
                      <span className="text-xs text-gray-400">{post.date} · {post.readTime}</span>
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-trace-700 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-trace-600">
                      Leer más <ArrowUpRight size={14} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CONTACTO + CTA ========== */}
      <section id="contacto" className="py-24 scroll-mt-16 bg-trace-50/50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left: CTA copy + info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center rounded-full bg-trace-50 px-3 py-1 text-xs font-medium text-trace-700 border border-trace-200 mb-6">
                Contacto
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-display)" }}>
                Empieza a digitalizar tu explotación hoy
              </h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Únete a cientos de agricultores que ya confían en TRACE IT. Si tienes dudas o quieres una demo
                personalizada, escríbenos — respondemos en menos de 24 horas.
              </p>

              <ul className="space-y-3 mb-10">
                {[
                  "30 días de prueba gratuita, sin tarjeta de crédito",
                  "Setup en menos de 5 minutos",
                  "Soporte personalizado durante el onboarding",
                ].map((b) => (
                  <li key={b} className="flex items-center gap-2.5 text-sm text-gray-700">
                    <CheckCircle2 size={15} className="text-trace-600 flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>

              {/* Email pill */}
              <a
                href="mailto:traceitagency@gmail.com"
                className="inline-flex items-center gap-3 rounded-xl border bg-white px-4 py-3 shadow-sm hover:shadow transition-shadow group"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-trace-50 border border-trace-100 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-trace-600">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] text-gray-400">Correo electrónico</p>
                  <p className="text-sm font-semibold text-trace-700 group-hover:underline underline-offset-2">
                    info@traceit.es
                  </p>
                </div>
              </a>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="rounded-2xl border bg-white p-8 shadow-sm">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-trace-50 border border-trace-100">
                      <CheckCircle2 size={32} className="text-trace-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">¡Mensaje enviado!</h3>
                      <p className="text-sm text-gray-500">Te responderemos en menos de 24 horas en <span className="font-medium">{form.email}</span>.</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => { setSubmitted(false); setForm({ nombre: "", email: "", tipo: "Demo de la plataforma", mensaje: "" }) }}>
                      Enviar otro mensaje
                    </Button>
                  </div>
                ) : (
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault()
                      if (!form.nombre || !form.email) return
                      setSending(true)
                      try {
                        await fetch("https://formspree.io/f/xjgedvop", {
                          method: "POST",
                          headers: { "Accept": "application/json", "Content-Type": "application/json" },
                          body: JSON.stringify({ nombre: form.nombre, email: form.email, tipo: form.tipo, mensaje: form.mensaje }),
                        })
                        setSubmitted(true)
                      } finally {
                        setSending(false)
                      }
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <h3 className="text-base font-semibold text-gray-900 mb-1" style={{ fontFamily: 'var(--font-sans)' }}>Envíanos un mensaje</h3>
                      <p className="text-xs text-gray-400">Respuesta garantizada en menos de 24 horas.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">Nombre <span className="text-red-400">*</span></label>
                        <input
                          type="text"
                          required
                          placeholder="Nombre completo"
                          value={form.nombre}
                          onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
                          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-trace-500/20 focus:border-trace-400 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">Email <span className="text-red-400">*</span></label>
                        <input
                          type="email"
                          required
                          placeholder="Correo electrónico"
                          value={form.email}
                          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-trace-500/20 focus:border-trace-400 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">Tipo de consulta</label>
                      <select
                        value={form.tipo}
                        onChange={(e) => setForm((f) => ({ ...f, tipo: e.target.value }))}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-trace-500/20 focus:border-trace-400 transition-colors bg-white"
                      >
                        <option>Demo de la plataforma</option>
                        <option>Soporte técnico</option>
                        <option>Partnership / Almazara</option>
                        <option>Otra consulta</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">Mensaje</label>
                      <textarea
                        rows={4}
                        placeholder="Cuéntanos sobre tu explotación, número de parcelas o qué funcionalidad te interesa..."
                        value={form.mensaje}
                        onChange={(e) => setForm((f) => ({ ...f, mensaje: e.target.value }))}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-trace-500/20 focus:border-trace-400 transition-colors resize-none"
                      />
                    </div>

                    <Button type="submit" disabled={sending} className="w-full gap-2">
                      {sending ? "Enviando..." : "Enviar mensaje"}
                      {!sending && <ArrowRight size={16} />}
                    </Button>
                    <p className="text-center text-[11px] text-gray-400">Sin spam. Tus datos no se comparten con terceros.</p>
                  </form>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
            {/* Logo + nav links */}
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 sm:gap-y-2 lg:justify-start">
              <Logo size="sm" />
              <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 lg:justify-start">
                <a href="#funcionalidades" className="text-sm text-gray-500 hover:text-gray-900">Funcionalidades</a>
                <a href="#planes" className="text-sm text-gray-500 hover:text-gray-900">Planes</a>
                <a href="#casos" className="text-sm text-gray-500 hover:text-gray-900">Casos de Éxito</a>
                <a href="#blog" className="text-sm text-gray-500 hover:text-gray-900">Blog</a>
                <a href="#contacto" className="text-sm text-gray-500 hover:text-gray-900">Contacto</a>
              </nav>
            </div>
            {/* Social icons */}
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-gray-600"><Twitter size={18} /></a>
              <a href="#" className="text-gray-400 hover:text-gray-600"><Facebook size={18} /></a>
              <a href="#" className="text-gray-400 hover:text-gray-600"><Instagram size={18} /></a>
              <a href="#" className="text-gray-400 hover:text-gray-600"><Youtube size={18} /></a>
            </div>
            {/* Copyright */}
            <p className="text-center text-sm text-gray-400 lg:text-right">© 2026 TRACE IT. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
