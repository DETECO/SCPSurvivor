# P05 sin facturación: plan de ejecución

Autorización: Iván solicita ejecutar con multiagentes y realizar la configuración necesaria; mantener Spark sin facturación. Este plan concreta esa autorización sin cambiar mecánicas.

## Diseño

Firebase Authentication conserva identidades y proveedores. Un Worker verifica ID tokens del proyecto exacto scp-survivor. Cada UID tiene un Durable Object SQLite privado. Un adaptador reutiliza executeCommand y confirma estado + recibo en la misma transacción. No se crean claves de cuentas de servicio; el cliente nunca escribe la base directamente.

Cloudflare es la alternativa elegida porque existe una conexión y admite Durable Objects SQLite en Free. Antes de desplegar se verificará el plan de la cuenta. Functions exige Blaze y un servidor en el PC no proporciona continuidad cuando el PC está apagado.

## Entrega y pruebas

- [ ] Adaptador SQLite: aislamiento por UID, concurrencia, revisión, rollback, recibos persistentes y recuperación después de reiniciar.
- [ ] Worker: JWT firmado, audiencia/emisor/tiempo, CORS restringido, límites de cuerpo y errores sin datos privados.
- [ ] Cliente: transporte HTTPS configurable; demo preservada, token actualizado, mismo requestId en reintentos, rechazo de respuestas malformadas.
- [ ] Construcción y pruebas locales del runtime real de Workers.
- [ ] Confirmar Free, desplegar únicamente recursos SCP nuevos; verificar autenticación y persistencia reales en el endpoint.
- [ ] Registrar límites: OAuth interactivo, correo y dispositivos físicos solo se aceptan con evidencia real. No declarar P05 100% por simulaciones.
- [ ] Actualizar contexto/roadmap, publicar GitHub y verificar SHA remoto. P06 continúa únicamente tras completar los criterios P05.

Recibos no se borran ni expiran; medir crecimiento y detener escrituras antes del límite por cuenta. No introducir economía autoritativa ni cambios visuales durante esta adaptación.
