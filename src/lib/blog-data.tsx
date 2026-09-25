import { ReactNode } from "react"

export interface BlogPost {
  slug: string
  tag: string
  tagBg: string
  title: string
  excerpt: string
  date: string
  readTime: string
  author: { name: string; role: string; initials: string }
  visual: ReactNode
  content: ReactNode
}

/* ================================================================
   VISUALS — SVG illustrations for blog card headers
   ================================================================ */

const visualTrazabilidad = (
  <div className="h-44 relative overflow-hidden bg-gradient-to-br from-trace-900 via-trace-800 to-emerald-700">
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 360 176" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="300" cy="30" rx="80" ry="50" fill="white" fillOpacity="0.04" transform="rotate(-30 300 30)" />
      <ellipse cx="320" cy="160" rx="70" ry="45" fill="white" fillOpacity="0.04" transform="rotate(20 320 160)" />
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
      <rect x="289" y="82" width="5" height="5" rx="0.5" fill="white" fillOpacity="0.7" />
      <rect x="296" y="82" width="5" height="5" rx="0.5" fill="white" fillOpacity="0.7" />
      <rect x="289" y="89" width="5" height="5" rx="0.5" fill="white" fillOpacity="0.7" />
      <rect x="296" y="89" width="2" height="2" fill="white" fillOpacity="0.7" />
      <rect x="300" y="89" width="2" height="2" fill="white" fillOpacity="0.7" />
      <text x="55" y="120" textAnchor="middle" fontSize="8" fill="white" fillOpacity="0.5">Campo</text>
      <text x="135" y="120" textAnchor="middle" fontSize="8" fill="white" fillOpacity="0.5">Cosecha</text>
      <text x="215" y="120" textAnchor="middle" fontSize="8" fill="white" fillOpacity="0.5">Almazara</text>
      <text x="295" y="120" textAnchor="middle" fontSize="8" fill="white" fillOpacity="0.5">Botella</text>
      <path d="M345 10 C335 20 325 40 340 55 C355 40 355 20 345 10Z" fill="white" fillOpacity="0.08" />
      <path d="M345 10 L340 55" stroke="white" strokeOpacity="0.12" strokeWidth="1" />
    </svg>
    <div className="absolute inset-0 bg-gradient-to-t from-trace-900/70 via-transparent to-transparent" />
    <span className="absolute bottom-3 right-3 text-[10px] text-white/40">28 Ene 2025 · 6 min</span>
  </div>
)

const visualNormativa = (
  <div className="h-44 relative overflow-hidden bg-gradient-to-br from-indigo-900 via-indigo-800 to-blue-700">
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 360 176" fill="none" xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: 12 }, (_, k) => {
        const angle = (k * 30 - 90) * (Math.PI / 180)
        const cx = 80 + Math.cos(angle) * 38
        const cy = 88 + Math.sin(angle) * 38
        return <circle key={k} cx={cx} cy={cy} r="4" fill="white" fillOpacity="0.5" />
      })}
      <circle cx="80" cy="88" r="22" fill="white" fillOpacity="0.06" stroke="white" strokeOpacity="0.15" strokeWidth="1" />
      <rect x="155" y="38" width="110" height="100" rx="6" fill="white" fillOpacity="0.08" stroke="white" strokeOpacity="0.2" strokeWidth="1.5" />
      <rect x="168" y="55" width="68" height="3.5" rx="2" fill="white" fillOpacity="0.35" />
      <rect x="168" y="66" width="52" height="3" rx="1.5" fill="white" fillOpacity="0.2" />
      <rect x="168" y="80" width="16" height="3" rx="1.5" fill="white" fillOpacity="0.2" />
      <rect x="188" y="80" width="36" height="3" rx="1.5" fill="white" fillOpacity="0.2" />
      <circle cx="172" cy="99" r="6" fill="white" fillOpacity="0.15" stroke="white" strokeOpacity="0.3" strokeWidth="1" />
      <path d="M169 99 L171 101 L175 97" stroke="white" strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="182" y="96" width="40" height="3" rx="1.5" fill="white" fillOpacity="0.2" />
      <circle cx="172" cy="113" r="6" fill="white" fillOpacity="0.15" stroke="white" strokeOpacity="0.3" strokeWidth="1" />
      <path d="M169 113 L171 115 L175 111" stroke="white" strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="182" y="110" width="28" height="3" rx="1.5" fill="white" fillOpacity="0.2" />
      <circle cx="310" cy="40" r="55" fill="white" fillOpacity="0.03" />
    </svg>
    <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/70 via-transparent to-transparent" />
    <span className="absolute bottom-3 right-3 text-[10px] text-white/40">1 Jul 2024 · 7 min</span>
  </div>
)

