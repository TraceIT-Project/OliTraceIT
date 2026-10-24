# OliTraceIT — Plataforma de Trazabilidad Oleícola

MVP de trazabilidad y gestión digital para el sector oleícola. Permite a agricultores, cooperativas y almazaras digitalizar el ciclo completo del cultivo: del cuaderno de campo al certificado QR en botella.

---

## Inicio rápido

Requiere Node.js 20.9 o superior.

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## Acceso demo

Los formularios de login y registro vienen pre-rellenados. Solo pulsa **Iniciar Sesión**.

| Campo | Valor |
|-------|-------|
| Email | `antonio.lopez@fincaelolivar.es` |
| Contraseña | `OliTraceIT2026!` |

---

## Páginas

| Ruta | Descripción |
|------|-------------|
| `/` | Landing con funcionalidades, planes, casos de éxito, blog y contacto |
| `/blog/[slug]` | Artículos del blog (generados estáticamente) |
| `/overview` | Panel principal con KPIs, gráficas y actividad reciente |
| `/parcelas` | Identidad digital de parcela con mapa catastral SVG y score de calidad |
| `/actividades` | Registro de tratamientos, riegos y labores del cuaderno de campo |
| `/campanas` | Evolución NDVI, lluvia, insumos y rendimiento por campaña |
| `/lotes` | Lotes trazables con certificado QR |
| `/almazara` | Dashboard de almazara con ranking y mapa de proveedores de Andalucía |
| `/perfil` | Perfil de usuario, plan, seguridad y preferencias de notificaciones |

---

## Stack técnico

| Tecnología | Versión | Uso |
|-----------|---------|-----|
| Next.js | 16 | Framework (App Router, Turbopack) |
| React | 19 | UI |
| TypeScript | 5.9 | Tipado estático |
| Tailwind CSS | 4 | Estilos (configuración en `src/app/globals.css`) |
| Radix UI Select | 2 | Selector accesible |
| Recharts | 3 | Gráficas |
| Framer Motion | 14 | Animaciones |
| Lucide React | 1 | Iconografía |
| ESLint | 9 | Linting (flat config de `eslint-config-next`) |

---

## Estructura del proyecto

```
src/
├── app/
│   ├── page.tsx                  # Landing
│   ├── layout.tsx                # Layout raíz, fuentes y metadatos
│   ├── not-found.tsx             # Página 404
│   ├── globals.css               # Tema de Tailwind y estilos base
│   ├── blog/[slug]/page.tsx      # Artículo del blog
│   └── (dashboard)/              # Panel (Sidebar + TopBar)
│       ├── layout.tsx
│       └── overview | parcelas | actividades | campanas | lotes | almazara | perfil
├── components/
│   ├── auth/auth-modal.tsx       # Login / registro
│   ├── charts/gauge-chart.tsx
│   ├── layout/                   # Sidebar, TopBar, Logo y modales del panel
│   └── ui/                       # Button, Card, Badge, Modal, Select, etc.
└── lib/
    ├── blog-data.tsx             # Artículos del blog
    ├── mock-data.ts              # Datos ficticios del MVP
    ├── plans.ts                  # Planes y precios (landing, perfil y modal)
    ├── site.ts                   # Email de contacto y envío de formularios
    ├── sidebar-context.tsx       # Estado del sidebar
    └── utils.ts                  # cn, formatNumber, formatDate (es-ES)
```

---

## Scripts

```bash
npm run dev      # Servidor de desarrollo en localhost:3000
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # ESLint
```

---

## Notas

- **Sin backend**: el login es simulado y redirige al panel. Apto solo para demo/MVP.
- **Datos ficticios**: el contenido del panel viene de `src/lib/mock-data.ts`.
- **Formularios**: contacto y soporte se envían a Formspree (`src/lib/site.ts`).
- **Formato español**: números y fechas en `es-ES` mediante `src/lib/utils.ts`.
