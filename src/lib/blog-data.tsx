import type { ReactNode } from "react"
import type { StaticImageData } from "next/image"
import olivaresJaen from "@/assets/blog/olivares-jaen.jpg"
import cosechaCutar from "@/assets/blog/cosecha-cutar.jpg"
import aove from "@/assets/blog/aove.jpg"

export interface BlogCoverImage {
  image: StaticImageData
  alt: string
  credit: { author: string; license: string; licenseUrl: string; url: string }
}

interface BlogPost {
  slug: string
  tag: string
  tagBg: string
  title: string
  excerpt: string
  date: string
  readTime: string
  author: { name: string; role: string; initials: string }
  cover: BlogCoverImage
  content: ReactNode
}

// Contenido de los artículos

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
      La recomendación de las organizaciones agrarias (ASAJA, COAG, UPA) es empezar la transición digital cuanto antes. Plataformas como <strong>OliTraceIT</strong> no solo cumplen con los requisitos previstos del cuaderno de campo digital, sino que además ofrecen trazabilidad de lotes, certificación QR y análisis de rendimiento por parcela y campaña.
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
      Herramientas de trazabilidad como <strong>OliTraceIT</strong> permiten documentar los parámetros que influyen en la calidad: fecha de cosecha, tiempo hasta molienda, variedad y rendimiento graso, generando una <strong>ficha técnica verificable</strong> que respalda la calidad del producto ante distribuidores y consumidores.
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

// Artículos

export const blogPosts: BlogPost[] = [
  {
    slug: "produccion-aceite-oliva-espana-2024-25",
    tag: "Producción",
    tagBg: "bg-emerald-600",
    title: "España recupera su liderazgo: la producción de aceite de oliva se dispara un 50% en la campaña 2024/25",
    excerpt: "Tras dos campañas históricamente malas por la sequía, España vuelve a superar 1,3 millones de toneladas de aceite de oliva según los datos del MAPA y el COI...",
    date: "28 Ene 2025",
    readTime: "6 min",
    author: { name: "Redacción OliTraceIT", role: "Equipo editorial", initials: "OT" },
    cover: {
      image: olivaresJaen,
      alt: "Lomas cubiertas de olivares en la provincia de Jaén",
      credit: { author: "Allie_Caulfield", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/", url: "https://commons.wikimedia.org/w/index.php?curid=7009887" },
    },
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
    cover: {
      image: cosechaCutar,
      alt: "Agricultores recogiendo aceituna con mantos y varas en un olivar de Cútar, Málaga",
      credit: { author: "Dguendel", license: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/", url: "https://commons.wikimedia.org/w/index.php?curid=148883184" },
    },
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
    cover: {
      image: aove,
      alt: "Aceitera de aceite de oliva virgen extra junto a aceitunas negras y ramas de olivo",
      credit: { author: "rawpixel", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/", url: "https://www.rawpixel.com/image/5944347/free-public-domain-cc0-photo" },
    },
    content: contentInvestigacion,
  },
]
