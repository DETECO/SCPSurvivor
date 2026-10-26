# Consolidado de ejecución — REV-EST-0011

26/10/2026 · Juanillo / ESTRUCTURA · Control0.13. **Demo0.39 publicada y comprobada.**

Se cierra LOT-EST-007r1 con MEN-005-A: HUD en esquinas, vida/XP/tiempo reales, radar, recarga y habilidad del soldado; acciones de pausa y selección alcanzables. Se incorpora la reparación técnica de proporciones de PERSONAJES para seis humanos en 16/32, con torso y piernas a escala común y72PNG nuevos. Armas aprobadas y reglas de grietas se conservan. [Informe técnico](informes/LOT-EST-007-juanillo.md) · [entrega PROGRAMACION](entregas/PROGRAMACION-HUD-007.md) · [recibo público](LOT-EST-007_PUBLICACION.json).

Pruebas propias de Juanillo:285/285 de juego, 22 pertinentes en el clon y build/check de120 scripts. Local, clon y público: cuatro formatos de HUD,352 montajes,64 incapacitados,24 estados visuales y8 combates por corte. Público:92/92 archivos iguales;Pages built`8cdac58`,bundle `92026cde30`. Son pruebas con fixtures declarados; no equivalen a balance natural, aceptación del montaje nuevo ni teléfono físico. P05 y sus cinco fallos conocidos de workerd quedan fuera del lote, con servicios reales desactivados.

## Cobertura real

- PROGRAMACION: entregaHUD completa, diff, fuentes, doce evidencias y confirmación de congelación/integridad. Se comprobó el resultado independientemente.
- PERSONAJES: solicitud humana de piernas, turno reanudado en curso, exportador, catálogo, doce fuentes originales y montaje de los seis humanos. La entrega formal de área seguía en curso al tomar el corte; Juanillo conserva y acredita su propia verificación, sin atribuir una entrega terminada inexistente.
- MENUS: dependencia MEN-005-A y aprobación conservadas desdeREV0010, ficha/lámina y pauta cotejadas con la entrega. No se reabre la elecciónA/B/C.
- ARMAS/NIVELES/SONIDO/ICONO: sin auditoría nueva de historiales; se remite a la [coberturaREV0010](REV-EST-0010_CONSOLIDADO.md) y a los recibos vigentes. El visor privado de poderes no se copia ni se toma como elección.

[Fuentes citadas conservadas](revisiones/REV-EST-0011/MANIFIESTO.json) · [corte exacto de código/recursos](revisiones/REV-EST-0011/CORTE_RUNTIME.json). El control0.12 y la pauta anterior permanecen en el corte; no se reescribe su estado histórico «en curso».

## Pendientes y siguiente lote

La reparación técnica y elHUD ya pueden probarse en la demo. Sigue pendiente la aceptación visual de Iván y una prueba física en móvil. No existe una decisión nueva que bloquee este cierre.

El siguiente trabajo es [LOT-EST-002r1](lotes/LOT-EST-002-r1.md): repetir384poses con el rig corregido, comprobar ataques CC04/TE01/F24 y después integrar estación, confirmación, fusión única y reposición. El gate permanece cerrado hasta tener esas pruebas; no se da por implementada la fusión por existir el overlay. Ultimates, progresión permanente por soldado, gachas/guardado reales y elección de poderesA/B conservan sus pendientes. El 52/100 histórico no mide el avance V2.
