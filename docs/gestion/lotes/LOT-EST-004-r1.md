# LOT-EST-004 r1 — Ambiente de menú SON-001

23/10/2026 · ESTRUCTURA · **Selección aprobada, lista documentalmente para integración y prueba. Sin código ni publicación por esta consolidación.**

## Fuente y recurso fijados

- **SON-001 revisión 1.0**, [pauta de SONIDO](../../PAUTA_SONIDO.md). Iván, 22/10/2026: «eligo la opcion 2.».
- Elegido: **Presencia en la oscuridad**, [WAV original de 60 segundos](../../../assets/audio/menu/presencia-en-la-oscuridad-loop-60s-v1.wav), PCM 16-bit, estéreo, 44,1 kHz según la ficha. Conservar el original.
- SHA-256 observado del WAV: `9ce7902dd22fede902fac5f9b7ea78139076b1d9f50303588431ede5cbe86d24`. Cabecera comprobada; no se reprodujo ni se probó el bucle dentro del juego durante esta consolidación.
- Revisión conservada en [corte REV-EST-0006](../revisiones/REV-EST-0006/docs/PAUTA_SONIDO.md), con [manifiesto](../revisiones/REV-EST-0006/MANIFIESTO.json). Esta elección ya estaba registrada; consolidarla no constituye otra aprobación.

## Alcance

Reproducir el ambiente elegido en el menú inicial mediante el sistema existente [G.Audio](../../../js/core/audio.js). PROGRAMACION resuelve carga, repetición, fundidos y transición conservando controles de volumen/silencio y política de inicio de audio del proyecto. Evitar superposición con el tema sintetizado anterior del menú o con otra instancia del WAV.

No sustituye efectos de combate ni define el sonido de las burbujas del compañero. No incorpora locución de frases ni convierte en elegida la opción 1 de SONIDO.

## Dependencias y pruebas

1. Recurso accesible y fiel al WAV aprobado; comprobar reproducción/repetición sin saltos notorios y sin instancias acumuladas al volver al menú.
2. Volumen, silencio y reactivación por interacción del usuario conservados; no forzar sonido si el navegador o las preferencias lo bloquean.
3. Inicio de partida, pausa y regreso al menú con transición correcta, sin música doble ni reproducción residual fuera de su contexto.
4. Validación en formatos de móvil y PC; distinguir simulación de prueba en dispositivo físico. Registrar tamaño/carga y cualquier limitación observada.

Informe y evidencia a cargo de PROGRAMACION; enlazarlo en CONTROL_CAMBIOS. El informe 0.33 no demuestra esta integración. La corrección MEN-003 puede verificarse en paralelo; la galería MEN-004 pendiente de revisión no recibe aprobación por este lote.
