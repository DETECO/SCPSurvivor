# LOT-EST-005 r1 — Grietas jugables de expedición

24/10/2026 · Juanillo / ESTRUCTURA · REV-EST-0007. **Encargo autorizado; implementación y publicación por comprobar.** Amplía la integración que quedaba expresamente fuera de LOT-EST-001 r1, sin reescribir ese lote ni sus pruebas aisladas.

## Resultado exigido

En la entrada habitual de la demo, cruzar una grieta abierta debe producir una transición breve según su apariencia y trasladar al jugador a un recinto propio con la anomalía identificada, sus patrones y posibles compañeros. Debe poder resolver el encuentro, reclamar la recompensa compatible y regresar al punto de entrada del mapa de origen, que permanece congelado. Mostrar un Custodio en el mismo mapa no cumple este lote.

Iván lo encarga directamente el 24/10: «Haz que suceda todo esto. Te autorizo a ir hilo por hilo viendo que paso y ordename esto, tu seras el jefe del proyecto completo.» Esto autoriza coordinar la ejecución y comprobarla en la demo ya autorizada; no convierte en aprobados catálogos o diseños no recuperados.

## Fuentes y límites conservados

- [Grietas 2.2 / EST-GRI-001 r1](../../GRIETAS_DADO_POR_MINUTO_V2.md): 50/50, minutos activos 1–4 desde mapa 2, máximo dos apariciones acumuladas; peligrosidades condicionales 50/32/8/7/3. Sin garantía de aparición ni cambios ocultos de tier.
- [Decisiones infinito](../../DECISIONES_INFINITO_2026-10-20.md), respuestas 24–29 y 45–48: recinto separado, origen congelado, retorno tras victoria, retirada única de cinco segundos entre minutos 1–3, poderes automáticos con cinco niveles y extra, máximo tres y reemplazo pausado al cuarto.
- [Cinco perfiles biológicos](../../ANOMALIAS_GRIETAS_VERSION_2_BIOLOGICA.md), [quince ataques aprobados](../../ANOMALIAS_BIOLOGICAS_ATAQUES_ANIMACION_V1.md), [aprobación raster V1](../../ANOMALIAS_SPRITES_V1_APROBACION.md) y [entrega](../../ANOMALIAS_SPRITES_V1_ENTREGA.md). Originales bajo `design-proposals/anomalias/sprites-v1-20261023/` en el directorio padre del juego; conservar procedencia, atlas y tamaños originales.
- [Compañero aceptado](../../COMPANERO_CONTENCION_GRIETAS.md), [banco V1](../../DIALOGOS_COMPANEROS_GRIETA_V1.md) y [banco V2 aprobado](../../DIALOGOS_PERSONALIDADES_COMPANEROS_V2.md): tasas, límites de ayuda, burbujas, catorce personalidades y condiciones reales de las frases. Sin voz.
- [NIV-GRI-009 r1](../../NIVELES_APROBACION_GRIETAS_ANIMACION_009.md): seis apariencias animadas. Su índice visual es independiente del nivel D1–D5. No cambiar M01 240×160/cámara vertical512 ni los recursos aprobados de INC-VIS-001.
- Corte de fuentes: [manifiesto](../revisiones/REV-EST-0007/MANIFIESTO.json). Las entregas posteriores de las áreas se incorporan con su versión/hash, sin atribuirlas al corte previo.

## Integración por responsabilidades

| Responsable | Entrega y frontera |
|---|---|
| ESTRUCTURA / Juanillo | Reglas, dependencias, discrepancias, encargo único y seguimiento de evidencia. No duplicar catálogos completos |
| PROGRAMACION | Único integrador de runtime, pruebas, build, publicación en la misma demo y recibo comprobado |
| NIVELES | Salas transitables por anomalía, entrada/escape/retorno y adaptación de la transición; ficha de ensayo y recursos propios |
| PERSONAJES | Roster/atlas/animaciones, contratos de anclas y bancos NPC/textos; buscar evidencia de las diez identidades recordadas |
| ARMAS | Recursos visuales pendientes del ensayo y correspondencia real de armas NPC; no cambiar familias, estadísticas o fusión |
| MENUS | Lectura y controles de recinto, burbujas y selección de poderes sobre el HUD vigente. MEN-005-A/B/C no elegidas |
| SONIDO | Inventario de recursos aprobados y eventos. Sonido del compañero pendiente; no sustituirlo por locución |
| ICONO APP | Revisión consultada; sin dependencia funcional nueva para grietas |

