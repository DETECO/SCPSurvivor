# P05-local-01 — cuentas y continuidad, alfa 0.5 local

Entrega15/10/2026 sobre alfa0.4/main39344e77. Iván autorizó avanzar GAP-001→P05, eligió preparar/probar localmente y reiteró completar ese alcance sin más consultas. Original Cloud, ZIP de migración y backup anterior se conservan. Después de recibir el paquete local pidió «subela. incluye roadmap»: esta actualización del repositorio incorpora P05-local-01 y roadmapv0.12. Firebase real sigue sin desplegar. docs/PUBLICACION_GITHUB.md distingue la subida del código de su ejecución local; los JSON de prueba conservan el estado observado antes de esa petición posterior.

## Resultado

GAP-001 queda resuelto: sectores normales con3/4/5 oleadas reproducibles, usando una secuencia independiente del calendario de jefe/extracción. P03-T02 cumple su criterio y P03 queda12/12. El roadmap conserva53tareas/12fases/100puntos: **52/100 global,42/90 técnico (46,67%),25 tareas CV**.

P05 está implementado y comprobado como **prototipo local con emuladores oficiales**. P05-T01/T02/T03 siguen EV y0/6 puntos: sus criterios de servicios propios/identidad real y aceptación integrada no se dan por cumplidos con una simulación.

## Implementación

- SDK Firebase oficial empaquetado localmente. Entrada optativa localhost/127.0.0.1 con ?cuentas=local; la entrada normal continúa aislada. Firebase heredado, social y multijugador siguen desactivados.
- Registro/acceso con correo ficticio, alias separado, verificación antes de iniciar, recuperación y cierre. Google de prueba usa la credencial simulada documentada por Auth Emulator, sin OAuth/ventana Google real. Vinculación explícita en ambas direcciones, conservando UID y datos.
- Callable accountCommand: UID del token; revisión esperada, requestId y sesión; transacciones Firestore; recibo consultado antes de revisión para recuperar respuestas perdidas. Mismo ID/contenido no duplica; contenido distinto con mismo ID, revisión obsoleta y sesión revocada se rechazan.
- Una expedición activa por UID. Reanudar transfiere explícitamente su sesión. La anterior queda detenida al comprobar propiedad; se consulta cada3s y antes de confirmar fronteras, sin prometer revocación instantánea de un fotograma local.
- Checkpoint schema1/build0.5-local-01: semilla/calendario/RNG, jugador/XP/mejoras, copias de armas/munición/recargas/habilidad, props, recogibles y contadores. Se guarda en preparación/exploración e inicio de oleada/jefe. No serializa combate avanzado. Recuperarlo desde el inicio confirmado excluye clasificación irreversiblemente.
- Confirmaciones fallidas detienen la partida. Comando pendiente y caché separados por UID; un comando pendiente sobrevive al cierre de pestaña y conserva su ID. Caché no es autoridad; no se mezclan inventarios por máximos/unión.
- Cliente y servidor rechazan checkpoints incompletos/incoherentes. Versión incompatible se conserva para revisión. Firestore niega el acceso directo del cliente; solo el backend emulado escribe estado/recibos.

El servidor confirma propiedad/versiones/duplicados. **No prueba la veracidad del combate local**, no calcula score oficial ni implementa inventario, moneda, pérdidas o recompensas persistentes P06/P07. Los campos históricos del jugador en un checkpoint no son una economía autoritativa. Los recibos no tienen TTL en esta fase; medir/definir su retención antes de producción.

## Verificación ejecutada

Windows, Node24.12.0/npm11.6.2, Java Temurin21.0.12.1, Python3.12.10, Playwright1.64.0/Chromium156. Dependencias fijadas en ambos lockfiles; FirebaseJS13.0.0, CLI15.34.0, Admin14.5.0 y Functions7.4.0. No se requieren credenciales privadas para estos ensayos.

| Comprobación | Resultado observado |
| --- | --- |
| Suite Node completa | 73 casos:72 aprobados,0 fallos,1 omitido por opt-in |
| Integración Auth/Firestore/Functions explícita | 1 ensayo aprobado con múltiples aserciones; se ejecuta aparte con RUN_P05_EMULATORS=1 |
| P05 navegador, fuentes y compilado final | 12 escenarios por entrada,24 aprobados; cero errores de página y peticiones fuera de endpoints locales permitidos |
| P04 navegador | 4 escenarios aprobados, fuentes/compilado ×escritorio/táctil emulado |
| Niveles/XP P03 | 2 entradas aprobadas; una elección inmediata por nivel, XP sobrante y entrada repetida |
| P03 integrado tras GAP-001 | 4 escenarios y2 recorridos completos aprobados; extracciónS10/oleada4,35oleadas; fuente1580bajas/jefe evadido, compilado1587/jefe vencido |
| Exportación/reinicio/importación local | Mismo UID Auth y estado/revisión Firestore recuperados; configuración de vinculación explícita conservada |
| Construcción y comprobación final | 82scripts, bundle099c7a1a5c, SDK216994bytes; build:check aprobado |

