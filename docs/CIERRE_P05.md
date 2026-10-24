# Pauta de aceptación real de P05

**Prioridad vigente 0.27 · 20/10/2026 (A-037/D-333):** Iván da por aceptado lo pendiente de P05 para continuar y prioriza llegar al diseño visual. Aceptación del propietario registrada; las comprobaciones técnicas de servicios reales no ejecutadas se difieren, sin declararlas aprobadas. P05 deja de bloquear el prototipo local B4 y la preparación visual. Cuentas propias, economía persistente y facturación siguen desactivadas. [Mecánicas pendientes y ruta al diseño](PRIORIDAD_MECANICAS_Y_DISENO.md). Esta instrucción posterior sustituye el bloqueo anterior por aceptación P05 para esos trabajos locales; no autoriza activar servicios reales ni reintroducir mochilas, accesorios o extracciones.


**Actualización18/10/2026 (A-029/D-317):** se prepara la alternativa Worker/SQLite conservando Firebase Auth y Spark. El cliente sigue desactivado y no hay despliegue verificado. Confirmar Workers Free y ejecutar la aceptación real antes de cerrar P05 o continuar P06. Agentes Sol con razonamiento medio, bajo revisión de raíz. Consultar [P05-WORKER-SPARK.md](P05-WORKER-SPARK.md); lo anterior sobre Functions queda como antecedente del camino original.

## Estado y alcance

P05 sigue en validación: P05-T01, P05-T02 y P05-T03 están en EV, con 0/6 puntos. La preparación más reciente documenta24escenarios de navegador local,8del modo propio desactivado,111pruebas Node aprobadas,0fallos y1omitida por opt-in, además de un ensayo explícito de Auth/Firestore/Functions Emulator. Véase P05-CIERRE-REPORT.md; las cifras anteriores del reporte P05-local-01 son históricas. Es evidencia del prototipo local; no acredita servicios reales ni cambia el estado del roadmap.

Esta pauta registra las pruebas reales pendientes de las tareas ya aprobadas. No agrega criterios, pesos ni créditos. La prioridad acordada es cerrar y revisar P05 antes de continuar P06; su primer prototipo se conserva. La configuración propia puede prepararse en paralelo, siempre desactivada.

## Condiciones previas

- Acceso CLI del propietario y al proyecto confirmados el17/10/2026 (EV-033). No solicitar otro login mientras la sesión sea válida. `node tools/check-firebase-own.js` es lectura; no compartir credenciales, códigos ni tokens por chat.
- Consulta real: facturación deshabilitada y sin cuenta vinculada. Iván eligió mantener Spark sin facturación (A-028/D-315). El backend actual requiere Functions y [Blaze para desplegar](https://firebase.google.com/docs/functions/get-started): no ejecutar ese despliegue. Resolver alojamiento de servidor compatible antes de aceptación real; [estado Spark](P05-ESTADO-SPARK.md).
- D-068 (USD 20) no autoriza gasto; D-284 no establece un límite máximo de gasto. Cualquier cambio de plan o gasto requiere la autorización que corresponda.
- No se ejecutaron aquí Google OAuth real ni pruebas en dispositivos físicos. La configuración de Firebase propio sigue inactiva hasta que corresponda validarla.

## Registro de aceptación pendiente

Todos los casos parten como NO EJECUTADO. Los identificadores de esta tabla solo organizan la pauta; no son nuevos IDs de evidencia ni cambian el roadmap. Registrar el resultado observado, el criterio aplicable y evidencia con UID(s), entorno y versión, sin secretos. No marcar un caso aprobado por inferencia a partir de emuladores.

| Caso | Resultado | Criterio de aceptación ya aprobado | Evidencia que se debe registrar |
|---|---|---|---|
| R01 Correo real | **NO EJECUTADO** | Alta y acceso con correo real; el correo de verificación llega y el acceso queda bloqueado hasta verificar. Recuperación llega y permite restablecer acceso. Los errores de credenciales o enlaces inválidos, vencidos o ya usados se manejan sin alterar otra cuenta. | UID-A; proyecto/entorno; versión; fecha; resultado de cada flujo y registro de correo sin códigos ni tokens. |
| R02 Google y vinculación | **NO EJECUTADO** | OAuth Google real y vinculación explícita en ambos sentidos: correo → Google y Google → correo. El UID se mantiene en cada vinculación; cancelación, identidad ya usada o error no fusiona cuentas ni cambia su UID. | UID antes/después por flujo; proveedor probado; proyecto/entorno; versión y resultado, sin tokens ni datos de acceso. |
| R03 Aislamiento entre cuentas | **NO EJECUTADO** | Con dos cuentas reales, A no puede leer ni modificar estado de B, ni directamente ni mediante funciones. La identidad se obtiene del token autenticado, no de un UID enviado por el cliente. | UID-A y UID-B; intentos permitidos/denegados; estado antes/después; resultado y registros saneados. |
| R04 requestId y concurrencia | **NO EJECUTADO** | Repetir el mismo requestId y contenido no duplica el efecto; reutilizarlo con contenido distinto se rechaza. Solicitudes concurrentes equivalentes dejan un único efecto/recibo. | UID; requestId no secreto; revisiones y resultado de cada solicitud; estado/recibos antes/después. |
| R05 Versión y sesión | **NO EJECUTADO** | Revisión obsoleta, sesión revocada y checkpoint incompleto o incoherente se rechazan sin mutación ni recibo inválido. | UID; revisión/build de esquema; sesión identificada sin credenciales; respuesta y estado antes/después. |
| R06 Dos dispositivos, corte y reenvío | **NO EJECUTADO** | En dos clientes para el mismo UID, comprobar transferencia explícita de sesión y que la sesión anterior pierde autoridad en los puntos de comprobación existentes. Cortar conexión/cerrar cliente tras enviar una operación pendiente; al volver, reenviar el mismo requestId y confirmar un único efecto y continuidad del estado. | UID; etiquetas de cliente/dispositivo; operación y requestId; secuencia de corte/reinicio/reenvío; estado y revisión antes/después. |
| R07 Retención/compactación y deduplicación (D-290) | **NO EJECUTADO** | Conservar deduplicación al retener o compactar recibos; un requestId ya procesado no duplica una mutación. Medir almacenamiento. D-290 no fija plazos ni obliga a implementar borrado de cuenta: no agregar esos requisitos por inferencia. Si en el futuro se autoriza borrado, probar que no restaure estado eliminado. | UID; referencia a D-290; recibos/almacenamiento y resultado de reintento; fecha. No aplicar políticas destructivas nuevas. |

**Formato de evidencia por caso:** caso; resultado (NO EJECUTADO hasta que se corra y revise); criterio aprobado; UID-A/UID-B cuando corresponda; proyecto y entorno; versión/build; fecha; observación y evidencia técnica saneada. Los UID identifican cuentas, no son credenciales. Nunca adjuntar contraseñas, códigos de un solo uso, tokens, claves privadas ni cookies.

## Regla de cierre

Mantener los tres estados P05 en EV y el avance en 0/6 mientras falte evidencia real o revisión del criterio correspondiente. No convertir pruebas de emulador en aceptación real, no ajustar pesos y no marcar CV por anticipado. P06 se retoma después de que P05 tenga evidencia real revisada y su cierre se resuelva conforme al roadmap.
