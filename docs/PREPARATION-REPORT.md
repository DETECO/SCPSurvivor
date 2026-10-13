# Comprobación de preparación local

Fecha: 13 de octubre de 2026 (America/Santiago). Entorno: sistema de archivos Linux, Python 3.12.14, lectura de Git. Sin navegador ni ejecución JavaScript.

Referencia: JPTER78/pokesurvivor, main, `a1006e6e3d0cea9162238a90b0ffdd7fd38397b6`.

## Resultado estático

PASS_STATIC. Se realizaron 263 comprobaciones de estructura, configuración y hashes; este número incluye comparaciones por archivo y no representa pruebas funcionales del juego.

- 64 scripts externos originales presentes y conservados en el mismo orden.
- index.html/404.html sin scripts; dev.html conserva scripts externos y uno inline dentro de template inerte.
- Entradas con CSP que bloquea scripts y conexiones, sin recursos externos activos.
- Firebase/altas/social/TURN/STUN desactivados; arranque bloqueado; SW sin listeners.
- No hay bundle original, CNAME, objetivo de despliegue Cloudflare/Hosting/Functions/RTDB, financiación del autor o namespace literal ps.* activo.
- Manifiesto de 118 archivos disponibles: 58 fuentes intactas, 17 fuentes modificadas para aislamiento, 42 referencias archivadas y un bundle generado omitido.
- Las referencias archivadas coinciden byte a byte con sus archivos originales.
- Dependencias no instaladas; lockfile conservado salvo el nombre del proyecto. Node y herramientas siguen pendientes de validación para la siguiente fase.
- Referencia original sin cambios y en el mismo commit. No se creó .git ni se hicieron commits, ramas o subidas.
- RoadmapSCP intacto. SHA256: `18b8d4967ad50cd09572308a32d94ec09d92d8674e39363ecc90feaf9aca305c`.

Revisión estática adicional: agente review_isolation. No encontró fallos importantes de aislamiento en los archivos preparados. No modificó archivos ni ejecutó JS, navegador, build o red.

## Procedimiento

Se compararon los SHA256 del manifiesto frente al original y la copia; se analizaron las entradas HTML con HTMLParser distinguiendo elementos dentro de template; se comprobó la configuración JSON, los prefijos de persistencia, los endpoints, las reglas restrictivas y los bloqueos de construcción/arranque. Git status y HEAD se consultaron de nuevo al terminar.

El ZIP se verifica aparte: CRC, correspondencia exacta con la carpeta y hashes. Esa comprobación no inicia el juego.

## Límites y estado de tareas

P01-T01: preparación de archivos independiente realizada, con procedencia y entrega manual. No hay commit remoto ni repositorio local Git creado.

P01-T03: parte estática realizada; no completar la tarea antes de una inspección de tráfico autorizada.

P01-T02 y P01-T04: pendientes. No hay build, arranque comprobado, sprites propios mínimos ni versión jugable de SCP Survivor.

No se verificaron FPS, combate, controles, guardado, economía o sincronización. Las decisiones de diseño no se presentan como código implementado. Este informe no actualiza RoadmapSCP ni calcula nuevos porcentajes.
