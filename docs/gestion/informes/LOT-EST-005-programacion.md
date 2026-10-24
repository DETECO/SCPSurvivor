# LOT-EST-005 r1 — PROGRAMACION

24/10/2026 · REV-EST-0007 / CONTROL0.8 + suplemento EST-GRI-002r1. **Implementado para ensayo y verificado localmente; publicación en preparación.** El recibo `LOT-EST-005_PUBLICACION.json` gobierna el estado público final.

El flujo habitual conecta por primera vez el director con una grieta física y un recinto separado. Cada tier monta su BIO real y los tres patrones correspondientes desde los atlas aceptados, en16/32. Se conserva el mundo vivo del origen mediante intercambio de contenedores, sin serializarlo o regenerarlo. Retirada única y victoria son salidas independientes; morir acaba la expedición.

Los cinco perfiles automáticos tienen daño efectivo, tres ranuras y progresión5+extra, mejoras en la carta libre y reemplazo pausado. Premio identificado por encuentro, primera garantía, azar intermedio25%ENSAYO y garantía tras3victorias vacías. Compañero temporal con equipo AF01 real, perfiles de rareza de ensayo, munición finita, sin remate/XP ni transferencia; nombre y personalidad estables, textos aprobados y marcadores basados en equipo real. La presentación usa el apoyo amarillo anterior, sin incorporar los atlas femeninos defectuosos. No se añadieron servicios, moneda o gacha reales.

La [guía y tabla ENSAYO-GRI-001r1](../../PRUEBA_GRIETAS_INTEGRALES.md) documenta toda elección numérica nueva, reloj propio, política del jugador, rutas, prácticas forzadas y límites. La lista de cinco se confirma por EST-GRI-002; no faltan otras cinco identidades.

## Fuentes y concurrencia

Inicio fijado en LOT-EST-005r1/REV7/control0.8, preservando el manifiesto original. Durante ejecución ESTRUCTURA añadió EST-GRI-002r1: se conservó suplemento y se cerró la discrepancia de cantidad, sin cambiar mecánicas. PERSONAJES-GRIETAS-001r1 confirmó atlas/anclas y advirtió que la elevación del salto ya está rasterizada; no se duplica al dibujar. SONIDO-GRIETAS-001 conserva cues provisionales y NPC silencioso. Hashes y tratamiento en `LOT-EST-005_FUENTES_SUPLEMENTARIAS.json`.

Se consultaron los turnos recientes de NIVELES y MENUS, en progreso: sus fichas estaban sin entrega al fijar la primera composición. NIVELES-GRIETAS-001r1 llegó después y se evaluó por hash: contrato de identidad/conservación adoptado, parámetros de ensayo ya fijados conservados; véase REGISTRO_IMPLEMENTACION. Se concretaron salas y lectura funcional como ensayo autorizado por LOT-005, sin elegir MEN-005 ni presentarlas como arte final aprobado. Las propuestas ARMAS R2.2 producidas en paralelo se leyeron como estado de recurso pendiente; no se integran ni sustituyen AF01. Sus originales permanecen en el área.

Tres agentes Luna máximo iniciaron auditorías y fueron detenidos por límite de uso sin entregar código. La raíz implementó, revisó e integró los módulos y ejecutó las pruebas; no acredita una implementación de esos agentes. Las auditorías previas coordinadas por ESTRUCTURA siguen con su evidencia propia.

## Comprobaciones

- Compilación completa y comprobación:116scripts. Atlas copiados sin edición y procedencia verificada;134archivos previos bajo assets coincidentes con el backup de inicio.
- Batería Node y limitaciones exactas: `LOT-EST-005_VALIDACION.json`; no se declara toda la suite verde por los fallos P05 del entorno. Diecinueve casos de director/reloj/poderes/compañero/sala/suspensión aprobados en la comprobación específica.
- Diez escenarios de navegador: cinco BIO×dos resoluciones, escritorio/vertical/horizontal, con y sin NPC para cada tier. Se registran tres patrones reales por identidad, PNG dibujados, elección UI y retorno. Al comparar el origen se mantienen la identidad de fixture/listas, reloj, enemigos, proyectiles, pickups, director, terminal y cofres.
- Nueve grupos adicionales: retirada sin premio, segunda grieta/cupo2, ventana expirada seguida de victoria, muerte/limpieza/reinicio, daño efectivo de los cinco poderes, NPC finito/no remate/noXP/incapacitación, dos contextos veraces de diálogo/presentación, reemplazo con eliminación de proyectiles y carta libre, ubicación fallida sin reroll.
- Nueve regresiones visuales INC-VIS-001: entrada habitual/AF01/B3, compilado/fuentes y recursos lentos/fallidos, conservando los artefactos del corte anterior. Evidencia de esta repetición en `tests/artifacts/grietas-integrales/regression-inc-vis/`.
- Ruta al portal central comprobada por todas las celdas transitables: máximo cardinal4,27s a165u/s, más margen24u todavía inferior5s. Es geometría estática; no certifica evasión bajo presión o teléfono físico.

Los ensayos inyectan posición, tiempo activo, invulnerabilidad y daño mortal para recorrer estados; tier/NPC forzados se limitan a la práctica explícita. No son partidas naturales de balance ni aceptación de FPS/memoria/Safari o iPhone físico. Las probabilidades naturales del director no se alteran; su RNG habitual es independiente de la semilla fija del mapa de demostración.

## Pendientes materiales

Aceptación de Iván y balance de combate/salas/poderes/NPC; revisión física móvil y rendimiento; recursos/sonidos finales de grietas, sonido característico NPC, exportaciones femeninas y arte de armas pendientes; selección MEN-005. Fusión jugable/ultimate/progresión permanente y servicios propios están fuera de este lote y conservan sus dependencias. El52/100 histórico no se convierte en avanceV2.

El cierre técnico de la prueba pública exige recibo de Pages y readback del flujo/recursos, todavía pendiente al redactar este informe. La aceptación humana se mantiene abierta incluso después de publicar.
