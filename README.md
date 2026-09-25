# TRACE IT — Plataforma de Trazabilidad Oleícola

MVP de trazabilidad y gestión digital para el sector oleícola. Permite a agricultores, cooperativas y almazaras digitalizar el ciclo completo del cultivo: del cuaderno de campo al certificado QR en botella.

---

## Inicio rápido

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## Acceso demo

Los modales de login vienen pre-rellenados. Solo pulsa **Iniciar Sesión**.

| Campo | Valor |
|-------|-------|
| Email | `antonio.lopez@fincaelolivar.es` |
| Contraseña | `traceit2026` |

---

## Páginas del dashboard

| Ruta | Descripción |
|------|-------------|
| `/overview` | Panel principal con KPIs, gráficas y actividad reciente |
| `/parcelas` | Gestión de parcelas con mapa catastral SVG y score de calidad |
| `/actividades` | Registro de tratamientos, riegos y labores del cuaderno de campo |
| `/campanas` | Histórico de campañas con producción y rendimiento graso |
| `/lotes` | Lotes trazables con estado y certificado QR |
| `/almazara` | Dashboard de almazara con mapa de proveedores de Andalucía |
| `/perfil` | Perfil de usuario, seguridad y preferencias de notificaciones |

---

## Stack técnico

| Tecnología | Versión | Uso |
|-----------|---------|-----|
| Next.js | 15.2+ | Framework principal (App Router) |
| React | 18.3 | UI |
| TypeScript | 5.7 | Tipado estático |
| Tailwind CSS | 3.4 | Estilos |
| Radix UI | — | Componentes accesibles (Dialog, Badge, etc.) |
| Recharts | 2.x | Gráficas y visualizaciones |
| Framer Motion | 10.x | Animaciones |
| Lucide React | — | Iconografía |
| ESLint | 9 | Linting con flat config |

---

## Estructura del proyecto

```
src/
├── app/
│   ├── page.tsx                  # Landing page
│   ├── layout.tsx                # Root layout con AuthProvider
│   ├── globals.css               # Estilos globales y variables CSS
│   └── (dashboard)/              # Rutas protegidas del panel
│       ├── layout.tsx            # Layout con Sidebar + TopBar
│       ├── overview/page.tsx
│       ├── parcelas/page.tsx
│       ├── actividades/page.tsx
│       ├── campanas/page.tsx
│       ├── lotes/page.tsx
│       ├── almazara/page.tsx
│       └── perfil/page.tsx
├── components/
│   ├── auth/auth-modal.tsx       # Modal login/registro
│   ├── layout/                   # Sidebar, TopBar, Logo
│   ├── charts/gauge-chart.tsx
│   └── ui/                       # Button, Card, Badge, etc.
├── contexts/
│   └── auth-context.tsx          # Autenticación via localStorage
└── lib/
    ├── mock-data.ts              # Datos ficticios del MVP
    ├── sidebar-context.tsx       # Estado colapsable del sidebar
    └── utils.ts                  # formatCurrency, formatKg, formatDate (es-ES)
```

---

## Scripts disponibles

```bash
npm run dev      # Servidor de desarrollo en localhost:3000
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # Comprobación ESLint
```

---

## Notas

- **Sin backend**: la autenticación usa `localStorage` (clave `traceit_user`). Apto solo para demo/MVP.
- **Datos ficticios**: todo el contenido viene de `src/lib/mock-data.ts`.
- **Formato español**: números y fechas en `es-ES` (1.234,56 €) mediante utilidades en `src/lib/utils.ts`.
- **Mapa Almazara**: iframe de OpenStreetMap, sin API key necesaria.
- El build pasa limpio: `0 errores, 0 warnings`.
