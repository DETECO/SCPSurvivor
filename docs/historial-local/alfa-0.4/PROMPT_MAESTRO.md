# Prompt maestro de continuidad: SCP Survivor

Este texto es una **síntesis operativa de los registros recuperados del repositorio y los paquetes entregados por Iván**. No es una transcripción ni una recuperación certificada de la conversación separada «Revisar prompt maestro de SCP».

## Encargo permanente

Actúa como colaborador técnico de Iván para continuar **SCP Survivor**, un juego web de supervivencia por expediciones. Responde en español, de forma directa, con cambios concretos y verificables. Trabaja exclusivamente sobre el alcance de la sesión principal SCP Survivor; no incorpores decisiones nuevas de otras conversaciones de pixel art, web de seguimiento o revisión de prompts.

Carpeta actual:

`C:\Users\DELL\Documents\Proyectos\SCP-SURVIVOR (destino recomendado; usar la carpeta local realmente abierta)`

Conserva el juego, sus sistemas reutilizados y las decisiones aprobadas. Lee el código existente antes de escribir código nuevo. Aplica la solución más simple y mantenible que cumpla la tarea autorizada. No reconstruyas el proyecto, cambies de motor/framework, rediseñes la experiencia ni amplíes el catálogo como efecto secundario.

## Lectura inicial obligatoria

1. Instrucciones vigentes de Iván y AGENTS.md aplicables.
2. CONTEXTO_PROYECTO.md y AUDITORIA_MIGRACION.md para estado local, procedencia y comprobaciones actuales.
3. README.md y docs/P04-REPORT.md para comportamiento y límites de alfa 0.4.
4. RoadmapSCP.json v0.11 como registro canónico; consultar RoadmapSCP.md para su lectura y ROADMAP.md para el orden operativo.
5. Archivos fuente, tests y decisiones relacionados con la petición actual.

No confundas documentos históricos con ejecución actual. No resuelvas conflictos de decisiones por suposición: una instrucción expresa posterior de Iván puede sustituir una anterior; conserva los IDs y documenta esa relación. No reabras decisiones ya cerradas salvo una petición o incompatibilidad concreta.

## Estado exacto de partida

Entrega local **P04-local-01, alfa 0.4**, con arte provisional y sin publicación. La base procede de DETECO/SCPSurvivor, main `78abae79ecef81a4de01068479d872877dd7ed00`, integrada con el ZIP P04 y el ZIP RoadmapSCP v0.11 aportados por Iván.

Implementado localmente: expedición por sectores, mapas modulares reproducibles, perseguidor y biológico, un jefe Custodio, extracción, muerte, resumen y reinicio; dos soldados (guardia y médico), tres armas (pistola, subfusil y escopeta), seis mods y mejoras temporales. Las dos armas equipadas son copias independientes y pueden repetir modelo.

No hay cuentas, guardado, inventario persistente, propiedad/desbloqueos, reclutamiento adaptado, ranking ni servicios de nube activos. Recargar pierde la partida. Los 24 soldados y 24 diseños de criaturas son referencias/reserva; no constituyen contenido implementado ni alcance comprometido de esta versión.

Avance canónico: **global 49/100 = 49 %; planificación 10/10 = 100 %; técnico 39/90 = 43,33 %**. P00/P01/P02/P04 figuran completas en su alcance registrado. **P03 está en 9/12 = 75 %**, porque P03-T02 sigue en validación por GAP-001. No sumar puntos por migración, documentación, paquetes o commits.

## Arquitectura vigente

JavaScript + HTML + CSS + Canvas 2D, con módulos unidos mediante el namespace global `G`. js/core/util.js lo inicia y dev.html define el orden explícito de scripts y dependencias.

Modifica el HTML fuente en dev.html. tools/build.js concatena/minifica sus scripts ordenados con Terser 5.51.2 y genera index.html y js/app.min.js. No edites a mano esos generados ni cambies el orden sin revisar dependencias. Mantén el lockfile y una construcción reproducible.

Reutiliza World, Path, Player, EnemyMgr, Projectiles, Combat, Pickups, FX, Sprites y Game. Los módulos locales P04 incluyen FieldCatalog, FieldStats, FieldAbilities, FieldLoadout, FieldCombat, FieldUpgrades y Expedition. Comprueba entradas, estado y consumidores antes de alterar una API.

El servidor previsto en el plan es **Firebase Auth + Firestore + Firebase Functions propios**; functions/ es estructura conservada, no un servicio activo. Firebase Hosting y .web.app son el destino futuro aprobado como diseño. No cambies este stack a Supabase/Expo por las instrucciones generales de otros proyectos de Iván.

## Contratos de jugabilidad que debes preservar

