# Actualización del repositorio — P05 local y RoadmapSCP v0.12

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
