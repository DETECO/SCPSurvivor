# SCP Survivor

Juego web en preparación, basado directamente en PokéSurvivor. Repositorio de destino: https://github.com/DETECO/SCPSurvivor

**Esta entrega es una base técnica aislada; todavía no es una demo jugable.** El motor y los sistemas se conservan para adaptarlos incrementalmente.

## Qué incluye

- Las fuentes JavaScript disponibles de la revisión fijada y la estructura original de módulos.
- Una página estática de preparación; en dev.html la interfaz y los 64 scripts originales se conservan dentro de un template inactivo.
- Configuración propia sin Firebase activo, altas, amigos, multijugador, donaciones o service worker habilitados.
- Procedencia, manifiesto de archivos y comprobación estática. Las referencias de despliegue del autor están archivadas como texto.

## Subida manual a GitHub

1. Descomprime el ZIP.
2. En DETECO/SCPSurvivor elige Add file → Upload files.
3. Desde un ordenador puedes arrastrar las carpetas para conservar sus rutas. Haz dos cargas: primero js/, css/, assets/, functions/ y tools/; después docs/ y los archivos de la raíz. Evita crear otra carpeta scp-survivor dentro de la raíz del repositorio. Si tu selector móvil no conserva carpetas, utiliza un ordenador para esta carga.
4. Incluye .gitignore, .firebaserc y .nojekyll si utilizas la carga web; para una entrega completa también puedes copiar la carpeta con Git desde tu ordenador.
5. Sustituye el README anterior con este archivo. Conserva el aviso de origen del LICENSE incluido.

No contiene .git, credenciales privadas, node_modules, servicios desplegados ni automatizaciones. No se han realizado commits ni subidas remotas desde este hilo.

## Estado y siguiente trabajo

Esta tarea cubre la copia y la preparación estática. No completa P01-T02/T03/T04: faltan construcción reproducible, inspección de tráfico y arranque con contenido propio mínimo, bajo autorización específica.

PREPARATION_ONLY bloquea la construcción; las entradas bloquean scripts y conexiones. La configuración demo-scp-survivor identifica solo un futuro entorno de emulación, no un proyecto real creado. Las referencias archivadas describen el juego original, no instrucciones para configurar este proyecto.

Faltan los sprites de los actores. El bundle original js/app.min.js no se incluye porque contiene configuración del proyecto base; deberá reconstruirse con nuestra configuración. Node, Firebase SDK, dependencias y Terser deben verificarse y fijarse durante la siguiente tarea; no se han instalado ni actualizado.

El catálogo, armas, oleadas, gacha, guardado, inventario y ranking aún conservan implementaciones originales pendientes de adaptar. Las decisiones aprobadas del juego no están implementadas por esta entrega.

RoadmapSCP se actualiza solo cuando lo indique el director. No se ha actualizado ni añadido una copia antigua a este paquete.

Consulta [Procedencia](docs/ORIGIN.md), [Aislamiento](docs/ISOLATION.md), [Manifiesto](docs/source-manifest.json) y [Comprobación](docs/PREPARATION-REPORT.md).
