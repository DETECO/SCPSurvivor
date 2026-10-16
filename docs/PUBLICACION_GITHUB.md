# Publicaciones GitHub — SCP Survivor

## Entrega del 16/10/2026 — crédito, grietas y primer tramo P06

Petición expresa de Iván (A-025): incluir **«Desarrollado por Ivan Vivanco»** en la pantalla de pruebas/demo y después subir la versión a GitHub. El crédito aparece bajo el título del menú compartido en `dev.html` y su entrada compilada `index.html`; no altera las mecánicas.

Destino: [DETECO/SCPSurvivor](https://github.com/DETECO/SCPSurvivor), rama **main**. Base remota consultada el16/10: `fde0d133a6e2e4a66606bebe0e35ea86e108ad6d`. Entrega descendiente, sin sobrescribir historial. Incluye grietas de ingreso instantáneo, señales/localizador, primer tramo de inventario local P06-T01, pruebas y documentación, y **RoadmapSCPv0.16**. P06-T01 sigue EC, P05 EV0/6, global52/100; publicación de código no equivale a aceptación de fase ni despliegue de servicios.

Verificación anterior a la subida: build y build:check aprobados (85 scripts, bundle`57d8cefba5`); suite96 pruebas,95 aprobadas,0 fallos,1 integración optativa omitida;12 recorridos aislados de menú en fuente/compilado, escritorio/móvil emulado y modos general/grieta/inventario, con crédito visible y sin errores JavaScript ni tráfico remoto. Capturas revisadas. Las pruebas de juego del primer tramo P06 y grietas permanecen documentadas en `P06-REPORT.md` y `GRIETAS-VALIDACION.md`.

Se excluyen datos de cuentas/partidas, dependencias instaladas, cachés, logs y configuraciones privadas. Se conservan archivos y recursos anteriores, ambos lockfiles y la configuración pública de Firebase inactiva. Los inventarios/manifiestos P05 y ZIP anteriores son instantáneas históricas, no el inventario vivo de esta entrega.

Commit identificable por el mensaje **«Añadir crédito de Ivan Vivanco, grietas e inventario local P06»**. La confirmación del SHA remoto se realiza después del push; este documento no contiene su propio hash. GitHub aloja el código: los prototipos de grietas/inventario siguen restringidos a localhost/127.0.0.1 y las cuentas requieren emuladores. No se activan Firebase real, facturación ni publicación web.

## Registro histórico — P05 local y RoadmapSCP v0.12

Fecha:15/10/2026. Petición expresa de Iván: «subela. incluye roadmap». Destino: [DETECO/SCPSurvivor](https://github.com/DETECO/SCPSurvivor), rama **main**. Base consultada en remoto: **39344e77e15bd82c98bacb3e9773ceaa20c1b918**, alfa0.4. Esta actualización añade un commit descendiente y conserva el historial, sin force push.

## Contenido de la actualización

- Código y compilado P05-local-01/alfa0.5 local; GAP-001 resuelto.
- SDK local, servidor emulado, checkpoints, reglas/configuración y dependencias declaradas con ambos lockfiles.
- Pruebas, resultados, instrucciones Windows, contexto, prompt y AGENTS.md.
- ROADMAP.md, RoadmapSCP.json canónico, RoadmapSCP.md generado, generador e historial. Avance52/100, técnico42/90; P05 sigue EV0/6.
- Recursos originales conservados. Se excluyen dependencias instaladas, emuladores/runtimes portátiles de auditoría, logs/cachés, cuentas, tokens, partidas y claves privadas.
- OBSERVACIONES_VISUALES.md registra el comentario de Iván sobre marcadores de daño y el acabado P09, sin modificar jugabilidad, pesos o aprobar un diseño.

Comprobaciones antes de subir: build:check y generador del roadmap aprobados; suite Node73casos,72aprobados/0fallos/1integración optativa omitida. El informe P05 conserva la integración explícita aprobada y24escenarios de navegador de la entrega, con hashes del compilado. El código ejecutable coincide con el paquete verificado anteriormente; esta preparación añade trazabilidad documental de GitHub.

## Ejecución y trazabilidad

Subir el código a GitHub no despliega el juego ni conecta Firebase real. Sigue requiriendo emuladores locales para ?cuentas=local. La configuración pública de scp-survivor está inactiva y no se habilita facturación. Sin .github/workflows en la base consultada ni en esta actualización.

El commit de esta entrega se identifica en git log por **«Actualizar SCP Survivor a P05 local y RoadmapSCP v0.12»**. Se confirma el SHA remoto después del push; el documento evita referenciar su propio hash. Los ZIP ya entregados se conservan sin sobrescribir. P05-validation.json y ENTREGA_P05.json describen aquella verificación/paquete previos a esta solicitud; no son un indicador vivo de sincronización GitHub.

INVENTARIO_P05.csv describe los contenidos versionados de esta actualización. P05-source-delta.json/P05-CAMBIOS.diff se regeneran contra alfa0.4 para revisión. .gitattributes evita conversiones automáticas al clonar: se conservan los finales de línea existentes del repositorio y los bytes de los bundles generados. La descarga ZIP anterior contiene la instantánea previa a este ajuste documental; el juego conserva el bundle099c7a1a5c.
