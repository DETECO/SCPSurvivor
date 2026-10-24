# REV-EST-0007 — Coordinación integral y grietas

24/10/2026 · Juanillo. Estado: **ejecución encargada, seguimiento abierto**.

## Petición y responsabilidad

Iván pide continuar la corrección visual y resolver las grietas: «Cuando entro no entramos a ninguna sala o nivel personalizado de la anomalia. Solo sale un monstruo que no se cuañ es.» Recuerda diez anomalías y compañeros con diálogos; autoriza «ir hilo por hilo viendo que paso y ordename esto» y nombra a Juanillo jefe del proyecto completo. Fuente: mensaje directo actual en ESTRUCTURA; ID individual no expuesto en esta ejecución.

**EST-ORG-002 r1:** Juanillo coordina prioridades, revisiones, entregas y comunicación entre las áreas para esta ejecución. PROGRAMACION conserva integración/pruebas/publicación y cada especialidad sus decisiones/recursos. Se pueden consultar y encargar trabajos en los hilos existentes bajo la autorización directa; no se convierten recomendaciones anteriores en decisiones aceptadas. No crear una segunda implementación paralela de NIVELES.

## Qué pasó

Las entregas0.33/0.34 declaraban expresamente que B3 era una práctica con Custodio en el mismo mapa y que el director nuevo solo estaba probado de forma aislada. El corte REV-EST-0006 conservó esos límites: LOT-EST-001 no incluía salas, catálogo jugable, poderes o compañeros. Faltó encargar y completar la integración de esas dependencias para que la demo cumpliera el diseño completo. No es suficiente que los portales estén animados ni que los sprites existan fuera del runtime.

En NIVELES se recuperó el intento fallido `01a16da4-d936-7782-b898-79e650f0e723`, con el mismo reporte de Iván sobre contacto sin traslado y enemigo no aprobado. No hay entrega final de ese turno. PERSONAJES sí aceptó el paquete raster y sus diálogos, pero su último cierre los declara pendientes de integración.

## Encargo y cobertura real

[LOT-EST-005 r1](lotes/LOT-EST-005-r1.md) encarga completar el flujo de expedición. Conserva [LOT-EST-001](lotes/LOT-EST-001-r1.md), las decisiones de armas/escala y sus fuentes; no reescribe sus recibos. [Fuentes preservadas y hashes](revisiones/REV-EST-0007/MANIFIESTO.json).

| Hilo | Cobertura recuperada ahora | Acción |
|---|---|---|
| PROGRAMACION | Último cierre0.35 de INC-VIS-001, informe y recibo; límites de0.34 | Encargo de implementación integral, único escritor del runtime; seguimiento |
| NIVELES | Dos turnos recientes: error sin cierre y aceptación NIV-GRI-009 | Encargo de salas/transición y contratos de retorno; no duplicar runtime |
| PERSONAJES | Dos turnos recientes: producción y aceptación de cinco BIO; fuentes de ataques/dialogos | Recuperar roster recordado de10 y entregar manifiesto real de5/10 con evidencias |
| ARMAS | Consulta smg y producción nueva de Subfusil/Escopeta/Porra | Mantener propuesta/recurso pendiente de revisión; no afirmar que está aprobado |
| MENUS | Último turno con tres propuestas MEN-005A/B/C, sin elección | Encargo acotado de lectura, burbujas y selector sobre UI vigente; no aplicar propuesta |
| SONIDO | Último turno interrumpido de sonidos para armas | Inventario acotado de recursos aceptados/eventos; sonido de burbuja no cerrado |
| ICONO APP | Último turno ICON-APP-001/R1 y su registro | Sin dependencia nueva de grietas; referencia maestra ya existe |
| ESTRUCTURA | Petición actual, fuentes específicas y corte previo | Lote integral, discrepancias y seguimiento hasta evidencia |

Esta consulta cubre los turnos y fuentes citados, no todos los historiales completos. Se pidieron entregas documentales específicas a las áreas; se registrarán al llegar con sus revisiones. Los agentes auxiliares realizan auditorías de lectura; sus resultados no sustituyen pruebas de PROGRAMACION.

## Conflictos concretos

1. **Cantidad resuelta — EST-GRI-002 r1:** tras la consulta, Iván responde «Mantener las cinco aprobadas; las diez eran sus variantes gráficas.» Se integran cinco BIO, cada una en16/32. No quedan cinco nuevas identidades pendientes ni se amplía el catálogo por inferencia. La auditoría de catálogo y PERSONAJES coinciden con la aclaración.
2. **Diseño aceptado frente a parámetros faltantes:** salas completas, datos de combate/poderes/NPC y detalles de retirada requieren fichas de ensayo; LOT-005 exige identificarlas y comprobarlas. No anunciar balance final por tener valores que permitan probar.
3. **Presentación pendiente:** MEN-005 sin elección, sonido de compañero sin recurso aceptado y nuevo arte smg/escopeta/porra en producción/revisión. Mantener sus estados, sin impedir salas, patrones y burbujas ya autorizados.

## Corrección visual verificada

PROGRAMACION publica INC-VIS-001 r1 /0.35, runtime `3f533c36648e74b76b2f155f90e90c6b0d8a4e0f`: [informe](informes/INC-VIS-001-programacion.md) y [recibo](INC-VIS-001_PUBLICACION.json). Declara16escenarios visuales públicos+2inicio/pausa y39archivos coincidentes. ESTRUCTURA repitió tres arranques públicos independientes (habitual16/32 y AF01horizontal32):16/16AF01cargados en todos, celda visual de Biológico56 frente a128físicos heredados, Custodio128, sin erroresJS ni desbordamiento de página. Captura habitual inspeccionada; evidencia del padre `migration-audit/inc-vis-001/coordinacion-cierre/resultado.json`. Esta comprobación es de arranque/carga/composición; no repite los32montajes ni la partida del iPhone.

La incidencia visual queda **parcial por recursos de ARMAS** y teléfono/aceptación humana pendientes. No se declara modelado el Subfusil por corregir la pistola.

## Auditorías auxiliares

Dos auditorías Luna máximo completadas en solo lectura: catálogo y runtime/salas. Confirmaron5identidades, director sin consumidor y `useRift()` que solo agregaba `Content.boss` al mismo mapa; `updateMapTrial()` seguía avanzando el origen. `EnemyMgr.stash/restore` es reutilizable; el checkpoint V2 heredado no captura/restaura este recorrido y `World.reset()` elimina fixture/props rotos. PROGRAMACION recibió esos riesgos para conservar el estado vivo sin regenerarlo al retornar. Estas auditorías no ejecutaron pruebas ni implementaron código. La tercera, de compañeros/poderes, falló por límite de uso y no entregó resultados; su cobertura no se acredita. La raíz y las entregas de las áreas mantienen esa revisión.
