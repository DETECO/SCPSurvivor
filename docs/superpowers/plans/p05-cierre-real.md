# P05 real Implementation Plan

**Goal:** completar todo lo verificable de P05 y preparar su integración real, conservando P06 hasta cerrar aceptaciónP05.

**Architecture:** ampliar el adaptador Firebase existente con selección/activación explícita; guardias de runtime propias sobre el mismo servicio transaccional.

**Tech Stack:** JavaScript/Canvas2D, Firebase SDK/Functions/Firestore actuales, Node test y emuladores.

## Restricciones

No fuentes Cloud ni mecánicas, nuevos criterios/pesos o borrado de avancesP06. No billing, claves privadas en código, escritura Firestore directa ni recibos eliminados por TTL. Proyecto exacto `scp-survivor`, emulado exacto `demo-scp-survivor`. A-028/D-315: Iván eligió mantener Spark sin facturación. El backend Cloud Functions actual no se despliega; conservar preparación propia desactivada. A-027/D-316: continuar P06 con multiagentes inmediatamente después del cierre real P05.

## Cliente (Luna)

- [x] Tests rojos y verdes de selección de modo propio, activación deshabilitada antes de efectos SDK, orígenes permitidos, separación de caché y selección de OAuth/vinculación oficial. Son pruebas unitarias con SDK simulado; no prueban cuentas reales.
- [x] Configuración propia empaquetada, rama propia sin emuladores y mensajes según entorno; conservar intacta la ruta local.
- [x] Suite de cliente propio y regresión local verdes. Fuente, SDK entry y pruebas del cliente completadas; la integración real y aceptación permanecen pendientes.

## Servidor (Luna)

- [x] Tests rojos de guardias por proyecto/habilitación/emuladores mezclados.
- [x] Guardia propia y configuración acotada sobre callable existente; mantener semántica y reglas.
- [x] Tests verdes y regresión de servicio. No despliegue hasta cumplir requisitos externos.

## Integración y aceptación (raíz)

- [x] CSP/orígenes, exclusión de prototipos cuando hay cuentas propias y configuración separada de despliegue/preflight.
- [x] Build, suiteNode, integración explícita de emuladores y navegador aislado; registrar resultados y límites.
- [x] Documentar prioridadP05, pasos reales, costes/requisitos y diff. Conservar52/100 hasta cierre demostrado.
- [x] Autenticación CLI del propietario y consulta real de acceso/facturación/Auth: EV-033. Sin facturación; correo/Google/dominios/política confirmados administrativamente.
- [x] Registrar decisión expresa de mantener Spark y limitación del backend actual, sin activar APIs ni confundir403SERVICE_DISABLED con ausencia de datos.
- [ ] Resolver alojamiento del servicio confiable compatible con la decisión Spark; comprobar Firestore/ubicación/reglas antes de conectar la implementación propia. No se ha implementado ni validado un servidor alternativo.
- [ ] Comprobación real de identidad/correo/vinculación, transacciones y continuidad; retención/deduplicación conforme a D-290 y aceptación integrada. Solo entonces P05-T01/T02/T03 CV. No desplegar Cloud Functions bajo la decisión Spark.
