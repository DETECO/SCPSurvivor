# Contexto del proyecto — SCP Survivor

**Entrega vigente 0.30 · T1B + T1C, 21/10/2026 (A-040/D-336/EV-045):** T1B + T1C implementados como ensayo: terminal voluntario con reemplazo de una copia y pausa completa; ramas/cartas revisadas por familia; cuarta arma, porra de corto alcance sin munición; HUD de ramas/recargas y consulta de equipo; daño compacto y radar circular fijo sin revelar cofres desconocidos. Cuatro prácticas explícitas: terminal, máximos, saturación y melee. Sin cuentas/guardado/economía real. Arte y balance provisionales; fusión, grieta separada, poderes y ultimate pendientes. [Práctica de terminal](https://deteco.github.io/SCPSurvivor/?prueba=combate-v2&ensayo=terminal) · [Mapa completo](https://deteco.github.io/SCPSurvivor/?prueba=combate-v2) · [Guía](docs/PRUEBA_T1BC.md) · [Resultados](docs/V2-T1BC-REPORT.md). Iván informó que T1A funciona bien: aceptación general de esa demo, sin extrapolar a todas las pruebas/dispositivos ni a esta entrega nueva. La entrada pública por defecto abre T1BC; se conservan accesos anteriores. Spark sin facturación; servicios reales desactivados.


**Entrega vigente 0.29 · T1A, 21/10/2026 (A-039/D-335/EV-044):** T1A implementada como prueba parcial: una arma inicial, segunda por cofre de jefe o élite de práctica, hasta dos balísticas simultáneas con recursos propios. Cuatro ramas5+extra, cartas arma/general/libre y apoyo táctico temporal con valores de ensayo. Premios/XP resueltos antes de puerta, aliados sinXP/sin remate y congelación de recuperación a300s. Sin cuentas/guardado. Fusión, poderes, ultimate, terminales, otras familias, radar y economía siguen pendientes; no equivale aB4 completo. Aceptación de Iván pendiente. [Jugar T1A](https://deteco.github.io/SCPSurvivor/?prueba=infinito-v2) · [Práctica de élite](https://deteco.github.io/SCPSurvivor/?prueba=infinito-v2&premios=elite) · [Práctica de jefe](https://deteco.github.io/SCPSurvivor/?prueba=infinito-v2&premios=jefe) · [Resultados y límites](docs/V2-T1A-REPORT.md). Esta entrega sustituye el estado «solo planificado» de0.28. B3 se conserva mediante `?prueba=mapa-v2`; la entrada pública sin consulta abreT1A. Mantener Spark sin facturación y servicios reales desactivados.


**Plan vigente 0.28 · ESTRUCTURA, 20/10/2026 (A-038/D-334):** ESTRUCTURA sincronizada hasta 01a15a34-93e9-7a11-9597-6a2c37fb2570 (20/10/2026): modo infinito; una arma inicial y segunda por premio/primer jefe; máximo dos simultáneas. Cuatro ramas5+extra por arma, poderes/generales5+extra y ultimate5permanentes. Fusión en sala, mejoras permanentes por soldado con monedas, tres gachas con gris1/dorado5, procedural y radar. Próxima prueba V2-INFINITO-01/T1A planificada, todavía sin implementación ni nueva URL. P05 aceptado por el propietario para avanzar; servicios reales diferidos. Agentes Luna máximo bajo coordinación de raíz. [Plan actual](docs/PLAN_DESARROLLO_V2_INFINITO.md) · [Pauta próxima prueba](docs/PRUEBA_V2_INFINITO_01.md) · [Decisiones aceptadas](docs/DECISIONES_INFINITO_2026-10-20.md). Esta instrucción posterior sustituye inicio con dos armas, nivel simple máximo5, mezcla de cartas sin cerrar y requisitos P05 que bloqueaban el prototipo. Conservar diferencias de la demo B3 como antecedentes; no presentarla como la nueva prueba. Usar **Luna con razonamiento máximo** al delegar; prevalece sobre la preferencia previa Sol medio.


**20/10/2026 · B3 / roadmap 0.26:** cofre del jefe y práctica explícita dimensional implementados; premios temporales y tickets ficticios, sin cuentas. [Prueba manual](docs/PRUEBA_PREMIOS_B3.md) · [Resultados y límites](docs/V2-B3-REPORT.md). Aceptación de Iván pendiente; B4 y P05 real continúan pendientes.


**Actualización vigente 0.25 · B1/B2, 19/10/2026 (A-035/D-331/EV-040):** B1/B2 implementados como prototipo aislado: geometría inicial 160 × 100 y seis nodos alternativos; cuatro intentos de exploración en 60/120/180/240 s con probabilidades/topes por tramo y tickets ficticios en memoria. RC-10 sigue EC, evidenceComplete=false. Aceptación manual y P05 real pendientes; combate 2+3+1, bono de diez minutos/hitos, cofres de jefe/grieta y economía persistente pendientes. [Guía de mapa y cofres](docs/PRUEBA_MAPA_COFRES_V2.md) · [Demo de práctica](https://deteco.github.io/SCPSurvivor/?prueba=mapa-v2&cofres=prueba) · [Resultados y límites](docs/V2-B1-B2-REPORT.md). Demo publicada y verificada online; aceptación manual pendiente; consultar el informe antes de afirmar resultados.

**Roadmap 0.24 · ESTRUCTURA, 19/10/2026:** diseño confirmado **2 armas simultáneas + hasta 3 poderes anómalos + 1 ultimate** (máximo nivel 5, cooldown largo y progresión difícil). Tres ofertas aleatorias, mejoras de arma solo para equipadas. Armas/ultimates/skins en gacha; parámetros y economía todavía abiertos. RC-13/RC-14 pendientes, sin cambios del ejecutable ni cierre de P05. [Decisiones, propuestas y tareas](docs/ROADMAP_ACTUALIZACION_ESTRUCTURA_2026-10-19.md).

**Demo web autorizada (A-033, 18/10/2026):** la primera prueba V2 también se publica en [GitHub Pages](https://deteco.github.io/SCPSurvivor/). En HTTPS `deteco.github.io/SCPSurvivor/` se activa por defecto; `?rapida=1` inicia en 4:30. Esta petición amplía el antiguo límite de loopback solo a ese destino. Mantener cuentas, guardado, economía y premios reales desactivados. Fuera de ese origen/ruta, conservar la prueba local explícita. B1/B2 amplían ahora este ensayo con geometría inicial y cofres ficticios; no adelantar las reglas pendientes. [Alcance y verificación](docs/GITHUB_PAGES.md).

**Pauta sincronizada con ESTRUCTURA — 0.22 (18/10/2026):** aplicar [reglas aprobadas](docs/ESTRUCTURA_REGLAS_APROBADAS.md) y [siguiente bloque de adaptación](docs/PLAN_DISENO_JUGABLE_V2.md). Iván aprobó los tipos de cofre, cuatro sorteos por mapa en 1:00/2:00/3:00/4:00, seis puntos alternativos y escala inicial de ensayo 160 × 100. Se conserva la prueba V2-trial-01; la geometría inicial y los cofres de exploración cuentan ahora con el prototipo B1/B2; aceptación pendiente. No reintroducir extracción, accesorios físicos ni mochilas. No cambiar datos/cuentas ni conceder premios reales desde un ensayo local. Las reglas de armas, economía, grietas y saltos que siguen abiertas no se completan por inferencia.

**Ensayo V2-trial-01 (18/10/2026):** primer recorrido local implementado por petición de Iván A-031. Entradas `?prueba=mapa-v2` / `&rapida=1`; jefe provisional240s y puerta300s, aliados, corte de spawn y transición por contacto. Sin guardado, cuentas, extracción, mochila o accesorios en la interfaz del ensayo. No son las familias/azar/economía finales ni cierra P05. [Guía manual](docs/PRUEBA_MAPA_V2.md) · [Resultados y límites](docs/V2-PRIMERA-PRUEBA-REPORT.md).

## Cambio de dirección — V2-ESTRUCTURA, 18/10/2026

Iván incorporó ESTRUCTURA a este hilo y pidió preparar los cambios: mapas5min, jefe obligatorio, puerta blindada/soldados a5:00, cese de apariciones y remanentes vivos; avance por mapas. Se retiran extracción de fin de partida, accesorios físicos y mochilas. La pauta distingue decisiones confirmadas de cofres, economía y reglas todavía abiertas.

Leer [pauta vigente](PAUTA_DESARROLLO.md) y [plan de adaptación](docs/PLAN_CAMBIOS_ESTRUCTURA.md). El código anterior se conserva como antecedente; el ensayo actual incorpora recorrido V2 y prototipo B1/B2, sin completar V2. P05 real sigue pendiente; P06 debe replantearse.52/100 pertenece a la línea base anterior, avanceV2 sin calcular. Los antecedentes de implementación que siguen no prevalecen sobre esta revisión.

**Prioridad vigente17/10/2026 (A-026/D-314): terminar P05 antes de continuarP06.** Se conserva el prototipoP06 y el crédito, sin avanzar funcionesP06. Integración del proyecto propio preparada pero desactivada por defecto; no equivale a conexión o pruebas reales. Leer docs/CIERRE_P05.md y docs/ACTIVACION_FIREBASE_PROPIO.md. P05 continúa EV0/6, global52/100. Actualización posterior EV-033: CLI del propietario autorizado; acceso y configuración Auth consultados en vivo. Facturación deshabilitada, sin cuenta vinculada; Iván eligió mantener Spark sin facturación (A-028/D-315). Firestore/Functions devuelven403SERVICE_DISABLED y no pudieron listarse; no se afirma ausencia de datos. El backend actual requiere Functions/Blaze y no se despliega. [Estado Spark](docs/P05-ESTADO-SPARK.md). A-027/D-316 registra GitHub y P06 inmediato con multiagentes después del cierre real P05; roadmapv0.18.

Actualización16/10/2026. Esta carpeta continúa el videojuego existente de la sesión principal SCP Survivor. Las otras sesiones se excluyeron entonces por instrucción de Iván; ESTRUCTURA se incorpora ahora por su petición posterior. No se reconstruyó el juego ni se sustituyeron sus recursos gráficos.

## Objetivo

Juego web de supervivencia con avance por mapas encadenados, cinco minutos de presión por mapa, jefe obligatorio y transición por puerta de la Fundación. Armas distintas por familias y mejoras de nivel al azar; grietas opcionales y saltos dimensionales por concretar. Se continúa el proyecto existente hasta una versión completa aceptada y publicada. El modo anterior conserva extracción, mods y mochilas como antecedente. La prueba V2 los excluye de su recorrido; su retirada integral y compatibilidad persistente siguen pendientes.

## Procedencia y autorización

Se consolidó DETECO/SCPSurvivor con SCP-Survivor-P04-0.4-actualizacion.zip y RoadmapSCP-v0.11.zip aportados por Iván. Main fue actualizado y verificado en39344e77e15bd82c98bacb3e9773ceaa20c1b918 con alfa0.4. Después Iván pidió avanzar GAP-001→P05 y eligió preparar/probar localmente. Durante el trabajo creó manualmente su proyecto Firebase scp-survivor; config/firebase-public.json conserva su configuración pública sin activarla. El15/10 pidió terminar la fase sin nuevas consultas y luego «subela. incluye roadmap». Esta entrega GitHub incorpora código P05-local-01 y roadmapv0.12, manteniendo ejecución emulada y servicios reales pendientes. Ver docs/PUBLICACION_GITHUB.md.

ZIPoriginal y backup previo P05 se conservan fuera de esta carpeta. docs/historial-local/alfa-0.4 conserva el contexto anterior; AUDITORIA_MIGRACION.md describe aquella entrega. Para resultados actuales consultar docs/P05-REPORT.md.

## Arquitectura

HTML/CSS/JavaScript y Canvas2D; módulos globales G. Sin motor externo ni framework nuevo. dev.html ordena scripts; tools/build-firebase.js empaqueta SDKoficial y tools/build.js produce index.html/js/app.min.js. CSSactual y arte provisional conservados.

| Ruta | Responsabilidad |
| --- | --- |
| js/systems/expedition.js | Director, semilla/calendarios, oleadas, preparación, salida y resultado |
| js/systems/field-combat.js,field-stats.js,field-abilities.js,field-upgrades.js | Equipo por copia, fórmulas/topes, habilidades y mejoras |
| js/world/,js/entities/ | Mundo, colisión, mapas, enemigos, jugador y recogibles |
| js/net/local-accounts.js | AuthSDK local, caché porUID y comandos/reintentos |
| js/systems/run-checkpoint.js | Captura/restauración versionada de fronteras seguras |
| js/systems/run-continuity.js | Pausa de confirmación, recuperación y control de sesión |
| js/ui/account-ui.js | Controles de cuenta incorporados al menú existente |
| functions/account-service.js,index.js | Comandos autenticados y transacciones de Firestore emulado |
| tools/start-emulators.js,serve-local.js,local-auth-mail.js | Arranque local, persistencia de emuladores y correo ficticio |
| RoadmapSCP.json | Tareas/decisiones/pesos canónicos; vista generada con tools/render-roadmap.js |
| tests/,docs/ | Verificaciones, evidencias e historial |

## Mecánicas presentes en el prototipo anterior; revisar según V2

- Dos soldados: guardia/Sprint y médico/curación. Velocidad165.
- Pistola/subfusil/escopeta; dos copias equipadas independientes, incluso mismo modelo. Seis mods, dos compatibles por copia.
- Mapas modulares con semilla, perseguidor/biológico, Custodio con avisos/refuerzos y huida disponible.
- Oleadas normales3/4/5 reproducibles; impares neutralización, pares resistencia60s. Preparación20s, Listo anticipado y elección inmediata de una mejora por nivel.
- XP sobrante procesada después de elegir, topes aditivos y cartas parciales. Pausa/segundo plano conservados.
- Extracción desde sector3 según calendario aprobado; muerte, extracción, huida y avance distintos, resultado único.

El equipo sigue siendo equipo de prueba: no acredita propiedad, desbloqueos, inventario o recompensas P06/P07. Las láminas24+24 y los tres bosses no son contenido implementado. DISENOS_Y_RECURSOS.md conserva el catálogo real y sus faltantes.

## P05 local y límites

Entrada normal aislada; solo localhost/127.0.0.1 con ?cuentas=local activa Firebase Auth/Firestore/Functions en demo-scp-survivor. El proyecto real de Iván existe pero no está conectado al juego; ver docs/FIREBASE_PROPIO.md. No se incorporaron claves privadas ni se habilitó facturación. Los servicios heredados permanecen desactivados.

Modelo users/UID: perfil alias, revisión, una activeRun y lastResult; subcolección receipts deduplica comandos. UID del token, revisión esperada, sesión propietaria y requestId. Reintento idéntico devuelve confirmación; contenido distinto con mismoID, revisión obsoleta y sesión revocada se rechazan. Firestore niega acceso directo del cliente.

Checkpointversionado conserva semilla, estado seguro, jugador/XP/mejoras, armas/munición/recargas/habilidad, mapa/props/recogibles y contadores. El combate avanzado vuelve al inicio confirmado de oleada y queda fuera de clasificación. Caché de navegador no es autoridad ni se mezcla con otroUID. Una transferencia explícita revoca la sesión anterior; durante una confirmación fallida se detiene el juego.

No confundir verificación/Google emulados con correo real/OAuthGoogle real. Combate local, sin validación completa antitrampas. No se implementaron economía, inventario persistente, eliminación de cuenta completa, ranking oficial, hosting o publicación. No se midieron FPS, memoria, carga, costes ni dispositivos físicos.

## Estado y errores

El resultado exacto de pruebas y límites está en docs/P05-REPORT.md, no en informes históricos. RoadmapSCP.json conserva los pesos y solo suma tareas CV con evidencia completa. P05 real permanece en validación mientras falte su entorno propio y aceptación real; no sumar puntos por instalar herramientas o generar este contexto.

Errores de conexión dejan confirmación pendiente y partida detenida: reintentar mismo comando. Guardados incompletos o de otra versión se conservan pero no se fuerzan. Antes de cerrar emuladores, ejecutar npm.cmd run emulators:save desde otra terminal y esperar confirmación; cerrar a la fuerza puede perder datos no exportados.

## Próximas tareas

1. Seguir PAUTA_DESARROLLO.md y resolver los contratos abiertos de la adaptación, sin implementar supuestos del chat.
2. Terminar aceptación real P05 manteniendo Spark sin facturación y definir compatibilidad de guardados con V2. La preparación local de Worker no acredita despliegue ni pruebas reales.
3. Implementar el plan RC: primero un mapa300s, jefe, puerta/soldados y transición; después armas/mejoras y retirada de extracción/mods/mochilas.
4. Replantear P06/P07 para colección, gacha y recompensas; cerrar cofres y dimensiones antes de producir mapas finales. Continuar P08–P11 con criterios revisados.

No tocar sources/ del espejo padre, ZIPoriginales ni datos de cuenta. Los informes siguientes documentan prototipos anteriores; no acreditan funciones V2.

## Ampliación local de grietas — 16/10/2026

Iván autorizó el prototipo y realizará la aceptación manual. Abrir ?prueba=grieta para acceso directo o ?grietas=local para aparición opcional; solo loopback y sin cuentas. Grieta física alcanzable, apertura45s activas, cierre e indicador dirección/distancia/tiempo; sonido y alerta al aparecer. Variante Custodio provisional en mismo escenario, entrada voluntaria y retirada. No cambiar jefes normales, arte aprobado ni pesos. P05 de cuentas conserva su esquema: las grietas no se guardan y ambas opciones se desactivan con cuentas=local. P09 debe conservar sonido/aviso/localizador como requisitos permanentes. Leer docs/PRUEBA_GRIETAS.md, docs/OBSERVACIONES_VISUALES.md y docs/GRIETAS-VALIDACION.md. Roadmapv0.13 conserva52/100, P05EV0/6. Prototipo sin publicación externa.

Decisión posterior de Iván (A-023/D-311): ingreso instantáneo al tocar/cruzar la grieta abierta, sin botón, tecla, confirmación ni espera. No detener el movimiento mantenido. La llegada anunciada del jefe sigue siendo aviso de ataque y no retrasa la entrada. Roadmapv0.14;52/100 sin cambios.

## Antecedente P06 local — 16/10/2026; inventario por replantear

A-024 autoriza empezar P06 localmente tras el prototipo de grietas. P06-T01 está EC con un primer tramo de modelo físico y panel base/preparación con confirmación, copias numeradas, mochilas de 8/16 y almacén60 como fixture temporal. `?inventario=local` activa la opción; `?prueba=inventario` muestra el menú y el botón de inicio abre preparación20s. Es solo loopback: sin cuentas, persistencia, inventario real, botín ni kit. El descanso sigue durante preparación; un borrador no confirmado se descarta al vencer el tiempo y reducir la mochila por debajo de su contenido se rechaza sin descartar objetos.

La aceptación de P06-T01 permanece incompleta: requiere autoridad transaccional de servidor según sus dependencias originales (P04-T02/P05-T03), continuidad y aceptación manual de Iván. P06-T02 (kit), T03 (muerte/recuperación), T04 (buzón) y T05 (resultado único) siguen pendientes; están autorizadas para trabajo local, sin contarse como hechas. No se añadió botín ni persistencia al fixture. Roadmap v0.15 conserva las 53 tareas, el global52/100, P05EV0/6, todos los pesos y dependencias. EV-030 registra95 pruebas aprobadas,0 fallos,1 omitida,4 escenarios aislados de inventario y4 de regresión de grietas aprobados. Límites en [docs/P06-REPORT.md](docs/P06-REPORT.md); aceptación humana pendiente en [docs/PRUEBA_INVENTARIO_P06.md](docs/PRUEBA_INVENTARIO_P06.md). La regla de ingreso instantáneo por contacto de grieta D-311 permanece vigente.

Petición posterior A-025 (16/10): crédito exacto «Desarrollado por Ivan Vivanco» visible bajo el título de las pruebas/demo; publicar esta entrega acumulada y roadmapv0.16 en GitHub conservando el historial. Los límites locales y el avance52/100 se mantienen. Consultar docs/PUBLICACION_GITHUB.md; subir el código no activa Firebase real.