const visualRendimiento = (
  <div className="h-44 relative overflow-hidden bg-gradient-to-br from-amber-800 via-amber-700 to-trace-700">
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 360 176" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="60" y="120" width="28" height="30" rx="3" fill="white" fillOpacity="0.12" />
      <rect x="100" y="100" width="28" height="50" rx="3" fill="white" fillOpacity="0.15" />
      <rect x="140" y="78" width="28" height="72" rx="3" fill="white" fillOpacity="0.18" />
      <rect x="180" y="58" width="28" height="92" rx="3" fill="white" fillOpacity="0.22" />
      <rect x="220" y="38" width="28" height="112" rx="3" fill="white" fillOpacity="0.28" />
      <polyline points="74,120 114,100 154,78 194,58 234,38" stroke="white" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {[[74, 120], [114, 100], [154, 78], [194, 58], [234, 38]].map(([x, y], k) => (
        <circle key={k} cx={x} cy={y} r="4" fill="white" fillOpacity="0.8" />
      ))}
      <path d="M295 55 C295 55 270 85 270 105 C270 120 281.5 132 295 132 C308.5 132 320 120 320 105 C320 85 295 55 295 55Z" fill="white" fillOpacity="0.10" stroke="white" strokeOpacity="0.2" strokeWidth="1.5" />
      <path d="M295 80 C295 80 280 100 280 110 C280 118 287 124 295 124 C303 124 310 118 310 110 C310 100 295 80 295 80Z" fill="white" fillOpacity="0.08" />
      <text x="295" y="107" textAnchor="middle" fontSize="14" fontWeight="700" fill="white" fillOpacity="0.6">%</text>
      <line x1="50" y1="150" x2="260" y2="150" stroke="white" strokeOpacity="0.12" strokeWidth="1" />
    </svg>
    <div className="absolute inset-0 bg-gradient-to-t from-amber-900/70 via-transparent to-transparent" />
    <span className="absolute bottom-3 right-3 text-[10px] text-white/40">Mar 2023 · 5 min</span>
  </div>
)

/* ================================================================
   ARTICLE CONTENT — real news with source links
   ================================================================ */