La suite heredada p02-weapon vuelve a ejecutar p04-weapons: el conteo no representa73 sistemas únicos. El ensayo servidor verifica autenticación/UID ajeno,4 checkpoints incompletos rechazados sin estado/recibo, revisión/concurrencia, reintentos,1expedición, transferencia, rollback irreversible, resultado único y escrituras directas denegadas.

P05 navegador cubre alta, bloqueo sin verificar, reload/rollback, checkpoint real al terminar combate, pérdida de respuesta después de commit/reintento, transferencia entre pestañas, muerte, recuperación de contraseña, roundtrip exacto con cajas dañadas/rotas/munición/recarga/recogible, correo coincidente sin fusión automática y vinculación en ambos sentidos. Se usaron identidades desechables @example.test; no correos/cuentas Google reales.

P03/P04 y niveles se ejecutaron sobre bundle0109f7a66d antes del endurecimiento final del validador P05. Esa corrección no cambia su modo sin cuentas; P05 se reejecutó completo sobre099c7a1a5c. Los recorridos largos utilizan pasos fijos y reloj virtual de caché; no son medición de FPS ni balance. Muerte, manipulación de recogibles/props y cortes de red son inyecciones controladas identificadas en pruebas.

Evidencias: P05-validation.json, GAP-001-validation.json, P05-source-delta.json, P05-node-tests.txt, P05-emulators-tests.txt, carpeta evidence/p05 y pruebas reproducibles en tests/. Inventario actual con tamaños/hashes: INVENTARIO_P05.csv. INVENTARIO_PROYECTO.csv, AUDITORIA_MIGRACION.md y docs/P01–P04 corresponden a entregas anteriores.

## Incidencias resueltas y adaptaciones

1. P04 tenía una recarga pendiente al inyectar ammo=7; terminaba durante clics y reponía12 antes de confirmar mods. Se normaliza reload=0 en ese fixture, conservando ammo7/capacidad18 y contador en marcha. No se cambió la recarga del juego.
2. El autoplay de90000pasos terminaba enS10/oleada2 con el nuevo tamaño3/4/5. Solo el presupuesto del recorrido completo aumenta a150000; no se inyectan vida/daño ni se relajan sus criterios.
3. La revisión encontró campos obligatorios ausentes aceptados al restaurar. Se añadieron casos rojos y validación completa antes de mutar juego/escribir servidor; matrices válidas de jefe/preparación/exploración permanecen aceptadas.
4. Auth Emulator con vinculación por accounts:signUp rechaza un correo ya perteneciente al mismo UID. Para agregar contraseña al Google simulado se usa updatePassword oficial sobre el usuario autenticado y se recarga su token. Esta adaptación es exclusiva del entorno local; vinculación real queda pendiente.
5. El popup del SDK intentaba cargar gapi externo bajo CSP. Google local usa ahora la credencial simulada admitida por Auth Emulator. Se mantiene CSP sin unsafe-eval ni permisos de red externos. Las esperas de Playwright se adaptaron sin eludir CSP.
6. El CLI completo emitió una aserción nativa de Windows al salir tras exportar. emulators:save usa el mismo cliente/hub de exportación de firebase-tools15.34.0, valida proyecto/origen local y confirma el manifiesto; se comprobó exportar/reiniciar/importar. Guardar explícitamente antes de cerrar; el cierre forzado puede dejar procesos o datos sin exportar.
7. En un arranque frío Functions excedió10s al descubrir handlers. El lanzador fija60s; los siguientes arranques cargaron accountCommand y los flujos pasaron. METADATA_SERVER_DETECTION=none evita detección de credenciales de servidor externo en esta preparación local.

## Firebase real y pendientes

Iván creó scp-survivor, appweb y planSpark, habilitó Google/correo, autorizó dominios locales y guardó mínimo8 sin clases adicionales. Es evidencia de configuración de consola, **no de conexión real del juego**. Su configuración pública está conservada e inactiva en config/firebase-public.json; detalle en FIREBASE_PROPIO.md.

Faltan para P05 completo: backend/reglas y aislamiento propios, verificación/recuperación/vinculación y separación de identidades reales, entrega de correo, retención/eliminación y pruebas de continuidad con servicios propios. Functions actuales rechazan producción deliberadamente. Revisar arquitectura de despliegue/costes antes de habilitar servicios facturables.

Tampoco se aceptan aquí economía/inventario P06/P07, clasificación oficial, arte/audio finales, teléfonos físicos/Safari, FPS/memoria/carga, presupuesto20USD o publicación. Los recursos y las mecánicas existentes se conservan. Ninguna lámina24+24 se da por implementada por estar mencionada.

## Continuar

Seguir INSTALACION_WINDOWS.md: instalar herramientas/dependencias, iniciar emuladores y servidor, abrir ?cuentas=local, usar correo:local y guardar con emulators:save. Leer AGENTS.md, contexto, prompt y roadmap. Revisar P05-CAMBIOS.diff antes de integrar a una rama local; no sobrescribir main. El ZIP omite dependencias reinstalables, Java/Chromium/Python portátiles de auditoría, .git, logs/cachés, cuentas/tokens y local-data.
