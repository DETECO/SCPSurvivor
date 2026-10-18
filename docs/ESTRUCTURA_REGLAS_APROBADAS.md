# Reglas aprobadas de ESTRUCTURA — corte de programación

18/10/2026 · Sincronización documental 0.22. Fuente: hilo **ESTRUCTURA**, ID `01a1457c-c051-73d2-9864-e7deb6435420`. Se releyó el historial accesible, incluida la aprobación de Iván en el turno `01a15142-340f-7400-8660-f8d2502ce2aa`: «Me guata tus recomendaciones. Establecelos». Responde a las recomendaciones de `01a150fe-66ad-7040-b2dd-67d4c73f3244`.

El último turno seguía en curso. Este es un corte explícito de lo confirmado, no una exportación íntegra ni una aprobación de futuras respuestas. La wiki de trabajo del hilo se conserva sin modificar desde PROGRAMACION; este documento deja una referencia estable para el repositorio.

## Recorrido que permanece vigente

Mapas de cinco minutos activos, jefe obligatorio, puerta blindada y soldados a 5:00. Desde ese momento cesan las nuevas apariciones enemigas; los vivos permanecen. Se cruza al derrotar al jefe. El primer ensayo usa contacto instantáneo, conserva vida/build/armas y reinicia el reloj del siguiente mapa. Extracción de fin de partida, accesorios físicos y mochilas quedan fuera del diseño nuevo.

## Cofres establecidos para la adaptación

| Tipo | Aparición | Recompensa y alcance |
| --- | --- | --- |
| Exploración | Cuatro oportunidades por mapa: 1:00, 2:00, 3:00 y 4:00 activos | Tickets para obtener soldados y armas mediante gacha; probabilidades y topes de la base aprobada |
| Jefe | Garantizado al derrotar al jefe del mapa | Una mejora temporal aleatoria compatible con las armas equipadas; elegibilidad, topes y caso sin candidatos todavía por precisar |
| Grieta especial | Solo al superar la anomalía difícil | Premio superior al ordinario; su tabla exacta sigue abierta |

| Mapa | Probabilidad por intento | Máximo de exploración por mapa | Tickets por cofre |
| --- | --- | --- | --- |
| 1–3 | 10 % | 1 | 1–2 |
| 4–7 | 15 % | 2 | 1–2 |
| 8 en adelante | 20 % | 3 | 1–3 |

Cada oportunidad ocurre una sola vez por mapa; pausa o menú no crean sorteos nuevos. El máximo es un límite, no una cantidad garantizada. Abrir un cofre no libera cupo. El contenido se fija al aparecer. El cofre de jefe y la recompensa de grieta son eventos distintos del cupo de exploración.

Se conservan como base las decisiones D-140–148/D-220/D-279 de [cofres](COFRES_BASE_Y_ADAPTACION_V2.md), incluida apertura y descubrimiento. Los recursos de cuenta requieren confirmación del servidor; ningún ensayo local concede tickets reales. Falta adaptar hitos antiguos por oleada y precisar el contador acumulado de diez minutos en el nuevo recorrido, incluidos remanentes/grietas. No borrar sus reglas históricas ni inventar compensaciones.

## Escala y disposición para probar

- Primer bloque: **160 × 100 casillas**, con 32 unidades por casilla. Es una escala inicial de ensayo, no tamaño final de todos los mapas.
- Reservar **seis ubicaciones alternativas** alcanzables para cofres de exploración. Se activan como máximo 1/2/3 según mapa y resultados del sorteo; no seis premios garantizados.
- Colocar puntos laterales conectados mediante circuitos amplios y rutas alternativas. Mantener libres acceso, puerta y camino principal; dejar espacio para rodear hordas.
- Reservar una zona amplia de jefe y anclajes alcanzables para puerta y cobertura aliada.
- Medir **30–45 segundos** entre extremos útiles sin combatir y desvíos de **10–15 segundos** hacia puntos opcionales. Son objetivos, no mediciones conseguidas.
- 160 × 32 / 165 = aproximadamente **31 segundos** en línea recta a velocidad base. Este cálculo no valida rutas con obstáculos, densidad, balance o rendimiento.

## Estado real y reglas todavía abiertas

La primera prueba V2-trial-01 ya implementa el recorrido local de jefe/puerta/aliados; su aceptación manual sigue pendiente. Esta sincronización **no cambia el ejecutable** ni incorpora todavía cofres de premio, mapa 160 × 100, gacha, familias nuevas o guardado V2. Las cajas `fieldCrate` actuales siguen sin botín.

Siguen abiertos el azar de mejoras/armas, las reglas de muerte y fin de partida, economía/duplicados, retorno/reloj y premios de grietas, saltos y alcance permanente. El jefe a 4:00 es provisional para el ensayo: la aprobación de recomendaciones de cofres no fija por sí sola todos esos parámetros.

Próximos bloques y aceptación: [plan de diseño jugable](PLAN_DISENO_JUGABLE_V2.md) y [plan RC](PLAN_CAMBIOS_ESTRUCTURA.md). P05 real sigue pendiente; Firebase Spark se mantiene sin facturación. El 52/100 es histórico; V2 aún no tiene porcentaje calculado.
