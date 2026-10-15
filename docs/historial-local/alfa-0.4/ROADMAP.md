# Roadmap operativo de SCP Survivor

Versión de referencia: **RoadmapSCP v0.11**, 14/10/2026. Entrega: **P04-local-01, alfa 0.4**.

Este documento resume el siguiente trabajo y facilita la continuidad. **RoadmapSCP.json es la fuente canónica**; RoadmapSCP.md es su vista generada. No editar estados, pesos o decisiones del canónico a partir de este resumen sin autorización. La migración local no cambia el avance del producto.

## Avance verificado del plan

| Medida | Cumplido / total | Porcentaje |
| --- | --- | --- |
| Global, hasta primera versión completa publicada | 49/100 | 49 % |
| Planificación | 10/10 | 100 % |
| Trabajo técnico | 39/90 | 43,33 % |
| P03 | 9/12 | 75 % |

Son 53 tareas en 12 fases y 24 tareas con cierre verificado. La fórmula suma el peso de tareas CV con evidencia completa; no hay crédito parcial por tareas en validación. Los porcentajes se derivan del JSON, sin inferir cumplimiento por commits, paquetes, mensajes o cantidad de archivos.

| Fase | Alcance aprobado | Peso | Peso cerrado | Estado |
| --- | --- | ---: | ---: | --- |
| P00 | Auditoría, decisiones y plan aprobado | 10 | 10 | Planificación completada |
| P01 | Copia independiente y fundamento técnico | 8 | 8 | Completada localmente |
| P02 | Primera partida completa mínima H-001 | 10 | 10 | Completada localmente |
| P03 | Expedición, escenarios, misiones y enemigos finales | 12 | 9 | En validación por GAP-001 |
| P04 | Soldados, armas, modificaciones y combate completo | 12 | 12 | Completada localmente |
| P05 | Cuentas, autoridad de servidor y continuidad | 6 | 0 | Pendiente |
| P06 | Inventario, pérdida, recuperación, almacén y buzón | 10 | 0 | Pendiente |
| P07 | Progresión, gacha, hitos y economía | 10 | 0 | Pendiente |
| P08 | Demo y clasificación de pruebas/oficial | 4 | 0 | Pendiente |
| P09 | Interfaz, arte, audio y experiencia móvil final | 8 | 0 | Pendiente |
| P10 | Aceptación, rendimiento, integridad y costes | 6 | 0 | Pendiente |
| P11 | Distribución, publicación y cierre verificado | 4 | 0 | Pendiente |

Las dependencias detalladas siguen en tasks[].dependencies del JSON. En particular, el cierre de ranking oficial P08-T02 requiere P10-T01 y P10-T02. La numeración no permite saltar sus criterios.

## Prioridad 1: cerrar GAP-001 en P03-T02

**Estado actual:** el director funciona con tres oleadas normales fijas. **Requisito aprobado:** sortear de forma equiprobable 3, 4 o 5 oleadas por sector normal, conforme a D-143/D-190, manteniendo semilla y continuidad reproducibles. P03-T02 permanece EV, con peso 3 y evidenceComplete=false.

La corrección requiere autorización concreta de Iván antes de modificar jugabilidad. No eliminar el requisito, reinterpretar las tres oleadas como suficientes ni cambiar pesos para declarar P03 completa.

Una vez autorizada:

1. Leer js/systems/expedition.js, la generación de semillas y todos los consumidores de contadores, objetivos y transiciones. Revisar tests/p03-director.test.js y las integraciones antes de programar.
2. Incorporar y registrar el número de oleadas del sector normal dentro de los mecanismos existentes, sin reconstruir el director.
3. Mantener primera neutralización y alternancia posterior resistencia de 60 s/neutralización; conservar preparación, XP inmediata, aparición de biológico, calendario de jefe y extracción.
4. Probar cierres, contadores, objetivos alternos y transiciones para 3, 4 y 5 oleadas, incluida la salida del sector tras el último objetivo y los casos de muerte o extracción.
5. Repetir integración con biológico, jefe, victoria/huida y extracción, tanto en fuentes como en compilado cuando corresponda.
6. Registrar evidencias y límites. Solo tras completar la aceptación y obtener autorización documental actualizar el estado canónico, generar su Markdown y recalcular el avance.

