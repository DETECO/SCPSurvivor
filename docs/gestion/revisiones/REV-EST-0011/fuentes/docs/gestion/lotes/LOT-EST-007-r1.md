# LOT-EST-007 r1 — HUD MEN-005-A para pruebas

25/10/2026 · REV-EST-0010 · **Listo documentalmente para PROGRAMACION; implementación/pruebas/publicación pendientes.**

## Decisión fijada

MEN-005-A r1, HUD anclado a las esquinas. Iván: «Apruebo la opción 1 por ahora .», mensaje `01a1730f-9ef3-7d11-abf2-81923ddf65f4`, turno `01a17305-8079-78d0-93fa-e08d181e8702` deMENUS. El turno técnico falló, pero la decisión humana fue recuperada y guardada porMENUS el25/10. No pedir elegir de nuevo A/B/C.

[PautaMENUS](../../PAUTA_MENUS.md) · [ficha de diseño](../../superpowers/specs/2026-10-24-men-005-hud-in-game-design.md) · [láminaA](../../../design-proposals/menus/propuestas-20261024/01-hud-esquinas.png). Copias de texto ySHA256delrecurso en el [corte](../revisiones/REV-EST-0010/MANIFIESTO.json). B/Cnoaceptadas. Alcance: dirección visual provisional del combate horizontal; regresión de otros formatos, sin aprobar un rediseño diferente.

## Resultado y límites

- Radar arriba a la derecha y objetivo/avisos en cápsula separada; joystick y habilidadSprint en esquinas inferiores; arma/munición/recarga al centro inferior; vida/tiempo/nivelXP legibles arriba. Campo central despejado. Mantener dos ranuras reales con estado actual y acceso al equipo/poderes ya existentes.
- Leer el código actual y reutilizar componentes/estados reales. No poner valores fijos de la imagen, nuevas estadísticas o los rótulos ilustrativos COMBATE/SUPERVIVENCIA/UTILIDAD como reglas. Conservar las ofertas compatibles y sus categorías vigentes.
- Conservar radar/cámara/física, controles, contenido oculto, pausa, elección de poder y cooldowns reales. Sprint no pasa a ser ultimate. Los avisos de peligro/retirada tienen prioridad sobre burbujas; medir sus límites con el HUD nuevo.
- Mantener MEN-003: una vista móvil, sin scroll/zoom/recortes. No introducir acciones de equipamiento desde la galería de previsualización. No ampliar catálogo/recetas o servicios.
- Trabajar sobre la revisión dePERSONAJES que se esté validando, conservando nuevos agarres/montajeLOT006. Evitar escritores simultáneos en renderer/datos de personajes; coordinar cambios de burbujas si afectan el mismo archivo. La corrección de piernas es técnica ya encargada, sin requerir otra consolidación para restablecer el diseño aprobado.

## Criterios y entrega

1. Capturas comparables con la láminaA: horizontal táctil844×390y otra relaciónancha; regresiones390×844y1280×900. Sin desbordamiento, colisión de controles, texto ocluso o interacción fuera del área visible.
2. Probar juego normal y grieta: nombreBIO/vida, mapa/recinto, retorno/retirada, radar y NPCcon burbuja. Una/dos armas, munición/recarga, habilidad en cooldown y fin de recarga reales, sin alterar daño o relojes.
3. Pausa/selección de cartas/poder/reemplazo: congelación íntegra y botones alcanzables. Verificar prioridades y tamaños táctiles. No simular categorías nuevas para acomodar la imagen.
4. Build/check, regresiones pertinentes y navegador real; guardar capturas/diff/resultado por revisión. Prueba física y aceptación del montaje se registran aparte, sin inferirlas de la aprobación de la lámina.

PROGRAMACION entrega informe con revisión deMENUS, archivos/recursos, pruebas y límites; ESTRUCTURA enlaza los resultados. Esta consolidación prepara el lote y conserva la aprobación. No implementa, publica ni afirma que el HUD nuevo ya esté en0.38.
