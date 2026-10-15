# SCP Survivor — instrucciones para Codex Local

Responder en español, directo y práctico. Este es el proyecto existente alfa 0.4, no una solicitud de crear uno nuevo.

## Leer al comenzar

1. CONTEXTO_PROYECTO.md y AUDITORIA_MIGRACION.md.
2. PROMPT_MAESTRO.md y ROADMAP.md.
3. RoadmapSCP.json para criterios, IDs, pesos y decisiones completos; RoadmapSCP.md es su vista. Consultar README.md y el código antes de editar.

## Preservar el proyecto

- Mantener HTML/CSS/JavaScript, Canvas 2D, namespace G, estructura y orden de scripts de dev.html. No migrar a React, Supabase, Expo u otro motor por instrucciones genéricas de otros proyectos.
- No reconstruir, rediseñar, sustituir arte aprobado ni cambiar mecánicas fuera de la tarea autorizada.
- Editar fuentes; index.html y js/app.min.js se generan con npm.cmd run build. El compilado de esta entrega reproduce el original Cloud (token dd0724d6bd).
- Conservar licencias, créditos, referencias históricas y documentación de decisiones.
- La velocidad base vigente es 165 unidades/s; se elige una mejora inmediatamente por nivel. No volver a acumular elecciones al terminar oleadas.
- GAP-001 sigue pendiente: tres oleadas fijas frente al sorteo requerido 3/4/5. Migrar no autoriza completar ese desarrollo.

## Seguridad y alcance

- Nube, cuentas, multijugador, social y registros están deshabilitados; conservar las guardas. No usar servicios del juego original.
- No introducir secretos. El frontend actual no consume .env. .env.example explica esa ausencia; no inventar variables obligatorias.
- No instalar/activar functions/, Firebase, facturación ni publicación sin autorización para esa fase.
- No crear commits/ramas remotas, hacer push, sobrescribir ramas, archivar la sesión Cloud ni publicar sin autorización.
- Los ZIP originales y el repositorio remoto se conservaron intactos. Las otras tres sesiones quedaron excluidas por Iván.

## Verificación y comunicación

- Ejecutar pruebas pertinentes a cada cambio y registrar evidencia real; no confundir pruebas históricas con ejecución actual.
- Usar npm.cmd en PowerShell. Servir por HTTP local; evitar doble clic del HTML. Las instrucciones reproducibles están en INSTALACION_WINDOWS.md.
- Los tests P01 reflejan una escena anterior; no cambiar el juego actual para satisfacer una expectativa histórica.
- Mostrar diff o bloque exacto de cambios existentes y rutas. Distinguir completado, pendiente, no comprobado y bloqueado.
- No aumentar el 49% del roadmap por tareas de migración. Para cambiar el registro, conservar IDs/pesos y criterios de aceptación y actualizar JSON/vista coherentemente.
