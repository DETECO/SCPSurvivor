# Continuidad en Work/Codex Local

Proyecto existente: SCP Survivor. Copia consolidada alfa 0.4/P04-local-01, preparada el 14/10/2026 para Windows. No iniciar otro juego ni sustituir el diseño. Leer AGENTS.md, CONTEXTO_PROYECTO.md, PROMPT_MAESTRO.md y AUDITORIA_MIGRACION.md.

El frontend es HTML/CSS/JavaScript con Canvas 2D y módulos del namespace G; no usa React, Expo ni un motor externo. dev.html es la entrada de fuentes ordenadas; tools/build.js y Terser 5.51.2 generan index.html/js/app.min.js. Se abre con servidor HTTP local; no requiere Firebase para jugar esta alfa.

Hay guardia/médico, tres armas, seis modificaciones, mapas modulares, dos enemigos normales, un Custodio, XP con una elección inmediata por nivel, preparación, extracción, huida, muerte y reinicio. El arte es provisional. No hay guardado de partidas, cuentas, inventario persistente, economía adaptada ni ranking operativos.

El roadmap 0.11 conserva 49/100 global y 39/90 técnico. GAP-001: siempre hay tres oleadas; el requisito exige sorteo de 3/4/5. Su corrección no forma parte de esta migración. P05 es cuentas y continuidad, pendiente de autorización para implementación y servicios.

Procedencia: main de DETECO/SCPSurvivor en 78abae79ecef81a4de01068479d872877dd7ed00 + SCP-Survivor-P04-0.4-actualizacion.zip + RoadmapSCP-v0.11.zip. GitHub no contiene todavía estas actualizaciones. La migración restauró una condición omitida de touch.js para que el build reproduzca el compilado Cloud original; adaptó únicamente herramientas de prueba para Windows. Detalles y diff en AUDITORIA_MIGRACION.md.

Antes de programar, revisar el código y los criterios de la tarea. No sustituir arte aprobado, activar nube, gastar, desplegar ni escribir en GitHub sin el alcance autorizado por Iván. Informes P01–P04 son evidencia histórica; la auditoría de migración identifica las verificaciones nuevas.