## Contrato jugable

1. Conectar el director probado a la partida habitual. Cada oportunidad se consume una vez; solo una apertura efectiva consume cupo. Una ubicación fallida queda registrada, sin cambiar el tier o volver a tirar en ese minuto. Validar ruta transitable y evitar aparición sobre jugador, puerta o premio. Ubicación exacta es parámetro técnico de ensayo identificado, no nueva regla final.
2. Al cruzar por contacto instantáneo, conservar el estado de origen completo: geometría/semilla, reloj, director y cupo, enemigos vivos y su estado, proyectiles, objetos/premios, puerta/jefe, terminales y avisos. No simularlos mientras el jugador está dentro ni reconstruir otro mapa al volver. Conservar vida, equipo, progresión y cooldowns con su política explícita; no curar o recargar gratuitamente por transición.
3. Usar un recinto jugable distinto, con geometría, ambientación y rutas apropiadas a la anomalía elegida. Identificar en pantalla nombre y D1–D5. Reutilizar recursos aprobados; las composiciones nuevas de ensayo no se presentan como arte final aprobado. Las cinco identidades confirmadas deben ser diferentes en aspecto y comportamiento, no cinco tintes del Custodio.
4. Montar atlas 16/32, ocho direcciones y secuencias aprobadas de cada BIO. Implementar sus tres ataques con preparación, fijación de objetivo/zona, ejecución y recuperación. Saltos/carreras del enemigo tienen señales; se pueden esquivar caminando, sin exigir una habilidad o arma nueva. Efectos decorativos no causan daño adicional. Radios, tiempos y daño de la demo van en una tabla explícita de ensayo.
5. Reloj propio activo del recinto, separado del origen; pausas, elecciones, cargas y suspensión no consumen tiempo de juego. Una sola ventana de retirada de5s en un instante entre60–180s del recinto, con aviso previo y portal físicamente alcanzable. Su instante/posición concretos deben fijarse en la ficha de ensayo. Expirar esa ventana no la reabre. Retirarse, morir o expirar la entrada no concede victoria/poder/tickets. Victoria y salida de victoria no dependen de aprovechar la retirada anticipada.
6. Premio con identidad única por encuentro, cobrado solo tras victoria y elección/reclamación. Primera victoria de grieta garantiza un poder; las siguientes conservan azar y garantía tras tres victorias consecutivas sin poder. Mantener el contador durante la expedición. El porcentaje intermedio no está fijado en las fuentes: identificar el valor elegido como ensayo. No presentar tickets ficticios como moneda persistente.
7. Hasta tres poderes anómalos; una oferta contiene hasta tres compatibles y al menos una válida. Ya adquirido y mejorable: subir un rango; al máximo: otra opción compatible o apoyo táctico existente de saturación. Un cuarto poder nuevo permite rechazar o reemplazar uno con decisión pausada; retirar todos los efectos anteriores, comenzar nuevo en rango base, sin herencia o reembolso inventados. Incluir mejoras válidas de poderes adquiridos en la carta libre. Mantener5+extra propio, activación automática por intervalos y límites finitos. Catálogo/valores aún no cerrados deben figurar como perfiles de ensayo vinculados a su anomalía, sin llamar aprobados a nuevos efectos.
8. Una tirada independiente de compañero por encuentro: D1–D3 33% y arma básica Normal al azar; D4 33%, Rara/Épica50/50; D5 10%, Legendaria compatible. No reemplazar la rareza por un texto si su perfil no existe: concretar equipo de apoyo de ensayo limitado y su recurso real. Máximo un NPC temporal, arma no transferible, reserva finita, sin remate de jefe ni XP por bajas aliadas; puede incapacitarse, sin rescate obligatorio ni reroll. No llevarlo al origen o a otro recinto.
9. Burbujas con nombre/presentación y personalidad estable; usar textos aprobados y marcadores resueltos con el arma realmente equipada/observada y el escenario visible. D5 conserva miedo y deseo de irse, sin huida mecánica automática. Sin alias, usar frase completa alternativa. Sin sprite femenino entregado no atribuir al rig actual un catálogo femenino terminado. Avisos de ataque/retirada tienen prioridad; evitar repetición y tapar telegráficos. Cadencias/listas de nombres de la prueba se identifican como datos de ensayo.
10. Al retornar, colocar al jugador junto al punto de entrada válido, consumiendo definitivamente ese portal y su cupo, sin reentrada ni premio duplicado. Reanudar el origen en el mismo instante; permitir la segunda aparición si corresponde. Muerte termina la expedición sin devolver al jugador vivo al origen. Reiniciar partida limpia ambos mundos, NPC, poderes y efectos temporales.

