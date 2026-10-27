# Correctivo técnico de carga de salas — LOT-EST-008 r2

26/10/2026 · PROGRAMACION · base pública 0.40 `b542e8348d7a8ac2b7d5ae91a5f047c8fa34b724` · **comprobado localmente; publicación correctiva pendiente de recibo**.

## Incidente y causa

Durante la primera prueba sobre GitHub Pages, D3/32 devolvió `asset_timeout`; la revisión independiente reprodujo una espera excesiva en D4. Los cinco PNG C1-r2 sí estaban publicados y coincidían byte a byte con el repositorio; una repetición aislada de D3 descargó el recurso y entró en combate. No se observó error JavaScript. El problema era intermitente y dependía del tiempo de descarga.

El juego solicitaba la lámina de aproximadamente 2,5 MB **al entrar** en cada sala. La caché de imágenes usaba la instancia de geometría como clave, por lo que una sala nueva no reutilizaba la imagen ya cargada del mismo BIO. El límite técnico de 10 segundos activos podía devolver al jugador al mapa antes de completar la descarga. Esa salida preservaba el origen y no concedía premio, pero impedía probar o jugar el encuentro en una conexión lenta.

## Corrección

- Al abrirse el portal se inicia la descarga de la lámina correspondiente. Las apariciones de la misma sala reutilizan la imagen por su ID visual.
- Una descarga fallida queda marcada como fallo; una apertura posterior puede reintentarla. Un archivo ausente sigue causando retorno técnico sin recompensa.
- Si la descarga sigue pendiente a los 10 segundos activos dentro de la sala, aparece «La sala dimensional sigue cargando…». El retorno técnico se activa a los 30 segundos activos. El mapa de origen, vida y estado quedan suspendidos durante la espera.
- No cambian el tiempo abierto del portal, el combate, las probabilidades, las recompensas, los diseños aprobados ni los servicios.

## Comprobaciones

Se escribió primero una prueba roja que reproducía la ausencia de precarga y reutilización. Después del arreglo: **318/318** pruebas Node del juego, navegador local **13/13 grupos** en la fuente y en el clon público preparado, incluidos D1–D5 en 16/32, aviso y entrada después de 15 segundos simulados de carga, fallo 404 y límite de 30 segundos sin premio. El chequeo de construcción pública conserva SDK/config/CSP y confirma 125 scripts. El ensayo de poderes 12/12 pasó tras el cambio local; no se repitió la medición de 15 combates porque este correctivo no cambia daño, IA ni economía.

La primera versión pública 0.40 sirve de evidencia del incidente y permanece identificada por su commit. Este documento necesita el recibo posterior del correctivo y una nueva prueba sobre Pages para acreditar el resultado público. No hubo prueba en teléfono físico.

[Manifiesto y registros de prueba](../../../tests/artifacts/lot-est-008/loading-r2/MANIFIESTO.json).
