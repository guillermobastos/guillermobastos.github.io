import { formatEvidence, hidroValidation, median } from './caseStudies';

export interface Project {
  id: string;
  number: string;
  category: string;
  title: string;
  summary: string;
  problem: string;
  approach: string;
  result: string;
  stack: string[];
  details: string[];
  repository?: string;
  cvFeatured?: boolean;
  visual: 'satellite' | 'spectral' | 'water' | 'algae' | 'forecast' | 'control' | 'sensors' | 'finance' | 'platform';
}

export const profile = {
  name: 'Guillermo Bastos Ribas',
  shortName: 'Guillermo Bastos',
  role: 'Data Scientist · Backend & ML Engineer',
  headline: 'De los datos a decisiones que importan.',
  summary: 'Desarrollo modelos de machine learning y el software que los conecta con el mundo real. De imágenes satelitales a APIs, sensores y sistemas embebidos.',
  focus: 'ML aplicado · Backend · Sistemas embebidos',
  site: 'https://guillermobastos.github.io',
  email: 'bastosribasguillermo@gmail.com',
  github: 'https://github.com/guillermobastos',
  linkedin: 'https://www.linkedin.com/in/guillermo-bastos-4aba6b156/',
  cv: '/cv.pdf',
  overview: {
    heading: 'Me interesa el modelo.',
    emphasis: 'Y todo lo que lo hace útil.',
    description: 'Trabajo entre ciencia de datos y desarrollo de software: desde evaluar un modelo con honestidad hasta integrarlo con una API o un dispositivo físico.',
    pillars: [
      { icon: 'data', title: 'Data Science aplicado', description: 'Predicción ambiental, variables temporales y evaluación de modelos en HidroPronos.' },
      { icon: 'code', title: 'Backend con visión de producto', description: 'APIs con FastAPI y Flask, persistencia e interfaces para poner los datos al alcance del usuario.' },
      { icon: 'chip', title: 'Software que toca el mundo real', description: 'Rust, sensores, adquisición de datos y control de procesos con hardware.' },
    ],
  },
  impact: [
    {
      value: formatEvidence(median(hidroValidation.map(row => row.f1)), 3), unit: 'F1',
      category: 'ML · VALIDACIÓN 2021', label: 'Predicciones que se ponen a prueba',
      description: 'Mediana en 12 contextos de vigilancia de Microcystis. Tres embalses, evaluación temporal y transferencia LORO.',
      context: 'Umbral biológico ≥ 2.000 células/mL.',
      href: '/proyectos/hidropronos/#datos', project: 'HidroPronos', icon: 'data',
    },
    {
      value: '6', unit: 'procesos', category: 'RUST · AUTOMATIZACIÓN', label: 'Control con prioridades explícitas',
      description: 'Llenado, decantación, cosecha y vaciado coordinados por una máquina de estados con protección de exceso de nivel.',
      context: '16 pruebas definidas para la automatización.',
      href: '/proyectos/raceway-rust-valvulas/#datos', project: 'Raceway · Válvulas', icon: 'chip',
    },
    {
      value: '13', unit: 'canales', category: 'SENSORES · ADQUISICIÓN', label: 'Del instrumento al dato consultable',
      description: 'Canales Modbus RTU de dos instrumentos, integrados con adquisición asíncrona, persistencia y API.',
      context: '8 + 5 canales; no son 13 variables únicas.',
      href: '/proyectos/raceway-rust-sensores/#datos', project: 'Raceway · Sensores', icon: 'code',
    },
    {
      value: '3', unit: 'roles', category: 'FULL-STACK · PRODUCTO', label: 'Una experiencia para cada usuario',
      description: 'Inversores, fundadores y administración conectados con búsqueda de empresas, permisos y suscripciones.',
      context: 'Next.js + FastAPI · Políticas verificadas en código.',
      href: '/proyectos/capitalink/#datos', project: 'CapitalInk', icon: 'window',
    },
  ],
  experience: [
    {
      role: 'Data Scientist', company: 'Universidade de Vigo', project: 'Proyecto HidroPronos',
      start: '2025-06', end: null, period: 'jun 2025 — actualidad', contract: 'Jornada completa',
      summary: 'Machine learning para detectar y predecir blooms de cianobacterias en embalses.',
      achievements: [
        'Integración de imágenes Copernicus Sentinel II/III con datos ambientales y fisicoquímicos.',
        'Clasificación con scikit-learn, XGBoost, LightGBM, CatBoost y Random Forest; ajuste de hiperparámetros con Random Search.',
        'Validación temporal walk-forward, evitando leakage, y métricas compuestas Bloom_Detection, Risk_Based, Conservative y MCC_Dominant.',
        'Reglas operativas de alerta con persistencia e histéresis: lógica 2/3 días para reducir falsos positivos.',
      ],
      stack: ['Python', 'scikit-learn', 'xarray', 'Git'],
    },
    {
      role: 'Backend Developer', company: null, project: 'Sistemas embebidos y control',
      start: '2026-02', end: '2026-10', period: 'feb 2026 — oct 2026', contract: null,
      summary: 'Software en Rust para control de válvulas y lectura de sensores en tiempo real.',
      achievements: [
        'Lógica backend de comunicación con hardware y captura de datos en tiempo real.',
        'Sistemas de control, automatización y procesamiento de señales.',
        'Componentes robustos para entornos con restricciones de rendimiento y fiabilidad.',
      ],
      stack: ['Rust', 'Sistemas embebidos', 'Sensores'],
    },
    {
      role: 'Backend Developer | Data Scientist', company: 'VIXIA SYSTEM SL', project: 'Vigo',
      start: '2024-04', end: '2025-06', period: 'abr 2024 — jun 2025', contract: null,
      summary: 'Del análisis a la entrega: coordinación y desarrollo de un producto para estudiar la evolución de microalgas.',
      achievements: [
        'Predicción de evolución con datos ambientales y modelos analíticos.',
        'Desarrollo full-stack con Next.js y FastAPI; APIs para procesar, exponer y consumir datos.',
        'Entorno containerizado con Docker y Docker Compose, y persistencia en MySQL.',
        'Ciclo completo del producto: análisis, desarrollo, integración, validación y entrega.',
      ],
      stack: ['Next.js', 'FastAPI', 'Docker', 'MySQL', 'scikit-learn', 'Git'],
    },
    {
      role: 'Desarrollador Front-end', company: null, project: null,
      start: '2024-09', end: '2025-05', period: 'sept 2024 — may 2025', contract: 'Jornada completa',
      summary: 'Desarrollo frontend.',
      achievements: [],
      stack: ['Git', 'MySQL'],
    },
  ],
  skills: [
    { name: 'ML & Data', icon: 'data', description: 'Del dato a una evaluación rigurosa.', items: ['Python', 'scikit-learn', 'XGBoost', 'LightGBM', 'CatBoost', 'Random Forest', 'Pandas', 'NumPy', 'Matplotlib', 'JupyterLab', 'xarray', 'NetCDF4', 'Machine Learning'] },
    { name: 'Backend', icon: 'code', description: 'La lógica que conecta el producto.', items: ['FastAPI', 'Flask', 'Rust', 'SQL / MySQL', 'APIs REST'] },
    { name: 'Frontend', icon: 'window', description: 'Interfaces para hacer útiles los datos.', items: ['TypeScript', 'Next.js', 'React', 'Astro'] },
    { name: 'Infra & Embedded', icon: 'chip', description: 'Del contenedor al dispositivo.', items: ['Docker', 'Docker Compose', 'Git', 'Raspberry Pi', 'Arduino', 'Sistemas embebidos'] },
  ],
  education: [
    { title: 'FP · Desarrollo de Aplicaciones Multiplataforma', institution: 'Colegio Vivas', period: 'sept 2022 — may 2024', detail: 'Nota: 8 · Java y programación orientada a objetos.' },
    { title: 'B2 · Inglés', institution: 'Trinity College London', period: '2019', detail: 'Certificación de nivel de inglés.' },
  ],
  certifications: [
    { title: 'Data Science Orientation', institution: 'IBM · Coursera', date: 'nov 2026', detail: '' },
    { title: 'Data Science Essentials With Python', institution: 'Cisco', date: 'sept 2026', detail: '' },
    { title: 'Python para Data Science', institution: 'OpenWebinars', date: 'may 2024', detail: '30 h · NumPy, Pandas, visualización y análisis.' },
  ],
};

