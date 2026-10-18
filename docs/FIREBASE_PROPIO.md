# Firebase propio — estado vigente e historial

## Auditoría posterior17/10/2026 — estado vigente

EV-033: CLI del propietario autorizado y acceso a scp-survivor; facturación deshabilitada, sin cuenta vinculada. GET200 confirma correo/Google, los cuatro dominios y política ENFORCE8..4096 sin clases; allowDuplicateEmails omitido, no inferido. Firestore/Functions no pudieron listarse por403SERVICE_DISABLED. Hosting tiene sitio predeterminado, release sin comprobar. A-028/D-315: mantener Spark sin facturación. El backend Functions actual no se despliega; modo propio desactivado y P05EV0/6. [Informe saneado](P05-AUDITORIA-FIREBASE.json) y [estado Spark](P05-ESTADO-SPARK.md). A-027/D-316: P06 inmediato con multiagentes después del cierre real P05.

Las secciones siguientes conservan observaciones anteriores; sus limitaciones de acceso reflejan el momento original, no la sesión actual.

## Preparación inicial17/10 — registro histórico anterior al login

La integración propia ya se prepara en el código: configuración empaquetada, OAuth/vinculación oficiales, cachés separadas y runtime propio con opt-in. `config/accounts-runtime.json` conserva `ownAccountsEnabled=false`; aún no conecta a servicios reales. Firebase CLI no tiene cuenta autorizada, por lo que no se han consultado de nuevo el plan, Firestore, proveedores o despliegues de scp-survivor. La sección histórica de abajo conserva lo observado en capturas. Leer [activación preparada](ACTIVACION_FIREBASE_PROPIO.md) y [pauta de aceptación pendiente](CIERRE_P05.md). P06 se conserva sin continuar hasta cerrar P05.

Iván creó manualmente **scp-survivor**, plan Spark, y registró su app web. Su configuración pública está conservada en config/firebase-public.json, sin claves privadas de cuentas de servicio y todavía inactiva en el juego.

Las capturas aportadas confirman:

- Correo electrónico/contraseña y Google habilitados en Authentication.
- Dominios autorizados: localhost, 127.0.0.1, scp-survivor.firebaseapp.com y scp-survivor.web.app.
- Política guardada: Exigir aplicación, mínimo8, máximo4096, sin mayúscula/minúscula/números/especiales obligatorios. La última captura muestra el aviso de actualización y esas casillas desmarcadas.

P05 sigue conectado exclusivamente a **demo-scp-survivor emulado**. Las capturas no prueban acceso desde el juego, correos reales, recuperación/vinculación real, reglas, Firestore o backend desplegado. No se habilitó facturación ni se desplegaron Functions/Hosting desde Codex. No crear Firestore abierto como atajo para el guardado.

Para aceptar P05 real: separar desarrollo/producción, revisar backend/reglas y costes, probar identidad/ambas direcciones de vinculación, verificación antes de iniciar, recuperación, retención/eliminación y continuidad con servidor propio. No trasladar credenciales simuladas ni configuraciones de emuladores a producción. El servidor entregado rechaza ejecución fuera de demo local.

Guías oficiales: [configuración web](https://firebase.google.com/docs/web/setup), [correo/contraseña y política](https://firebase.google.com/docs/auth/web/password-auth), [Google](https://firebase.google.com/docs/auth/web/google-signin), [Auth Emulator](https://firebase.google.com/docs/emulator-suite/connect_auth).
