# Contexto del proyecto — SCP Survivor

Actualización16/10/2026. Esta carpeta continúa el videojuego existente de la sesión principal SCP Survivor. Las otras sesiones se excluyeron por instrucción de Iván. No se reconstruyó el juego ni se sustituyeron sus recursos gráficos.

## Objetivo

Juego web de supervivencia por expediciones infinitas: explorar sectores, neutralizar amenazas, resistir oleadas, mejorar temporalmente equipo y decidir entre avanzar, huir de un jefe o extraer. La meta canónica sigue siendo la primera versión completa publicada, no una demo local.

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

## Mecánicas conservadas

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

1. Revisar aceptación local P05 y límites antes de configurar servicios reales.
2. Completar la integración con scp-survivor: proveedores/dominios y mínimo8 ya aparecen configurados en capturas. Faltan correo/verificación/recuperación/vinculación reales, backend/reglas, retención/eliminación y pruebas con esos servicios. Evaluar despliegue y costes antes de activar servicios facturables.
3. Completar aceptación P05 respetando dependencias. Después P06: inventario, ubicaciones únicas, pérdidas/recuperación, almacén y buzón con operaciones de servidor. No dar por implementadas esas reglas con los contratos genéricos de P05.
4. P07economía/progresión, P08demo/clasificación, P09arte/UI/audio, P10aceptación/rendimiento/coste y P11publicación según canónico.

Para continuar: seleccionar esta carpeta en Codex Local, leer AGENTS.md/PROMPT_MAESTRO.md, seguir INSTALACION_WINDOWS.md y revisar el diff de P05. No tocar sources/ del espejo padre ni originales Cloud.

## Ampliación local de grietas — 16/10/2026

Iván autorizó el prototipo y realizará la aceptación manual. Abrir ?prueba=grieta para acceso directo o ?grietas=local para aparición opcional; solo loopback y sin cuentas. Grieta física alcanzable, apertura45s activas, cierre e indicador dirección/distancia/tiempo; sonido y alerta al aparecer. Variante Custodio provisional en mismo escenario, entrada voluntaria y retirada. No cambiar jefes normales, arte aprobado ni pesos. P05 de cuentas conserva su esquema: las grietas no se guardan y ambas opciones se desactivan con cuentas=local. P09 debe conservar sonido/aviso/localizador como requisitos permanentes. Leer docs/PRUEBA_GRIETAS.md, docs/OBSERVACIONES_VISUALES.md y docs/GRIETAS-VALIDACION.md. Roadmapv0.13 conserva52/100, P05EV0/6. Prototipo sin publicación externa.

Decisión posterior de Iván (A-023/D-311): ingreso instantáneo al tocar/cruzar la grieta abierta, sin botón, tecla, confirmación ni espera. No detener el movimiento mantenido. La llegada anunciada del jefe sigue siendo aviso de ataque y no retrasa la entrada. Roadmapv0.14;52/100 sin cambios.

## Inicio local P06 — 16/10/2026

A-024 autoriza empezar P06 localmente tras el prototipo de grietas. P06-T01 está EC con un primer tramo de modelo físico y panel base/preparación con confirmación, copias numeradas, mochilas de 8/16 y almacén60 como fixture temporal. `?inventario=local` activa la opción; `?prueba=inventario` muestra el menú y el botón de inicio abre preparación20s. Es solo loopback: sin cuentas, persistencia, inventario real, botín ni kit. El descanso sigue durante preparación; un borrador no confirmado se descarta al vencer el tiempo y reducir la mochila por debajo de su contenido se rechaza sin descartar objetos.

La aceptación de P06-T01 permanece incompleta: requiere autoridad transaccional de servidor según sus dependencias originales (P04-T02/P05-T03), continuidad y aceptación manual de Iván. P06-T02 (kit), T03 (muerte/recuperación), T04 (buzón) y T05 (resultado único) siguen pendientes; están autorizadas para trabajo local, sin contarse como hechas. No se añadió botín ni persistencia al fixture. Roadmap v0.15 conserva las 53 tareas, el global52/100, P05EV0/6, todos los pesos y dependencias. EV-030 registra95 pruebas aprobadas,0 fallos,1 omitida,4 escenarios aislados de inventario y4 de regresión de grietas aprobados. Límites en [docs/P06-REPORT.md](docs/P06-REPORT.md); aceptación humana pendiente en [docs/PRUEBA_INVENTARIO_P06.md](docs/PRUEBA_INVENTARIO_P06.md). La regla de ingreso instantáneo por contacto de grieta D-311 permanece vigente.

Petición posterior A-025 (16/10): crédito exacto «Desarrollado por Ivan Vivanco» visible bajo el título de las pruebas/demo; publicar esta entrega acumulada y roadmapv0.16 en GitHub conservando el historial. Los límites locales y el avance52/100 se mantienen. Consultar docs/PUBLICACION_GITHUB.md; subir el código no activa Firebase real.
