# SCP Survivor — instrucciones para Codex Local

**Primera prueba V2 autorizada (A-031,18/10/2026):** prototipo local `?prueba=mapa-v2` o rápido `&rapida=1`; leer [guía](docs/PRUEBA_MAPA_V2.md) e [informe](docs/V2-PRIMERA-PRUEBA-REPORT.md). Mapas300s/jefe/puerta/aliados funcionan dentro de este ensayo. No cuentas ni guardado; nunca emitir/restaurar schema1 en V2. La petición posterior autoriza probar el recorrido ahora, sin declarar P05 completo ni continuar inventario físico P06. Código anterior conservado para regresión. Roadmap0.21; aceptación humana pendiente.

## Prioridad vigente — V2-ESTRUCTURA, 18/10/2026

Leer primero [PAUTA_DESARROLLO.md](PAUTA_DESARROLLO.md), [plan de cambios](docs/PLAN_CAMBIOS_ESTRUCTURA.md) y [decisiones/pendientes](docs/ESTRUCTURA_DECISIONES.md). La petición posterior de Iván incorpora el chat ESTRUCTURA y retira extracción de fin de partida, accesorios físicos de armas y mochilas. Mapas5min, jefe obligatorio por mapa, puerta blindada/soldados a5:00, cese de spawn enemigo y remanentes vivos; cruzar exige jefe derrotado. Armas por familias y mejoras por nivel al azar; los detalles abiertos no se inventan.

La revisión inicial V2 fue documental; ahora existe el primer ensayo local descrito arriba. El código anterior se conserva para regresión. No continuar el prototipo de mochilas/mods ni la lista física anterior de P06. Terminar aceptación real P05 y compatibilidad de guardado antes de implementar P06 replanteada. Mantener Spark sin facturación. Agentes Sol con razonamiento medio; raíz guía, revisa e integra.

RoadmapSCPv0.20 añade `activeDesignRevision`; sus53tareas/estados/pesos y52/100 describen la línea base histórica. AvanceV2 sin calcular; no conceder puntos por retirar funciones. Las reglas incompatibles que aparecen debajo son antecedentes, no instrucciones vigentes para V2.

Responder en español, directo y práctico. Continuar el juego existente; no reconstruirlo ni sustituir sus diseños.

## Antecedentes de P05 — 17/10/2026

A-026/D-314: Iván pidió terminarP05 antes de continuarP06. Conservar todo el primer prototipoP06 sin avanzar nuevas funciones. Leer docs/CIERRE_P05.md y docs/ACTIVACION_FIREBASE_PROPIO.md. Las tres tareasP05 siguen EV0/6 hasta probar servicios propios; no marcar100% con emuladores. La integración propia se prepara con ownAccountsEnabled=false. No mezclar datos/cachés demo/proyecto propio. CLI del propietario autorizado y acceso/configuración Auth verificados por GET (EV-033). A-028/D-315: mantener Spark sin facturación; no vincular billing ni desplegar Functions. Firestore/Functions no pudieron listarse por403SERVICE_DISABLED; no inferir ausencia de datos. Leer docs/P05-ESTADO-SPARK.md y docs/P05-AUDITORIA-FIREBASE.json. Configuración propia y emuladores usan archivos separados. Roadmapv0.18 conserva criterios/pesos/dependencias y52/100. A-027/D-316: subir código/roadmap autorizados y continuar P06 con multiagentes inmediatamente después del cierre real P05. El backend actual no desplegable en Spark y las pruebas reales pendientes impiden declarar100%.

## Leer al comenzar

1. CONTEXTO_PROYECTO.md, docs/P05-REPORT.md e INSTALACION_WINDOWS.md.
2. PROMPT_MAESTRO.md y ROADMAP.md.
3. RoadmapSCP.json para decisiones, tareas, dependencias y pesos completos. RoadmapSCP.md se genera con node tools/render-roadmap.js; no editar su vista a mano.
4. Código y pruebas relacionados. AUDITORIA_MIGRACION.md y docs/P01–P04 son antecedentes históricos, no aceptación de P05.

## Conservar arquitectura y mecánicas

- HTML/CSS/JavaScript, Canvas2D y namespace G. Mantener estructura y orden de scripts en dev.html; no migrar a otro framework por instrucciones de proyectos ajenos.
- Editar fuentes. index.html, js/app.min.js y js/vendor/firebase-client.js se generan con npm.cmd run build.
- Velocidad base165; una elección inmediata por nivel, copias independientes de armas, reglas y topes aprobados. Recursos provisionales; no sustituir arte aprobado ni ampliar24+24 por inferencia.
- No alterar originales Cloud, ZIP de migración o backups. sources/ del padre es solo lectura. docs/historial-local/alfa-0.4 conserva documentación anterior.

## Alcance autorizado actual

Iván autorizó avanzar GAP-001→P05 y eligió preparar/probar localmente. Después creó manualmente el proyecto Firebase scp-survivor; su configuración pública está conservada e inactiva. El 15/10 reiteró completar la fase sin más consultas de autorización. Se permiten implementación, dependencias y emuladores locales con datos ficticios; continuar dentro de ese alcance sin volver a pedirlo.

