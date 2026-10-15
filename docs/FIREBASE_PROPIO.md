# Firebase propio — estado observado el 15/10/2026

Iván creó manualmente **scp-survivor**, plan Spark, y registró su app web. Su configuración pública está conservada en config/firebase-public.json, sin claves privadas de cuentas de servicio y todavía inactiva en el juego.

Las capturas aportadas confirman:

- Correo electrónico/contraseña y Google habilitados en Authentication.
- Dominios autorizados: localhost, 127.0.0.1, scp-survivor.firebaseapp.com y scp-survivor.web.app.
- Política guardada: Exigir aplicación, mínimo8, máximo4096, sin mayúscula/minúscula/números/especiales obligatorios. La última captura muestra el aviso de actualización y esas casillas desmarcadas.

P05 sigue conectado exclusivamente a **demo-scp-survivor emulado**. Las capturas no prueban acceso desde el juego, correos reales, recuperación/vinculación real, reglas, Firestore o backend desplegado. No se habilitó facturación ni se desplegaron Functions/Hosting desde Codex. No crear Firestore abierto como atajo para el guardado.

Para aceptar P05 real: separar desarrollo/producción, revisar backend/reglas y costes, probar identidad/ambas direcciones de vinculación, verificación antes de iniciar, recuperación, retención/eliminación y continuidad con servidor propio. No trasladar credenciales simuladas ni configuraciones de emuladores a producción. El servidor entregado rechaza ejecución fuera de demo local.

Guías oficiales: [configuración web](https://firebase.google.com/docs/web/setup), [correo/contraseña y política](https://firebase.google.com/docs/auth/web/password-auth), [Google](https://firebase.google.com/docs/auth/web/google-signin), [Auth Emulator](https://firebase.google.com/docs/emulator-suite/connect_auth).
