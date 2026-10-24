# Registro de implementación — PROGRAMACION

## REV-EST-0006 — inicio 23/10/2026

Estado del corte técnico: **parcial por dependencias de armas**, con mapa, director aislado y audio implementados localmente. Comprobaciones continuadas el **24/10/2026**. Esta composición no tiene un recibo nuevo de publicación.

Fuentes fijadas: CONTROL_CAMBIOS **0.6**, consolidación REV-EST-0006 y su encargo. LOT-EST-001/002/003/004 **r1**; EST-GRI-001/EST-ARM-001/EST-ESC-001 **r1**; NIV-ESC-008-A **r1**; NIV-GRI-009 **r1**; MEN-003 **r1** y MEN-004 **r1** (galería en revisión, no equipamiento); SON-001 **1.0**; ARM-VIS-001/R1.

Prevalecen las aceptaciones posteriores de ESTRUCTURA sobre A/B y escala/fusión aún pendientes en fichas anteriores. No se cambian las revisiones de origen ni se reescriben sus aprobaciones. Corte documental conservado en `revisiones/REV-EST-0006/MANIFIESTO.json`; baseline técnico y respaldo en `migration-audit/rev-est-0006/baseline.json` del directorio padre. La fuente local contiene cambios de MENUS y NIV-GRI-009 posteriores al recibo público 0.33; ese recibo no prueba esta ejecución.

Plan técnico: [plan de ejecución](../superpowers/plans/2026-10-23-rev-est-0006.md). Raíz revisa e integra; agentes Luna máximo en áreas independientes. Solo PROGRAMACION escribe este registro. Originales de recursos, fuentes sincronizadas, cuentas, economía y configuración de servicios se conservan. No se inventan valores de combate/NPC ni reglas de ubicación de grietas pendientes.

### Resultado por alcance

| Alcance | Resultado local | Pendiente material |
| --- | --- | --- |
| MEN-003 / NIV-GRI-009 r1 | Composición comprobada en fuentes y compilado: menús responsivos, galería sin equipamiento, seis estilos animados y contacto de la práctica existente | Teléfono físico y aceptación visual de esta composición. MEN-004 conserva su estado de revisión |
| LOT-EST-003 r1 | M01 redistribuido explícitamente en 240×160, casilla 32; seis familias de R7 y cámara vertical de ancho objetivo 512. Radios/velocidad conservados; PC/horizontal y mapa siguiente mantienen su regla | Maniobra con hordas en una partida natural y revisión física en móvil; no es generación procedural completa |
| LOT-EST-001 r1 | Director aislado con tiempo activo, cuatro oportunidades desde mapa 2, 50/50, pesos aprobados y límite de dos apariciones confirmadas; solicitudes pendientes reservan cupo y los fallos lo liberan | Conexión con ubicación, recintos, encuentros/NPC y reglas todavía no resueltas. El director cargado no genera esos encuentros |
| LOT-EST-004 r1 | WAV SON-001 elegido conectado a desbloqueo, bus de música, volumen/silencio y ciclo de menú/partida/regreso; una instancia reutilizada | Audición humana del empalme y teléfono físico. No se compuso ni sustituyó audio |
| LOT-EST-002 r1 — A | Visor de diez modelos × ocho vistas × dos tamaños con PNG originales y marcas G/A/S | Los anclajes estimados y el visor estático no aceptan la pose simultánea CC04/TE01 ni sus animaciones |
| LOT-EST-002 r1 — B | Dominio de los cuatro perfiles y escala por copia; AF01 conectado al combate real mediante URL explícita, cartas, segunda pistola por premio, MAX y reemplazo | CC04/TE01 no integrados en combate. El ensayo AF01 conserva el origen físico de proyectil vigente; el montaje visual no recalibra por sí solo paredes/salida física |
| LOT-EST-002 r1 — C/D | Transacción de fusión y estación modeladas y probadas aisladamente, con gate de pose cerrado | Pose compatible con dos brazos, animaciones, sala transitable, interfaz/pausa/confirmación y recorrido jugable CC04+TE01→F24. No hay F24 inicial ni selección de armas desde MEN-004 |

