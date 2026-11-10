# Guillermo Bastos · Portfolio

Portfolio estático para un perfil de **Data Science, ML Engineering y Backend**, en español. Diseño claro con fondo crema, papel cálido y acentos terracota; perfil personal en primer plano, avatar robótico original, ilustraciones isométricas y evidencia verificable de los proyectos.

**Sitio:** [guillermobastos.github.io](https://guillermobastos.github.io/)

## Stack y decisiones

- **Astro 7 + TypeScript estricto:** HTML generado durante el build y hosting 100 % estático en GitHub Pages.
- **Tailwind CSS 4**, integrado con Vite. Familias y animaciones base están en `src/styles/global.css`; la presentación clara activa se configura en `src/styles/daylight.css`. No necesita `tailwind.config.js`.
- **CSS 3D + SVG + TypeScript:** el hero presenta a Guillermo y el avatar GB–01. Las cinco tarjetas principales y sus páginas tienen escenas isométricas con proyección ortográfica real. El tilt se importa de forma diferida solo con puntero preciso, ancho ≥ 900 px y movimiento permitido; en móvil se conserva la ilustración estática.
- **Sin runtime de React, Three.js ni Framer Motion:** estos efectos se resuelven con transformaciones CSS y eventos puntuales; evita descargar un motor 3D o hidratar contenido estático. No hay render loop continuo. Los cambios de scroll/puntero se agrupan con `requestAnimationFrame`, usando únicamente transformaciones para la profundidad.
- **Space Grotesk + Inter:** archivos WOFF2 latinos servidos desde el mismo dominio, con `font-display: swap` y preload.
- **PDF e imagen social generados en build:** `pdf-lib` produce un CV con texto seleccionable; `sharp` produce un Open Graph PNG de 1200 × 630. Ninguno se carga en el navegador.

Las ilustraciones son SVG vectoriales originales y conceptuales: no son capturas de sistemas reales ni resultados experimentales. Al no utilizar fotografías, no hay imágenes raster de contenido que convertir a WebP/AVIF. El PNG social se utiliza para compatibilidad con crawlers y no se descarga al abrir la página.

## Desarrollo local

Requisitos: **Node.js ≥ 22.23.4**, npm y Git. `.nvmrc` selecciona la rama 22.

```bash
nvm use
npm ci
npm run dev
```

Abrir `http://localhost:4321`.

```bash
npm run check    # Comprobación de Astro y TypeScript
npm run build    # Comprobación + exportación estática a dist/
npm run preview  # Revisar el build de producción
```

## Estructura

```text
.github/workflows/deploy.yml  # Check, build, pruebas y despliegue de Pages
public/
  favicon.svg
  robots.txt
scripts/
  audit.mjs                  # Lighthouse móvil y escritorio
src/
  components/
    Header.astro             # Navegación y contacto
    Hero.astro               # Nombre, rol, valor y CTA
    RobotAvatar.astro        # Avatar original GB–01 y control de saludo
    ProfileOverview.astro    # Perfil: datos, backend y hardware
    Impact.astro             # Cuatro logros metodológicos verificables
    Projects.astro           # Cinco repositorios + otros casos desplegables
    ProjectCard.astro        # Reto → solución → resultado, stack y enlace GitHub
    ProjectVisual.astro      # Ilustraciones SVG por proyecto
    Experience.astro         # Timeline vertical
    Skills.astro             # Stack agrupado
    Education.astro          # Educación y certificaciones
    Footer.astro             # Contacto, email y redes
    Icon.astro               # Iconos SVG sin dependencia externa
    projects/
      IsometricScene.astro   # Cinco escenas originales y selección de capas
      IsoPrism.astro         # Sólidos de tres caras con proyección isométrica
      IsoTank.astro          # Depósitos e instrumentos cilíndricos
      EvidencePanel.astro    # Gráficos cuantitativos y tablas accesibles
      HidroResults.astro     # F1, AUCPR, cohorte y diseño de validación
      ArchitectureMap.astro  # Esquemas de control, sensores, roles y API
  data/profile.ts            # Fuente única de datos de perfil y proyectos
  data/caseStudies.ts        # Casos, cifras, resultados y fuentes de evidencia
  layouts/Layout.astro       # HTML, fuentes, metadatos y JSON-LD
  lib/isometric.ts           # Proyección X/Y a ±30°, eje Z vertical
  pages/
    index.astro              # Composición de la página
    cv.pdf.ts                # Endpoint prerenderizado → dist/cv.pdf
    og.png.ts                # Endpoint prerenderizado → dist/og.png
    sitemap.xml.ts           # Sitemap generado con portada y cinco casos
    proyectos/[slug]/
      index.astro            # Página estática personalizada por proyecto
      datos.json.ts          # Snapshot descargable de cifras y fuentes
      og.png.ts              # Imagen social propia de cada caso
  scripts/
    interactions.ts          # Reveal, sección activa e importación diferida
    spatial.ts               # Tilt y parallax con motion/pointer guards
    avatar.ts                # Mirada, saludo y pausa fuera del viewport
  styles/global.css          # Theme Tailwind, diseño, responsive y print
  styles/projects.css        # Diseño editorial, figuras y evidencia por caso
  styles/daylight.css        # Tema claro, perfil y avatar animado
  styles/isometric.css       # Figuras compartidas con las tarjetas de portada
  styles/evidence-graphics.css # Gráficos científicos y mapas técnicos
tests/portfolio.spec.ts      # Navegación, accesibilidad y progressive enhancement
tests/case-studies.spec.ts   # Cinco páginas, datos, capas, SEO y navegación
astro.config.mjs
playwright.config.ts
```

## Editar contenido

Actualizar `src/data/profile.ts`:

- `profile`: identidad, enlaces, rol, resumen, logros, experiencia, educación, certificaciones y grupos de habilidades.
- `projects`: cinco casos vinculados a repositorios y cuatro proyectos aplicados anteriores, con `problem`, `approach`, `result`, stack y detalles técnicos.
- `repository`: enlace directo al repositorio de GitHub. Los proyectos con este campo aparecen en la cuadrícula principal; los demás se conservan en «Más proyectos aplicados», un desplegable nativo que funciona sin JavaScript.
- `cvFeatured`: selecciona los cuatro casos incluidos en el CV para mantener una descarga concisa.
- Las fechas se muestran como intervalos, sin acumular duraciones que quedarían obsoletas ni sumar puestos simultáneos.
- Los dos puestos sin empresa facilitada se muestran sin atribuirles una organización.
- No se muestran porcentajes de mejora ni benchmarks no proporcionados. Los logros de impacto son capacidades y metodología.
- Los enlaces de email y LinkedIn se conservan de la página anterior. GitHub apunta al usuario indicado.

Cada build regenera también el CV. Para entregar un PDF diseñado manualmente, eliminar `src/pages/cv.pdf.ts` y añadir `public/cv.pdf` conservando la ruta. El PDF generado incorpora identidad, experiencia, casos de proyecto, habilidades, educación y certificaciones.

Los encabezados editoriales y textos de navegación viven en sus componentes. Las fechas y credenciales deben mantenerse actualizadas en el archivo de datos.

### Repositorios revisados directamente en GitHub

Se han consultado mediante Git, con las credenciales del equipo, los repositorios `capitalink`, `raceway-rust-sensores`, `raceway-rust-valvulas`, `vixiaweb` e `hidropronos`. La revisión no depende de Composio ni añade tokens al código o al navegador.

Las descripciones de las cinco tarjetas se apoyan en manifiestos, documentación y módulos concretos del código. [Ver trazabilidad y revisiones consultadas](docs/project-sources.md). Se presentan capacidades implementadas y enfoques metodológicos; no se atribuyen métricas comerciales, resultados de producción ni estado de publicación científica no verificados.

La consulta fue puntual: el sitio no descarga repositorios al abrirse ni sincroniza automáticamente cambios futuros. Para actualizar una tarjeta, revisar el repositorio correspondiente y editar `src/data/profile.ts`.

## Páginas personalizadas de proyecto

Las cinco tarjetas enlazan mediante **Explorar el proyecto** a:

- `/proyectos/hidropronos/`
- `/proyectos/raceway-rust-valvulas/`
- `/proyectos/raceway-rust-sensores/`
- `/proyectos/capitalink/`
- `/proyectos/vixiaweb/`

Cada caso tiene identidad propia, titular editorial, una escena isométrica específica, cuatro indicadores trazables, arquitectura en tres etapas, visualización de datos reales, tabla de detalle, decisiones de ingeniería y fuentes fijadas a un commit. Se generan también Open Graph, JSON-LD `CreativeWork` y un archivo `datos.json` independiente. La investigación de predicción de blooms se presenta bajo HidroPronos.

### Identidad, color y legibilidad

- **Portada:** fondo crema (`#faf6ee`), tinta marrón y acento terracota (`#a74b24`); nombre y rol como primera lectura, cuerpo de 16 px y avatar GB–01 con identidad propia.
- **Impacto:** tarjetas con F1 mediana de validación, procesos hidráulicos, canales de adquisición y roles de producto. Cada cifra conserva su contexto y enlaza a la evidencia del caso.
- **HidroPronos:** cuaderno científico en ámbar y pergamino, titulares serif, bordes editoriales y gráficos de validación.
- **Raceway Válvulas:** panel industrial en cobre, títulos monoespaciados, esquemas de control y arquitectura vertical.
- **Raceway Sensores:** libreta de instrumentación en arena, lecturas independientes, retícula de puntos y etapas de adquisición.
- **CapitalInk:** terracota, hero invertido en escritorio, superficies redondeadas y cuatro tarjetas de planes con precios configurados.
- **Vixia Web:** albaricoque, marcos de ventana y módulos de interfaz de producto.

Las páginas comparten navegación, semántica y evidencia, pero cambian composición, tipografía, marcos y representación de datos. El texto de lectura de los casos permanece en 16–17 px en escritorio y 15–16 px en móvil.

### Avatar y animaciones

GB–01 es una ilustración SVG original de un pequeño explorador robótico: ojos binoculares, orugas, pintura ocre y placa de identidad GB. Representa la conexión de Guillermo con datos y hardware; no es un retrato físico inferido a partir de una fotografía.

- Mirada y ligera orientación de cabeza con el puntero, agrupadas con `requestAnimationFrame`.
- Parpadeo y movimiento sutil del cuerpo mientras el avatar está visible.
- Botón **Saludar**, utilizable por teclado y con estado `aria-pressed`.
- Pausa mediante `IntersectionObserver` y al ocultar la pestaña.
- `prefers-reduced-motion` desactiva movimientos; el perfil, las ilustraciones y los datos siguen disponibles sin JavaScript.

Los mapas se revelan suavemente al entrar en pantalla. Sus conectores tienen una breve animación de entrada, no un indicador de actividad real.

### Ilustraciones isométricas y profundidad 3D

`src/lib/isometric.ts` transforma coordenadas X/Y/Z a una proyección ortográfica con ejes de ±30°. Prismas, depósitos, conectores y pantallas se construyen a partir de esa geometría. Los cinco dibujos representan, respectivamente, un sistema de embalses, un circuito hidráulico, una red de instrumentos, una plataforma de inversión y una aplicación de datos.

La selección **Sistema completo / Entrada / Procesamiento / Salida** funciona con radios nativos y CSS `:has()`, también sin JavaScript y por teclado. Atenúa las otras capas para facilitar la lectura de la arquitectura. En escritorio compatible, el chunk espacial añade profundidad al mover el puntero; la preferencia de movimiento reducido la desactiva.

### Cifras y contexto

Mantener los textos y estadísticas en `src/data/caseStudies.ts`:

- **HidroPronos:** valores literales de `metricas_validacion.csv`, filtrados a vigilancia ≥ 2.000 células/mL y validación 2021. Incluye barras F1 de h0, mapa de calor de los 12 contextos F1 y gráfico AUCPR con selector nativo h0/h1. También se dibujan la distribución de 1.787 embalse-días y el esquema de selección/validación. La cohorte filtra BEC/CAE/FOR del EDA. No se inventan curvas de predicción ni intervalos de confianza.
- **Raceway Válvulas:** señales, procesos y elementos de las tablas del README; 16 funciones `#[test]` presentes en el código, sin afirmar una prueba física de hardware.
- **Raceway Sensores:** tres dispositivos y 13 canales RTU declarados; los canales repetidos entre instrumentos no se cuentan como variables únicas.
- **CapitalInk:** roles, planes y políticas del backend. Los precios base del gráfico son `price_cents / 100`, no ingresos ni transacciones reales.
- **Vixia Web:** catálogo y parámetros de las tres rutas de consulta de blooms; no se inventan métricas de tráfico o latencia.

Al actualizar evidencia, cambiar también `revision`, `reviewedAt`, contexto y fuentes. `sourceUrl()` genera enlaces inmutables al commit. `datos.json` conserva precisión numérica original; los gráficos y tarjetas redondean solo para presentación. Las ilustraciones de arquitectura son conceptuales y no constituyen telemetría.

Para el resto de proyectos se priorizan mapas de funcionamiento:

- **Válvulas:** entradas, arbitraje, salidas y secuencia de decantación/cosecha, con la prioridad D2 explícita.
- **Sensores:** instrumentos → DeviceManager/StageController → SQLite, REST y WebSocket.
- **CapitalInk:** flujos separados de inversor, fundador y administración, con permisos en el backend.
- **Vixia Web:** interfaz → tres contratos de consulta → servicios y almacenamiento.

## Despliegue en GitHub Pages

El repositorio es un sitio de usuario, por lo que se publica en `/` y no necesita `base` de subdirectorio.

1. En [Settings → Pages](https://github.com/guillermobastos/guillermobastos.github.io/settings/pages), seleccionar **Build and deployment → Source → GitHub Actions**. La configuración anterior publicaba directamente desde la rama `main` y debe cambiarse una vez.
2. Subir los cambios a `main` con `package-lock.json` incluido.
3. El workflow `.github/workflows/deploy.yml` ejecuta `npm ci`, comprobación de tipos, build estático y pruebas Chromium/axe antes de subir `dist/`.
4. El job `deploy` publica el artefacto mediante `actions/deploy-pages`, con permisos `pages: write` e `id-token: write` limitados a ese job.
5. Revisar la ejecución en [Actions](https://github.com/guillermobastos/guillermobastos.github.io/actions) y abrir la URL del entorno `github-pages`.

También se puede lanzar manualmente mediante **Run workflow**. No se requieren tokens personales, backend, servicios externos ni una rama `gh-pages`.

Si cambia el dominio, actualizar `site` en `astro.config.mjs`, `profile.site` y `public/robots.txt`; el sitemap se regenera a partir del perfil y los casos. Para otro repositorio con subruta, adaptar también `base` y las rutas absolutas de recursos/enlaces.

## Verificación

```bash
npx playwright install chromium
npm run build
npm run test:e2e
npm run audit:site
```

Las pruebas se ejecutan en escritorio Chromium y emulación móvil Chromium. Incluyen:

- Navegación de proyectos y apertura de detalle técnico.
- Presencia de los cinco enlaces GitHub y apertura del archivo de proyectos aplicados.
- Páginas individuales, selección de capas isométricas y datos descargables.
- Preservación de resultados originales, contexto de métricas y referencias a commits.
- Canonical, imágenes sociales, JSON-LD y sitemap de los cinco casos.
- Ausencia de errores de JavaScript.
- Ausencia de scroll horizontal a 320, 375, 768, 1024 y 1440 px.
- Auditoría axe WCAG 2 A/AA y WCAG 2.1 A/AA, incluidos detalles expandidos.
- Contenido y disclosures utilizables sin JavaScript.
- Enlace de salto, foco por teclado y `prefers-reduced-motion`.
- Descarga de un PDF real, imagen social, JSON-LD y anclas locales válidas.

`npm run audit:site` levanta un preview temporal en el puerto 4322, ejecuta Lighthouse móvil/escritorio y guarda HTML/JSON en `.lighthouseci/` (ignorado por Git). Sale con error si Performance, Accessibility o SEO baja de 90. Las capturas de las pruebas se guardan en `test-results/`.

Para auditar una página individual:

```bash
npm run audit:site -- /proyectos/hidropronos/
```

### Resultados de la validación local

Medición del build de producción, servida en localhost con Chromium y Lighthouse 13.6.0:

| Perfil | Performance | Accessibility | Best Practices | SEO | LCP | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Portada · móvil, throttling simulado | 90 | 100 | 100 | 100 | 1,1 s | 0 |
| Portada · escritorio | 100 | 100 | 100 | 100 | 0,4 s | 0 |
| HidroPronos · móvil | 93 | 100 | 100 | 100 | 0,9 s | 0 |
| HidroPronos · escritorio | 100 | 100 | 100 | 100 | 0,4 s | 0 |
| CapitalInk · móvil | 99 | 100 | 100 | 100 | 1,7 s | 0 |
| CapitalInk · escritorio | 100 | 100 | 100 | 100 | 0,3 s | 0,002 |

- Astro/TypeScript: 0 errores, 0 warnings y 0 hints.
- Playwright: 32 pruebas de escritorio y emulación móvil, incluidas las cinco páginas, el saludo del avatar, movimiento reducido y cambio de horizonte AUCPR sin JavaScript.
- axe: 0 infracciones detectadas en los conjuntos WCAG A/AA auditados, con detalles abiertos.
- `npm audit`: 0 vulnerabilidades en el lockfile validado.

Son resultados de laboratorio local; se deben confirmar tras desplegar en GitHub Pages. La auditoría automática no sustituye la revisión manual con lector de pantalla ni mide por sí sola la fluidez en todo tipo de hardware.

## Checklist de entrega

### Rendimiento
- [x] Sitio estático sin hidratación de componentes.
- [x] Tipografías locales WOFF2, dos preloads y `font-display: swap`.
- [x] SVG de contenido con tamaño reservado; sin peticiones de imágenes externas.
- [x] Capa espacial en chunk diferido, solo en dispositivos compatibles.
- [x] Transformaciones agrupadas por frame; avatar animado solo en pantalla y con pausa al ocultar la pestaña.
- [x] Parallax suspendido fuera del viewport y durante movimiento reducido.
- [x] Degradación a 2D en pantallas pequeñas y punteros táctiles.
- [ ] Confirmar Lighthouse ≥ 90 tras publicar sobre el dominio final.
- [ ] Comprobar estabilidad de 60 fps en el hardware objetivo con DevTools Performance; no se garantiza una frecuencia universal.

### Accesibilidad
- [x] HTML semántico, idioma español y jerarquía de encabezados.
- [x] Foco visible, navegación por teclado y enlace para saltar al contenido.
- [x] Detalle técnico con `details/summary`, sin dependencia de JavaScript.
- [x] Movimiento reducido respetado al cargar y al cambiar la preferencia.
- [x] Ninguna información depende del hover, el color o un efecto 3D.
- [x] SVG decorativos con `aria-hidden`; escena conceptual con descripción accesible.
- [x] Enlaces externos anuncian apertura en nueva pestaña.
- [ ] Revisión manual con lector de pantalla real y zoom al 200 % tras publicar.

### SEO
- [x] Title y descripción en español, canonical y `lang="es"`.
- [x] Open Graph y Twitter Card con PNG 1200 × 630 generado en build.
- [x] JSON-LD `Person`: `jobTitle`, `alumniOf`, `knowsAbout`, `sameAs` y `worksFor`.
- [x] `robots.txt`, sitemap y favicon propios.
- [x] Contenido disponible en el HTML inicial, incluso sin JavaScript.
- [ ] Solicitar indexación y verificar la vista previa social después de desplegar.