## Catálogo aclarado y dependencias

**EST-GRI-002 r1 — aclaración posterior del24/10:** Iván responde «Mantener las cinco aprobadas; las diez eran sus variantes gráficas.» Catálogo cerrado para este lote: **BIO-01 a BIO-05, cinco identidades y dos resoluciones**. La discrepancia de cantidad queda resuelta; no se encargan cinco seres adicionales ni se mezclan propuestas previas descartadas. No usar al Custodio de práctica como sustituto silencioso.

Recursos y parámetros todavía no fijados (salas completas, fichas de poderes, magnitudes NPC/combate, instante/posición de retirada, cadencias y azar de premio intermedio) se concretan para una **fase de pruebas**, con valores versionados y balance pendiente. Esta autorización de ejecución permite construir esa prueba y corregirla; no otorga aceptación visual final ni activa cuentas, economía o servicios reales. No detener las conexiones ya aprobadas por esperar el sonido del compañero, el arte nuevo de ARMAS o toda la progresión futura.

## Criterios de entrega y cierre

- Pruebas de dominio y runtime para cuatro oportunidades, límites exactos de pesos/tasas, cap2, mapa1 excluido y no rerolls; probar con y sin NPC para cada tier sin modificar sus probabilidades naturales.
- Comprobar la transición y entrada física desde la partida habitual, identidad/catálogo correctos, geometría propia y el renderer de cada anomalía en16/32. Documentar qué pruebas fuerzan tier/NPC para QA; ofrecer accesos de práctica que lo indiquen y no alteren la partida normal.
- Comparar antes/después el snapshot del origen tras victoria y retirada: mismo reloj/entidades/premios/director, con las únicas mutaciones autorizadas. Comprobar pausas, suspensión del navegador, pérdida y reinicio; salida bloqueada no cura ni reinicia cooldowns.
- Probar victoria, retirada consumida/expirada, muerte, recompensa única, primera garantía/racha, tres poderes/duplicado/MAX/saturación/reemplazo/rechazo, dos armas y daño real de poderes. Un selector o visor sin efectos en combate no acredita poderes implementados.
- NPC: tasas por tier, equipo real compatible, munición finita, sin remate/XP ni transferencia; presentación, reconocimiento veraz, D5 y limpieza al salir. No basta con una línea genérica sin NPC en juego.
- Navegador en móvil vertical/horizontal y escritorio; capturas de cada sala, al menos dos patrones de contexto de diálogo y salida. Señales visibles y salida alcanzable al movimiento base. Sin errores JS/HTTP inesperados ni regresión INC-VIS-001, jefe/puerta o cartas.
- Build y regresiones pertinentes. Registrar por separado fallos P05 conocidos si no están relacionados; no declarar suite íntegra aprobada. Publicar en GitHub Pages autorizado y verificar flujo y recursos servidos efectivos, no solo archivos locales.
- Informe, tabla de parámetros de ensayo, validación y recibo en [REGISTRO_IMPLEMENTACION](../REGISTRO_IMPLEMENTACION.md); actualizar roadmap sin cerrar aceptación humana, balance o diez identidades sin evidencia. ESTRUCTURA enlaza el resultado y repite una comprobación independiente del flujo público.

**El cierre requiere juego navegable y evidencia. La derivación, la producción del paquete o el director aislado no cierran este lote.**