const contentProduccion = (
  <>
    <p>
      La campaña oleícola 2024/25 ha marcado un cambio radical respecto a las dos campañas anteriores. Según datos oficiales del <strong>Ministerio de Agricultura, Pesca y Alimentación (MAPA)</strong>, España ha producido aproximadamente <strong>1,3 millones de toneladas de aceite de oliva</strong>, un incremento superior al 50% frente a las 780.000 toneladas de la desastrosa campaña 2023/24.
    </p>

    <h2>Un respiro tras dos años de sequía histórica</h2>
    <p>
      Las campañas 2022/23 y 2023/24 fueron las peores en décadas. La sequía extrema que golpeó Andalucía, Castilla-La Mancha y Extremadura redujo la producción española a niveles no vistos desde los años 90. Los precios del aceite de oliva virgen extra se dispararon hasta superar los <strong>9 €/kg en origen</strong>, un récord histórico que tensó toda la cadena de valor.
    </p>
    <p>
      Las lluvias de otoño de 2024, especialmente abundantes en el Valle del Guadalquivir, cambiaron el panorama. Los olivos, que habían sufrido un estrés hídrico acumulado de dos años, respondieron con una floración intensa y un cuajado de fruto excepcional.
    </p>

    <h2>Impacto en los precios</h2>
    <p>
      La recuperación de la producción ha tenido un efecto directo en los precios. Según el <strong>Sistema POOLRED</strong> (el índice de referencia del aceite de oliva español), el precio medio del virgen extra en origen ha descendido desde los máximos de 8,5-9 €/kg hasta situarse en torno a <strong>5-6 €/kg</strong> a principios de 2025.
    </p>
    <p>
      No obstante, los analistas advierten que los precios aún se mantienen por encima de la media histórica (3-4 €/kg) debido a que las existencias acumuladas siguen siendo bajas tras dos años de déficit.
    </p>

    <h2>Datos por comunidades autónomas</h2>
    <ul>
      <li><strong>Andalucía:</strong> Concentra el 80% de la producción nacional. Jaén sigue siendo la provincia líder mundial, seguida de Córdoba y Granada.</li>
      <li><strong>Castilla-La Mancha:</strong> Segunda comunidad productora, con una recuperación significativa en Ciudad Real y Toledo.</li>
      <li><strong>Extremadura:</strong> Incremento del 60% respecto a la campaña anterior, impulsado por el regadío del Guadiana.</li>
      <li><strong>Cataluña y Aragón:</strong> Producción estable, con las variedades Arbequina y Empeltre como protagonistas.</li>
    </ul>

    <h2>Contexto internacional</h2>
    <p>
      A nivel mundial, el <strong>Consejo Oleícola Internacional (COI)</strong> estima una producción global de 3,2 millones de toneladas, recuperando niveles cercanos a la media. Italia, Grecia, Túnez y Turquía también han reportado cosechas superiores a las de los dos últimos años.
    </p>

    <h2>¿Qué esperar de la campaña 2025/26?</h2>
    <p>
      Los expertos de la <strong>Agencia Estatal de Meteorología (AEMET)</strong> señalan que las reservas hídricas en los embalses andaluces están al 55% de su capacidad, frente al 30% de hace un año. Si las precipitaciones de primavera acompañan, la próxima campaña podría consolidar la recuperación.
    </p>
    <p>
      Sin embargo, el cambio climático sigue siendo la gran amenaza estructural. Los modelos del <strong>IPCC</strong> prevén que la cuenca mediterránea experimentará sequías más frecuentes e intensas, lo que obliga al sector a invertir en <strong>riego eficiente, variedades resistentes y herramientas de trazabilidad digital</strong> que optimicen cada gota de agua y cada kilo de aceituna.
    </p>

    <h2>Fuentes y enlaces</h2>
    <ul>
      <li><a href="https://www.mapa.gob.es/es/agricultura/temas/producciones-agricolas/aceite-oliva-y-aceituna-mesa/" target="_blank" rel="noopener noreferrer">Ministerio de Agricultura — Aceite de oliva y aceituna de mesa (MAPA)</a></li>
      <li><a href="https://www.internationaloliveoil.org/" target="_blank" rel="noopener noreferrer">Consejo Oleícola Internacional (COI) — Datos de producción mundial</a></li>
      <li><a href="https://www.poolred.com/" target="_blank" rel="noopener noreferrer">POOLRED — Precios en origen del aceite de oliva</a></li>
    </ul>
  </>
)