Los ensayos anteriores basados en tres oleadas siguen siendo evidencia histórica de ese comportamiento; no prueban los tres tamaños requeridos.

## Prioridad 2: concretar P05 antes de activar nube

P05 conserva 0/6. El proveedor está aprobado como decisión de diseño: **Firebase Auth, Firestore y Firebase Functions propios**, reutilizando functions/. El alojamiento futuro previsto es Firebase Hosting con dirección .web.app inicial. No sustituir este stack por Supabase, Expo u otro framework.

| Tarea | Resultado que debe demostrarse |
| --- | --- |
| P05-T01 | Cuenta Google o correo real, alias, recuperación y flujos de acceso propios, incluidos errores y vinculación según alcance |
| P05-T02 | Operaciones persistentes con propiedad, revisión e idempotencia; concurrencia, reintentos y respuesta perdida sin duplicar gasto o entrega |
| P05-T03 | Checkpoints, una expedición activa, transferencia de dispositivo y desconexiones; conservación de lo confirmado y exclusión del ranking al retroceder combate |

El plan de P05 debe delimitar modelos de datos, comandos, reglas de acceso, validación de UID, versiones, deduplicación y pruebas con emuladores/datos ficticios. La economía, propiedad y cálculo de ranking se confirman en servidor; no permitir escritura económica libre del cliente.

Persistencia prevista no significa persistencia implementada. La autoridad de confirmación prevista tampoco equivale a simular o demostrar cada combate en servidor. Respetar el riesgo aceptado y los contratos D-288–D-297, sin añadir un servidor de combate fuera de alcance.

Preparar ese plan no autoriza crear/configurar proyectos externos, introducir credenciales, habilitar facturación, instalar functions/, desplegar ni publicar. Cada acción debe estar dentro de una autorización vigente. El objetivo de 20 USD/mes y sus alertas propuestas no constituyen un límite financiero garantizado.

## Secuencia posterior

1. **P06:** objetos y ubicaciones únicas, almacén, buzón, pérdidas y recuperación confirmados; evitar duplicación entre cuenta y expedición.
2. **P07:** progresión permanente y economía adaptadas, con valores aprobados, propiedad real y operaciones de servidor.
3. **P08:** demo y clasificación de pruebas diferenciadas del ranking oficial. Respetar las dependencias de validación P10 antes de habilitarlo.
4. **P09:** interfaz, audio y arte finales sobre los sistemas existentes, tras autorización del trabajo visual concreto.
5. **P10:** aceptación, integridad, rendimiento sostenido, memoria, dispositivos y coste medido.
6. **P11:** servicios y publicación autorizados, preview/rollback y verificación de producción. Una alfa local o demo no cierra el global.

Cooperativo, Hardcore, códigos, regalos, ampliaciones 24+24 y PC como plataforma final siguen fuera del denominador de esta primera publicación. No convertir las referencias de personajes en compromisos de contenido.

## Evidencia y límites del relevo

Consultar AUDITORIA_MIGRACION.md para el resultado actual de construcción, navegador y adaptación a Windows. README.md y docs/P04-REPORT.md contienen el alcance alfa 0.4; sus evidencias de Chromium/Linux y táctil emulado son históricas.

Las 39 comprobaciones Node de la migración pasaron en 13 archivos, con cero fallos; no acreditan Safari, iPhone/Infinix físicos, FPS, memoria, capacidad simultánea, costes ni producción. La batería heredada p02-weapon vuelve a ejecutar p04-weapons.

La migración integra main `78abae79ecef81a4de01068479d872877dd7ed00`, el ZIP P04 y RoadmapSCP v0.11 aportados por Iván. Conserva el bundle P04 `dd0724d6bd` y sus documentos. Ni la reparación de integridad de touch.js ni las adaptaciones de tests aportan puntos nuevos al roadmap.

Antes de cerrar una tarea: comprobar criterio y autorización, ejecutar la verificación necesaria, revisar su salida y registrar versión/entorno/evidencia. Informar como implementado, parcial, pendiente o no comprobado según corresponda.
