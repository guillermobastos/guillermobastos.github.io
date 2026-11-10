# Fuentes de los proyectos

Revisión realizada mediante acceso directo por Git a GitHub. Los cinco repositorios se consultaron para revisar documentación, manifiestos y código; la página publica descripciones resumidas y enlaces, no el contenido de los repositorios.

## HidroPronos

- [Repositorio](https://github.com/guillermobastos/hidropronos).
- Revisión consultada: `3c2421795f2d2cc37d7727daaa1a698fa67f0c2c`.
- [Notebook de validación temporal y LORO](https://github.com/guillermobastos/hidropronos/blob/3c2421795f2d2cc37d7727daaa1a698fa67f0c2c/pipeline/HidroPronos_ML_WR_umbral_robusto_2021_final_v4.ipynb): horizontes h0/h1, evaluación individual/global, selección temporal y validación final 2021.
- `pipeline/FE-ALL.ipynb`, `SOURCE_REGISTRY.md` y `pyproject.toml`: ingeniería temporal, procedencia de datos y herramientas de análisis.
- El manuscrito se utiliza como contexto metodológico, sin afirmar aceptación o publicación ni trasladar cifras de rendimiento a la tarjeta.
- No se identifica este repositorio con el caso anterior de procesamiento Sentinel-2/3: se mantiene como proyecto independiente.

## Raceway · Control de válvulas

- [Repositorio](https://github.com/guillermobastos/raceway-rust-valvulas).
- Revisión consultada: `eca61f8e0200d914ab10d3669562f0256d5e9aa4`.
- [README](https://github.com/guillermobastos/raceway-rust-valvulas/blob/eca61f8e0200d914ab10d3669562f0256d5e9aa4/README.md) y [máquina de estados](https://github.com/guillermobastos/raceway-rust-valvulas/blob/eca61f8e0200d914ab10d3669562f0256d5e9aa4/src/services/automation.rs): control de procesos, arbitraje D2, temporización y señales válidas/obsoletas.
- `Cargo.toml`: Axum, Tokio y tokio-modbus. El README documenta la API, WebSocket, simulador y dashboard SVG/Three.js.
- El resultado presentado es funcionalidad de software, sin atribuir certificaciones de seguridad industrial ni mejoras cuantitativas no medidas.

## Raceway · Red de sensores

- [Repositorio](https://github.com/guillermobastos/raceway-rust-sensores).
- Revisión consultada: `75bd34fa891a3053cea21f8923de434cdc508f46`.
- [Gestor de dispositivos](https://github.com/guillermobastos/raceway-rust-sensores/blob/75bd34fa891a3053cea21f8923de434cdc508f46/src/services/device_manager.rs): buses RTU/TCP independientes, caché asíncrona y modo de simulación.
- `README.md` y `Cargo.toml`: adquisición de sensores, secuencias de muestreo, SQLite/SQLx, REST, WebSocket, JWT y Argon2.

## CapitalInk

- [Repositorio](https://github.com/guillermobastos/capitalink).
- Revisión consultada: `b23eab19316272c1dc7a151621e52ba64ad33e74`.
- [API de búsqueda de empresas](https://github.com/guillermobastos/capitalink/blob/b23eab19316272c1dc7a151621e52ba64ad33e74/backend/app/api/v1/investor/companies.py) y `backend/app/services/company_discovery.py`: filtros, ranking, paginación y control de rol.
- [Suscripciones](https://github.com/guillermobastos/capitalink/blob/b23eab19316272c1dc7a151621e52ba64ad33e74/backend/app/api/v1/entrepreneur/subscription.py): operaciones por empresa e integración Stripe.
- `frontend/package.json`, `backend/requirements.txt` y `GUIA_INICIO_RAPIDO.md`: Next.js/TypeScript, FastAPI, SQLAlchemy, Alembic y configuración PostgreSQL.
- No se atribuyen ingresos, usuarios, rentabilidad ni uso real en producción.

## Vixia Web

- [Repositorio](https://github.com/guillermobastos/vixiaweb).
- Revisión consultada: `1c09501c0d13fbb5a95978bb7a0749e8456486e1`.
- [API de blooms](https://github.com/guillermobastos/vixiaweb/blob/1c09501c0d13fbb5a95978bb7a0749e8456486e1/backend/app/api/v1/proyectos/blooms.py): datos por embalse, año y mes; series estacionales y métricas.
- `frontend/src/app/proyectos/`, `frontend/package.json` y `backend/pyproject.toml`: módulos de proyecto, Next.js, Material UI, Recharts, FastAPI, SQLAlchemy y asyncmy.
- `docker-compose.yml`: composición de servicios.

## Proyectos aplicados anteriores

Los casos de teledetección Sentinel-2/3, hidrocarburos, clasificación de aguas y evolución de microalgas conservan como fuente el perfil y la web anterior facilitados por el propietario. No se les asigna un repositorio por similitud de nombre o temática. Permanecen disponibles en «Más proyectos aplicados».

## Evidencia cuantitativa de las páginas individuales

La transcripción y las reglas de presentación se mantienen en `src/data/caseStudies.ts`, y cada página ofrece un snapshot JSON descargable. Los enlaces de fuente se construyen con las revisiones indicadas arriba.

| Caso | Artefacto cuantitativo | Regla de presentación |
| --- | --- | --- |
| HidroPronos | `results/ml/full/metricas_validacion.csv` | 12 contextos de vigilancia de 2021 para las medianas; 6 contextos h0 para el gráfico F1 individual/LORO. |
| HidroPronos | `results/eda/tabla_prevalencia_wilson.csv` | Filas por embalse BEC/CAE/FOR; excluye CEC al construir la cohorte de modelado. |
| Raceway Válvulas | `README.md` y `src/services/automation_tests.rs` | Entradas, relés, elementos por proceso y recuento de 16 funciones anotadas con `#[test]`. |
| Raceway Sensores | `config/devices.yaml` | Tres dispositivos; 8 + 5 canales RTU; dos buses RTU. El dispositivo serie se conserva fuera del recuento de canales. |
| CapitalInk | `backend/app/services/platform_policy.py` | Cuatro planes y precios base configurados de 0, 49, 99 y 249 euros; políticas de niveles y puntuación. |
| Vixia Web | `frontend/src/data/proyectos/proyectosData.ts` y `backend/app/api/v1/proyectos/blooms.py` | Seis objetos de catálogo activos y tres consultas con 3, 4 y 2 parámetros respectivamente. |

Las figuras isométricas son esquemas originales de arquitectura. Los gráficos cuantitativos tienen escala explícita y valores numéricos; no se extraen cifras de las dimensiones de la ilustración.
