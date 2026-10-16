# Prueba manual — inventario local P06

**Estado:** pauta preparada; aceptación manual pendiente. No se han consignado resultados de prueba aquí. P06-T01 sigue en curso (EC), con `evidenceComplete=false`.

## Alcance

La primera entrega es un prototipo local para revisar el modelo físico y la gestión en base/preparación. Usa una carga temporal ficticia con copias numeradas, dos tamaños de mochila (8 y 16) y almacén simulado de 60. No usa cuentas, guardado persistente, inventario real, botín ni el kit de P06-T02. No acredita autoridad de servidor, continuidad de cuenta ni la aceptación completa de P06.

## Acceso

Con el servidor local iniciado, abre `http://127.0.0.1:8000/?prueba=inventario`. La URL primero muestra el menú. Pulsa **Iniciar prueba de inventario** para entrar a preparación de 20 segundos y luego pulsa el botón **Inventario**. Para el acceso opcional, abre el juego en loopback con `?inventario=local` y entra al panel desde el menú/base. No uses `?cuentas=local` en esta prueba.

## Lista de comprobación

Marca cada punto solo después de observarlo en el navegador:

- [ ] La prueba directa empieza en preparación, con contador de 20 s; no concede una victoria ni cuenta oleadas por abrir el panel.
- [ ] El panel muestra las copias numeradas, ubicaciones y ocupación de mochila/almacén; cada copia aparece en una sola ubicación.
- [ ] En base, cambiar equipo deja un borrador: **Cancelar** lo revierte; **Confirmar** aplica el cambio visible.
- [ ] Se puede cambiar de mochila de 8 a mochila de 16 y confirmar sin penalización de velocidad.
- [ ] Con más de 8 espacios ocupados, intentar volver a mochila de 8 se rechaza y conserva todos los objetos.
- [ ] El almacén indica capacidad 60; transferir objetos se permite en base y se bloquea durante preparación.
- [ ] Durante preparación, mantener el panel abierto no detiene el contador. Si el tiempo termina con cambios sin confirmar, el borrador se descarta.
- [ ] Confirmar un cambio en preparación lo aplica al estado de la expedición, sin pausar el reloj.
- [ ] El recorrido no habilita inventario de cuenta, persistencia, botín ni kit; al recargar se vuelve al fixture de prueba.

## Resultado

Deja la aceptación manual pendiente hasta que Iván recorra los casos y comunique su resultado. Las pruebas automatizadas, el build y sus resultados se registrarán por separado en [docs/P06-REPORT.md](P06-REPORT.md). Para P06-T01 aún quedan pendientes la autoridad transaccional de servidor conforme a las dependencias originales P04-T02/P05-T03, la continuidad y esta aceptación manual. P06-T02–T05 continúan P.
