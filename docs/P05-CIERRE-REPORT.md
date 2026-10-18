# P05: preparación de cierre y verificación del17/10/2026

**Actualización posterior a la preparación local:** [EV-033 / auditoría Firebase](P05-AUDITORIA-FIREBASE.json) y [decisión Spark](P05-ESTADO-SPARK.md). Se repitieron suiteNode111PASS/0FAIL/1omitida y build:check85scripts antes de preparar la publicación. Los24+8escenarios de navegador y la integración explícita listados abajo corresponden a la verificación local previa del mismo código; no se presentan como pruebas reales nuevas.

## Estado real

Iván pidió completarP05 antes de continuarP06 (A-026/D-314). Se conserva todoP06 sin desarrollar nuevas funciones. **P05 sigue EV0/6; no está al100%.** Las pruebas pendientes con servicios propios y su aceptación no se han ejecutado. Global52/100,53tareas/25CV; criterios, pesos, dependencias e historial anteriores conservados. A-027 reitera la publicación del código y roadmap autorizados; el registro de la entrega está en PUBLICACION_GITHUB.md. A-028/D-315 conserva Spark sin facturación. El acceso CLI y la configuración Auth ya fueron consultados en vivo (EV-033); eso no acredita acceso de jugador o guardado real.

## Preparado y corregido

- Modos explícitos `?cuentas=local` y `?cuentas=propias`, configuración pública empaquetada y cachés/sesiones separadas. Proyecto propio fijo scp-survivor y emulado demo-scp-survivor.
- El modo propio usa las llamadas oficiales de Google popup, vinculación Google y EmailAuthProvider; revisa UID y token. Las pruebas de esas llamadas usan un SDK simulado, no una cuenta Google real.
- `ownAccountsEnabled=false`: panel propio informa desactivación y bloquea iniciar antes de inicializar SDK o escribir sesión. Los prototipos de grietas/inventario no se mezclan con cuentas propias.
- Backend con habilitación explícita, proyecto exacto y rechazo de variables de emuladores mezcladas. Admin usa identidad normal del runtime propio; se conserva el servicio transaccional, schema1, propiedad/versión/sesión/recibo y Firestore deny-all. Sin TTL que elimine deduplicación.
- Callable con capacidad min0/max1,256MiB,30s,concurrencia20. Esto no garantiza el objetivo20USD ni activa facturación. CORS comprueba los dos orígenes Firebase y loopback IPv4/IPv6; otras direcciones se rechazan en el manejador real del SDK.
- UI distingue correo/cuenta reales de pruebas; los textos ya usan un ID específico y conservan el crédito «Desarrollado por Ivan Vivanco».
- Configuración de despliegue independiente, preflight solo lectura y preparador de Hosting que copia solo frontend público, rechaza enlaces y conserva destinos existentes. No se crean ni despliegan archivos públicos mientras la activación propia sea falsa.

## Evidencia ejecutada

| Comprobación | Resultado y límite |
| --- | --- |
| SuiteNode final |112casos:111aprobados,0fallos,1integración optativa omitida. Incluye guardias de runtime, llamadas OAuth/vinculación simuladas y aislamiento de cachés. |
| Integración explícita con emuladores |1 ensayo aprobado: UID/revisiones/recibos/concurrencia/sesión y escrituras directas denegadas. Proyecto demo local. |
| Navegador P05 local final |24escenarios aprobados,12por fuente/compilado. Identidades ficticias y servicios emulados; no acredita OAuth/correo real. |
| Propio desactivado |8escenarios aprobados, fuente/compilado ×escritorio/móvil emulado ×con/sin flags de prototipos. Cero peticiones remotas y errores de página; iniciar bloqueado, sesión propia sin crear. |
| CORS real del manejador SDK |Prueba HTTP local sobre callable exportada: acepta dominios propios y ambos formatos loopback; rechaza otros orígenes. Sin Auth/ADC ni nube. El emulador añade respuestas CORS propias, por lo que no se usó como evidencia de esta restricción. |
| Build/check |85scripts, bundle6382978a6a, SDK227024bytes; correctos. Versiones de dependencias declaradas sin cambios. |
| Acceso/configuración propios |Consulta posterior EV-033: CLI autorizado y proyecto accesible; facturación deshabilitada, sin cuenta vinculada; Auth Google/correo/dominios/política confirmados por GET. Firestore/Functions no listados por403SERVICE_DISABLED. Sitio Hosting existente, release no comprobada. Sin mutaciones ni pruebas funcionales reales. |
| Preparación de Hosting desactivado |Rechazo esperado con código1, dist-own no creado. Sin despliegue. |

Artefactos locales: `../migration-audit/p05-closure-node-final.txt`, `p05-closure-emulators.txt`, `p05-closure-local-browser-final/results.json` y `p05-closure-own-disabled-browser-final/results.json`. Scripts reproducibles en tests/. Las capturas finales fueron revisadas. Son perfiles de navegador aislados; no se accedió al navegador personal del titular.

## Incidencias de esta revisión

1. La revisión encontró que CORS omitía IPv6 pese a permitirlo en el cliente. Se reprodujo con prueba fallida del manejador HTTP real, se corrigió el patrón y la prueba pasó. OPTIONS del emulador refleja orígenes por su propia capa y no prueba esa política de producción.
2. La primera ejecución del navegador agotó la espera de providerData después de una vinculación local, mientras la UI mostraba éxito. Una prueba mínima independiente y la repetición completa pasaron; no se aisló la causa de la variación entre pestañas. Sí se confirmó que el código local podía anunciar éxito sin recargar/comprobar el proveedor: nueva prueba unitaria fallida, recarga del usuario actual/IDtoken y postcondición de Google+UID, prueba verde. El recorrido completo final volvió a pasar24casos. Esto no acredita vinculación real; se conserva la incidencia en el registro, sin relajar aserciones ni ampliar tiempos.

## Lo que impide cerrar el100%

- El acceso CLI y consulta de infraestructura/Auth ya se resolvieron. Iván eligió mantener Spark sin facturación; [Cloud Functions requiere Blaze para desplegar](https://firebase.google.com/docs/functions/get-started). El backend actual no se despliega en ese plan. Resolver un alojamiento de servidor compatible y probarlo antes de habilitar cuentas propias; no hay alternativa implementada en esta entrega. No se activó billing.
- Revisar Firestore/ubicación/configuración y el servicio confiable compatible con Spark antes de conectar el modo propio. Las APIs deshabilitadas impidieron el listado; no se crearon bases ni habilitaron APIs por inferencia.
- Probar Google OAuth y correo recibido, recuperación y vinculación reales, separación de identidades, transacciones y continuidad entre dispositivos/redes. Completar [CIERRE_P05.md](CIERRE_P05.md); revisar retención/eliminación conservando D-290. No hay evidencia real de esos puntos en este informe.

Continuación concreta: [ACTIVACION_FIREBASE_PROPIO.md](ACTIVACION_FIREBASE_PROPIO.md). [Diff de esta preparación](P05-CIERRE-CAMBIOS.diff). El respaldo previo `development-backups/SCP-SURVIVOR-antes-cierre-P05.zip` se conserva fuera de la carpeta del proyecto. No cambiar estados a CV hasta obtener la evidencia real pendiente.