const contentNormativa = (
  <>
    <p>
      El <strong>Reglamento (UE) 2024/1253</strong>, publicado en el Diario Oficial de la Unión Europea el 1 de julio de 2024, modifica el marco normativo de la Política Agrícola Común (PAC) y establece la obligatoriedad del <strong>cuaderno de campo digital</strong> para todos los agricultores que reciban ayudas directas. Esta medida afecta de lleno al sector oleícola español, el mayor productor mundial de aceite de oliva.
    </p>

    <h2>¿Qué cambia exactamente?</h2>
    <p>
      Hasta ahora, el cuaderno de campo podía llevarse en papel. A partir de la campaña <strong>2027</strong>, todos los Estados miembros deberán exigir su versión digital. El reglamento busca tres objetivos: simplificar la burocracia para el agricultor, mejorar el control fitosanitario y aumentar la transparencia en la cadena alimentaria.
    </p>

    <h2>Calendario de implantación</h2>
    <ul>
      <li><strong>2024-2025:</strong> Periodo de desarrollo técnico. Los Estados miembros deben definir los estándares de interoperabilidad.</li>
      <li><strong>2025-2026:</strong> Fase piloto voluntaria. Las comunidades autónomas ofrecen formación y herramientas homologadas.</li>
      <li><strong>2027 (campaña PAC):</strong> Entrada en vigor obligatoria. Las solicitudes de ayuda PAC deberán incluir datos del cuaderno digital.</li>
    </ul>

    <h2>¿Qué datos se deben registrar?</h2>
    <p>
      El reglamento y su desarrollo técnico (pendiente de las directrices nacionales) exigen, como mínimo:
    </p>
    <ul>
      <li>Identificación SIGPAC de cada parcela y cultivo</li>
      <li>Fecha, tipo, producto comercial, materia activa y dosis de cada tratamiento fitosanitario</li>
      <li>Plazos de seguridad antes de cosecha</li>
      <li>Fertilizaciones: tipo (orgánica/mineral), cantidad y método de aplicación</li>
      <li>Riegos: volumen estimado y sistema utilizado</li>
      <li>Datos de cosecha: fecha, cantidad recolectada y destino (almazara, venta directa, etc.)</li>
    </ul>

    <h2>Implicaciones para el olivarero</h2>
    <p>
      Para un olivicultor medio en Jaén con 15 parcelas y 4.000 olivos, esto significa pasar de apuntar los tratamientos en un cuaderno de papel (o no apuntarlos) a usar una aplicación que registre cada operación con fecha, geolocalización y producto. El <strong>MAPA</strong> estima que el 65% de los olivareros españoles aún no utilizan ninguna herramienta digital para su gestión agronómica.
    </p>

    <h2>Sanciones y condicionalidad</h2>
    <p>
      El incumplimiento está ligado a la <strong>condicionalidad reforzada</strong> de la PAC 2023-2027. Un agricultor que no presente su cuaderno digital puede sufrir reducciones del 1% al 3% en sus ayudas directas. En caso de incumplimiento reiterado o negligencia grave, la penalización puede alcanzar el 10%.
    </p>

    <h2>Cómo prepararse desde ya</h2>
    <p>
      La recomendación de las organizaciones agrarias (ASAJA, COAG, UPA) es empezar la transición digital cuanto antes. Plataformas como <strong>Trace IT</strong> no solo cumplen con los requisitos previstos del cuaderno de campo digital, sino que además ofrecen trazabilidad de lotes, certificación QR y análisis de rendimiento por parcela y campaña.
    </p>

    <h2>Fuentes y enlaces</h2>
    <ul>
      <li><a href="https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32024R1253" target="_blank" rel="noopener noreferrer">Reglamento (UE) 2024/1253 — Diario Oficial de la UE (EUR-Lex)</a></li>
      <li><a href="https://www.mapa.gob.es/es/pac/post-2020/" target="_blank" rel="noopener noreferrer">Plan Estratégico de la PAC de España (MAPA)</a></li>
      <li><a href="https://www.fega.gob.es/" target="_blank" rel="noopener noreferrer">FEGA — Fondo Español de Garantía Agraria</a></li>
    </ul>
  </>
)