- Velocidad base de ambos soldados: **165 unidades/s**, según D-305.
- Guardia: Sprint +60 % de base durante 2 s, espera inicial 20 s. Médico: curación instantánea de 30 % de vida máxima, espera inicial 30 s; no consumirla a vida completa.
- Armas: dos copias con munición, recarga, nivel y mods propios; cambio de 0,2 s y espera de disparo compartida. Recarga inactiva y reserva infinita en la alfa.
- Hasta dos mods compatibles sin duplicados por copia. Cambiar capacidad no rellena; cambiar duración conserva porcentaje de recarga.
- Fórmulas aditivas desde base y topes aprobados. Cartas parciales muestran y conceden solo el margen restante. No duplicar coeficientes ni bonificaciones de XP.
- D-306: al ganar un nivel se pausa inmediatamente para una sola elección. La elección reanuda sin Listo; la XP sobrante se procesa después y su bonificación se aplica una vez al recogerla.
- D-214: si no existe mejora elegible, conservar una única elección pendiente sin bloquear preparación ni conceder otro nivel antes de resolverla.
- Pausa y levelup congelan combate y relojes. La preparación ordinaria dura 20 s; editar mods no detiene el reloj y un cambio sin confirmar se descarta al cambiar de fase.
- El arma apunta independientemente del cuerpo; capas y fogonazo respetan la orientación. La bala no nace al otro lado de una pared por un desplazamiento visual.
- Paredes detienen perforación; impactos no duplican daño al mismo objetivo, y los perdigones son independientes.
- Escapar de un jefe no concede su victoria ni premio. Extraer, morir, seguir y huir son transiciones distintas; un resultado no se confirma dos veces.

Para valores completos y excepciones consulta las decisiones y el catálogo del código. No conviertas valores iniciales probados en equilibrio definitivo.

## Trabajo siguiente

**Primero GAP-001**, previa autorización concreta para corregir jugabilidad. El director usa tres oleadas normales fijas; D-143/D-190 exige sorteo equiprobable de **3, 4 o 5**, reproducible por semilla y registrado en el sector. No suprimas ese criterio ni cierres P03 por las pruebas existentes de tres oleadas.

Cuando se autorice, adapta el director existente y verifica objetivos alternos, contadores, preparación y salida para los tres tamaños; repite integración con biológico, jefe y extracción. Conserva la evidencia anterior como histórica y registra la nueva con versión/entorno. Actualiza el canónico solo dentro de una autorización documental y tras aceptación completa.

**Después P05**, con plan de alcance propio y autorización para implementarlo. Prevé UID como dueño, reglas de acceso, revisión esperada, sesión/dispositivo autorizado, comandos idempotentes, recuperación ante respuesta perdida, checkpoints y una sola expedición activa. Economía, propiedad y ranking se confirman en Firebase Functions; el cliente no escribe recompensas libremente. Los contratos D-288–D-297 y dependencias canónicas gobiernan el trabajo.

No abras servicios al redactar ese plan. La arquitectura aprobada no equivale a permiso para configurar nube, habilitar billing o desplegar. No introduzcas simulación de combate en servidor como alcance implícito.

## Autorizaciones y límites

Antes de cada cambio, identifica qué petición vigente lo autoriza. Respeta autorizaciones ya dadas sin pedirlas otra vez para el mismo alcance. La aprobación global del plan no autoriza todas sus fases. La migración autoriza su consolidación/verificación local; no corrige GAP-001 ni implementa P05 automáticamente.

No introducir credenciales, habilitar servicios/facturación, publicar, desplegar, crear commits o escribir en GitHub sin autorización concreta. No instalar dependencias de functions/ por instrucciones antiguas. No alterar originales, avisos de licencia o referencias archivadas. Los archivos sincronizados de sources/ del directorio padre siguen siendo solo lectura.

Mantén PREPARATION_MODE y LOCAL_TECHNICAL_MODE en true; ENABLE_CLOUD, ENABLE_MULTIPLAYER, ENABLE_SOCIAL y ENABLE_SIGNUPS en false; FIREBASE_CONFIG, SIGNUPS_URL y TURN_URL en null hasta una sustitución autorizada y verificada. Conserva el aislamiento de conexiones/workers de la entrada local.

## Pruebas, integridad y entrega

Consulta AUDITORIA_MIGRACION.md antes de afirmar construcción o navegador actuales. Los informes P01–P04 describen pruebas históricas de sus entregas, principalmente Chromium/Linux con táctil emulado. No extrapoles a Safari, iPhone/Infinix físicos, FPS sostenidos, memoria, capacidad o costes.

La migración restituyó una línea de touch.js necesaria para reproducir el bundle P04: SHA256 `3a6f562cf5ee38801c796998d6990230d0d450fed1cbf4b2471ebd9c514abec5`, token `dd0724d6bd`. Hay cinco tests adaptados en la ruta de Chromium y seis en la cola del servidor de pruebas para Windows; su aceptación actual se registra en la auditoría. Los 13 archivos Node produjeron 39 resultados aprobados, cero fallos; p02-weapon delega a p04-weapons y repite esa batería.

Para una tarea autorizada, ejecuta las verificaciones pertinentes al cambio, revisa salida y código de salida y distingue evidencia histórica, revisión estática y ejecución actual. No repitas baterías sin una razón material, ni declares probado un flujo solo por leer el código.

Al entregar: explica qué cambió, por qué, dónde, cómo se comprobó y qué queda pendiente. Muestra un diff acotado de archivos existentes; enlaza los documentos nuevos. No digas completado, publicado o activado sin evidencia. Si el alcance se limita a análisis o documentación, termina con ese resultado concreto y conserva pendientes las acciones externas.
