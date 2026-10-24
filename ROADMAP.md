# Roadmap vigente — SCP Survivor

**Diseño vigente V2-ESTRUCTURA — Avance por mapas; sin extracción, accesorios físicos ni mochilas (2026-10-24).** REV-EST-0006 / CONTROL_CAMBIOS0.6: M01 240×160 y cámara vertical 512, audio SON-001 y ensayo AF01 1–5–MAX con arte16/32 publicados y probados en GitHub Pages. Director de grietas probado aislado, sin nuevos encuentros. Visor/dominio de fusión disponibles; Katana, láser y F24 jugables pendientes de poses/sala. Publicación verificada: AF01 6/6, inicio/pausa2/2, 99 hashes y visor164/164. Sin aceptación humana de esta composición ni servicios reales; [recibo](docs/gestion/REV-EST-0006_PUBLICACION.json).

[Pauta vigente](PAUTA_DESARROLLO.md) · [Plan de cambios](docs/PLAN_CAMBIOS_ESTRUCTURA.md) · [Decisiones y pendientes](docs/ESTRUCTURA_DECISIONES.md) · [Últimos cambios de combate](docs/PLAN_DESARROLLO_V2_INFINITO.md)

**Demo disponible:** [guía](docs/PRUEBA_REV_EST_0006.md) · [prueba rápida](https://deteco.github.io/SCPSurvivor/?prueba=combate-v2&armas=r1&graficos=16) · [jugar](https://deteco.github.io/SCPSurvivor/?prueba=combate-v2&armas=r1&graficos=32). Sin cuentas ni guardado; aceptación de Iván pendiente.

**Avance V2: sin calcular.** El52/100 pertenece al diseño anterior. Pendiente revisar alcance, criterios y pesos del diseño V2. Retirar funciones no concede puntos ni reduce automáticamente el denominador.

| Elemento | Tratamiento vigente |
| --- | --- |
| Recorrido | Infinito, mapas300s y jefe240s de ensayo; muerte sin resurrección, abandono desde pausa sin marca competitiva; conservación permanente confirmada. |
| Puerta y aliados | Puerta/dos aliados a300s, remanentes y jefe obligatorio; resolver premio/XP antes de cruzar. Aliados sinXP/no remate; uno huye si ambos ven al jefe vivo. Congelar regeneración/cooldowns, no duración de efectos. |
| Armas | Una inicial; segunda garantizada por primer jefe si falta o adelantada por élite. Máximo dos simultáneas, modelos iguales independientes; reemplazo solo en terminales. Familias balística/energía/melee/explosivos/arrojadizas. |
| Cartas y niveles | EST-ARM-001 r1: por copia 1→2→3→4→5→MAX sustituye ramas de arma; generales/poderes conservan5+extra. AF01 conectado; saturación reutiliza apoyo táctico existente. Las otras armas no se dan por implementadas. |
| Fusión | EST-ARM-001 r1 aprobado: una por expedición, CC04 MAX + TE01 MAX → F24 FINAL, desde estación de mapa2. Dominio/visor probados; gate cerrado hasta validar poses, sala, interfaz y combate. F24 no es inicial. |
| Poderes anómalos | Jefes de grieta: primer poder garantizado, después azar/garantía tras tres victorias sin poder; hasta tres y reemplazo pausado al cuarto. Intervalos automáticos,5+extra propio. |
| Ultimate | Una manual y pasiva del soldado, sin botón adicional de habilidad anterior; lista al inicio, cooldown largo propio conservado entre mapas, cinco niveles permanentes. Gacha y fragmentos/materiales sin costes fijados. |
| Grietas y saltos | Nuevo diseño: recinto separado/origen congelado,45s para entrar instantáneamente; única retirada5s entre1–3min y retorno por victoria. Detalles de instante/aviso/posición y saltos abiertos. B3 actual sigue en el mismo mapa. |
| Cofres y procedural | Conservar sorteos60/120/180/240s y cuotas, seis candidatos; bono10min e hitos de primer jefe/mapas2/3. Ampliar mapas procedurales por semilla con rutas de jefe/puerta/terminales/fusión verificadas. |
| Base y colección | Diez compras independientes por soldado con monedas recogidas. Tres gachas: personajes/armas/ultimates, tickets universales gris1/dorado5. Skins cosméticas por dominio/contratos/eventos; no cuarto gacha. |
| Interfaz y visual | Radar pequeño fijo, símbolos/prioridad de urgencia; no revelar cofres sin descubrir. Preparar arte/HUD en paralelo a T1; mantener diseños aprobados y crédito. |
| Funciones retiradas | Sin extracción de fin, accesorios físicos, mochilas ni ranuras extra de apoyo. Conservar datos y código anterior de referencia, sin reactivarlo. |

| Paso | Trabajo y estado | Dependencias |
| --- | --- | --- |
| RC-01 | Contratos infinitos aceptados; fichas y parámetros concretos pendientes — pendiente de implementar | Reglas V2 |
| RC-02 | Versionar guardado, resultados y compatibilidad — pendiente de implementar | P05 verificado, RC-01 |
| RC-03 | Director300s y escalada temporal — prototipo; aceptación pendiente | RC-02 |
| RC-04 | Jefe obligatorio por mapa — prototipo; aceptación pendiente | RC-03 |
| RC-05 | Puerta, soldados y transición sin limpiar remanentes — prototipo; aceptación pendiente | RC-04 |
| RC-06 | Retirar extracción del recorrido V2 — prototipo; aceptación pendiente | RC-05 |
| RC-07 | Una a dos armas simultáneas, cuatro ramas5+extra y cartas arma/general/libre — prototipo; aceptación pendiente | RC-01, RC-02 |
| RC-08 | Retirar accesorios/mochilas y replantear P06 — pendiente de implementar | RC-07, RC-02 |
| RC-13 | Poderes de jefes de grieta: máximo3,5+extra y reemplazo — pendiente de implementar | RC-01, RC-07 |
| RC-14 | Pasiva de soldado y una ultimate manual, cinco niveles permanentes — pendiente de implementar | RC-01, RC-07 |
| RC-09 | Tres gachas, gris1/dorado5 y colección; skins cosméticas — pendiente de implementar | RC-08, RC-01, RC-14 |
| RC-10 | Cofres y dimensiones de mapas — prototipo; aceptación pendiente | RC-01, RC-03 |
| RC-11 | Recinto de grieta separado, origen congelado y escape único; saltos — pendiente de implementar | RC-05, RC-09, RC-13 |
| RC-12 | Interfaz/audio, regresión y aceptación V2 — pendiente de implementar | RC-06, RC-07, RC-08, RC-09, RC-10, RC-11, RC-13, RC-14 |
| RC-15 | Fusión en sala y adquisición posterior de arma — pendiente de implementar | RC-07, I-02 |
| RC-16 | Monedas y diez compras independientes por soldado — pendiente de implementar | RC-01, I-03 |
| RC-17 | Radar e indicadores funcionales — prototipo; aceptación pendiente | RC-05 |
| RC-18 | Procedural modular con rutas reproducibles — pendiente de implementar | RC-03 |

**P05 aceptado por el propietario para avanzar; servicios reales diferidos. P06 se replantea.** No continuar la lista anterior de mochila, accesorios, pérdida/recuperación o extracción. Las tablas y porcentajes siguientes conservan la **línea base histórica**, no acreditan aceptación de V2.

---

## Línea base histórica anterior a V2

Las reglas, tareas, porcentajes y prioridades registradas debajo describen el diseño anterior. En conflicto manda la pauta V2 de arriba.

**Prioridad registrada antes de V2 (18/10/2026): cerrar P05 antes de P06, manteniendo Spark sin facturación.** Alternativa Worker/SQLite preparada; falta confirmar el plan Free de la cuenta, desplegar y validar los flujos reales. El cliente propio sigue desactivado. P05 EV0/6; global52/100. [Adaptación y activación](docs/P05-WORKER-SPARK.md) · [Pruebas y límites](docs/P05-WORKER-REPORT.md).

**Antecedente histórico · crédito de Ivan Vivanco · prototipo P06-T01 (16/10/2026).** Modelo físico y panel base/preparación con confirmación; IDs, mochilas8/16 y almacén60 usan fixture temporal. `?inventario=local` o prueba directa `?prueba=inventario` (inicia preparación20s), solo loopback; sin cuentas, persistencia, inventario real, botín ni kit. **P06-T01 EC, evidencia incompleta; servidor, continuidad y aceptación manual pendientes. P06 T02–T05 siguen P. Global52/100; P05 EV0/6.** EV-030 registra95 pruebas aprobadas,0 fallos,1 omitida y4 escenarios de navegador aprobados. Aceptación manual pendiente: [guía manual](docs/PRUEBA_INVENTARIO_P06.md) y [informe P06](docs/P06-REPORT.md).

**Prototipo de grietas — 16/10/2026 (solo local, en validación).** Prueba directa `?prueba=grieta`; apariciones opcionales `?grietas=local`. Posición física alcanzable, **ingreso instantáneo por contacto, sin botón ni espera**, apertura45s activas, cierre, indicador de dirección/distancia/tiempo, sonido y alerta. Sin cuentas ni persistencia P05. **Aceptación manual de Iván pendiente; global52/100 sin cambios de pesos.** P09 conserva audio/aviso/localizador como requisitos. Esta ampliación no está publicada: la entrega GitHub previa corresponde a P05 y roadmapv0.12. Ver [prueba manual](docs/PRUEBA_GRIETAS.md), [pauta visual](docs/OBSERVACIONES_VISUALES.md) y [validación técnica](docs/GRIETAS-VALIDACION.md).

Versión **0.34**, 2026-10-24. Juego existente, entrega **P05-local-01 / alfa 0.5 local**. Fuente editable: [RoadmapSCP.json](RoadmapSCP.json); registro completo generado: [RoadmapSCP.md](RoadmapSCP.md). V0.11 se conserva en docs/historial-local/alfa-0.4/.

## Avance basado en evidencia

| Indicador | Puntos verificados | Avance |
| --- | --- | --- |
| Global hasta primera versión completa publicada | 52/100 | 52 % |
| Planificación | 10/10 | 100 % |
| Técnico P01–P11 | 42/90 | 46,67 % |

**53 tareas, 12 fases, 100 puntos y 25 tareas CV.** Solo CV con evidencia completa suma; no hay crédito parcial. El avance mide criterios cumplidos, no tiempo restante, producto publicado o porcentaje de arte final.

| Fase | Categoría | Puntos verificados | Avance | Estado |
| --- | --- | --- | --- | --- |
| P00 | Auditoría, decisiones y plan aprobado | 10/10 | 100 % | Verificada localmente |
| P01 | Copia independiente y fundamento técnico | 8/8 | 100 % | Verificada localmente |
| P02 | Primera partida completa mínima H-001 | 10/10 | 100 % | Verificada localmente |
| P03 | Expedición, escenarios, misiones y enemigos finales | 12/12 | 100 % | Verificada localmente |
| P04 | Soldados, armas, modificaciones y combate completo | 12/12 | 100 % | Verificada localmente |
| P05 | Cuentas, autoridad de servidor y continuidad | 0/6 | 0 % | En validación local; aceptación real pendiente |
| P06 | Inventario, pérdida, recuperación, almacén y buzón | 0/10 | 0 % | En curso |
| P07 | Progresión, gacha, hitos y economía | 0/10 | 0 % | Pendiente |
| P08 | Demo y clasificación de pruebas/oficial | 0/4 | 0 % | Pendiente |
| P09 | Interfaz, arte, audio y experiencia móvil final | 0/8 | 0 % | Pendiente |
| P10 | Aceptación, rendimiento, integridad y costes | 0/6 | 0 % | Pendiente |
| P11 | Distribución, publicación y cierre verificado | 0/4 | 0 % | Pendiente |

## P06 local en curso desde v0.14

A-024 autoriza avanzar localmente. P06-T01 queda EC/evidenceComplete=false con modelo físico, panel base/preparación con confirmación, IDs y fixture temporal para mochilas8/16 y almacén60. `?prueba=inventario` inicia directamente en preparación20s; `?inventario=local` activa la opción en loopback. No hay cuentas, persistencia ni inventario real, botín o kit. EV-030 registra los ensayos ejecutados en [docs/P06-REPORT.md](docs/P06-REPORT.md); la aceptación manual sigue pendiente. P06-T02–T05 continúan P; P05 EV0/6 y el global52/100 no cambian.

## Cambio desde v0.11

GAP-001 está resuelto y P03-T02 pasa de EV a CV: suma sus **3 puntos**, elevando global de 49 a 52 y técnico de 39/90 a 42/90. P03 queda 12/12. Criterios, pesos y dependencias originales permanecen intactos.

Los sectores normales ahora declaran 3/4/5 oleadas reproducibles, con objetivos alternos, preparación de 20 s, HUD/contadores/salidas coherentes y secuencia independiente del calendario de jefe/extracción. EV-026: 11 pruebas Node, 900 semillas y calendario histórico de 18 sectores; cuatro escenarios de navegador fuente/compilado y dos extracciones S10/oleada4/35oleadas. Fuente 1.580 bajas y jefe evadido; compilado 1.587 y jefe vencido. Cero errores de página, peticiones remotas o errores HTTP en esos recorridos.

## P05: implementación local, aceptación pendiente

P05-T01/T02/T03 están **EV y conservan 0/6 puntos**. Se añadieron cuentas ficticias, alias, verificación/recuperación/vinculación explícita, autoridad de comandos emulada, recibos/reintentos, checkpoints seguros y una expedición activa por UID. Transferir revoca la sesión anterior; recuperar combate desde su inicio excluye clasificación irreversiblemente. El juego sin cuentas permanece disponible.

**EV-027 — verificación local final:** P05 local revalidada: suite Node de 73 casos, 72 aprobados, 0 fallos y una integración optativa omitida. Ensayo servidor ejecutado explícitamente: aprobado, incluidos cuatro checkpoints incompletos rechazados sin escrituras. Navegador: 24 escenarios aprobados, 12 en fuentes y 12 en compilado, después de reforzar validación de cliente y backend. Build/check final 099c7a1a5c, 82 scripts. Persistencia comprobada al exportar, reiniciar e importar: mismo UID Auth y perfil/revisión Firestore. Bootstrap allowDuplicateEmails confirmado exclusivamente en Auth Emulator para vinculación explícita. OAuth/correo/backend reales no aceptados; P05 conserva EV, evidencia incompleta y 0/6 puntos.

Resultados y límites: [docs/P05-REPORT.md](docs/P05-REPORT.md), [docs/P05-validation.json](docs/P05-validation.json) y [docs/GAP-001-validation.json](docs/GAP-001-validation.json).

| Tarea | Preparado/probado localmente | Falta para aceptación completa |
|---|---|---|
| P05-T01 | Auth SDK, alias, alta/acceso/cierre y flujos ficticios | Google OAuth/correo/verificación/recuperación/vinculación reales, errores y separación de identidades con servicios propios |
| P05-T02 | UID del token, revisión, sesión, transacciones/recibos, concurrencia y replay | Cumplir P05-T01; aceptar backend/reglas/persistencia/retención propios con alcance autorizado |
| P05-T03 | Checkpoints, roundtrip, transferencia, desconexión/respuesta perdida y retroceso no clasificable | Cumplir P05-T02; nube propia y cambio real de dispositivo/red |

La evidencia local no acredita combate validado por servidor, economía/inventario persistente P06/P07, ranking oficial, OAuth/correo real, dispositivos físicos, Safari, FPS/memoria/carga, costes o juego operativo en producción.

## Proyecto Firebase propio

Iván creó manualmente **scp-survivor**, app web y plan Spark. Capturas confirman Email/contraseña y Google habilitados, localhost/127.0.0.1 autorizados y política exigida de mínimo 8 sin clases obligatorias. La configuración pública se conserva **inactiva** en config/firebase-public.json. El juego usa exclusivamente demo-scp-survivor emulado, activado de forma optativa en localhost con ?cuentas=local. No se desplegó backend real ni se habilitó facturación desde Codex. Detalle: [docs/FIREBASE_PROPIO.md](docs/FIREBASE_PROPIO.md).

## Orden de continuación

1. **P05:** completar aceptación real conforme a sus dependencias. Preparar configuración, reglas, pruebas y costes antes de solicitar la autorización concreta necesaria para conexión/despliegue. La configuración manual de Auth no acredita por sí sola un backend de guardado funcional.
2. **P06:** trabajo local autorizado por A-024; P06-T01 está EC con su primer prototipo temporal. La aceptación conserva dependencias P04-T02/P05-T03 y requiere servidor, continuidad y aceptación manual. P06-T02–T05 siguen P aunque el trabajo local está autorizado. El fixture no persiste ni representa inventario real, botín o kit.
3. **P07:** progresión permanente, gacha y economía consistente, con P05/P06 completos.
4. **P08:** invitado/ranking; ranking oficial requiere aceptación P10-T01/T02 antes de P08-T02.
5. **P09/P10:** acabado/recursos y validación en dispositivos físicos, carga, memoria, rendimiento y costes.
6. **P11:** despliegue/publicación/operación autorizados y aceptación final de producción.

La web Roadmap sigue como proyecto independiente sin construcción, automatización o publicación en este alcance. Cooperativo, Hardcore, códigos, regalos, ampliación 24+24 y PC posterior quedan fuera del denominador aprobado.

## Continuidad y sincronización

Repositorio: [DETECO/SCPSurvivor](https://github.com/DETECO/SCPSurvivor), rama main. **Código P05, GAP-001 y roadmap v0.12 incluidos en actualización del repositorio autorizada por Iván: A-021.** Main se comprobó en vivo el15/10/2026 antes de esta entrega: baseline **39344e77e15bd82c98bacb3e9773ceaa20c1b918**, sin cambios remotos nuevos. Consultar el commit de la entrega P05-local-01 / roadmap v0.12 mediante git log -1 --format=%H -- RoadmapSCP.json. Publicar el código no activa Firebase real, facturación o despliegue: **el juego con cuentas sigue ejecutándose localmente con emuladores**.

A-018 registra migración/subida anterior; A-019 autoriza avanzar GAP-001→P05 con implementación, dependencias y emuladores locales; A-020 autoriza este roadmap con subagente y A-021 autoriza entregar código P05 y roadmap en GitHub/main. Iván pide continuar autónomamente sin repetir consultas dentro del alcance local ya autorizado. Autorizaciones/decisiones/historial íntegros en JSON/vista. Los registros históricos no bloquean el alcance local ya autorizado.

Leer [AGENTS.md](AGENTS.md), [CONTEXTO_PROYECTO.md](CONTEXTO_PROYECTO.md), [PROMPT_MAESTRO.md](PROMPT_MAESTRO.md) e [INSTALACION_WINDOWS.md](INSTALACION_WINDOWS.md). Conservar fuentes, arte aprobado y backups. La entrega en GitHub está autorizada por A-021; configuración Firebase real, facturación y despliegue del juego no se activan por esa entrega.

~~~powershell
node tools/render-roadmap.js --check
~~~

Antes de cerrar tareas: comprobar criterio/dependencias/alcance, ejecutar pruebas pertinentes, registrar versión/entorno/evidencia y distinguir implementación local de aceptación real.
