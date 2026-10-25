# PROGRAMACION — ARMAS006, entrega local

25/10/2026 · LOT-EST-006r1 · **Implementado y comprobado localmente; sin publicación de este lote.** PROGRAMACION trabaja en esta sesión sin reactivar agentes. Juanillo/ESTRUCTURA conserva conciliación, gestión y publicación.

## Fuentes fijadas y tratamiento

ARMASR3; ARM-FALTANTES-VIS-001/r1 y sus ARM-SMG-VIS-001/r1, ARM-SHOTGUN-VIS-001/r1 y ARM-BATON-VIS-001/r1; aprobación directa de Iván25/10 y LOT-EST-006r1. Cita: «Aprobado. Ahora diseñas los poderes anomalos al matar una anomalia.» Se aplica únicamente a los48sprites entregados antes; los poderesA/B posteriores no están elegidos y no se incorporan.

Hash/baseline antes de escribir: `development-backups/lot-est-006-r1/MANIFIESTO.json`. Lote, pauta, catálogo y aprobación coinciden al cierre: no hubo cambio de revisión silencioso. Catálogo de solo lectura en `docs/referencias/armas/armas-faltantes-v1/catalogo.json`. Las anclas originales estimadas se comprobaron contra los48PNG: agarre, apoyo y boca/punta sobre píxeles opacos en todas las vistas; no requirieron sobrescribirlas. Auditoría en [anchor-raster.json](PROGRAMACION-ARMAS-006/anchor-raster.json). La aceptación artística final del montaje no se infiere de esta calibración técnica.

## Implementación

- `js/ui/approved-field-weapon-art.js`: módulo visual para las48imágenes originales. Elige la vista más cercana, fija el agarre a la mano y transforma apoyo/boca/punta a la misma escala. Perfil técnico LOT006r1: celda de arma42u frente a celda humana56u; factor0,75idéntico en16/32. AF01 conserva su módulo, escala y recursos. No se cambian cámara ni colisiones.
- Carga no esperada por el arranque: un recurso faltante/lento utiliza respaldo legado reducido e identificado en pantalla. Tras6s se permite el respaldo; una respuesta tardía aún recupera la imagen. Fallos de imagen pueden reintentarse al usarse, con10s entre intentos; sin bucle de solicitudes por fotograma. El cambio de resolución recarga la página según el ajuste existente.
- `js/ui/personajes-art.js`: mismo montaje para guardia, médico, apoyo masculino y tres compañerasR3. Una copia balística usa dos brazos; dos copias independientes usan un brazo por arma. La porra sola deja la otra mano en reposo. Se elimina una duplicación previa de la mano principal; la incapacitación masculina ahora usa la postura neutralizada y retira el arma, igual queR3.
- Disparo conserva su destello en la boca una sola vez, con pequeño retroceso visual; recarga baja ligeramente el conjunto. La porra mantiene el barrido procedural existente: vista PNG cercana y rotación residual máxima22,5°, sin aplicar dos veces el ángulo de la vista. No se fabricaron animaciones rasterizadas nuevas.
- `dev.html` y `js/main.js` incorporan y arrancan el módulo; `index.html` y `js/app.min.js` se regeneran. Bundle local **e67db870df**,118scripts; build/checkPASS.

El sorteoNPC sigue exclusivamente pistol/smg/shotgun. No se añade porra al compañero ni se modifican estadísticas, reserva ilimitada, cargadores, recarga, cadencia, proyectiles, rarezas, progresión o poderes. AF01 y otros cinco módulos comparados coinciden con LOT005; tres archivos mecánicos también coinciden byte a byte con el respaldo inicial. Los57PNG del paquete (48individuales más láminas) coinciden porSHA256: [integridad](PROGRAMACION-ARMAS-006/integrity.json).

## Verificación efectiva

