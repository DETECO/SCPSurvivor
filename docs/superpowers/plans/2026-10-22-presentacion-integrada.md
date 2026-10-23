# Presentación integrada Implementation Plan

**Goal:** aplicar R7, grietas, icono, personajes16/32 y menús aprobados y publicar demo simplificada.
**Architecture:** motor original conservado; módulos acotados SceneR7, OperationsMenu y RiftVisuals. Root integra y verifica, Luna max en áreas independientes.
**Tech Stack:** Canvas2D, JS estático/CSS, Node tests y Playwright, GitHub Pages.

- [x] Consultar hilos, aprobaciones y paquetes; spec revisada sin campos abiertos para el alcance visual.
- [x] Respaldo source/publicación y baseline remoto.
- [x] Root: geometría R7 y profundidad, pruebas de circulación/collision, integración primer escenario; conservar legado.
- [x] Luna: menú responsivo con soldado/arma/ajustes16/32 y dos prácticas; reutilizar loadout e inicio.
- [x] Luna: seis estilos visuales de grieta, icono original/manifest, prueba de estado visual sin alterar mecánica.
- [x] Root: integrar scripts y CSS, preferencias gráficas, documentación actualizada ESTRUCTURA y autoridad futura NIVELES/MENUS/PERSONAJES/ICONO APP.
- [x] Pruebas Node/build y navegador: escritorio, móvil vertical/horizontal, mapa y transición, menús y gráficos, grietas.
- [x] Revisar diff y originales, roadmap0.33 con avance histórico intacto, publicar y verificar Pages.

Archivos root: js/world/scene-r7.js, js/data/scene-r7-data.js, world.js, expedition.js, pathing.js (solo si medición lo justifica), trial-visuals.js, main.js, dev.html, tests de mapa/browser, docs/roadmap. Luna menú: SOLO operations-menu.js/css y su test. Luna grietas: SOLO rift-visuals.js/test, assets/brand y manifest.webmanifest; root hace hook de dimensional-rifts.draw y head.
