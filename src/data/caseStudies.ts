export type CaseSlug = 'hidropronos' | 'raceway-rust-valvulas' | 'raceway-rust-sensores' | 'capitalink' | 'vixiaweb';
export interface EvidenceSource { id: string; label: string; path: string; description: string; }
export interface CaseStudy {
  slug: CaseSlug;
  accent: string;
  discipline: string;
  headline: string;
  intro: string;
  sceneTitle: string;
  sceneDescription: string;
  revision: string;
  reviewedAt: string;
  metrics: { value: string; label: string; context: string; source: string }[];
  architecture: { title: string; description: string; technology: string }[];
  decisions: { title: string; description: string }[];
  chart: {
    title: string; description: string; max: number; decimals: number; unit: string;
    series: string[]; rows: { label: string; values: number[] }[];
    source: string; context: string;
  };
  table: { title: string; columns: string[]; rows: string[][]; source: string; note: string };
  takeaway: string;
  sources: EvidenceSource[];
}

// Literal values from metricas_validacion.csv, endpoint vigilance >= 2,000, validation 2021.
// All 12 contexts are retained so that the displayed median is reproducible.
export const hidroValidation = [
  { reservoir: 'CAE', horizon: 'h0', strategy: 'individual', f1: 0.8928571428571429, aucpr: 0.9776270739265033 },
  { reservoir: 'CAE', horizon: 'h0', strategy: 'global_loro', f1: 0.8846153846153846, aucpr: 0.9728389822662397 },
  { reservoir: 'FOR', horizon: 'h0', strategy: 'individual', f1: 0.9090909090909091, aucpr: 0.9888403778951628 },
  { reservoir: 'FOR', horizon: 'h0', strategy: 'global_loro', f1: 0.896551724137931, aucpr: 0.9861343744545938 },
  { reservoir: 'BEC', horizon: 'h0', strategy: 'global_loro', f1: 0.9090909090909091, aucpr: 0.9818147834644608 },
  { reservoir: 'BEC', horizon: 'h0', strategy: 'individual', f1: 0.8780487804878049, aucpr: 0.9664395797411258 },
  { reservoir: 'CAE', horizon: 'h1', strategy: 'individual', f1: 0.8928571428571429, aucpr: 0.9758371971366265 },
  { reservoir: 'BEC', horizon: 'h1', strategy: 'global_loro', f1: 0.9333333333333333, aucpr: 0.9828270655293745 },
  { reservoir: 'CAE', horizon: 'h1', strategy: 'global_loro', f1: 0.9056603773584906, aucpr: 0.9721822502141587 },
  { reservoir: 'FOR', horizon: 'h1', strategy: 'global_loro', f1: 0.9090909090909091, aucpr: 0.9880345096150069 },
  { reservoir: 'FOR', horizon: 'h1', strategy: 'individual', f1: 0.9230769230769231, aucpr: 0.9845119871586608 },
  { reservoir: 'BEC', horizon: 'h1', strategy: 'individual', f1: 0.8780487804878049, aucpr: 0.9555636343481351 },
];