| Comprobación | Resultado |
|---|---|
| Pruebas Node del juego, excluyendoP05 según encargo | **279/279PASS**,52archivos; sin omitidas |
| Casos específicos nuevos de carga/anclas/escala/FX/rotación | **6PASS**, incluidos en el total |
| Render real: seis actores,16/32, ocho vistas, una/dos armas | **352montajesPASS**, dos brazos/dos manos, copia/modelo/dirección correctos |
| Incapacitación masculina/femenina | **64posesPASS**, una imagen y ningún arma |
| Reposo/disparo-golpe/recarga o fin del golpe | **24estados** en ambos tamaños; sin mutar la copia ni duplicar destellos |
| Combate/proyectiles/daño/recarga, cuatro modelos×dos tamaños | **8casosPASS**; pistola1,smg1,escopeta6perdigones,porra sin proyectil |
| Recurso404 y respuesta posterior a6s | **2casosPASS**; inicio disponible, aviso de respaldo y recuperación sin reiniciar |
| Tres compañeras×dos resoluciones×tres balísticas en recinto real | **18casosPASS** más respaldo de piezas femeninas |
| Compilación/compilado coherente | **PASS**,118scripts |

Se inspeccionaron las capturas de guardia16, médico32, apoyo masculino16, curvy32 y animaciones32. Se revisaron proporciones, manos, lectura de las dos copias y ausencia de arma en postura neutralizada. No equivalen a aceptación del usuario.

El primer ensayo de combate trasladaba el blanco fuera de la cámara original y el motor descartaba los proyectiles: se corrigió la preparaciónQA fijando también la cámara, sin tocar el combate. La corrida final pasa. Las poses, posiciones, loadout, HP, tiempo y fallos de red se fuerzan expresamente para QA; no certifican una victoria natural, balance o rendimiento de un teléfono físico. P05 no se repitió.

## Revisar y repetir

[Diff exacto de fuentes/pruebas](PROGRAMACION-ARMAS-006/CAMBIOS.diff) · [Manifiesto y hashes](PROGRAMACION-ARMAS-006/MANIFIESTO.json) · [Node](PROGRAMACION-ARMAS-006/node-game.json) · [Navegador](PROGRAMACION-ARMAS-006/browser.json) · [SalasR3](PROGRAMACION-ARMAS-006/companeras-sala.json).

[Guardia32](PROGRAMACION-ARMAS-006/guardia-32.png) · [Apoyo16](PROGRAMACION-ARMAS-006/apoyo-16.png) · [Curvy32](PROGRAMACION-ARMAS-006/apoyo_curvy-32.png) · [Animaciones32](PROGRAMACION-ARMAS-006/animaciones-32.png) · [Recurso faltante](PROGRAMACION-ARMAS-006/missing.png). Las12láminas completas y capturas adicionales se conservan en `tests/artifacts/lot-est-006/`.

Desde la carpeta SCP-SURVIVOR: `node --test tests/approved-field-weapon-art.test.js tests/v2-personajes-art.test.js tests/companeras.test.js tests/v2-af01-approved-art.test.js`. Navegador con Playwright instalado: `python tests/armas-006-browser.py`. Compilar y comprobar: `npm.cmd run build` y `npm.cmd run build:check`. La suite completa de juego usa todos los `tests/*.test.js` excepto los que empiezan por `p05-`. El ensayo de salaR3 reutiliza `tests/companeras-browser.cjs` con `SCP_TEST_BASE` apuntando a un servidor local y `SCP_TEST_OUTPUT` a una carpeta de evidencia nueva; no usar el destino público para este lote.

## Límites y entrega a ESTRUCTURA

**Listo para conciliación local.** Publicación y comprobación pública de LOT006pendientes de Juanillo. No se copiaron ni compilaron archivos en `migration-audit/github-publicacion`, no se hicieron commits/push y no se editaron pauta/control/roadmap/registro o recibos del cierreLOT005. Este informe contiene la entrada técnica para que ESTRUCTURA la registre al conciliar; no suplanta su recibo.

Pendientes materiales: aceptación visual del montaje por Iván, teléfono/Safari/rendimiento físicos y posterior publicación coordinada. No se acepta por extensión el catálogo90, fusiónCC04/TE01/F24 ni las propuestas de poderesA/B. El comparador histórico v1/clásicos conserva su renderer previo; los PNG aceptados se montan en los modos16/32.
