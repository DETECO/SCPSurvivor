# Plan de adaptación del diseño jugable V2

**Actualización vigente 0.25 · B1/B2, 19/10/2026 (A-035/D-331/EV-040):** B1/B2 implementados como prototipo aislado: geometría inicial 160 × 100 y seis nodos alternativos; cuatro intentos de exploración en 60/120/180/240 s con probabilidades/topes por tramo y tickets ficticios en memoria. RC-10 sigue EC, evidenceComplete=false. Aceptación manual y P05 real pendientes; combate 2+3+1, bono de diez minutos/hitos, cofres de jefe/grieta y economía persistente pendientes. [Guía de mapa y cofres](PRUEBA_MAPA_COFRES_V2.md) · [Demo de práctica](https://deteco.github.io/SCPSurvivor/?prueba=mapa-v2&cofres=prueba) · [Resultados y límites](V2-B1-B2-REPORT.md). Publicación viva pendiente de verificar; consultar el informe antes de afirmar resultados.

**Cambio vigente 0.24:** el bloque B4 debe cubrir dos armas simultáneas y tres ofertas compatibles; añadir poderes (RC-13) y ultimate (RC-14) antes de aceptar la build completa. B5 revisa gacha de armas, soldados, skins y ultimates. Cooldowns, cartas, costes y relación con habilidad de soldado siguen abiertos. [Contratos y dependencias](ROADMAP_ACTUALIZACION_ESTRUCTURA_2026-10-19.md). Este corte 0.24 fue documental; la entrega actual 0.25 implementa B1/B2 como prototipo aislado.

18/10/2026 · Pauta sincronizada 0.22 · **Trabajo siguiente definido; no ejecutado en esta entrega documental.**

Autoridad: [pauta vigente](../PAUTA_DESARROLLO.md), [corte aprobado de ESTRUCTURA](ESTRUCTURA_REGLAS_APROBADAS.md) y [decisiones abiertas](ESTRUCTURA_DECISIONES.md). Se adapta el juego existente. Las decisiones anteriores incompatibles de extracción, mochilas y accesorios físicos no gobiernan V2.

## Punto de partida

- **Implementado como ensayo local:** V2-trial-01, mapa de 300 segundos activos, jefe obligatorio, puerta y dos soldados a 5:00, corte de apariciones enemigas, remanentes vivos y transición inmediata por contacto. [Guía](PRUEBA_MAPA_V2.md).
- **Aceptación pendiente:** prueba manual de Iván, balance, rendimiento y dispositivos físicos. No cerrar P05 ni V2 por simulaciones.
- **Aprobado para adaptar:** tres tipos de cofre, sorteos de exploración en 60/120/180/240 segundos, probabilidades 10/15/20 %, topes 1/2/3 y tickets 1–2/1–2/1–3 según mapas 1–3/4–7/8+. Seis puntos alternativos y escala inicial 160 × 100 casillas.
- **Pendiente tras B1/B2:** cofres de jefe/grieta, bono de diez minutos/hitos, familias/azar finales de armas, combate 2+3+1, gacha, persistencia V2, dimensiones de grieta y saltos. Las cajas de campo siguen sin botín.

## Bloques y orden de ejecución

| Bloque | Cambio acotado | Rutas reales que revisar | Condición de cierre |
| --- | --- | --- | --- |
| B1 — Geometría del ensayo | Crear variante inicial de 160 × 100, circuitos amplios, seis puntos alternativos de exploración y espacios de jefe/puerta | `js/world/sector-maps.js`, `js/world/world.js`, `js/systems/expedition.js`, `js/systems/map-trial.js` | Rutas, colisión y puntos alcanzables comprobados; puerta y jefe no quedan aislados; se registran mediciones de desplazamiento |
| B2 — Cofres locales | Incorporar sorteos y descubrimiento/apertura en el ensayo aislado, con tickets ficticios en memoria | `js/systems/expedition.js`, `js/systems/interact.js`, `js/world/world.js`, `js/ui/technical-ui.js` | Cada intento ocurre una sola vez; topes/contenido fijo/apertura funcionan; ningún premio llega a cuentas o gacha |
| B3 — Premio de jefe y grieta | Resolver candidatos/topes/sin candidatos y tabla de grieta antes de integrar sus premios | `js/systems/field-upgrades.js`, `js/systems/containment-boss.js`, `js/systems/dimensional-rifts.js` | Contrato explícito; premio único, compatible y comprobable. No decidir por inferencia retorno/reloj de grieta |
| B4 — Armas y equipamiento V2 | Separar familias, estadísticas propias y selección aleatoria de mejoras; retirar dependencias de accesorios/mochilas | `js/data/field-catalog.js`, `js/systems/field-stats.js`, `js/systems/field-combat.js`, `js/systems/field-upgrades.js`, `js/ui/field-loadout.js`, `js/systems/inventory-model.js` | Reglas abiertas de cartas/candidatos/topes cerradas; copias independientes; sin recargas ficticias en familias que no las necesitan |
| B5 — Guardado, colección y economía | Versionar contrato V2 e integrar colección/gacha de armas, soldados, skins y ultimates con funciones aceptadas y premios | `js/systems/run-checkpoint.js`, `js/systems/run-continuity.js`, `js/net/local-accounts.js`, `functions/account-service.js` | P05 real aceptado y contrato V2 definido; propiedad, revisión, sesión, recibos e idempotencia verificados; datos antiguos conservados |
| B6 — Acabado y aceptación | Integrar mapas variados, señalización, arte/audio, controles y regresión | `dev.html`, `css/technical.css`, `js/ui/technical-ui.js`, `docs/OBSERVACIONES_VISUALES.md` | Recursos aprobados conservados; lectura clara; sonido/alerta/localizador de grietas; crédito visible; pruebas y aceptación registradas |

**B1/B2 entregados como prototipo aislado sin guardado; aceptación pendiente.** Puede prepararse mientras P05 real sigue pendiente. No adelanta la economía P06/P07 ni convierte premios ficticios en saldo. La conexión persistente de B5 exige sus dependencias; B3/B4 no se ejecutan con reglas incompletas.

La preparación local Worker/SQLite, si existe en la copia de desarrollo, no se publica ni activa por esta planificación. La selección de backend y sus pruebas se documentan en P05. Firebase permanece en Spark, sin facturación.

## Aceptación de geometría B1

1. Conservar la semilla y una variante anterior para comprobar regresiones; no sustituir arte aprobado.
2. Identificar seis ubicaciones alternativas, con espacio de maniobra y rutas laterales. No representan seis cofres activos garantizados.
3. Mantener libres entrada, puerta, paso principal y área de combate del jefe. Probar llegada de soldados y acceso bajo presión de enemigos restantes.
4. Medir rutas transitables: objetivo 30–45 segundos entre extremos útiles sin combate y 10–15 segundos de desvío hacia un punto opcional. Documentar método y resultados; no usar solo distancia recta.
5. Revisar navegación enemiga, colisión y distribución de apariciones en la escala mayor. Repetir límites de 299,99/300/300,01 segundos y transición al segundo mapa.
6. Probar fuente/compilado y escritorio/táctil emulado. Las dimensiones finales y el rendimiento real quedan pendientes hasta medirse.

## Aceptación de cofres B2

1. Sorteos con semilla en 60/120/180/240 segundos activos; probar salto de tiempo, pausa, menú y continuación sin repetir oportunidades. El acceso rápido debe distinguir la preparación de prueba de una partida realmente recorrida.
2. Respetar probabilidades y topes de cada franja de mapas. Fijar contenido al aparecer y no liberar cupo al abrir. No garantizar el máximo.
3. Elegir posiciones válidas entre las seis alternativas; no bloquear rutas ni superponer objetivos. Diferenciar cofres funcionales de `fieldCrate` decorativas.
4. Conservar apertura por proximidad de la base: 3,5 segundos, radio 50, sin pared, retroceso de progreso al alejarse, pausa congelada y disparo permitido. La entrada instantánea de grietas es otra interacción.
5. Mantener aviso sin descubrir y flecha después de verlo. Verificar visibilidad sin depender solo del color o sonido.
6. Usar identificadores únicos por mapa/evento para evitar doble apertura o doble premio ficticio. Recargar pierde el ensayo; nunca escribe cuentas, gacha ni guardados anteriores.
7. Resolver explícitamente los hitos antiguos y la regla acumulada de diez minutos antes de representar sus premios como reglas V2 completas. No borrar esa base ni aplicar compensaciones inventadas.

## Reglas que todavía necesitan definición

- Tres ofertas aleatorias y filtro de armas equipadas ya están confirmados. Falta concretar mezcla entre grupos, categorías, probabilidades, topes y saturación; no volver al supuesto de mejora automática ni a un arma ajena.
- Elegibilidad del premio de jefe, caso sin candidatos y tabla de premios superiores de grieta.
- Muerte y fin definitivo de partida, progresión permanente, duplicados, rarezas y desbloqueos.
- Grietas: recinto, retorno, reloj, cierre y premios. Saltos: destinos y compatibilidad con el jefe obligatorio.
- Recuperación persistente cuando quedan enemigos vivos junto a la puerta; no reutilizar el checkpoint antiguo que limpia enemigos.

No se bloquea todo el diseño por estas preguntas: cada bloque avanza con su contrato cerrado y conserva pendientes explícitos. No se inventa economía para resolverlos.

## Entrega y trazabilidad

Respaldar antes de modificar. Editar fuentes; conservar estructura y orden en `dev.html`. Ejecutar las pruebas afectadas y generar/verificar compilado con `npm.cmd run build` y `npm.cmd run build:check`. Las regresiones del recorrido están en `tests/v2-map-director.test.js`, `tests/v2-map-trial.test.js` y `tests/v2-map-browser.py`; ampliar solo para comportamientos nuevos verificables.

Registrar resultados, límites y diff. Actualizar `RoadmapSCP.json` y generar vistas con `node tools/render-roadmap.js`; los 53 criterios y 52/100 anteriores permanecen históricos. No otorgar avance por retirar funciones o redactar este plan. Las tareas RC y la aceptación completa se conservan en [PLAN_CAMBIOS_ESTRUCTURA.md](PLAN_CAMBIOS_ESTRUCTURA.md).
