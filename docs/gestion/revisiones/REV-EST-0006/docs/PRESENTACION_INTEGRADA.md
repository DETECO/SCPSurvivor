# Presentación integrada — R7 / menús / gráficos

23/10/2026 · Versión de presentación0.33 · Desarrollo de Iván Vivanco.

## Jugar

[Abrir juego](https://deteco.github.io/SCPSurvivor/?prueba=combate-v2). El menú permite iniciar, elegir Guardia/Médico, equipar una de las cuatro armas actuales y cambiar Gráficos entre16×16 y32×32. El ajuste se conserva en este navegador y recarga la demo. Las selecciones temporales de soldado/arma se reinician al recargar; no se anuncia guardado de partida.

Prácticas visibles reducidas a **Jefe rápido** y **Grieta dimensional**. Los enlaces históricos siguen disponibles para regresión mediante URL, con `interfaz=clasica` cuando se necesita su panel anterior. No se muestran todos en el menú principal.

## Qué se implementa

- Escenario inicial **M01 R7 Backrooms modular2.5D**,480×320 casillas de32unidades. Sustituye R5 como referencia vigente. Plantilla inicial reproducible, con seis familias espaciales, doce recintos atravesables, plazas, tabiques de laberinto amplio, servicios y arena. Se conservan anclajes y seis candidatos de cofre del contrato R7. Es una construcción jugable derivada de la distribución; la lámina no proporciona una cuadrícula de colisión exacta ni es un atlas.
- Suelo y paredes con materiales pixel art derivados del R7, caras verticales, sombras, luminarias y transparencia de paredes próximas que podrían ocultar al jugador. Se conserva la cámara, la física y la escala de actores. Profundidad simulada en Canvas2D; no hay motor3D ni plataformas con alturas jugables.
- Personajes aprobados16/32, incluidos los apoyos amarillos. El selector cambia los actores y el muestreo del material de suelo; mantiene el mismo tamaño de mundo, colisiones y estadísticas. El icono original3 con SCP se aplica al favicon, acceso de app y marca del menú.
- Menú inicial y selección de personaje/arma adaptados a PC, móvil vertical y móvil horizontal. Botones reales conectados al editor de equipo e inicio existentes; no se usan capturas como controles ficticios. Sala industrial como fondo, paneles verde oscuro y acciones ámbar según MENUS.
- Seis apariencias de grieta aplicadas al encuentro B3 de práctica: cicatriz carmesí, pliegue amarillo, fractura prismática, fisura orgánica, horizonte negro e interferencia espectral. Render propio a partir de los conceptos; las ilustraciones con fondo no se presentan como sprites recortados. La apariencia se elige de forma determinista y no define la peligrosidad. Se conservan entrada por contacto,45s de ventana, localizador, alerta y sonido existentes.

## Reglas y límites

Se conservan jefe de ensayo4:00, puerta/apoyos5:00, límite existente de enemigos, pausa de cartas/terminal, XP y premio antes de avanzar, y vida/equipo conservados al cambiar de escenario. El segundo escenario sigue usando la plantilla anterior: esta entrega aplica R7 como **inicial**, no anuncia un catálogo procedural completo.

La práctica de grieta B3 sigue siendo un encuentro dentro del mapa; no acredita el recinto separado con origen congelado. El nuevo dado, los cinco peligros y el compañero de grieta no se habilitan por aplicar estilos gráficos. Consultar [sincronización ESTRUCTURA](ESTRUCTURA_SYNC_2026-10-23.md). Cuentas, persistencia, economía real y facturación continúan desactivadas.

La aprobación de los diseños no sustituye la aceptación manual de esta integración ni pruebas en teléfono físico. Los resultados ejecutados y la publicación se registran por separado en `PRESENTACION_VALIDACION.json` y `PRESENTACION_PUBLICACION.json` cuando estén comprobados.

## Fuentes y continuidad

NIVELES:01a1457a-3dba-75b3-badf-018086fb9bda; contrato y aceptación en [recursos R7](../assets/scenarios/m01-r7/CONTRATO_MODULAR_R7.json). PERSONAJES:01a160be-4bf0-7883-b313-604e7ce76652, [aprobación](PERSONAJES_APROBACION_2026-10-22.md). MENUS:01a16600-8b86-7a31-839f-1e84ba543bb3; menú inicial y seis pantallas aceptados para pruebas el22/10. ICONO APP:01a1468c-b1ec-7371-a2c0-70ef7b30af7b, diseño3 con SCP. Originales en design-proposals, fuentes Cloud y sources conservados sin edición.

Motor heredado de PokeSurvivor conservado: World/Path, actores, proyectiles, efectos y arranque se reutilizan. Cambios acotados de adaptación; no se reconstruye el juego. Las imágenes nuevas de materiales/fondo se guardan aparte de los diseños aprobados. El manifiesto de app no promete instalación garantizada ni funcionamiento offline.

## Verificación de esta entrega

Compilación y coherencia del roadmap comprobadas en ambas copias. Node:235 pruebas; fuente234 aprobadas/1 omitida y publicación233 aprobadas/2 omitidas, cero fallos. Las omisiones corresponden a emuladores/dependencias de servidor no activos. En navegador:40 escenarios por copia, incluyendo12 combinaciones de menú/gráficos,4 flujos de grieta/transición y regresiones de combate, infinito, B3 y sprites. Las transiciones y vencimientos usan relojes/daño controlados para QA; no certifican balance, rendimiento ni teléfonos físicos. Los diseños originales y configuraciones de servidor se verifican por hashes.

Publicación comprobada: seis escenarios de menú públicos (tres formatos ×16/32), dos flujos de grieta/transición y77 archivos públicos coincidentes por SHA256, incluidos los68 PNG originales de personajes. Recibo: [PRESENTACION_PUBLICACION.json](PRESENTACION_PUBLICACION.json). La aceptación manual de esta integración sigue pendiente; las aprobaciones previas corresponden a los diseños.

Durante la comprobación pública hubo descargas gráficas lentas y dos esperas de carga completa agotadas. El menú ya estaba disponible; se ajustó el arnés para esperar los controles reales y luego ambos flujos públicos pasaron. La primera carga necesita conexión y no tiene una garantía de tiempo. No se modificó la lógica del juego por ese ajuste.