Informes: [mapa](informes/REV-EST-0006-mapa.md), [director](informes/REV-EST-0006-director.md), [audio](informes/REV-EST-0006-audio.md), [dominio y visor de armas](informes/REV-EST-0006-armas.md), [AF01 runtime](informes/REV-EST-0006-af01.md), [arte AF01](informes/REV-EST-0006-af01-arte.md) y [revisión independiente de mapa/director](informes/REV-EST-0006-revision-mapa-director.md). Los informes de agentes conservan sus resultados intermedios; el recibo final de la raíz identifica la composición y los totales de cierre.

### Integración y correcciones comprobadas

- El generador nuevo `scene-m01-a.js` reutiliza el renderer R7 con límites dinámicos. No se achicó el plano original por multiplicar coordenadas; R7 480×320 sigue disponible como referencia y regresión.
- El director identifica cada oportunidad por número de mapa además de su ID: una confirmación tardía no puede confirmar una oportunidad distinta si un integrador reutiliza el mismo ID en otro mapa.
- El audio existente carecía de una solicitud real al entrar en el menú técnico. `TechnicalUI.state` solicita el tema al volver a `ui` y detiene ese WAV al entrar a partida; la prueba usa `Game.toUI()` real, sin fingir esa integración desde el test.
- F24 aplica una vez los modificadores generales que entregue el integrador, también para ciclo y alcance. La prueba de dominio no se presenta como combate de F24 con paredes.
- AF01 usa progreso por copia y su extra MAX aplica una sola vez el bono general. Una adquisición runtime fallida revierte la copia de dominio y permite reintentar el mismo premio. Las armas siguen disparando/recargando después de 5:00; se conservan las congelaciones existentes de regeneración/habilidad.
- La primera prueba real de navegador encontró un fallo de arranque: la vista previa pedía una copia de una partida que aún no existía. Se corrigió con un cálculo de preview nivel 1 que no crea progreso ni una expedición. Después pasaron los ocho escenarios de inicio/carta/premio/MAX en fuentes y compilado.
- El extra pendiente no avanza ni se consume con pausa, cartas, terminal, jugador muerto o disparo bloqueado. La modalidad `armas=r1` ignora el equipo/niveles artificiales de `ensayo`; empieza con una AF01 nivel 1.
- AF01 dibuja sus dieciséis PNG originales en la resolución elegida, seleccionando la vista más próxima sin alterar aim. Montaje G/A/S sobre el rig existente, un brazo por pistola al llevar dos, sin doble rotación del PNG. La raíz completó esta parte directamente; el agente de arte se detuvo sin entregar código y no se acredita una implementación suya.
- Revisión auxiliar Luna máximo de LOT-002, dominio, adaptador y hooks AF01: **sin hallazgos reproducibles dentro del alcance estático revisado**. Comprobó inicio, independencia por copia, MAX, daño global, gates, recompensa y reemplazo. No repitió pruebas ni revisó arte/CC04/TE01/F24; su conclusión no amplía la validación a esas partes.
- La raíz amplió el caso de saturación tras esa revisión y reprodujo un bloqueo real: ambas AF01 y todas las generales MAX, experiencia pendiente, cero cartas válidas y puerta imposible de cruzar. La sección 3 de EST-ARM-001 r1 ya exige la salida táctica existente. Se reutilizó `tacticalCards()` al agotar alternativas y el mismo apoyo táctico de armamento cuando todas las copias están MAX. No se alteraron sus cifras, duración, topes o sustitución; ni se borró experiencia ni se inventó una compensación. El premio repetido no refresca el efecto. Dos regresiones nuevas fallaron antes de corregirlo; después pasaron y el navegador cruzó al mapa 2 con la build saturada tras resolver sus cartas.

### Evidencia y método

[Recibo de validación de PROGRAMACION](REV-EST-0006_VALIDACION.json). Evidencia detallada de QA bajo `tests/artifacts/`, y salida íntegra de Node/diff/auditoría en `../../../migration-audit/rev-est-0006/`.

