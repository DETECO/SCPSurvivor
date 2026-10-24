# MEN-004 — Armas aprobadas en el menú

**Fecha:** 23/10/2026  
**Estado:** dirección corregida por Iván; implementación local preparada para revisión; ficha no aprobada  
**Decisión exacta de Iván:** mostrar únicamente las nueve armas de ARM-VIS-001/R1 y F24; excluir las demás armas de ensayo.

## Contexto y objetivo

La pantalla local «Arma inicial» se alimenta de `FieldCatalog` y hoy ofrece Pistola, Subfusil, Escopeta y Porra. El catálogo ARM-VIS-001/R1 contiene nueve armas y la fusión visual F24, aprobadas por ARMAS únicamente como diseños. La pantalla mostrará solo ese lote y excluirá las cuatro armas de ensayo que no pertenecen a la aprobación visual.

## Comportamiento propuesto

- Mostrar los diez recursos de ARM-VIS-001/R1 en la pantalla de armas, usando los nombres, tiers, categorías e imágenes del catálogo aprobado como fuente. F24 se identifica como diseño de fusión.
- No mostrar las cuatro tarjetas del catálogo de ensayo como opciones paralelas. La pistola AF01 sí aparece porque pertenece al lote ARM-VIS aprobado; no se confunde con la tarjeta anterior de ensayo.
- Las tarjetas presentan los diseños aprobados; no ofrecen equipar, estadísticas ni efectos de combate hasta que PROGRAMACION los integre.
- Mantener el menú móvil en una sola vista, sin desplazamiento de página. Usar una cuadrícula compacta adaptable: dos columnas en móvil vertical y cinco en móvil horizontal/PC.
- Si el catálogo no carga o su estado no es `visually_approved_not_integrated`, mostrar un aviso breve. No sustituir la galería con las armas del ensayo.

## Límites y dependencias

La galería utiliza la aprobación visual ARM-VIS-001/R1 registrada en [PAUTA_ARMAS.md](../../PAUTA_ARMAS.md) y sus recursos en `docs/referencias/armas/armas-prueba-direccionales-v1/`. No extiende la aprobación a ARM-CAT-001/R1, estadísticas, progresión, animaciones o mecánicas. La integración y publicación siguen bajo responsabilidad de PROGRAMACION y su informe enlazado desde [PAUTA_MENUS.md](../../PAUTA_MENUS.md).

## Archivos y verificación

La implementación local quedó en `js/ui/operations-menu.js`, `css/operations-menu.css` y `dev.html`, con salida generada en `index.html` y `js/app.min.js`. Los veinte PNG de vista previa y el manifiesto local están en `assets/menus/approved-weapons-arm-vis-r1/`; son copias cotejadas con las imágenes fuente ARM-VIS-001/R1. `tests/v2-operations-menu.test.js` comprueba la lista exacta de diez diseños, la ausencia de opciones de ensayo y de controles de equipamiento, y la identidad de las imágenes. También se ejecutaron las regresiones del menú móvil y la verificación de sintaxis del bundle. La pantalla se revisó visualmente en escritorio; no se ejecutó Playwright ni se hizo una prueba en teléfono físico, así que las tres orientaciones no quedan verificadas manualmente en esta revisión.

No se editarán los recursos ni la pauta de ARMAS. La evidencia de integración continuará enlazada desde PROGRAMACION, sin mantener una lista paralela en MENUS.