- P05 optativo: localhost/127.0.0.1 con ?cuentas=local. El modo sin opción conserva la partida aislada.
- Firebase Auth/Firestore/Functions oficiales, emulados en demo-scp-survivor. Nunca conectar a servicios heredados o producción. Guardas globales anteriores desactivadas; P05 usa su módulo local separado.
- UID del token, revisión esperada, sesión y requestId para mutaciones; recibos idempotentes, una expedición activa y transferencia explícita. Sin escrituras Firestore del cliente ni borrado TTL de recibos.
- Checkpoint confirmado y comando pendiente por UID. Ninguna caché es autoridad; no mezclar inventarios por unión/máximos. No guardar contraseñas en código, cachés propias o ZIP.
- Fronteras seguras; sin serializar enemigos vivos avanzados. Recuperar combate desde su inicio excluye ranking irreversiblemente. Combate local: no acredita antitrampas ni economía P06/P07.
- Iván autorizó expresamente subir P05 y su roadmap a DETECO/SCPSurvivor/main el15/10: «subela. incluye roadmap». Esta entrega incorpora P05-local-01 y RoadmapSCPv0.12 sobre39344e77. Consultar docs/PUBLICACION_GITHUB.md. La ejecución P05 sigue emulada; la subida de código no activa Firebase real ni facturación/despliegue.

## Verificar y entregar

- Ejecutar pruebas pertinentes y registrar resultados/límites en docs/P05-REPORT.md. No extrapolar emuladores a Google/correo reales, dispositivos físicos, rendimiento o costes.
- PowerShell: npm.cmd. Mantener ambos lockfiles. El frontend no carga .env.
- Solo CV con evidencia completa aporta puntos; no cambiar criterios/pesos. P05 real permanece en validación mientras falten servicios propios y flujos reales.
- Mostrar diff de cambios existentes y rutas. Mantener contexto e instrucciones Windows coherentes.

## Ampliación local de grietas — 16/10/2026

Iván autorizó el prototipo y realizará la aceptación manual. Abrir ?prueba=grieta para acceso directo o ?grietas=local para aparición opcional; solo loopback y sin cuentas. Grieta física alcanzable, apertura45s activas, cierre e indicador dirección/distancia/tiempo; sonido y alerta al aparecer. Variante Custodio provisional en mismo escenario, entrada voluntaria y retirada. No cambiar jefes normales, arte aprobado ni pesos. P05 de cuentas conserva su esquema: las grietas no se guardan y ambas opciones se desactivan con cuentas=local. P09 debe conservar sonido/aviso/localizador como requisitos permanentes. Leer docs/PRUEBA_GRIETAS.md, docs/OBSERVACIONES_VISUALES.md y docs/GRIETAS-VALIDACION.md. Roadmapv0.13 conserva52/100, P05EV0/6. Prototipo sin publicación externa.

Decisión posterior de Iván (A-023/D-311): ingreso instantáneo al tocar/cruzar la grieta abierta, sin botón, tecla, confirmación ni espera. No detener el movimiento mantenido. La llegada anunciada del jefe sigue siendo aviso de ataque y no retrasa la entrada. Roadmapv0.14;52/100 sin cambios.

## Antecedente P06 local — 16/10/2026; no continuar su inventario físico

Iván autorizó avanzar localmente en la fase P06 mediante A-024. El primer tramo de P06-T01 queda en curso (EC): prototipo temporal con copias numeradas, gestión en base/preparación con confirmación, mochilas de 8/16 y almacén simulado de 60 como fixture. Entrada optativa `?inventario=local` o prueba directa `?prueba=inventario`; la prueba directa comienza en preparación de 20 s. Solo loopback, sin cuentas, persistencia, inventario real, botín ni kit. El descanso continúa durante la preparación; los borradores no confirmados se descartan al agotarse el tiempo. La reducción de mochila que no admita el contenido se rechaza sin descartar objetos.

P06-T01 conserva sus criterios, peso 2 y dependencias P04-T02/P05-T03. No se acepta con este prototipo: quedan autoridad transaccional de servidor, continuidad y aceptación manual de Iván. P06-T02–T05 están autorizadas para trabajo local, respetando criterios y dependencias, pero siguen P hasta tener evidencia suficiente. P05 sigue EV0/6; global52/100. No afirmar puntos, resultados de pruebas, aceptación ni cierre de fase por inferencia. Registrar verificaciones futuras en docs/P06-REPORT.md y la pauta del usuario en docs/PRUEBA_INVENTARIO_P06.md. Conservar la interacción de grieta instantánea D-311.

## Crédito y publicación — 16/10/2026

Iván pidió el texto exacto «Desarrollado por Ivan Vivanco» en la pantalla de pruebas/demo y después subir esta versión a GitHub (A-025). Conservarlo visible bajo el título del menú compartido. La autorización incluye la entrega acumulada de grietas instantáneas, primer tramo P06 y roadmapv0.16 a DETECO/SCPSurvivor/main, conservando historial. No implica desplegar servicios reales ni aceptar P05/P06. Consultar docs/PUBLICACION_GITHUB.md para la entrega y sus comprobaciones.
