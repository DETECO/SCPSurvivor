# SCP Survivor

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
