# Pauta de SONIDO — SCP Survivor

## Estado vigente

### SON-001 · Revisión 1.0 — Ambiente del menú inicial

- **Estado:** selección de diseño aprobada por Iván; integración y prueba dentro del juego pendientes.
- **Decisión exacta:** usar la opción 2, «Presencia en la oscuridad», como ambiente del menú inicial.
- **Fecha de aprobación:** 22/10/2026.
- **Cita de aprobación:** «eligo la opcion 2.»
- **Recurso elegido:** [`presencia-en-la-oscuridad-loop-60s-v1.wav`](../assets/audio/menu/presencia-en-la-oscuridad-loop-60s-v1.wav), composición original de 60 segundos, WAV PCM 16-bit, estéreo, 44,1 kHz, concebida para repetición continua. Contiene drones graves, tensión disonante y resonancias metálicas lejanas.
- **Alcance:** ambiente musical del menú inicial; no es voz ni sonido de diálogo del compañero.
- **Dependencias:** la integración corresponde a PROGRAMACION. El proyecto ya concentra música, efectos, fundidos, volumen y silencio en [`G.Audio`](../js/core/audio.js) y sus partituras en [`G.MUSIC`](../js/data/music.js). El menú solicita actualmente el tema sintetizado `village`; PROGRAMACION debe decidir cómo reproducir el WAV elegido en esa interfaz, mantener los controles de música/silencio y evitar que el tema anterior se superponga. El inicio del audio debe respetar el desbloqueo por gesto requerido por el navegador. Evidencia de implementación vigente: código fuente enlazado; registro del hilo PROGRAMACION `01a13aeb-020a-7d62-8256-3d42a6e61877`.
- **Consolidación en ESTRUCTURA:** no requiere cambio de reglas ni de la pauta maestra; es una selección de recurso de audio para el menú.

## Historial

### SON-001 · Revisión 0.1 — Opciones iniciales, 22/10/2026

Se presentaron dos ambientes originales: **opción 1**, «Pasillos fluorescentes», con zumbido eléctrico y ventilación; y **opción 2**, «Presencia en la oscuridad», con drones graves y resonancias metálicas. Iván eligió inequívocamente la opción 2. La opción 1 queda como alternativa no seleccionada; no es una decisión vigente.