export const projects: Project[] = [
  {
    id: 'hidropronos', number: '01', category: 'ML explicable · Validación temporal',
    title: 'HidroPronos',
    summary: 'Estimar el riesgo de Microcystis con modelos explicables y evaluación temporal.',
    problem: 'Apoyar la vigilancia de embalses con observaciones biológicas discontinuas y señales ambientales cambiantes.',
    approach: 'Variables retrospectivas, modelos individuales y transferencia leave-one-reservoir-out. Selección del modelo y umbral separada de la validación final.',
    result: 'Un marco reproducible para comparar modelos con climatología, persistencia y memoria biológica, y apoyar la priorización del muestreo.',
    stack: ['Python', 'scikit-learn', 'XGBoost', 'SHAP', 'Pandas'],
    repository: 'https://github.com/guillermobastos/hidropronos',
    cvFeatured: true, visual: 'forecast',
    details: [
      'Ingeniería temporal con bloques de calendario, meteorología, hidrología y memoria biológica; horizontes h0 y h1.',
      'Selección con folds temporales 2017–2020 y validación primaria en 2021, sin usar ese año para elegir modelo ni umbral.',
      'Comparación de clasificadores con validación temporal, evaluación individual y global LORO, benchmarks ecológicos y explicabilidad con SHAP.',
    ],
  },
  {
    id: 'raceway-rust-valvulas', number: '02', category: 'Rust · Control industrial',
    title: 'Raceway · Control de válvulas',
    summary: 'Automatización hidráulica con Rust, Modbus TCP y supervisión en tiempo real.',
    problem: 'Coordinar llenado, decantación, cosecha y vaciado cuando varios procesos comparten válvulas y sensores de nivel.',
    approach: 'Máquina de estados separada de la E/S, arbitraje de prioridades, comunicación ADAM-6060 y configuración persistente en TOML.',
    result: 'Control supervisable desde un dashboard 2D/3D, con simulador, protección de exceso de nivel y tratamiento explícito de lecturas obsoletas.',
    stack: ['Rust', 'Axum', 'Tokio', 'Modbus TCP', 'WebSocket', 'Three.js'],
    repository: 'https://github.com/guillermobastos/raceway-rust-valvulas',
    cvFeatured: true, visual: 'control',
    details: [
      'Seis entradas digitales y seis procesos por relé; la protección D2 tiene prioridad y permanece enclavada hasta D1 OFF.',
      'Adquisición con tiempos de espera acotados y reconexión; distinción entre lectura de retorno y última orden aceptada.',
      'API REST, snapshots WebSocket y pruebas de máquina de estados; la vista 3D carga Three.js local bajo demanda.',
    ],
  },
  {
    id: 'raceway-rust-sensores', number: '03', category: 'Rust · Adquisición de datos',
    title: 'Raceway · Red de sensores',
    summary: 'Backend asíncrono para capturar y consultar parámetros de calidad del agua.',
    problem: 'Integrar sensores con interfaces distintas y coordinar la toma de muestras desde una API común.',
    approach: 'Rust con Axum y Tokio, buses Modbus RTU/TCP y puerto serie. Gestor de dispositivos, secuencias de muestreo y almacenamiento SQLite con SQLx.',
    result: 'Una capa común de adquisición y consulta, con modos de simulación y hardware, API REST y seguimiento de tanques por WebSocket.',
    stack: ['Rust', 'Axum', 'Tokio', 'SQLx', 'SQLite', 'Modbus'],
    repository: 'https://github.com/guillermobastos/raceway-rust-sensores',
    cvFeatured: true, visual: 'sensors',
    details: [
      'DeviceManager configura buses independientes y mantiene una caché de lecturas mediante RwLock.',
      'Integración de sensores multiparamétricos, Hach y Trilux; ciclo de llenado, calentamiento, medición y vaciado.',
      'Persistencia de muestras con migraciones SQLx y autenticación mediante JWT y Argon2.',
    ],
  },
  {
    id: 'capitalink', number: '04', category: 'Full-stack · Plataforma financiera',
    title: 'CapitalInk',
    summary: 'Plataforma para conectar inversores y empresas con flujos diferenciados por rol.',
    problem: 'Reunir descubrimiento de empresas, perfiles, conversaciones y suscripciones en una experiencia coherente.',
    approach: 'Frontend Next.js y TypeScript, API FastAPI, persistencia con SQLAlchemy y migraciones Alembic; integración de suscripciones con Stripe.',
    result: 'Áreas para inversores, fundadores y administración, con búsqueda filtrada de empresas y gestión de acceso según rol.',
    stack: ['Next.js', 'TypeScript', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Stripe'],
    repository: 'https://github.com/guillermobastos/capitalink',
    cvFeatured: true, visual: 'finance',
    details: [
      'Búsqueda de empresas por sector, etapa, ubicación y criterios financieros, con ranking y paginación.',
      'Endpoints diferenciados para inversores y fundadores; comprobaciones de rol y propiedad en las operaciones.',
      'Suscripciones vinculadas a cada empresa, operaciones Stripe y estados de interfaz gestionados con Zustand.',
    ],
  },
  {
    id: 'vixiaweb', number: '05', category: 'Full-stack · Visualización de datos',
    title: 'Vixia Web',
    summary: 'Portal web con módulos de blooms, sensórica y sistemas Raceway.',
    problem: 'Hacer consultables los datos y resultados de distintos proyectos desde una misma interfaz web.',
    approach: 'Next.js y Material UI para las interfaces; FastAPI para datos de embalses, análisis estacional y métricas, con MySQL y despliegue Docker Compose.',
    result: 'Un portal que reúne presentación de proyectos, acceso de usuarios y vistas de datos y métricas de blooms.',
    stack: ['Next.js', 'TypeScript', 'FastAPI', 'MySQL', 'Docker', 'Recharts'],
    repository: 'https://github.com/guillermobastos/vixiaweb',
    visual: 'platform',
    details: [
      'Rutas de frontend para blooms, Raceway, sensórica y drones, junto con autenticación y perfil.',
      'API de blooms con filtros de embalse, año y mes; consulta de series estacionales y archivos de métricas.',
      'Backend con SQLAlchemy y controlador asyncmy; contenedores y composición de servicios mediante Docker Compose.',
    ],
  },
  {
    id: 'blooms', number: '06', category: 'Machine learning · Teledetección',
    title: 'Leer el agua desde el espacio.',
    summary: 'Detección y predicción de blooms de cianobacterias con Sentinel-2/3.',
    problem: 'Detectar condiciones de riesgo en embalses combinando señales satelitales y datos de campo.',
    approach: 'Pipeline Python con NetCDF4 y xarray. Clasificación y selección de modelos con métricas compuestas y validación temporal.',
    result: 'Evaluación sin leakage y alertas con persistencia 2/3 días para reducir falsos positivos.',
    stack: ['Python', 'scikit-learn', 'xarray', 'NetCDF4', 'Sentinel-2/3'], visual: 'satellite',
    details: [
      'Composite score con pesos sobre F1, Precision y Recall; TimeSeriesSplit y validación walk-forward.',
      'Random Search para optimización de hiperparámetros. Clasificadores: XGBoost, LightGBM, CatBoost y Random Forest.',
      'Métricas Bloom_Detection, Risk_Based, Conservative y MCC_Dominant; alertas operativas con histéresis.',
    ],
  },
  {
    id: 'hidrocarburos', number: '07', category: 'IoT · Backend · Análisis espectral',
    title: 'De una señal a una alerta.',
    summary: 'Detección de hidrocarburos con Raspberry Pi y Arduino.',
    problem: 'Identificar hidrocarburos a partir de diferencias en la respuesta espectral con y sin luz.',
    approach: 'Captura con Raspberry Pi + Arduino, procesamiento Python, persistencia MySQL, API Flask e interfaz React.',
    result: 'Pipeline completo, desde la medición física hasta la visualización y los intervalos de alerta automatizados.',
    stack: ['Python', 'Raspberry Pi', 'Arduino', 'Flask', 'MySQL', 'React'], visual: 'spectral',
    details: ['Análisis de diferencias espectrales con y sin iluminación.', 'Integración de adquisición, almacenamiento, API REST y consumo de datos en una interfaz web.'],
  },
  {
    id: 'piscifactorias', number: '08', category: 'Machine learning · Monitorización',
    title: 'Anticipar el riesgo en el agua.',
    summary: 'Clasificación de calidad del agua para piscifactorías.',
    problem: 'Identificar condiciones de riesgo para la producción acuícola a partir de parámetros del agua.',
    approach: 'Modelos de clasificación con COD, ION, NON, PH, TEMP, TSS y TURB; integración de la API de Vonage.',
    result: 'Siete variables conectadas a un sistema de notificaciones SMS ante condiciones de riesgo.',
    stack: ['Python', 'Machine Learning', 'Vonage API'], visual: 'water',
    details: ['Análisis en tiempo real de siete parámetros críticos.', 'Notificaciones SMS para comunicar la detección de condiciones peligrosas.'],
  },
  {
    id: 'microalgas', number: '09', category: 'Full-stack · Investigación · IoT',
    title: 'Entender cómo crece la vida.',
    summary: 'Estudio de evolución de microalgas y monitorización en tiempo real.',
    problem: 'Relacionar las condiciones ambientales con la evolución celular de las microalgas.',
    approach: 'Plataforma Astro + Flask conectada a Arduino; análisis de pH y temperatura y sistema de LEDs multicolor.',
    result: 'Monitorización en tiempo real y control de estimulación lumínica para apoyar el estudio de crecimiento.',
    stack: ['Astro', 'Flask', 'Arduino', 'Sensores'], visual: 'algae',
    details: ['Coordinación del proyecto de investigación y desarrollo de la plataforma.', 'LEDs multicolor para estimulación y visualización de estados de crecimiento.'],
  },
];
