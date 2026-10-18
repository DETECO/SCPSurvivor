# Publicaciones GitHub — SCP Survivor

## Entrega del18/10/2026 — pauta ESTRUCTURA y plan de adaptación

Iván pidió incorporar el chat **ESTRUCTURA**, retirar extracción de fin de partida, accesorios físicos de armas y mochilas, y preparar el plan de cambios con multiagentes Sol medio bajo revisión de raíz (A-030). Se conserva el juego existente. Esta entrega es **documental**: no implementa las mecánicas V2 ni publica la adaptación Worker que continúa en preparación local.

Incluye [pauta vigente](../PAUTA_DESARROLLO.md), [decisiones y reglas abiertas](ESTRUCTURA_DECISIONES.md), [plan RC-01–RC-12](PLAN_CAMBIOS_ESTRUCTURA.md), [base aprobada de cofres y adaptación](COFRES_BASE_Y_ADAPTACION_V2.md), instrucciones de continuidad actualizadas y RoadmapSCPv0.20 con `activeDesignRevision`. Las53tareas y criterios/estados/pesos/dependencias históricos permanecen; **52/100 es la línea base anterior y V2 sigue sin porcentaje calculado**. P05 real pendiente; P06 se replantea antes de continuar.

Verificación documental: generador y coherencia JSON/vistas, enlaces relativos, preservación de historial y alcance. Los160archivos de juego local controlados permanecen iguales al inicio de esta revisión; se preservan los332archivos previos del repositorio y sus12assets byte a byte. No se ejecutaron ni se atribuyen pruebas funcionales de V2. Evidencia y límites en [ESTRUCTURA-VERIFICACION.json](ESTRUCTURA-VERIFICACION.json); [diff revisable](ESTRUCTURA-CAMBIOS.diff).

Destino autorizado: [DETECO/SCPSurvivor](https://github.com/DETECO/SCPSurvivor), **main**; padre remoto verificado `54ed48bab43dcf5fc43a4151858d6ccebc4abdab`. Commit identificable por **«Actualizar pauta desde ESTRUCTURA y planificar adaptación V2»**; comprobar SHA y sincronización después del push. Sin force push, cambios en servicios/facturación, cuentas reales o eliminación de originales. Consultar el historial Git para verificar publicación; preparar estos documentos no basta para probar el push.

## Entrega del 17/10/2026 — preparación P05 y decisión Spark

Iván reiteró subir el trabajo a GitHub y continuar P06 inmediatamente después de terminar P05 con multiagentes (A-027). Eligió expresamente **mantener Spark sin facturación** (A-028/D-315). Esta entrega conserva esa decisión y registra el estado real: **P05 sigue EV0/6; P06 conserva su prototipo y espera el cierre de P05; global52/100**.

Incluye preparación del cliente/servidor propio desactivada, guardias de proyecto y separación de cachés, correcciones de CORS IPv6 y confirmación del proveedor Google local, pruebas, documentación de Windows, pauta de cierre y RoadmapSCPv0.18. La auditoría administrativa real confirma acceso del propietario, proveedores/dominios/política Auth y ausencia de facturación; las APIs Firestore/Functions devolvieron403SERVICE_DISABLED. Son consultas GET, no aceptación de OAuth, correo recibido o guardado. Véanse [estado Spark](P05-ESTADO-SPARK.md), [evidencia saneada](P05-AUDITORIA-FIREBASE.json) e [informe de preparación](P05-CIERRE-REPORT.md).

Verificación repetida antes de preparar esta subida: **112 pruebas Node:111 aprobadas,0 fallos,1 integración optativa omitida**; build:check correcto,85scripts, SDK227024bytes, bundle6382978a6a. El informe conserva la integración explícita aprobada y los24recorridos de navegador local y8del modo propio desactivado ejecutados sobre esta preparación. No se repiten ni acreditan pruebas reales de cuentas por subir el código.

Destino: [DETECO/SCPSurvivor](https://github.com/DETECO/SCPSurvivor), rama **main**. Base remota comprobada con fetch y ls-remote el17/10/2026: `0eb52bc08bb01da98f8dd06c7d1d7c484207504b`. Commit identificable por **«Preparar cierre P05 y registrar Spark sin facturación»**; el SHA remoto se verifica después del push. Se conserva el historial sin force push, todos los archivos anteriores y los12recursos originales. Se excluyen dependencias instaladas, enlaces locales de verificación, cuentas/partidas, cachés, logs y credenciales.

GitHub recibe código y roadmap. Esta entrega no activa Blaze, despliega Functions/Hosting ni habilita `ownAccountsEnabled`; tampoco declara100% de P05 ni comienza nuevas funciones P06. [Diff revisable de la preparación](P05-CIERRE-CAMBIOS.diff).

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
