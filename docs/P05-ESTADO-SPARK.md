# P05 con Spark sin facturación

Estado del17/10/2026, America/Santiago. Decisión expresa de Iván: **«Mantener Spark sin facturación»** (A-028/D-315). No vincular facturación ni desplegar recursos que la requieran. Esta elección conserva el trabajo existente y no reduce los criterios de aceptación.

## Resultado de la auditoría real

| Elemento | Resultado comprobado | Límite |
| --- | --- | --- |
| Acceso del propietario | Firebase CLI autorizado; acceso a `scp-survivor` confirmado. | No equivale al acceso de un jugador. |
| Facturación | `billingEnabled=false`, sin cuenta vinculada. | No se modificó el plan. |
| Correo y Google | Consultas administrativas HTTP200; ambos habilitados. | OAuth, verificación recibida, recuperación y vinculación reales sin probar. |
| Dominios | `localhost`, `127.0.0.1`, `scp-survivor.firebaseapp.com`, `scp-survivor.web.app`. | No se desplegó el juego por existir esos dominios. |
| Contraseñas | ENFORCE, mínimo8/máximo4096, sin clases obligatorias. | `allowDuplicateEmails` omitido en la respuesta; valor efectivo sin confirmar. |
| Firestore y Functions | Las consultas de listado devolvieron403, `SERVICE_DISABLED`. | No permiten afirmar ausencia de bases, datos o funciones. No se habilitaron APIs. |
| Hosting | Existe el sitio predeterminado del proyecto. | No se comprobó una release ni se reemplazó contenido. |

[Evidencia administrativa saneada](P05-AUDITORIA-FIREBASE.json). No contiene tokens, contraseñas, dirección personal del propietario ni secretos OAuth. Sus timestamps UTC del18/10 corresponden al17/10 en Chile.

## Compatibilidad con el código actual

Spark ofrece Authentication y cuotas sin coste de Firestore/Hosting; su disponibilidad no significa que esos flujos del juego estén integrados o probados. [Comparación oficial de planes](https://firebase.google.com/pricing).

El backend existente usa `onCall` de Cloud Functions en `functions/index.js`, el servicio transaccional de `functions/account-service.js` y Firestore con escrituras directas del cliente denegadas en `firestore.rules`. Ese servicio obtiene el UID autenticado y comprueba revisión, sesión, contenido del comando y recibos idempotentes. P05-T02 exige operaciones persistentes de servidor; P05-T03 depende de ellas.

**Firebase permite emular Functions sin Blaze, pero exige Blaze para desplegarlas.** [Requisito oficial de despliegue](https://firebase.google.com/docs/functions/get-started). Por eso el backend actual no se puede desplegar manteniendo Spark sin facturación. Es una limitación de esta implementación; no una afirmación de que cualquier servidor posible deba ser de pago.

Permitir que el navegador escriba libremente partidas, premios o recibos no sería un reemplazo equivalente: quitaría la validación del servicio existente. Una alternativa fuera de Cloud Functions necesitaría un servidor confiable disponible, autenticación, persistencia, operación y pruebas equivalentes. No hay una alternativa así implementada o validada en esta entrega. No se cambia de proveedor ni se promete alojamiento gratuito para ocultar el pendiente.

## Qué se conserva y cómo continuar

- Cliente y servidor propio preparados, con `config/accounts-runtime.json` en `ownAccountsEnabled=false`; sin inicialización propia desde la demo desactivada.
- Demo local `?cuentas=local` con Auth/Firestore/Functions Emulator y datos ficticios. No se migran esas identidades al proyecto real.
- Preparación del modo propio con configuración y cachés separadas, guardias de runtime/CORS y sus pruebas. [Informe de verificación](P05-CIERRE-REPORT.md).
- Código, recursos, crédito de Ivan Vivanco y primer prototipo P06 conservados. GitHub recibe código y roadmap; no activa servicios.

**P05 sigue EV0/6; global52/100.** Las consultas administrativas y los ensayos locales no acreditan las pruebas reales de [CIERRE_P05.md](CIERRE_P05.md). Para terminar P05 bajo la decisión Spark hace falta resolver el alojamiento del servicio confiable y después ejecutar los flujos reales pendientes. No se inventan plazos de retención o requisitos nuevos: D-290 exige conservar deduplicación y medir almacenamiento.

A-027/D-316 registra la secuencia pedida por Iván: subir el trabajo autorizado a GitHub y continuar P06 inmediatamente después del cierre verificado de P05, con multiagentes bajo coordinación de raíz. Mientras tanto no se desarrollan nuevas funciones P06 ni se altera su prototipo.
