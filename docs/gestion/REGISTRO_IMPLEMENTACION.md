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

### Resultado de publicación verificado — 24/10/2026

Commit de código `afb905f4fbbcbdd005d3723cf6b1fbf8f6dce558` subido a `main` mediante avance normal; GitHub Pages confirma `built` para ese SHA. [Abrir AF01](https://deteco.github.io/SCPSurvivor/?prueba=combate-v2&armas=r1&graficos=32). Roadmap **0.34** y registro de pruebas incluidos. No se sobrescribieron ramas ni se desplegaron servicios.

Comprobación pública: **6/6** escenarios AF01 (escritorio/vertical/horizontal y 16/32), **2/2** recorridos de inicio/pausa, **99/99** archivos críticos con SHA256 coincidente y visor **164/164 PNG**, diez modelos y tres disposiciones en ambos tamaños; cero errores JavaScript/HTTP en los recorridos comprobados. El caso AF01 de escritorio conserva ambas copias al pasar al mapa siguiente con la build saturada. La QA inyecta XP/ascensos/HP/recarga para probar la regla, sin acreditar una victoria natural o balance. Una primera consulta de integridad agotó el tiempo de red; el reintento acotado comprobó los 99 archivos.

La copia pública compiló **107 scripts**, bundle `65ce03ab66`; `build:check` aprobado. La suite completa repitió **298 pruebas: 292 aprobadas, 5 fallidas SQLite/P05 por la fecha de workerd instalada y 1 omitida por emuladores**. Se incorporó el código existente de Worker/functions y sus dependencias declaradas para coherencia del repositorio; no se activó ese backend. Se preservaron CSP pública previa y 88 recursos originales. El recibo local anterior conserva su corte; el nuevo [recibo público](REV-EST-0006_PUBLICACION.json) acredita esta publicación.

**Estado del alcance: parcial publicado y probado.** CC04/TE01/F24 jugables, pose/animaciones compatibles y sala/interfaz de fusión siguen pendientes; el gate permanece cerrado. Director aislado sin nuevos encuentros, cuentas/guardado real desactivados, sin teléfono físico ni aceptación manual de esta revisión. La subida no cierra esas dependencias, P05 ni el porcentaje V2. Las 53 tareas, pesos y 52/100 históricos se conservan.

## INC-VIS-001 r1 — inicio 24/10/2026

Correccion visual autorizada por Ivan y coordinada por ESTRUCTURA. Fuentes fijadas al inicio: PAUTA_DESARROLLO y CONTROL_CAMBIOS **0.7**, INC-VIS-001 **r1**; REV-EST-0006 y LOT-EST-001/002/003/004 **r1**, EST-ESC-001 **r1**, ARM-VIS-001/R1, PERSONAJES 16/32 y MEN-003 **r1**. La revision0.7 agrega la incidencia sin sustituir la0.6 implementada. No se atribuye URL/cache a la captura.

Plan: reproducir entrada habitual y AF01; corregir montaje del recurso implementado, escala visual heredada sin cambiar fisica ni camara, cifras compactas y lectura del HUD; comparar fuente/compilado y publicar la misma demo autorizada tras comprobarla. Raiz coordina armas/integracion y agentes Luna maximo revisan HUD/FX y escala en archivos separados. Baseline por SHA y respaldo de codigo en migration-audit/inc-vis-001 del directorio padre. Estado: investigacion, sin afirmar correccion.

Seguimiento de PROGRAMACION: [INC-VIS-001-programacion](informes/INC-VIS-001-programacion.md). El diagnostico ya distingue acceso habitual, AF01 y regresion B3; no equipara esos estados con la URL desconocida del telefono. ARMAS verifica la carencia de Subfusil mediante ESTRUCTURA.

### INC-VIS-001 r1 — resultado local de PROGRAMACION

Correccion aplicada, estado **parcial por recurso Subfusil y correspondencias antiguas**. Informe: [INC-VIS-001-programacion](informes/INC-VIS-001-programacion.md), con capturas antes/despues y limites. Control0.7 fijado; no se modificaron pautas de areas ni fuentes de diseño. Se preservan284 recursos y todos los archivos del baseline. Director/fusion/servicios sin cambios.

Build/check107scripts; suite303:297aprobadas,5fallos conocidos SQLite/P05 y1omitida. Navegador29/29 en fuente/compilado y tres formatos,16/32;32poses por caso nativo, golpe real6.6 con HP sin redondeo, fallos de recursos/carga lenta visibles. Regresiones AF01 8/8 e inicio/pausa2/2. No acredita telefono fisico o aceptacion manual. Tres agentes Luna maximo se detuvieron por limite de uso; raiz completo implementacion y pruebas. [Recibo local](INC-VIS-001_VALIDACION.json); el [recibo publico](INC-VIS-001_PUBLICACION.json) registra por separado lo efectivamente publicado.

Se detectaron y revisaron dos actualizaciones concurrentes: INC-VIS-001 r1 incorpora la reproduccion publica independiente y la consulta a ARMAS; PAUTA_ARMAS R2.1 agrega ARM-SMG-REC-001 r1, carencia de sprite aprobado para smg y su minimo de recurso por producir/aceptar. No cambian combate, reglas o recursos implementados. Se integra esa evidencia documental sin sustituir silenciosamente las revisiones r1 de origen; diff y hashes conservados en migration-audit/inc-vis-001.

### INC-VIS-001 r1 — publicación comprobada

Código `3f533c36648e74b76b2f155f90e90c6b0d8a4e0f` subido mediante avance normal a main, Pages built; bundle público `e9bedd0dc6`. **16/16** escenarios visuales públicos y **2/2** inicio/pausa; **39/39** archivos coincidentes. Fallos AF01/piezas simulados y carga lenta identificados, sin errores JavaScript ni HTTP inesperados. [Recibo](INC-VIS-001_PUBLICACION.json). Sin cambios de servicios/economía/facturación. Roadmap0.35 registra estado parcial por ARM-SMG-REC-001 r1; no cierra fusión, P05 técnico o aceptación física. El commit de cierre sólo documenta este resultado.

## REV-EST-0007 / LOT-EST-005 r1 — inicio 24/10/2026

Estado: **en implementación, sin nueva publicación ni cierre**. Fuentes fijadas CONTROL_CAMBIOS0.8, REV-EST-0007 y manifiesto de su corte, LOT-EST-005r1, EST-ORG-002r1. Base pública previa c279a091aee31a1774e53259fb851fede8f73c14; corrección INC-VIS-001 conservada. Backup y hashes previos: migration-audit/grietas-integrales/codigo-antes.zip y baseline.json.

Se aplica el plan docs/superpowers/plans/2026-10-24-grietas-integrales.md. Tres agentes Luna máximo implementan áreas aisladas; raíz revisa e integra. Los parámetros que el lote autoriza concretar para prueba se identifican ENSAYO-GRI-001r1, sin convertirlos en balance/diseño aceptado. Cinco identidades BIO verificadas; búsqueda de otras cinco abierta. Servicios reales y economía desactivados. Las entregas de áreas posteriores al corte se registrarán por versión/hash, sin cambiar silenciosamente la revisión implementada.

### Suplemento de fuente durante ejecución — EST-GRI-002 r1
Iván aclara en ESTRUCTURA que las diez eran variantes16/32 de las cinco identidades. Se revisó la modificación de LOT-EST-005r1 y control0.8; se preserva copia en revisiones/REV-EST-0007/suplemento-EST-GRI-002-r1. Impacto: cerrar búsqueda de otras cinco, conservar exactamente las cinco BIO; no cambia probabilidades ni runtime. Los tres agentes se detuvieron por límite de uso antes de entregar código; raíz asume implementación y pruebas, sin acreditar código de agentes.

### LOT-EST-005r1 — resultado local y preparación de publicación

Prueba integral implementada por raíz: director conectado, cinco BIO16/32/tres ataques, recintos separados, origen por referencia, retirada90–95s, poderes automáticos/elección/reemplazo y NPC temporal con texto/equipo real. Tabla ENSAYO-GRI-001r1 en docs/PRUEBA_GRIETAS_INTEGRALES.md; informe en informes/LOT-EST-005-programacion.md. Diez escenarios de navegador y nueve grupos de desenlace/combate; nueve regresiones INC-VIS. Compilación116scripts y check aprobados. Prácticas forzadas documentadas; sin aceptación humana/final de balance ni servicios reales. Resultado completo de Node y límites en LOT-EST-005_VALIDACION.json. El recibo de publicación posterior identificará el corte efectivamente servido.

Se consultaron NIVELES/MENUS recientes en progreso. PERSONAJES-GRIETAS-001r1 y SONIDO-GRIETAS-001 incorporados por hash; conserva apoyo amarillo y cues provisionales, sin locución. ARMASR2.2 leído como propuesta pendiente, no integrado. No se modifican fuentes originales, PNG aceptados o ZIP de migración. Tres agentes Luna agotaron cuota sin código; implementación y revisión hechas por raíz.

### Corrección puntual de conformidad P3 antes del recibo final
La revisión final reprodujo que Salto de estaca del Portador anunciaba el círculo, pero faltaba el sector frontal aprobado en AtaquesV1. Regresión nueva falló (una zona frente a dos). Se añadieron anuncio y daño de aterrizaje en el sector90u/0,7rad de ENSAYO-GRI-001r1, sin onda adicional ni cambios de tier/ritmo. La misma regla vale para NPC; ambos volúmenes causan un único impacto, no daño duplicado. Prueba después3/3aprobada. El lote y fuente de diseño permanecen LOT-EST-005r1/AtaquesV1; se conserva el primer commit de entrega1ecd5aa como antecedente y el recibo final identifica el runtime corregido.

### Entrega NIVELES-GRIETAS-001r1 posterior al primer commit
Se leyó completa al aparecer durante QA final y se registra hash/tratamiento en FUENTES_SUPLEMENTARIAS. Sus48×36,0,70s y120s son recomendaciones explícitas de ensayo: no se sustituyen silenciosamente los28×20,0,50s y90s ya versionados y comprobados en ENSAYO-GRI-001r1. Se mantiene el contrato aprobado de cinco BIO/seis apariencias/retirada5s/retorno y se corrige la congelación en contacto para ocurrir antes de IA/proyectiles/pickups del origen. Una regresión con enemigo real reprodujo un tick tardío antes de la corrección; se añade el control a la matriz. Animación de absorción detallada y la matriz visual60combinaciones recomendada quedan como ampliación visual pendiente, sin darla por realizada. La comprobación de pausa se mide desde el clic confirmado, no antes de que el usuario pulse, eliminando una carrera del test sin relajar el reloj congelado.

### Revisión ESTRUCTURA — poderes y contextos NPC
Se contrastó la revisión con el código y decisiones24–29: MAX×1,3genérico y mezcla arbitraria de poderes incumplían el extra propio/compatibilidad. Dos regresiones dirigidas fallaron antes de corregirlo. Se aplica ENSAYO-POD-001r2 (documento explícito, sin alterar el lote): cinco extras distintos y acotados, tabla BIO→poder propio, MAXsaturación. El eco del Huésped se suspende con el mundo y se elimina al reemplazar/morir. Se conecta un recuerdoV2general compatible y tags del recinto reales; no se inventa papel/pasillos en estas salas. Se corrigió el bloqueo de charla después de avisar que se agotó munición y se limitan burbujas al viewport/HUD. Once grupos de navegador posteriores, incluidos cinco extras efectivos y recuerdo/contextos ausentes, aprobados en fuente; se repite en copia de publicación. MENUS-GRIETAS-001 leído: panel del cuarto poder identifica el nuevo y las tres ranuras, sin elegir MEN-005.


## REV-EST-0008 / LOT-EST-005 r2 — inicio25/10/2026

Fuentes fijadas: CONTROL_CAMBIOS0.9, EST-NPC-001r1 y LOT-EST-005r2, con el corte0.8/r1 conservado en revisiones/REV-EST-0008/MANIFIESTO.json. Se recibe la autorización directa de Iván delegada por ESTRUCTURA; sustituye exclusivamente AF01 fija y reserva finita del compañero por sorteo uniforme pistol/smg/shotgun y reserva ilimitada, con cargadores, recarga y cadencia reales. Los demás contratos de LOT005r1 siguen vigentes. Hashes al comenzar en migration-audit/grietas-integrales/revision-0008-inicio.json.

Se retoman los cambios parciales de carga/alias sin descartarlos. PERSONAJES-COMPANERAS-003 documenta autorización directa e implementación local de las tres compañeras; se revisan sus dependencias y se repiten sus comprobaciones bajo la nueva regla de armas. Sus27PASS previos incluían munición finita y no se reutilizan como evidencia del requisito nuevo. Tres agentes trabajan en NPC, cargas/alias y auditoría de publicación; raíz integra, comprueba y publica en el destino ya autorizado. Servicios, facturación, gates de fusión y economía conservan su estado. Esta anotación inicia trabajo; todavía no acredita la publicación final.


### LOT-EST-005r2 — relevo técnico de Juanillo25/10/2026

PROGRAMACION y su agente NPC terminaron con systemError antes de aplicar reserva infinita. Juanillo asumió el encargo de implementación/publicación autorizado por Iván, sin reiniciar un escritor concurrente ni abrir publicación general de áreas. Conservó código de salas/carga/alias y R3. [Informe de cierre técnico](informes/LOT-EST-005-r2-juanillo.md):270/270pruebas del juego;10salas,18combinaciones femeninas/armas,14grupos de desenlace y6casos de carga/alias locales aprobados. Suite con backend detenida por espera, sin resultado completo atribuible. [Validación nueva](LOT-EST-005_VALIDACION.json), conservando el recibo r1 en revisiones/REV-EST-0008. Publicación final en comprobación.

### LOT-EST-005r2 — publicación comprobada por Juanillo

Runtime92fc1fd7c2347aed7b585946328670944008b39c, Pages built, bundleadec3ec93c.55casos/grupos públicos y217/217hashes aprobados;270pruebas del juego sin fallos. PROGRAMACION entregó después auditoría completa328/322PASS/5P05workerd/1omitida; se leyó el log y se incorpora sin declarar verde el backend. [Recibo](LOT-EST-005_PUBLICACION.json) e [informe](informes/LOT-EST-005-r2-juanillo.md). El siguiente encargo LOT006 monta las imágenes aceptadas ARMASR3; no cambia este runtime.

## LOT-EST-006r1 — conciliación local por Juanillo25/10/2026

ARMASR3 acepta48sprites smg/shotgun/baton. PROGRAMACION entrega montaje,279pruebas del juegoPASS,352poses/64incapacitaciones/24estados/8combates/2fallos de recurso y18salasR3más respaldo. Juanillo leyó la entrega completa, revisó código/capturas y repitió22pruebas del clon; build/check118scripts,bundlebe687713b2. [Informe](informes/LOT-EST-006-juanillo.md) y [validación](LOT-EST-006_VALIDACION.json). Publicación en comprobación; no cambia las reglas de LOT005 ni servicios.

### LOT006r1 — publicación comprobada por Juanillo

Runtime4adf3bed24e9a2f3ecd69ce54db286f794e3cd94, Pages built, bundlebe687713b2.278/278hashes,352montajes,64incapacitaciones,24estados animados,8combates,2fallos/lentitud y18combinacionesR3más respaldo públicosPASS. [Recibo](LOT-EST-006_PUBLICACION.json). INC-VIS-001 corregida técnicamente para ensayo; aceptación visual/teléfono físico pendientes. No cambia mecánicas, poderesA/B, fusión o servicios.

### Aceptación recuperada — LOT006

Iván autoriza «Aprueba. Y continua» tras la entrega de montaje enPROGRAMACION, mensaje01a17533-e1b4-7003-af6e-17ef3c353c4e. [Registro de alcance](ACEPTACION_LOT006_2026-10-25.md). Montaje aceptado, sin convertir la autorización en prueba física o elección de poderesA/B.