- Mapa/cámara: tres casos nuevos y cinco regresiones del plano anterior. Conectividad de suelos, anclajes e interiores con radios 0/12/22. El cálculo BFS sin enemigos no es tiempo real de un jugador bajo presión.
- Presentación: doce escenarios, fuentes/compilado, 1280×900 / 390×844 / 844×390 y gráficos 16/32. Cuatro flujos de grieta y transición incluyen jefe/premio/puerta y conservación del equipo al mapa siguiente.
- Ocupación de M01: seis escenarios de 90 segundos activos, IA/navegación/colisiones reales, jugador estacionario invulnerable y disparos deshabilitados **solo en QA**. Alcanzan el cupo de 23 regulares previo al jefe; nuevos spawns fuera de vista, libres y alcanzables. No certifica balance, escape natural ni FPS de teléfono.
- Audio: tres escenarios de navegador con decodificación real del WAV, avance, límite del loop mediante búsqueda cerca del final, volumen/silencio, detención y retorno real al menú. No hubo audición humana de un minuto completo.
- Animación NIV-GRI-009: cuatro escenarios fuente/compilado en 16/32 verifican movimiento, pausa, render sin alterar estado, profundidad y contacto instantáneo de la práctica existente.
- AF01: ocho escenarios reales de navegador verifican inicio nivel 1, carta por XP, segunda pistola mediante botón de premio, progreso independiente y proyectil MAX. Para QA se inyectan experiencia, ascensos, HP objetivo y temporizador de recarga; no son victorias naturales ni una medición de tiempo hasta MAX.
- Esos ocho escenarios exigen además un `drawImage` real de los PNG AF01 del tamaño elegido. El caso compilado de escritorio 32 atraviesa la puerta tras resolver premios/XP/cartas pendientes y verifica ambas copias/progreso conservados en mapa 2. La primera versión del test pretendía cruzar en un único tick sin resolver la experiencia recogida por la puerta; se ajustó el harness a la regla existente, sin cambiar el juego para forzar el paso.
- Dos composiciones gráficas adicionales usan el renderer real: Guardia/Médico, una/dos pistolas y ocho direcciones en 16/32; **48 dibujos de PNG por tamaño**, sin mutación del equipo. Capturas `tests/artifacts/rev-est-0006/af01/montaje-16.png` y `montaje-32.png` inspeccionadas por la raíz; no aprobación humana de pose final. Seis unitarios nuevos de arte y tres regresiones de PersonajesArt pasaron.
- Las pruebas de la transacción de fusión usan evidencia de pose **sintética**; no autorizan abrir el gate con los recursos actuales. Los resultados concretos de compilación y suite completa constan en el recibo final, incluidos fallos/omisiones reales.

**Cierre de compilación:** `npm run build` y `npm run build:check` aprobados: SDK 227131 bytes, 107 scripts; bundle `app.min.js?v=162bd306e7` (SHA completo en el recibo). **Suite final completa:** 53 archivos, **298 pruebas: 292 aprobadas, 5 fallidas, 1 omitida**. Los cinco fallos corresponden exclusivamente al runtime SQLite/P05 y su fecha incompatible; la omitida necesita emuladores locales reales.

### Entorno y limitaciones técnicas

El frontend compila localmente. La compilación completa del SDK necesita ejecución fuera de la restricción de lectura del sandbox: esbuild recibía acceso denegado al inspeccionar directorios ascendentes, aunque los módulos existen. Al levantar esa restricción la compilación pudo completarse. Esto no activa servicios ni publica.

Las cinco pruebas de runtime SQLite/P05 siguen limitadas por la herramienta instalada: solicitan compatibilidad `2026-10-17`, pero el binario workerd disponible admite como máximo `2026-08-06`. Se reprodujo el fallo después de superar la restricción de esbuild; no se lo convirtió en PASS ni se cambió la fecha para ocultarlo. La ejecución completa usa `--test-force-exit` para que los handles de Miniflare fallidos no dejen el proceso abierto. No se modificaron backend, dependencias, credenciales, facturación ni configuración de servicios para este lote. La aceptación histórica de P05 no equivale a estas cinco comprobaciones técnicas.

