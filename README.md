# SCP Survivor

**Actualización 0.31 · Arte de ensayo V1, 21/10/2026:** Arte de ensayo V1 aplicado sobre T1BC: cinco actores locales con siluetas y animación más detalladas, cuatro armas distinguibles y comparación clásica. No reemplaza el catálogo final ni cambia colisiones, estadísticas, cámara o recorrido. Fusión, nueva geometría, poderes y ultimate siguen pendientes. [Jugar](https://deteco.github.io/SCPSurvivor/?prueba=combate-v2) · [Ver modelos](https://deteco.github.io/SCPSurvivor/prueba-visual-v1.html) · [Alcance](docs/ARTE_ENSAYO_V1.md). Iván aceptó T1BC en general; no todas las pruebas/dispositivos. El nuevo arte aún no tiene aprobación final.


**Entrega vigente 0.30 · T1B + T1C, 21/10/2026 (A-040/D-336/EV-045):** T1B + T1C implementados como ensayo: terminal voluntario con reemplazo de una copia y pausa completa; ramas/cartas revisadas por familia; cuarta arma, porra de corto alcance sin munición; HUD de ramas/recargas y consulta de equipo; daño compacto y radar circular fijo sin revelar cofres desconocidos. Cuatro prácticas explícitas: terminal, máximos, saturación y melee. Sin cuentas/guardado/economía real. Arte y balance provisionales; fusión, grieta separada, poderes y ultimate pendientes. [Práctica de terminal](https://deteco.github.io/SCPSurvivor/?prueba=combate-v2&ensayo=terminal) · [Mapa completo](https://deteco.github.io/SCPSurvivor/?prueba=combate-v2) · [Guía](docs/PRUEBA_T1BC.md) · [Resultados](docs/V2-T1BC-REPORT.md). Iván informó que T1A funciona bien: aceptación general de esa demo, sin extrapolar a todas las pruebas/dispositivos ni a esta entrega nueva. La entrada pública por defecto abre T1BC; se conservan accesos anteriores. Spark sin facturación; servicios reales desactivados.


**T1A · 21/10/2026 · Roadmap0.29:** nueva prueba jugable parcial con una arma inicial, segunda por cofre de jefe/élite y dos disparando automáticamente. [Élite de práctica](https://deteco.github.io/SCPSurvivor/?prueba=infinito-v2&premios=elite) · [Mapa completo](https://deteco.github.io/SCPSurvivor/?prueba=infinito-v2) · [Guía](docs/PRUEBA_V2_INFINITO_01.md) · [Resultados y límites](docs/V2-T1A-REPORT.md). Ramas y cartas usan valores de ensayo; aceptación manual pendiente. La entrada pública sin consulta abreT1A; B3 se conserva explícitamente con `?prueba=mapa-v2`. No activa cuentas, guardado ni facturación.


**Roadmap actualizado 0.24 (19/10/2026):** [ver roadmap](ROADMAP.md) · [cambios desde ESTRUCTURA](docs/ROADMAP_ACTUALIZACION_ESTRUCTURA_2026-10-19.md). Combate 2 armas simultáneas + 3 poderes + 1 ultimate establecido como diseño; implementación pendiente. La demo actual no cambia.

**Jugar en la web:** [SCP Survivor — demo V2](https://deteco.github.io/SCPSurvivor/) · [Prueba rápida desde 4:30](https://deteco.github.io/SCPSurvivor/?rapida=1). No requiere ejecutar un servidor en tu PC. Demo sin cuenta, guardado ni recompensas persistentes. [Alcance y pruebas](docs/GITHUB_PAGES.md).

**Diseño y estructura:** usar la [pauta vigente](PAUTA_DESARROLLO.md), las [reglas aprobadas de ESTRUCTURA](docs/ESTRUCTURA_REGLAS_APROBADAS.md) y el [plan de adaptación jugable](docs/PLAN_DISENO_JUGABLE_V2.md). Roadmap 0.22; el ejecutable sigue siendo V2-trial-01. Cofres nuevos y escala 160 × 100 pendientes de implementar y probar.

**Primera prueba V2 lista para probar localmente:** [rápida desde4:30](http://127.0.0.1:8000/?prueba=mapa-v2&rapida=1) · [mapa completo](http://127.0.0.1:8000/?prueba=mapa-v2). Ejecutar `npm.cmd run serve` si el servidor está cerrado. [Guía y límites](docs/PRUEBA_MAPA_V2.md). Aceptación de Iván pendiente; sin cuentas ni guardado.

**Pauta vigente V2-ESTRUCTURA (18/10/2026):** [PAUTA_DESARROLLO.md](PAUTA_DESARROLLO.md). Avance por mapas5min con jefe y puerta de la Fundación; extracción, accesorios físicos y mochilas se retiran del diseño. [Plan de adaptación y pruebas](docs/PLAN_CAMBIOS_ESTRUCTURA.md). El recorrido tiene un primer ensayo local; el modo anterior se conserva. Esta sincronización 0.22 cambia documentos y roadmap. El 52/100 es histórico; avance V2 sin calcular.

Juego web existente de supervivencia por expediciones. Esta copia desarrolla P05 local sobre alfa0.4 y conserva Canvas2D, arquitectura, mecánicas y recursos. No es una versión publicada ni servicios reales de cuentas.

## Abrir

Desde esta carpeta, PowerShell:

```powershell
npm.cmd run serve
```

http://127.0.0.1:8000/ abre el modo aislado sin guardado. Compilado incluido. Para cuentas/guardado de prueba, con Node24 y Java21:

```powershell
npm.cmd ci --ignore-scripts
npm.cmd --prefix functions ci --ignore-scripts
npm.cmd run emulators
```

Deja los emuladores abiertos y ejecuta serve en otra ventana. Abre http://127.0.0.1:8000/?cuentas=local . Google ycorreo son emulados: no se usan cuentas reales. INSTALACION_WINDOWS.md explica verificación, recuperación y conservación de datos.

## Qué conserva y añade

Mapas modulares con semilla, sectores continuos, perseguidor/biológico y Custodio con victoria/huida; extracción, muerte y resumen. Guardia/Sprint y médico/curación a165unidades/s; tres modelos de armas, dos copias independientes, seis mods, topes aditivos y una elección inmediata por nivel. Preparación20s y Listo anticipado. Arte provisional.

GAP-001 incorpora3/4/5oleadas normales reproducibles, alternando neutralización/resistencia60s; HUD ycontadores usan el tamaño declarado. El calendariojefe/extracción usa su secuencia anterior independiente.

P05 optativo añade AuthSDK local, alias/verificación/recuperación/vinculación de prueba, servidor de confirmaciones con UID/revisión/sesión/recibos, checkpointversionado y una expediciónactiva por cuenta. Transferir revoca la sesión anterior. Retroceder combate excluye clasificación. Ninguna caché autoriza escrituras económicas.

No hay inventario/economía P06/P07, ranking oficial, servicios reales, facturación o publicación. Consultar docs/P05-REPORT.md para la evidencia exacta; emuladores no prueban Google/correo reales ni rendimiento/dispositivos físicos.

## Controles

WASD/flechas: movimiento. Q/E: arma. Espacio: habilidad. 1–3: mejora. Esc: pausa. Táctil: arrastrar para moverse y botones de arma/habilidad. Disparo y recarga automáticos; editor de mods durante preparación. Mantener estas mecánicas salvo tarea expresamente autorizada.

## Desarrollo

```powershell
npm.cmd run build
npm.cmd run build:check
node tools/render-roadmap.js --check
$scpTests = Get-ChildItem tests -Filter '*.test.js' | ForEach-Object { $_.FullName }
node --test $scpTests
```

Editar dev.html, CSS y fuentes. El build genera SDKFirebase local, index.html y js/app.min.js; conserva avisos de licencia. Paquetes/versiones en ambos lockfiles. Pruebas de navegador y comandos servidor en INSTALACION_WINDOWS.md y el informe P05.

## Contexto e historial

Leer AGENTS.md, CONTEXTO_PROYECTO.md, PROMPT_MAESTRO.md y ROADMAP.md. RoadmapSCP.json es canónico; la vista se genera con tools/render-roadmap.js. docs/historial-local/alfa-0.4 conserva los documentos anteriores. Informes P01–P04/AUDITORIA_MIGRACION son antecedentes de esas entregas.

GitHub: https://github.com/DETECO/SCPSurvivor, rama main. Esta actualización incorpora P05-local-01 y RoadmapSCPv0.12 sobre alfa0.4/39344e77, por petición expresa de Iván. El juego sigue usando emuladores locales; no activa servicios reales ni Hosting. Alcance y trazabilidad en [docs/PUBLICACION_GITHUB.md](docs/PUBLICACION_GITHUB.md). Datos local-data/firebase, cachés, dependencias instaladas y credenciales privadas se excluyen de Git/ZIP.

La base y sus referencias/licencias se conservan en docs/ORIGIN.md, LICENSE y CREDITS.md. No sustituir arte aprobado ni activar sistemas heredados por su mera presencia en el repositorio.
