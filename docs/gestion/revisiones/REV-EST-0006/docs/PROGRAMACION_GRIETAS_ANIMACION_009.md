# Evidencia de implementación — NIV-GRI-009 r1

23/10/2026 · Ejecución local del encargo de animación de Iván. No publicada.

**Aceptación visual posterior:** Iván aprobó NIV-GRI-009 r1 el 23/10/2026 con «apruebo.». [Registro de NIVELES](NIVELES_APROBACION_GRIETAS_ANIMACION_009.md). Esta aceptación no cambia los resultados ni límites técnicos descritos debajo.

## Entrega comprobada

Se animan los seis diseños existentes en [rift-visuals.js](../js/ui/rift-visuals.js): chispas carmesí, papel móvil, cristales suspendidos con cara sombreada, fibras ondulantes, órbitas de horizonte negro y bandas espectrales desplazándose. Se conservan las siluetas y los PNG originales.

El suelo se dibuja antes de los actores. El cuerpo vertical se ordena por su base junto a personajes, enemigos y paredes en [game.js](../js/game.js), mediante el drawable de [dimensional-rifts.js](../js/systems/dimensional-rifts.js) y el paso de suelo de [expedition.js](../js/systems/expedition.js). Las motas tienen plano elíptico y altura proyectada, con capas trasera/delantera; no representan colisiones nuevas.

La animación usa el reloj activo de la partida. Pausa, cartas y terminal conservan el mismo cuadro. El ajuste existente de menos destellos reduce velocidad, desplazamiento y partículas (8 frente a 20). Los efectos no usan el azar de encuentros ni acumulan partículas entre cuadros.

## Verificación

- **21/21 pruebas dirigidas aprobadas:** renderer de grietas, contacto, caducidad y jefe dimensional. Las nuevas pruebas se ejecutaron primero contra el código anterior y fallaron por ausencia de movimiento, reloj activo y separación de capas; luego pasaron.
- **4/4 escenarios de navegador aprobados:** fuentes dev.html y compilado index.html, gráficos 16 y 32, pantalla móvil emulada de 390 × 844. Verifican cambio de cuadros, cuadro congelado al pausar, estado de grieta sin mutación y entrada por contacto. [Recibo](../tests/artifacts/rift-animation-009/results.json).
- **Juego compilado y comprobado:** node tools/build.js --local y node tools/build.js --local --check terminaron con código 0; 102 scripts. Se reutilizó el SDK ya presente.
- **Suite completa: 249 pruebas, 243 aprobadas, 5 fallidas y 1 omitida.** Las cinco fallidas son pruebas P05 SQLite/Miniflare: esbuild no puede leer un directorio antecesor por «Acceso denegado» ni resolver worker/accounts-object.mjs. La compilación general npm run build también falla en el paso de Firebase por la misma restricción de acceso. No se corrigieron herramientas ni backend ajenos al encargo. [Salida completa](../tests/artifacts/rift-animation-009/unit-tests.txt).
- Inspección visual de la comparativa y de una captura del juego compilado. [Vista animada](../tests/artifacts/rift-animation-009/grietas-animadas-009.gif) · [Captura en juego](../tests/artifacts/rift-animation-009/index-32-contact.png).

Las capturas de contacto usan posición controlada, invulnerabilidad y cámara centrada para QA. La comparativa amplía el renderer real para inspeccionar los seis estilos; no cambia su escala dentro del juego. El GIF es una muestra de tres segundos, no un atlas de animación. No se certifica teléfono físico, rendimiento con hordas ni aceptación visual de Iván.

## Alcance y continuidad

La animación está conectada a las grietas de la práctica existente. No habilita el dado nuevo, los cinco peligros mecánicos, compañeros, recinto separado ni premios adicionales. No cambia la escala del mapa o del personaje. NIV-ESC-008 sigue pendiente de elección.

[Diseño y encargo](NIVELES_GRIETAS_ANIMACION_009.md) · [Pauta NIVELES](PAUTA_CREACION_ESCENARIOS.md) · [Diff de fuentes](historial-niveles/grietas-animacion-20261023-162610/CAMBIOS_FUENTES.diff).

Pendiente: teléfono físico y eventual publicación a cargo de PROGRAMACION. La revisión visual de Iván se aceptó en el registro posterior enlazado arriba. ESTRUCTURA debe consolidar esa aprobación sin inferir cambios mecánicos. No se enviaron mensajes a otros hilos.