La primera ejecución global con cierre forzado registró además un aborto nativo de Windows/libuv al cerrar el archivo CORS, después de que su caso pasara. Se reprodujo aislado: sin `--test-force-exit` pasa 1/1 y sale 0; con esa opción pasa el caso pero el proceso aborta en `UV_HANDLE_CLOSING`. La suite final separa **solo ese archivo**, ejecutado normalmente, y mantiene los otros 52 con cierre forzado para Miniflare. No se omite CORS ni se modifica su prueba; los totales anteriores son el agregado completo. Salida inicial preservada en `full-node-first.txt`, salida y grupos finales en `full-node.txt`/`full-node.json`.

### Fuentes, integridad y concurrencia

Baseline previo: **889 archivos** y ZIP `development-backups/REV-EST-0006-20261023-201655-antes.zip` del directorio padre. Se conservan todos sus archivos; comparación por hash y diff revisable en `migration-audit/rev-est-0006/source-integrity.json` y `CAMBIOS_FUENTES.diff`. Recursos originales, dependencias y configuraciones protegidos sin cambios. No se tocaron `sources/`, maestro/control de ESTRUCTURA ni pautas de áreas.

Resultado final de integridad: **0 archivos ausentes**, 869 de los 889 idénticos y 20 modificados por esta integración; **144 archivos protegidos coincidentes**, **0 cambios posteriores al inicio en las 21 fuentes fijadas**. Los archivos nuevos se enumeran en la auditoría. No se detectó una edición concurrente de las decisiones que cambiara el alcance r1 implementado.

La comparación detectó una diferencia **anterior al inicio**, no un cambio concurrente: las copias archivadas de PAUTA_DESARROLLO/CONTROL_CAMBIOS aún describen el control 0.5; sus archivos de entrada ya estaban en **0.6** en el baseline. Se revisó el diff: añade REV-EST-0006, la aceptación A, referencias de las áreas, LOT-003/004 y el envío del encargo. Se implementó la entrada 0.6 y sus lotes r1 declarados al comenzar; se preservó el snapshot histórico sin reescribirlo. Las otras 19 fuentes archivadas coinciden. Al cierre se vuelve a comparar contra el baseline; cualquier diferencia posterior se identifica en el recibo y no se adopta silenciosamente.

### Continuar y publicar

[Guía de la prueba local](../PRUEBA_REV_EST_0006.md). Enlace AF01: `http://127.0.0.1:8026/?prueba=combate-v2&armas=r1&graficos=32`; visor: `http://127.0.0.1:8026/visor-armas-revision-r1.html`. El servidor es loopback y admite reinicio con `SCP_PORT=8026` según la guía. La URL no funciona desde otro computador.

Siguiente dependencia para cerrar LOT-EST-002: pose simultánea CC04/TE01 con un brazo por arma y función de A resuelta, ocho direcciones, ambos actores/resoluciones y animaciones. Después integrar combate, sala/confirmación y F24; comprobar paredes, contactos, reposición y balance. No se inventó ese arte ni se declaró resuelta la dependencia.

Esta ejecución no hizo commit/push, no sobrescribió ramas y no emitió un recibo nuevo de GitHub Pages. El recibo histórico 0.33 no acredita este código. Se mantienen las autorizaciones anteriores en su alcance; no se activaron servicios reales ni publicación de áreas por extensión de este encargo.

## Publicación solicitada — 24/10/2026

Iván autoriza directamente «Subelo a github» después del corte local anterior. Se prepara la misma composición en DETECO/SCPSurvivor main y su GitHub Pages existente, con documentación/roadmap0.34. No se activa ningún servicio ni se cambia el diseño. Se conserva la CSP previa del clon público al generar su índice. El estado real y commit se registran en [REV-EST-0006_PUBLICACION.json](REV-EST-0006_PUBLICACION.json); publicar esta demo parcial no acepta la fusión ni convierte los cinco fallos P05 en aprobados.