export function median(values: number[]) {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}
export function formatEvidence(value: number, decimals = 0) {
  return new Intl.NumberFormat('es-ES', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(value);
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'hidropronos', accent: '#92521e', discipline: 'INVESTIGACIÓN APLICADA / MACHINE LEARNING',
    headline: 'Anticipar el riesgo.\nRespetar el tiempo.',
    intro: 'Del historial ambiental a una estimación de riesgo de Microcystis. Un proyecto en el que la validación temporal y la transferencia entre embalses forman parte de la arquitectura.',
    sceneTitle: 'Un sistema de observación, memoria y predicción',
    sceneDescription: 'Tres embalses alimentan un pipeline de variables retrospectivas y modelos. La salida apoya la priorización del muestreo. Representación isométrica conceptual, no un mapa geográfico.',
    revision: '3c2421795f2d2cc37d7727daaa1a698fa67f0c2c', reviewedAt: '2026-11-10',
    metrics: [
      { value: '3', label: 'Embalses modelados', context: 'Beche, A Baxe y As Forcadas.', source: 'manifest' },
      { value: '24', label: 'Contextos de decisión', context: '3 embalses × 2 endpoints × 2 horizontes × 2 dominios.', source: 'manifest' },
      { value: formatEvidence(median(hidroValidation.map(row => row.f1)), 3), label: 'F1 mediana · vigilancia', context: '12 contextos, validación 2021, umbral ≥ 2.000 células/mL.', source: 'validation' },
      { value: formatEvidence(median(hidroValidation.map(row => row.aucpr)), 3), label: 'AUCPR mediana', context: 'Los mismos 12 contextos de vigilancia de 2021.', source: 'validation' },
    ],
    architecture: [
      { title: 'Observar y alinear', description: 'Se combinan calendario, meteorología, hidrología disponible y memoria biológica con una convención temporal causal.', technology: 'Pandas · Variables retrospectivas' },
      { title: 'Seleccionar y explicar', description: 'Los folds 2017–2020 comparan modelos y fijan un único umbral por contexto. SHAP y la importancia por permutación ayudan a interpretar la señal.', technology: 'scikit-learn · XGBoost · SHAP' },
      { title: 'Validar fuera de selección', description: '2021 permanece como validación primaria. El diseño individual y LORO permite examinar rendimiento local y transferencia espacial.', technology: 'F1 · AUCPR · Brier · LORO' },
    ],
    decisions: [
      { title: 'El tiempo no se baraja', description: 'Los predictores se construyen con información antecedente. Modelo y umbral se seleccionan antes de examinar la validación final.' },
      { title: 'La memoria también es un benchmark', description: 'Climatología, persistencia y memoria biológica permiten preguntar cuánto aporta el modelo más allá de referencias ecológicas simples.' },
      { title: 'Transferir es otra pregunta', description: 'En LORO el embalse objetivo se excluye del entrenamiento. Ese resultado se conserva separado de la evaluación individual.' },
    ],
    chart: {
      title: 'Rendimiento local y transferencia', description: 'F1 por embalse · vigilancia ≥ 2.000 células/mL · h0 · validación 2021.',
      max: 1, decimals: 3, unit: '', series: ['Individual', 'Global LORO'],
      rows: ['BEC', 'CAE', 'FOR'].map(reservoir => ({ label: reservoir, values: ['individual', 'global_loro'].map(strategy => hidroValidation.find(row => row.reservoir === reservoir && row.horizon === 'h0' && row.strategy === strategy)!.f1) })),
      source: 'validation', context: 'Este gráfico muestra 6 contextos h0. Las medianas superiores incluyen los 12 contextos h0/h1. Son resultados del snapshot del repositorio, no una medida de generalización regional ni de toxicidad.',
    },
    table: {
      title: 'La cohorte, por embalse', columns: ['Embalse', 'Días observados', 'Vigilancia positiva', 'Prevalencia'],
      rows: [['Beche · BEC', '410', '144', '35,1 %'], ['A Baxe · CAE', '675', '358', '53,0 %'], ['As Forcadas · FOR', '702', '426', '60,7 %']],
      source: 'cohort', note: 'Filas por embalse del EDA filtradas a BEC/CAE/FOR: 1.787 embalse-días. No incluye Cecebre, presente en la tabla exploratoria completa.',
    },
    takeaway: 'La aportación es un proceso de evaluación auditable: separar lo que se aprende, lo que se selecciona y lo que realmente se valida.',
    sources: [
      { id: 'validation', label: 'Resultados de validación', path: 'results/ml/full/metricas_validacion.csv', description: 'Valores originales de F1 y AUCPR. Medianas calculadas sobre las 12 filas de vigilancia; gráfico filtrado a h0.' },
      { id: 'manifest', label: 'Manifiesto del experimento', path: 'results/ml/full/ml_run_manifest.json', description: 'Ejes de comparación, selección 2017–2020 y validación primaria 2021. El registro indica creación el 14/09/2026.' },
      { id: 'cohort', label: 'Cohorte y prevalencia', path: 'results/eda/tabla_prevalencia_wilson.csv', description: 'Filas de vigilancia, ámbito embalse, BEC/CAE/FOR. Prevalencias redondeadas a una cifra decimal.' },
    ],
  },
  {
    slug: 'raceway-rust-valvulas', accent: '#a64723', discipline: 'RUST / AUTOMATIZACIÓN INDUSTRIAL',
    headline: 'Cada válvula.\nUna decisión de estado.',
    intro: 'Control de un circuito hidráulico con procesos que comparten elementos. La máquina de estados coordina órdenes, sensores de nivel y prioridades operativas.',
    sceneTitle: 'El circuito como sistema de estados',
    sceneDescription: 'Depósito Raceway, canal, decantador y cosecha conectados a un controlador. Ilustración isométrica conceptual: no es un plano de cableado ni una simulación de niveles en vivo.',
    revision: 'eca61f8e0200d914ab10d3669562f0256d5e9aa4', reviewedAt: '2026-11-10',
    metrics: [
      { value: '6', label: 'Entradas digitales', context: 'D0–D5: mínimos, nivel medio y máximos.', source: 'readme' },
      { value: '6', label: 'Procesos por relé', context: 'RL0–RL5 coordinan elementos hidráulicos compartidos.', source: 'readme' },
      { value: '16', label: 'Pruebas de automatización', context: 'Funciones #[test] en automation_tests.rs; recuento de código.', source: 'tests' },
      { value: '4', label: 'Niveles de prioridad', context: 'D2 → manual → fase/ciclo → autollenado.', source: 'readme' },
    ],
    architecture: [
      { title: 'Adquirir un estado válido', description: 'Las entradas del ADAM-6060 se leen por Modbus TCP. Una lectura fallida se marca como obsoleta, no como seis OFF nuevos.', technology: 'ADAM-6060 · tokio-modbus' },
      { title: 'Arbitrar el circuito', description: 'La máquina de estados, sin E/S, decide qué proceso puede tomar el control. La protección D2 permanece enclavada hasta D1 OFF.', technology: 'Rust · Máquina de estados · TOML' },
      { title: 'Actuar y supervisar', description: 'Las órdenes se envían al hardware y el dashboard distingue retorno de coils, última escritura y estados deducidos de las válvulas.', technology: 'Axum · WebSocket · SVG · Three.js' },
    ],
    decisions: [
      { title: 'Un relé no equivale a una válvula', description: 'RL0–RL5 son procesos. Algunos activan varias electroválvulas y un motor: el arbitraje evita reclamar simultáneamente un circuito compartido.' },
      { title: 'La protección es una prioridad de software', description: 'D2 preempta otros procesos y conserva el vaciado hasta D1 OFF. Su actuación requiere monitor, comunicación y alimentación disponibles.' },
      { title: 'Lo desconocido se conserva como desconocido', description: 'Se diferencia lectura válida, lectura obsoleta y última orden aceptada. Una confirmación de coil no se presenta como posición física de la válvula.' },
    ],
    chart: {
      title: 'Por qué el circuito necesita arbitraje', description: 'Número de elementos cableados por proceso. M representa el motor.',
      max: 3, decimals: 0, unit: '', series: ['Elementos actuados'],
      rows: [{ label: 'RL0 · Llenado RW', values: [1] }, { label: 'RL1 · Llenado decantador', values: [3] }, { label: 'RL2 · Sumidero', values: [2] }, { label: 'RL3 · Volcado', values: [2] }, { label: 'RL4 · Vaciado RW', values: [3] }, { label: 'RL5 · Cosecha', values: [2] }],
      source: 'readme', context: 'Recuento derivado de la tabla de salidas del README. Es topología funcional del circuito; no representa caudal, consumo ni rendimiento medido.',
    },
    table: {
      title: 'Relés y elementos compartidos', columns: ['Proceso', 'Elementos', 'Parada principal'],
      rows: [['RL0 · Llenado RW', 'V1', 'D1 ON + extra'], ['RL1 · Decantador', 'M + V3 + V5', 'D4 ON'], ['RL2 · Sumidero', 'V3 + V6', 'Tiempo configurado'], ['RL3 · Volcado', 'V3 + V2', 'Tiempo configurado'], ['RL4 · Vaciado RW', 'M + V5 + V6', 'D0 OFF; D1 OFF si protección D2'], ['RL5 · Cosecha', 'V3 + V4', 'D3 OFF o D5 ON']],
      source: 'readme', note: 'La protección por exceso conserva prioridad sobre los mandos manuales y las fases. El esquema de software no sustituye un enclavamiento eléctrico independiente.',
    },
    takeaway: 'La fiabilidad empieza por representar correctamente el estado, las prioridades y lo que el hardware realmente ha confirmado.',
    sources: [
      { id: 'readme', label: 'Circuito, señales y prioridades', path: 'README.md', description: 'Tablas D0–D5 y RL0–RL5, componentes por proceso y condiciones de parada.' },
      { id: 'tests', label: 'Pruebas de la máquina de estados', path: 'src/services/automation_tests.rs', description: '16 funciones anotadas con #[test]. El recuento no afirma su ejecución sobre hardware físico.' },
      { id: 'controller', label: 'Controlador sin E/S', path: 'src/services/automation.rs', description: 'Estados, configuración y arbitraje de prioridades.' },
    ],
  },
  {
    slug: 'raceway-rust-sensores', accent: '#78601e', discipline: 'RUST / ADQUISICIÓN Y TELEMETRÍA',
    headline: 'Distintos sensores.\nUn lenguaje de datos.',
    intro: 'Un backend asíncrono que une sensores de calidad del agua, buses industriales y secuencias de muestreo en una API común.',
    sceneTitle: 'De la sonda al registro consultable',
    sceneDescription: 'Tres dispositivos se conectan a un gateway de adquisición y a la persistencia. La escena es una representación conceptual de la integración, no una lectura de sensores conectados.',
    revision: '75bd34fa891a3053cea21f8923de434cdc508f46', reviewedAt: '2026-11-10',
    metrics: [
      { value: '3', label: 'Dispositivos configurados', context: 'Water_Sensors, Hach_WQ y Trilux_WQ.', source: 'devices' },
      { value: '13', label: 'Canales Modbus RTU', context: '8 del multiparamétrico + 5 del Hach; no son 13 variables únicas.', source: 'devices' },
      { value: '2', label: 'Buses RTU independientes', context: '9.600 y 19.200 baudios en la configuración revisada.', source: 'devices' },
      { value: '4', label: 'Etapas de muestreo', context: 'Llenado, calentamiento, lectura y vaciado.', source: 'readme' },
    ],
    architecture: [
      { title: 'Conectar dispositivos heterogéneos', description: 'La configuración declara buses RTU, parámetros, registros y codificación. Trilux se integra por puerto serie.', technology: 'Modbus RTU/TCP · tokio-serial · YAML' },
      { title: 'Orquestar la adquisición', description: 'DeviceManager mantiene buses y caché de lecturas. StageController coordina las fases necesarias para obtener muestras.', technology: 'Tokio · Arc · RwLock · Rust' },
      { title: 'Persistir y exponer', description: 'Las muestras se guardan en SQLite y se consultan mediante REST. La API y el seguimiento de tanques incorporan autenticación y WebSocket.', technology: 'SQLx · SQLite · Axum · JWT' },
    ],
    decisions: [
      { title: 'Un bus, su propia configuración', description: 'Los puertos, velocidades, paridad y direcciones se declaran por interfaz. El gestor no presupone que todos los sensores comparten parámetros serie.' },
      { title: 'La codificación es parte de la lectura', description: 'El multiparamétrico utiliza value_decimal y Hach ieee754_float. Interpretar un registro requiere conocer su longitud y codificación.' },
      { title: 'Simular sin cambiar la interfaz', description: 'Las implementaciones de SensorBus permiten mantener una API de adquisición común para simulación y conexiones físicas.' },
    ],
    chart: {
      title: 'La configuración real de adquisición', description: 'Canales RTU declarados en devices.yaml, agrupados por instrumento.',
      max: 8, decimals: 0, unit: '', series: ['Canales configurados'], rows: [{ label: 'Water_Sensors', values: [8] }, { label: 'Hach_WQ', values: [5] }],
      source: 'devices', context: 'Cuenta entradas parameter de la configuración, no muestras recibidas ni variables distintas. Trilux figura como dispositivo serie sin lista parameter y queda fuera de este gráfico.',
    },
    table: {
      title: 'Qué se lee y cómo se interpreta', columns: ['Dispositivo', 'Parámetros declarados', 'Codificación'],
      rows: [['Water_Sensors', 'TEMP, COD, TURB, C, PH, ION, NON, TSS', 'value_decimal · 9.600 baud'], ['Hach_WQ', 'PH, TEMP, TURB, DO, CONDUCTIVITY', 'ieee754_float · 19.200 baud'], ['Trilux_WQ', 'Dispositivo serie declarado', 'Puerto serie · 9.600 baud']],
      source: 'devices', note: 'Estos datos describen el archivo de configuración revisado. No se publican valores de calidad del agua inventados ni se afirma que el equipo esté conectado ahora.',
    },
    takeaway: 'Una adquisición útil conserva el contexto de cada lectura: dispositivo, parámetro, transporte, codificación y momento de captura.',
    sources: [
      { id: 'devices', label: 'Configuración de dispositivos', path: 'config/devices.yaml', description: 'Tres dispositivos; dos buses RTU con 8 y 5 canales explícitos; un dispositivo serie.' },
      { id: 'manager', label: 'Gestor de buses y lecturas', path: 'src/services/device_manager.rs', description: 'Creación de buses, SensorBus y caché protegida con RwLock.' },
      { id: 'readme', label: 'Etapas, API y persistencia', path: 'README.md', description: 'Las cuatro etapas de toma de muestras y las rutas de consulta.' },
    ],
  },
  {
    slug: 'capitalink', accent: '#984a36', discipline: 'FULL-STACK / PRODUCTO FINANCIERO',
    headline: 'Conectar capital\ncon oportunidades.',
    intro: 'Una plataforma con experiencias diferenciadas para inversores, fundadores y administración. Búsqueda de empresas, conversaciones y suscripciones conectadas por una API con reglas de acceso.',
    sceneTitle: 'Un producto construido alrededor de sus roles',
    sceneDescription: 'Empresas e inversores se conectan a través de una plataforma con API y persistencia. Los cuatro pilares representan planes configurados, no volumen de inversión ni ingresos.',
    revision: 'b23eab19316272c1dc7a151621e52ba64ad33e74', reviewedAt: '2026-11-10',
    metrics: [
      { value: '3', label: 'Áreas por rol', context: 'Inversores, fundadores y administración.', source: 'app' },
      { value: '4', label: 'Planes configurados', context: 'Free, Starter, Pro y Enterprise.', source: 'policy' },
      { value: '5', label: 'Niveles de inversor', context: 'Clasificación determinista definida en investor_level.', source: 'policy' },
      { value: '1–100', label: 'Rango del financial score', context: 'Regla heurística acotada en código, no un modelo de ML.', source: 'policy' },
    ],
    architecture: [
      { title: 'Una interfaz por objetivo', description: 'El frontend organiza perfiles, búsqueda, empresas y conversaciones con flujos distintos para inversor y fundador.', technology: 'Next.js · TypeScript · Zustand' },
      { title: 'Reglas en el backend', description: 'FastAPI aplica permisos por rol y propiedad. La búsqueda combina filtros con ranking determinista antes de paginar.', technology: 'FastAPI · SQLAlchemy · Políticas de dominio' },
      { title: 'Persistencia y suscripción', description: 'Las entidades se conservan con SQLAlchemy y migraciones. Las operaciones de suscripción se vinculan a cada empresa e integran Stripe.', technology: 'PostgreSQL · Alembic · Stripe' },
    ],
    decisions: [
      { title: 'Los permisos pertenecen al servidor', description: 'Ocultar un botón no sustituye una comprobación de rol o propietario. Las operaciones del backend aplican esas condiciones.' },
      { title: 'Puntuación explicable por construcción', description: 'El financial score se calcula con reglas explícitas y se acota a 1–100. No se etiqueta como predicción ni como recomendación financiera validada.' },
      { title: 'La empresa es la unidad de suscripción', description: 'Las rutas de suscripción resuelven la empresa y verifican propiedad antes de ejecutar las operaciones de facturación.' },
    ],
    chart: {
      title: 'La política comercial, expresada en código', description: 'Precio base configurado por plan, convertido de céntimos a euros.',
      max: 249, decimals: 0, unit: ' €', series: ['Precio base'], rows: [{ label: 'Free', values: [0] }, { label: 'Starter', values: [49] }, { label: 'Pro', values: [99] }, { label: 'Enterprise', values: [249] }],
      source: 'policy', context: 'Valores de TIERS.price_cents divididos entre 100, antes de descuentos. Son configuración de producto; no ingresos, ventas ni importes efectivamente cobrados.',
    },
    table: {
      title: 'Límites por plan', columns: ['Plan', 'Imágenes', 'Documentos', 'Métricas'],
      rows: [['Free', '3', '0', 'none'], ['Starter', '5', '2', 'basic'], ['Pro', '10', 'Sin límite configurado', 'full'], ['Enterprise', '10', 'Sin límite configurado', 'full']],
      source: 'policy', note: 'Se reflejan literalmente los límites de TIERS. None se presenta como ausencia de límite configurado, no como prueba de capacidad ilimitada del sistema.',
    },
    takeaway: 'La consistencia del producto depende de conectar interfaz, permisos, políticas de negocio y persistencia bajo las mismas reglas.',
    sources: [
      { id: 'policy', label: 'Políticas de planes y puntuación', path: 'backend/app/services/platform_policy.py', description: 'TIERS, investor_level y financial_score. Los valores del gráfico se derivan de price_cents / 100.' },
      { id: 'app', label: 'Composición de las rutas', path: 'backend/app/app.py', description: 'Aplicación FastAPI y organización de APIs por rol.' },
      { id: 'discovery', label: 'Búsqueda y ranking', path: 'backend/app/services/company_discovery.py', description: 'Filtros componibles, puntuación determinista y paginación.' },
      { id: 'subscriptions', label: 'Suscripciones por empresa', path: 'backend/app/api/v1/entrepreneur/subscription.py', description: 'Resolución de empresa, operaciones por propietario e integración Stripe.' },
    ],
  },
  {
    slug: 'vixiaweb', accent: '#a45123', discipline: 'FULL-STACK / VISUALIZACIÓN AMBIENTAL',
    headline: 'Hacer visibles\nlos datos del proyecto.',
    intro: 'Un portal que reúne presentación de proyectos e interfaces de consulta. Las APIs de blooms conectan datos de embalses, análisis estacional y métricas con una aplicación web.',
    sceneTitle: 'Interfaz, API y datos en una misma arquitectura',
    sceneDescription: 'Una interfaz web isométrica se apoya en servicios y almacenamiento. Los paneles son una ilustración de la arquitectura, no capturas ni datos de una instalación en vivo.',
    revision: '1c09501c0d13fbb5a95978bb7a0749e8456486e1', reviewedAt: '2026-11-10',
    metrics: [
      { value: '6', label: 'Fichas de catálogo', context: 'Entradas activas en proyectosData.ts; Balea está comentada.', source: 'catalog' },
      { value: '3', label: 'Endpoints de datos blooms', context: 'Datos de embalses, análisis estacional y métricas.', source: 'api' },
      { value: '3', label: 'Filtros de embalse', context: 'embalse, year y month en /datos-embalses.', source: 'api' },
      { value: '2', label: 'Capas de aplicación', context: 'Frontend Next.js y backend FastAPI, además de persistencia.', source: 'frontend' },
    ],
    architecture: [
      { title: 'Presentar y navegar', description: 'El portal combina catálogo de proyectos, acceso de usuarios y módulos específicos de blooms, Raceway, drones y sensórica.', technology: 'Next.js · Material UI · TypeScript' },
      { title: 'Consultar con contexto', description: 'FastAPI separa datos de embalses, series estacionales y archivos de métricas. Cada consulta conserva sus filtros de dominio.', technology: 'FastAPI · Pandas · Pydantic' },
      { title: 'Visualizar e integrar', description: 'Recharts y las interfaces de proyecto convierten la respuesta de la API en vistas consultables. La composición de servicios se declara con Docker Compose.', technology: 'Recharts · MySQL · Docker Compose' },
    ],
    decisions: [
      { title: 'Una consulta no es un endpoint genérico', description: 'Los datos de embalse, el análisis estacional y las métricas tienen contratos separados. El frontend consume una respuesta apropiada para cada vista.' },
      { title: 'Los filtros forman parte de la interfaz', description: 'El backend valida año y mes y admite listas de embalses o archivos según la consulta. La selección del usuario se conserva en la petición.' },
      { title: 'Un catálogo no implica seis sistemas desplegados', description: 'Las seis entradas son fichas declaradas en datos del frontend. La evidencia distingue catálogo, rutas e integración implementada.' },
    ],
    chart: {
      title: 'Tres contratos de consulta', description: 'Número de parámetros de consulta declarados en cada endpoint de blooms.',
      max: 4, decimals: 0, unit: '', series: ['Parámetros de consulta'], rows: [{ label: '/datos-embalses', values: [3] }, { label: '/analisis/estacional', values: [4] }, { label: '/datos-metricas', values: [2] }],
      source: 'api', context: 'Recuento de los argumentos Query/consulta de las tres funciones de blooms.py. No describe tráfico, latencia, usuarios ni capacidad de producción.',
    },
    table: {
      title: 'Qué admite cada consulta', columns: ['Ruta GET', 'Parámetros', 'Datos'],
      rows: [['/datos-embalses', 'embalse, year, month', 'Datos por embalse y periodo'], ['/analisis/estacional', 'embalse, desde, hasta, variable', 'Serie de análisis estacional'], ['/datos-metricas', 'embalses, files', 'Archivos de métricas']],
      source: 'api', note: 'Rutas relativas al router de proyectos/blooms. Los nombres de parámetros se conservan tal como aparecen en el código.',
    },
    takeaway: 'Hacer útiles los datos requiere diseñar también su contrato de consulta y la interfaz con la que se interpretan.',
    sources: [
      { id: 'api', label: 'Router de datos de blooms', path: 'backend/app/api/v1/proyectos/blooms.py', description: 'Tres endpoints GET y sus parámetros de consulta.' },
      { id: 'catalog', label: 'Catálogo de proyectos', path: 'frontend/src/data/proyectos/proyectosData.ts', description: 'Seis objetos activos; la entrada comentada de Balea no se cuenta.' },
      { id: 'frontend', label: 'Stack de la interfaz', path: 'frontend/package.json', description: 'Next.js, TypeScript, Material UI y Recharts.' },
      { id: 'backend', label: 'Dependencias del backend', path: 'backend/pyproject.toml', description: 'FastAPI, Pandas, SQLAlchemy y asyncmy.' },
    ],
  },
];

export function sourceUrl(study: CaseStudy, sourceId: string) {
  const source = study.sources.find(item => item.id === sourceId);
  if (!source) throw new Error(`Missing evidence source ${sourceId} in ${study.slug}`);
  return `https://github.com/guillermobastos/${study.slug}/blob/${study.revision}/${source.path.split('/').map(encodeURIComponent).join('/')}`;
}