const contentInvestigacion = (
  <>
    <p>
      Un estudio publicado en la revista científica <strong>PLOS Medicine</strong> en 2022, con datos del proyecto PREDIMED (Prevención con Dieta Mediterránea), confirmó que el consumo regular de aceite de oliva virgen extra (AOVE) está asociado con una <strong>reducción del 19% en la mortalidad cardiovascular</strong> y una disminución significativa del riesgo de enfermedades neurodegenerativas.
    </p>

    <h2>El estudio PREDIMED: una referencia mundial</h2>
    <p>
      El ensayo PREDIMED, financiado por el <strong>Instituto de Salud Carlos III</strong> y coordinado desde la Universidad de Barcelona, es el mayor estudio de intervención nutricional realizado en España. Durante más de 7 años se siguió a 7.447 participantes de alto riesgo cardiovascular, asignados aleatoriamente a tres grupos: dieta mediterránea suplementada con AOVE, dieta mediterránea con frutos secos, y dieta baja en grasas (control).
    </p>

    <h2>Resultados principales</h2>
    <ul>
      <li><strong>Reducción del 31%</strong> en eventos cardiovasculares graves (infarto, ictus, muerte cardiovascular) en el grupo de AOVE frente al control.</li>
      <li><strong>Reducción del 19%</strong> en mortalidad por todas las causas asociada al consumo habitual de AOVE (&gt;1 cucharada/día).</li>
      <li><strong>Menor incidencia de diabetes tipo 2</strong> (reducción del 40%) en el grupo con mayor consumo de AOVE.</li>
      <li><strong>Efecto neuroprotector:</strong> Mejor rendimiento cognitivo y menor riesgo de deterioro cognitivo leve en los participantes que consumían más AOVE.</li>
    </ul>

    <h2>¿Por qué el virgen extra y no otro aceite?</h2>
    <p>
      La clave está en los <strong>polifenoles</strong>. El AOVE contiene entre 150 y 400 mg/kg de compuestos fenólicos (oleocantal, hidroxitirosol, oleuropeína), mientras que un aceite de oliva refinado prácticamente carece de ellos. Estos polifenoles tienen propiedades antiinflamatorias, antioxidantes y antitrombóticas que explican buena parte de los beneficios observados.
    </p>
    <p>
      La <strong>Autoridad Europea de Seguridad Alimentaria (EFSA)</strong> aprobó en 2012 una declaración de salud específica: los polifenoles del aceite de oliva contribuyen a la protección de los lípidos sanguíneos frente al estrés oxidativo, siempre que el aceite contenga al menos 5 mg de hidroxitirosol por 20 g de aceite.
    </p>

    <h2>Implicaciones para el sector oleícola</h2>
    <p>
      Estos hallazgos científicos refuerzan la propuesta de valor del aceite de oliva virgen extra como <strong>alimento funcional premium</strong>. Para el olivarero, el mensaje es claro: la calidad importa. Un aceite con alta concentración de polifenoles (cosecha temprana, procesado rápido, almacenamiento adecuado) no solo es mejor para la salud, sino que justifica un precio superior en el mercado.
    </p>
    <p>
      Herramientas de trazabilidad como <strong>Trace IT</strong> permiten documentar los parámetros que influyen en la calidad: fecha de cosecha, tiempo hasta molienda, variedad y rendimiento graso, generando una <strong>ficha técnica verificable</strong> que respalda la calidad del producto ante distribuidores y consumidores.
    </p>

    <h2>Fuentes y enlaces</h2>
    <ul>
      <li><a href="https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.1003911" target="_blank" rel="noopener noreferrer">PLOS Medicine — Consumption of Olive Oil and Risk of Total and Cause-Specific Mortality (2022)</a></li>
      <li><a href="https://www.predimed.es/" target="_blank" rel="noopener noreferrer">Proyecto PREDIMED — Web oficial del estudio</a></li>
      <li><a href="https://www.efsa.europa.eu/en/efsajournal/pub/2848" target="_blank" rel="noopener noreferrer">EFSA — Declaración de salud sobre polifenoles del aceite de oliva (2012)</a></li>
      <li><a href="https://www.nejm.org/doi/full/10.1056/nejmoa1800389" target="_blank" rel="noopener noreferrer">NEJM — Primary Prevention of Cardiovascular Disease with a Mediterranean Diet (PREDIMED)</a></li>
    </ul>
  </>
)

/* ================================================================
   BLOG POSTS ARRAY
   ================================================================ */

export const blogPosts: BlogPost[] = [
  {
    slug: "produccion-aceite-oliva-espana-2024-25",
    tag: "Producción",
    tagBg: "bg-emerald-600",
    title: "España recupera su liderazgo: la producción de aceite de oliva se dispara un 50% en la campaña 2024/25",
    excerpt: "Tras dos campañas históricamente malas por la sequía, España vuelve a superar 1,3 millones de toneladas de aceite de oliva según los datos del MAPA y el COI...",
    date: "28 Ene 2025",
    readTime: "6 min",
    author: { name: "Redacción Trace IT", role: "Equipo editorial", initials: "TI" },
    visual: visualTrazabilidad,
    content: contentProduccion,
  },
  {
    slug: "reglamento-europeo-cuaderno-campo-digital-2024",
    tag: "Normativa",
    tagBg: "bg-indigo-600",
    title: "Reglamento (UE) 2024/1253: el cuaderno de campo digital será obligatorio en 2027",
    excerpt: "La Unión Europea ha publicado el reglamento que obliga a digitalizar el cuaderno de campo. Te explicamos las fechas clave, los datos exigidos y las sanciones...",
    date: "1 Jul 2024",
    readTime: "7 min",
    author: { name: "Carlos Ruiz", role: "Asesor agrario y legal", initials: "CR" },
    visual: visualNormativa,
    content: contentNormativa,
  },
  {
    slug: "aceite-oliva-salud-cardiovascular-predimed",
    tag: "Investigación",
    tagBg: "bg-amber-600",
    title: "Estudio PREDIMED: el aceite de oliva virgen extra reduce un 19% la mortalidad cardiovascular",
    excerpt: "El mayor ensayo clínico sobre dieta mediterránea confirma los beneficios del AOVE para el corazón, el cerebro y la prevención de diabetes tipo 2...",
    date: "Mar 2023",
    readTime: "5 min",
    author: { name: "Ana Belén Torres", role: "Ingeniera agrónoma", initials: "AT" },
    visual: visualRendimiento,
    content: contentInvestigacion,
  },
]
