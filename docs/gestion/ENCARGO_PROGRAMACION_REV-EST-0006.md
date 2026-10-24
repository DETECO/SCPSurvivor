# Encargo de implementación — consolidación REV-EST-0006

23/10/2026 · ESTRUCTURA → PROGRAMACION.

**Autorización directa de Iván en ESTRUCTURA:** «a lo que termines de consolidar los cambios, ve al hilo "PROGRAMACION" y dile que lo implemente, yo te autorizo. :D». Autoriza enviar este encargo al hilo PROGRAMACION e implementar su alcance aprobado; no exige otra confirmación equivalente.

Proyecto: `C:/Users/DELL/.codex/.chatgpt-projects/g-p-6acf92395ad481919aad7153c0ca0e1f/SCP-SURVIVOR`.

## Leer antes de modificar

1. [PAUTA_DESARROLLO.md](../../PAUTA_DESARROLLO.md), entrada maestra actual.
2. [CONTROL_CAMBIOS 0.6 / REV-EST-0006](CONTROL_CAMBIOS.md) y [consolidación incremental](CONSOLIDACION_2026-10-23_R1.md).
3. Los cuatro lotes r1 y sus decisiones/recursos. Las [copias de las fuentes](revisiones/REV-EST-0006/MANIFIESTO.json) conservan el corte; si el área cambia después, evaluar y registrar el impacto sin sustituir silenciosamente una revisión en curso.

## Implementar por alcances comprobables

| Prioridad | Encargo | Base y límites |
| --- | --- | --- |
| 1 | Revisar y componer los cambios locales existentes de presentación | MEN-003: corrección móvil solicitada; NIV-GRI-009 r1: seis animaciones aprobadas, ya implementadas localmente. Verificar fuentes/compilado e incorporar su evidencia. MEN-004 continúa como galería local en revisión: no aprobar la ficha nueva ni convertir previews en equipamiento |
| 2 | [LOT-EST-003 r1](lotes/LOT-EST-003-r1.md) | EST-ESC-001 r1 acepta NIV-ESC-008-A r1: M01 240×160, cámara vertical 512 unidades y redistribución, con actores conservados. Esta aprobación posterior prevalece sobre A/B pendientes en la pauta del área |
| 3 | [LOT-EST-002 r1](lotes/LOT-EST-002-r1.md) | EST-ARM-001 r1 aprobado: escala por copia 1–5 + MAX, AF01/CC04/TE01, primera F24 y una fusión por expedición. Validar agarres/poses antes de habilitar parejas. Las cuatro ramas pasan a antecedente; no aprobar las otras 62 recetas |
| Independiente | [LOT-EST-001 r1](lotes/LOT-EST-001-r1.md) | Director aislado: 50/50 a 1:00/2:00/3:00/4:00 desde mapa 2, máximo dos apariciones y pesos condicionales 50/32/8/7/3. No presentarlo como encuentros/NPC completos |
| Independiente | [LOT-EST-004 r1](lotes/LOT-EST-004-r1.md) | SON-001 1.0, WAV elegido para menú, conservando volumen/silencio y evitando música doble |

Los recursos biológicos V1 y textos de compañeros quedan consolidados como entregables aprobados en sus fuentes. Se puede preparar su carga/compatibilidad visual y catálogo de textos sin alterar el arte o convertir animaciones en daño. No anunciar combate biológico completo ni NPC implementados mientras falten los parámetros, recintos, reglas de conversación/nombres o dependencias pendientes que identifica la consolidación. No inventarlos para cerrar este encargo.

## Registro, verificación y continuidad

- Revisar primero el código existente. Registrar al comenzar IDs/revisiones y estado local de partida, con atención a cambios concurrentes. Mantener originales, arquitectura y pruebas relevantes; usar agentes Luna máximo conforme a la instrucción vigente si se delega.
- El recibo publicado 0.33 no demuestra los cambios locales nuevos. [Verificación documental del corte](revisiones/REV-EST-0006/VERIFICACION.json) confirma que el bundle local es distinto del publicado histórico. Crear evidencia de la composición que se implemente.
- Corregir fallos técnicos ya encargados sin pedir una consolidación equivalente. El informe local NIV-GRI-009 declara 5 fallos de suite completa por entorno/herramientas; diagnosticar y registrar los resultados reales, sin convertirlos en aprobados por referenciar 0.33.
- Si una parte depende de arte o de una regla aún no fijada, dejarla identificada y continuar lo independiente. No introducir mochilas, extracción de fin de expedición, cuentas/economía real o reglas nuevas de gacha por completar este encargo.
- Mantener las autorizaciones existentes de publicación/servicios dentro de su alcance. Este mensaje encarga implementación; no amplía por sí mismo una autorización de publicación, facturación o servicios reales.
- Crear o mantener **docs/gestion/REGISTRO_IMPLEMENTACION.md**, como ya aceptó PROGRAMACION en su instrucción de rol, con decisiones/revisiones integradas, informe de cada lote, pruebas ejecutadas, resultado completo/parcial y limitaciones. No duplicar la propiedad de pautas de diseño.

Entrega esperada: trabajo implementado y comprobado por alcance, referencias de evidencia y pendientes concretos. ESTRUCTURA enlazará esos informes al revisar resultados. Enviar este encargo no significa que el código ya esté implementado.
