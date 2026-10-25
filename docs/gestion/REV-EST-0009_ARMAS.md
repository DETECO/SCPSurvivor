# REV-EST-0009 — ARMASR3 y cierre técnico de montaje

25/10/2026 · Juanillo / ESTRUCTURA · Control0.11. **Consolidado, implementado localmente y preparado para comprobación pública.**

Se revisaron ARMASR3, catálogo y aprobación ARM-FALTANTES-VIS-001/r1, junto con los tres turnos recientes de ARMAS. Aprobación humana exacta: turno `01a1730a-6376-7d00-bbe5-8c02133ba167`, mensaje `01a1730a-66c3-70f2-815b-b958e20083d4`: «Aprobado. Ahora diseñas los poderes anomalos al matar una anomalia.» El referente son los48sprites de Subfusil/smg, Escopeta/shotgun y Porra/baton entregados inmediatamente antes. Ya no se consideran propuestas visuales pendientes. Las diez opciones de poderesA/B solicitadas después siguen sin elección; no sustituyen el ensayo de poderes actual.

[LOT-EST-006r1](lotes/LOT-EST-006-r1.md) encarga el montaje técnico como continuación de INC-VIS-001. PROGRAMACION, gpt-6.1-sol/alto elegido bajo autorización de Iván, entrega [informe local y diff](entregas/PROGRAMACION-ARMAS-006.md). Juanillo lo leyó completo, inspeccionó imágenes y código, contrastó el alcance y ejecutó22regresiones del clon. No se releyeron todos los historiales ni se declara aceptación artística del usuario.

Los únicos cambios de JavaScript frente al corte5583732 son el módulo nuevo `approved-field-weapon-art.js`, el renderer compartido y su arranque enmain. Dev añade el script; derivados se regeneran. Fuera de esos tres archivos, los módulos del juego coinciden textualmente con el corte público previo. CSP, SDK y configuración de servicios conservados. PNG originales intactos, incluido AF01; registro completo de procedencia en la entrega. No se cambia identidad, combate, progresión, gacha o receta.

La calibración comprobó anclas originales y escala0,75: celda de arma42u/actor56u, igual en16/32. El montaje usa dos manos con un arma, un brazo por copia con dos armas, y retira el arma al incapacitarse. Se corrigió una mano principal duplicada y la postura masculina que mantenía arma. Porra conserva barrido continuo con rotación residual hasta22,5°, sin girar otra vez el ángulo rasterizado. Retraso404/6s permite respaldo reducido y recuperación tardía sin reinicio.

Local:279pruebas de juegoPASS,352montajes,64incapacitaciones,24estados animados,8combates,2fallos/lentitud,18combinacionesR3en sala y1respaldo. Build/check118scripts. [Validación](LOT-EST-006_VALIDACION.json). P05 no se repitió ni se declara resuelto por este lote. ESTRUCTURA mantiene un único publicador; PROGRAMACION no escribió el clon público o los maestros.

Pendientes materiales: comprobación pública del corte de montaje, aceptación visual por Iván y teléfono/Safari/rendimiento físicos. Los parámetros son de ensayo, no balance aceptado. No hay conflicto nuevo que requiera elegir otra apariencia o un poder. [Grietas y NPC publicados previamente](LOT-EST-005_PUBLICACION.json) conservan sus reglas y recibo histórico.
