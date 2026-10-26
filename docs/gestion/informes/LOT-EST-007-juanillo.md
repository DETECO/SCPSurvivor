# LOT-EST-007 r1 — HUD y proporciones comprobados

26/10/2026 · Juanillo / ESTRUCTURA · REV-EST-0011. **Publicado y comprobado en GitHub Pages:0.39,120 scripts,bundle92026cde30.**

El HUD MEN-005-A aprobado por Iván usa las esquinas, vida/XP y tiempo reales, radar, dos ranuras y recarga; conserva Sprint/Primeros auxilios como habilidad del soldado. Los diálogos evitan HUD/controles y ceden a las alertas. Pausa, cartas y reemplazo del cuarto poder conservan congelación y acciones alcanzables. [Entrega de PROGRAMACION](../entregas/PROGRAMACION-HUD-007.md).

La reparación técnica iniciada en PERSONAJES reexporta torso y piernas con una escala común en lugar de reducir cada parte por separado. Se conservan fuentes aprobadas; se añaden 72 PNG y un catálogo para Guardia, Médico, apoyo masculino y delgada/fitness/curvy en16/32. Catálogo modular y atlas del menú/respaldo apuntan a la misma revisión. Las piezas de brazos/manos y la postura incapacitada se conservan; el ancho del rig se ajusta a la nueva proporción. No se modifican físicas, cámara, estadísticas o reglas de disparo. El renderer aprobado deLOT006 permanece intacto.

Juanillo revisó código, exportador,12hashes de fuentes originales, capturas y ejecución real. La entrega formal de PERSONAJES seguía en curso al capturar este corte; no se presenta un informe de área pendiente como terminado. La validación independiente corresponde exactamente a los archivos fijados, no a ediciones futuras. [Corte y procedencia](../revisiones/REV-EST-0011/CORTE_RUNTIME.json).

La fuente pasa285/285 pruebas de juego en 54 archivos, excluyendoP05. El clon pasa 22 pruebas pertinentes y build/check de120 scripts. En ambos se probaron cuatro formatos:844×390, 932×430, 390×844 y 1280×900; entrada, toque flotante, equipo/pausa, recarga/habilidad, cartas, recintoD2 con NPC, alerta de retirada, premio/retorno y reemplazo del cuarto poder. También352 montajes,64 incapacitados,24 estados visuales y8 combates reales por corte; sin errores JavaScript. [Resultados](../LOT-EST-007_VALIDACION.json) · [evidencia](../evidencias/lot-est-007/clon/hud/browser.json).

[HUD horizontal](../evidencias/lot-est-007/clon/hud/844x390-normal.png) · [vertical/recinto](../evidencias/lot-est-007/clon/hud/390x844-recinto.png) · [Guardia32](../evidencias/lot-est-007/clon/armas/guardia-32.png) · [compañera32](../evidencias/lot-est-007/clon/armas/apoyo_curvy-32.png).

Se usan inyeccionesQA declaradas para alcanzar ramas de interfaz, poses y daño: no prueban dificultad natural ni teléfono físico. El montaje nuevo sigue pendiente de aceptación visual del usuario. La suite completa de servicios P05 tiene cinco fallos conocidos de compatibilidad workerd; no se corrigen ni se activan servicios en este lote. Se preservan SDK/configuración y CSP públicos. La autorización anterior de publicar cierre documental cubre únicamente documentos/recursos del juego aquí incluidos.

Fusión LOT002 conserva el gate cerrado: debe repetir sus 384 poses con este rig y probar ataques/estación/confirmación. Ultimates, progreso permanente por soldado, gacha y persistencia real siguen pendientes; las propuestasA/B de poderes no se eligen ni se publican por extensión. [Recibo de publicación](../LOT-EST-007_PUBLICACION.json).

## Cierre público comprobado

Pages confirma `8cdac5846ec7cf7c0b9fa95c226120b723644e2e`. La demo pública repitió los cuatro formatos,  352 montajes,64 incapacitados,24 estados visuales y8 combates;92/92 archivos coinciden por SHA256. Sin erroresJavaScript. [Evidencia pública](../evidencias/lot-est-007/publica/hud/browser.json) · [montajes](../evidencias/lot-est-007/publica/armas/browser.json) · [hashes](../evidencias/lot-est-007/publica/hashes-publicos.json). El cierre documental posterior se verifica aparte, sin atribuirle un cambio de runtime.
