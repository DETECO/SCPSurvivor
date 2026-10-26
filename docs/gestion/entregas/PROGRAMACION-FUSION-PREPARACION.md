# PROGRAMACION — continuidad y preparación de primera fusión

25/10/2026. **Avance técnico aislado, sin integración jugable ni publicación.** Iván autoriza cierre de LOT006 y continuidad: «Aprueba. Y continua». [Constancia limitada al referente](PROGRAMACION-ARMAS-006_APROBACION_2026-10-25.md). No interpreta esa frase como elección de los poderesA/B.

## Fuentes y alcance

Se revisaron CONTROL0.11/REV-EST-0009, LOT-EST-002r1 y EST-ARM-001r1, el dominio `weapon-revision-r1.js`, bridgeAF01, visor anterior, catálogo original y renderer modular actual. CC04/TE01/F24 están aceptados visualmente; sus reglas de ensayo y primera receta ya existen. Se comprobaron48PNG originales (tres modelos×ocho vistas×dos tamaños), dimensiones ySHA256 en [auditoría de continuidad](PROGRAMACION-CONTINUIDAD-2026-10-25.json). No se asignan otros modelos alNPC ni se cambian reglas.

Punto detectado: las ultimates aún requieren resolver su relación con la habilidad del soldado y condiciones de uso en grietas. Sus números/capacidades no se inventan. Las alternativas nuevas de poderesA/B tampoco tienen elección. La primera fusión tiene contrato numérico aprobado; el siguiente trabajo independiente es su montaje/animación antes del bridge jugable.

## Trabajo realizado

Se preparó un overlay local en `migration-audit/fusion-montaje-local/`, reutilizando el proyecto existente como fuente de lectura. Contiene dos adaptaciones experimentales del renderer/cargador y una entrada dev; no es un juego reconstruido ni una nueva versión publicada. No se modificaron archivos runtime de SCP-SURVIVOR ni del clon público.

El ensayo reutiliza el renderer modular y los sprites originales. Añade solo al overlay los IDsCC04/TE01/F24, escala de arma0,75 frente al cuerpo (42u/56u), agarre/apoyo/salida del catálogo y rotación residual. Guardia y Médico se prueban con cada modelo solo y con CC04+TE01, un brazo por copia. Las muestras visuales del corte usan−70°/0°/+70° del arco140° aprobado; el destello del emisor es una muestra visual, no prueba de la emisión real0,12s o su intervalo. Los componentes del juego y sus relojes no se cambian.

## Resultado real

- **384montajesPASS:** dos actores×dos resoluciones×ocho direcciones×cuatro disposiciones×tres fases visuales. Se comprobó correspondencia delPNG y dirección, dos brazos/dos manos y una imagen por copia, sin mutar el equipo real.
- Se midió alcance de brazos: máximo0,513veces la celda del personaje. Es una medida del ensayo; no establece una capacidad ni regla nueva.
- **Gate comprobado en mapa2:** estación visible pero no operativa, `pose_validation_pending`. No se introdujo evidencia sintética como validación del juego ni se abrió la fusión. [Resultado](PROGRAMACION-FUSION-PREPARACION/gate.json).
- Los nueve archivos fuente/recurso fijados en el baseline siguen coincidiendo porSHA256. LosPNG no se editaron.
- Inspección visual de las láminas Guardia16 (contacto) y Médico32 (contacto/recuperación); se identifican las dos copias y sus agarres. Sin prueba física, cadencia, contacto, daño, sala o recompensa funcional.

[Datos completos](PROGRAMACION-FUSION-PREPARACION/poses.json) · [Baseline](PROGRAMACION-FUSION-PREPARACION/BASELINE.json) · [Diff experimental sin instrumentación](PROGRAMACION-FUSION-PREPARACION/RENDERER_PROPUESTO.diff). Capturas: [Guardia16 preparación](PROGRAMACION-FUSION-PREPARACION/guardia-16-fase0.png), [Guardia16 contacto](PROGRAMACION-FUSION-PREPARACION/guardia-16-fase1.png), [Guardia32 recuperación](PROGRAMACION-FUSION-PREPARACION/guardia-32-fase2.png), [Médico32 contacto](PROGRAMACION-FUSION-PREPARACION/medico-32-fase1.png). Las12láminas originales y el programa de prueba se conservan en el overlay.

## Continuación concreta para coordinación

1. Revisar con el rig si el apoyo secundarioA puede omitirse al empuñar CC04 yTE01 a una mano por copia; esta prueba geométrica no decide por sí sola esa dependencia. Las poses experimentales no se convierten en aprobadas por los384checks.
2. Tras cumplir esa dependencia, integrar los modelos y ataques al bridge de ensayo con la escala1–5–MAX, conservando trayectorias/obstáculos reales y bonos una vez.
3. Integrar estación alcanzable desde mapa2, vista previa/confirmación pausada, cancelación sin consumo, transacción única, F24FINAL y reposición del hueco según LOT002. Probar el recorrido completo antes de abrir el gate o publicar.

**Coordinación enviada a ESTRUCTURA.** Se preserva su cierre público LOT006 y las fuentes maestras; no se editaron control/roadmap/registro/recibos ni se hicieron commits/push. Este informe aporta el avance y sus límites para la siguiente integración, no acredita una fusión jugable. No se reactivaron agentes ni se repitióP05.
