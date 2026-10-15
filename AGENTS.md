# SCP Survivor — instrucciones para Codex Local

Responder en español, directo y práctico. Continuar el juego existente; no reconstruirlo ni sustituir sus diseños.

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
