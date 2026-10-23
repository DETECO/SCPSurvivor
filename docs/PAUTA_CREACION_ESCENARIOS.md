# Pauta de creación de escenarios — SCP Survivor
Versión R7 · 22/10/2026 · Backrooms 2.5D, variedad espacial y futura generación procedural.

## Autoridad y estado
Iván pidió un escenario Backrooms que se llene de monstruos, con profundidad 2.5D, un poco de difuminado, espacios abiertos y delimitados, módulos y laberinto amplio. Solicitó ampliar y rediseñar la distribución, evitando que todo parezca copiado. Estas instrucciones posteriores sustituyen el plano repetitivo de 24 recintos como objetivo de esta nueva propuesta.

Iván validó R7 como escenario inicial el 22/10/2026: «ME GUSTO ESTE ESCENARIO. LO VALIDO.». El diseño mide **480 × 320 casillas** y pasa a ser la referencia vigente. R5 se conserva como antecedente en su registro. La geometría de colisión, el generador, la integración y las pruebas jugables siguen pendientes.

Se consultó ESTRUCTURA el 22/10/2026 hasta el turno 01a15a34-93e9-7a11-9597-6a2c37fb2570 del hilo 01a1457c-c051-73d2-9864-e7deb6435420. Las reglas aceptadas se conservan según DECISIONES_INFINITO_2026-10-20.md, ESTRUCTURA_REGLAS_APROBADAS.md y PRUEBA_T1BC.md. La revisión local 0.32 de personajes no acredita una nueva geometría de escenarios.

Las láminas son conceptos de composición, ambiente y ocupación. No son atlas de tiles, planos métricos ni evidencia de un generador ya implementado.

## 1. Contrato jugable que debe acompañar a cada escenario
- Recorrido infinito: base → escenario → jefe superado y puerta disponible → siguiente escenario.
- Cada mapa cuenta cinco minutos de tiempo activo. Pausa, cartas y terminales detienen sus relojes.
- Jefe a 4:00 como parámetro aceptado de ensayo; no se universaliza como horario definitivo de todo el catálogo.
- A 5:00 aparece la puerta blindada con dos aliados y cesan nuevas apariciones enemigas, incluidos refuerzos del jefe.
- Los enemigos que ya viven permanecen. La puerta requiere jefe superado; vencerlo antes no permite omitir la espera hasta 5:00.
- Si los dos aliados ven al jefe vivo, uno huye por la puerta y uno permanece como apoyo limitado. No pueden resolver el jefe por el jugador; sus bajas no entregan XP temporal.
- Desde 5:00 se congelan regeneración y cooldowns de habilidades según la regla aceptada; ataques y recargas siguen funcionando y los efectos activos expiran normalmente.
- Antes del cruce se resuelven XP, elecciones y premio del jefe una sola vez. Cruzar conserva vida/configuración de la expedición y reinicia el reloj del mapa siguiente.
- La puerta es avance de escenario; no una extracción que termina la expedición.
- Mochilas y accesorios físicos de arma quedan fuera del recorrido nuevo.

## 2. Escala, diversidad y movimiento
Propuesta R7: **480 × 320 casillas**, 32 unidades por casilla. Superficie de 153.600 casillas, 2,4 veces R5. Actores y objetos conservan su escala de mundo. La nueva inclinación visual y el difuminado no cambian colisiones, radios o velocidad por sí mismos.

Combinar seis familias en una distribución irregular:
- Plaza abierta con pilares espaciados y varias conexiones.
- Recintos delimitados de tamaños diferentes, con dos salidas como mínimo y tres preferidas.
- Grupo modular poroso, con piezas de diferentes medidas y orientaciones.
- Laberinto amplio, con tabiques escalonados, cortes transversales y pequeños patios.
- Servicios/talleres con galería y recorrido exterior.
- Arena abierta con centro despejado, varios accesos y llegada a puerta rodeable.

Las familias se repiten con variantes y giros compatibles; no se acepta llenar el escenario con una cuadrícula de copias idénticas. Abierto no significa vacío: usar pilares, pantallas y mobiliario de borde para dar referencias sin consumir el centro de maniobra.

Medidas nominales propuestas:
- Enlaces principales y pasos del laberinto: 20–28 casillas.
- Aberturas de recintos: 12–16 casillas.
- Dos o más áreas amplias, incluida la arena del jefe.
- Al menos dos salidas separadas por recinto transitable; las más delimitadas prefieren tres.
- Circuito exterior y cruces internos que permitan volver a otra zona sin retroceder por el mismo acceso.

“Cerrado” significa delimitado por paredes con varias entradas; no significa introducir bloqueos temporales o habitaciones obligatorias de una sola puerta. El mobiliario se coloca después de reservar recorridos. Ninguna decoración, cofre o equipo puede anular una salida.

La puerta y el jefe deben quedar alcanzables dentro del ritmo de cinco minutos. Al crecer la superficie, se deben medir las distancias reales y los tiempos de aproximación; no se heredan las cifras de R5.

El grafo conceptual R7 tiene ocho nodos y trece enlaces, un componente conectado y ninguna zona o enlace individual indispensable para conectar el resto. Este resultado corresponde solo al grafo entre zonas. Las anchuras, puertas y colisiones físicas todavía requieren construir y comprobar la geometría.

## 3. Cofres y puntos de interés
Reservar seis candidatos de exploración, todos accesibles. Son ubicaciones alternativas, no seis cofres garantizados.

| Profundidad | Intentos activos | Probabilidad por intento | Máximo de exploración |
|---|---|---|---|
| Mapas 1–3 | 1:00, 2:00, 3:00 y 4:00 | 10 % | 1 |
| Mapas 4–7 | Los mismos cuatro momentos | 15 % | 2 |
| Mapas 8+ | Los mismos cuatro momentos | 20 % | 3 |

Los topes no garantizan una aparición. Abrir no libera cupo y el contenido queda fijado al aparecer. Cofre de jefe y recompensa de grieta se tratan por separado. Los tickets del ensayo son ficticios.

Conservar apertura de exploración durante 3,5 segundos en proximidad, distancia máxima de 50 unidades y línea libre; pausa o cartas detienen el proceso. El radar no revela cofres desconocidos: las marcas del concepto no sustituyen el descubrimiento de juego.

El terminal de sustitución de armas es opcional y está próximo al inicio en T1BC; su posición real la selecciona el algoritmo entre puntos válidos. Abrirlo pausa el ensayo. No implica tienda, gacha o fusión permanente.

## 4. Grietas, fusión y ampliaciones
- Grieta especial: desde el mapa 2, entre 1:30 y 3:00 como parámetro de ensayo, entrada opcional y ventana de 45 segundos activos. Entrada por contacto.
- Recinto separado, origen congelado y retorno tras reclamar victoria: decisiones aceptadas, todavía pendientes de su implementación completa según el corte actual.
- Escape anticipado: una única ventana de cinco segundos entre 1:00 y 3:00 del recinto. Su instante, ubicación y aviso requieren concretar la ficha.
- En el mapa 1 de esta propuesta no se dibuja una grieta activa ni se exige jugar ese bloque para validar el escenario.
- La sala de fusión dentro de algunos escenarios está aceptada. Su frecuencia, recetas, herencia y límite de operaciones siguen abiertos; esta pauta no la añade obligatoriamente al mapa 1.
- Saltos dimensionales no deben borrar la obligación del jefe ni conceder premios por mapas omitidos. No forman parte de esta primera prueba espacial.

## 5. Dirección artística y legibilidad
- **Pixel art 2.5D**, con proyección ortográfica ligeramente inclinada: paredes bajas con caras frontales, grosor, volumen en objetos y sombras suaves.
- Backrooms amarillo: alfombra gastada/húmeda, papel mural repetitivo, zócalos envejecidos y fluorescentes.
- Difuminado leve en iluminación, sombras y decoración lejana. Mantener legibles actores, suelo cercano, accesos y límites sólidos.
- Preservar contraste de los monstruos y la lectura de movimientos/ataques sobre el suelo. La luz amarilla no debe fundir sus siluetas con el entorno.
- Evitar que paredes altas o capas de luz oculten una ruta o un grupo entero de enemigos; comprobar la oclusión durante la integración.
- Distinguir zonas con geometría, desgaste, disposición de luces y equipos, manteniendo un ambiente coherente.
- Usar como referencia los actores existentes del proyecto; las multitudes de las láminas no aprueban diseños nuevos ni sustituyen sus PNG.
- Mantener separadas colisión de suelo, altura visual, decoración y elementos interactivos. La ilustración no define la física.

## 6. Contrato de futura generación procedural
La dirección procedural está aceptada; la composición R7 y su catálogo todavía son una propuesta, sin implementación nueva del generador.

Orden de construcción:
1. Crear un grafo de sectores con circuito exterior y conexiones alternativas. La referencia R7 usa seis familias; la propuesta futura permite seis a nueve áreas, conservando las familias necesarias.
2. Asignar tamaño y tipo a cada sector. Reservar al menos dos áreas de maniobra y la arena.
3. Seleccionar piezas compatibles por ancho y posición de sus accesos. Variar silueta, dimensiones y orientación; no solo el color de las paredes.
4. Conectar primero las rutas amplias; colocar después paredes y tabiques, manteniendo dos caminos independientes entre sectores principales.
5. Añadir objetos fuera de accesos, esquinas de giro y reservas. Cada habitación transitable debe mantener dos salidas.
6. Colocar inicio, terminal opcional próximo, jefe, llegada y seis candidatos de cofre en puntos accesibles.
7. Construir la navegación con radios reales de jugador y enemigos; comprobar puertas, anchuras, giros, rutas alternativas y accesos aliados.
8. Probar ocupación progresiva de monstruos y medir atascos, desplazamientos, oclusión, legibilidad y rendimiento.
9. Guardar semilla y versión del catálogo. Rechazar composiciones inválidas y usar una plantilla de respaldo validada de la misma versión.

No afirmar que un plano se ha generado proceduralmente porque ilustre módulos. El grafo conectado no sustituye las pruebas de la geometría resultante.

## 7. Entrega y evidencia
- Plano general del escenario, con variedad espacial y escala propuesta.
- Vista de ocupación ilustrativa con monstruos, diferenciada de una partida ejecutada.
- Familias de módulos y sus conexiones para construir posteriormente el generador.
- Guía de zonas, reglas de circulación, paleta y fuentes.
- Contrato de datos y comprobaciones claramente separadas: grafo, geometría, partida y aceptación visual.
- Reglas vigentes de jefe, puerta, aliados y premios, sin reintroducir extracción final.

La cantidad de figuras dibujadas no determina capacidad, balance ni límite de enemigos. La vía de escape disponible cambia con su ocupación; el diseño ofrece alternativas geométricas, y la densidad/IA/velocidad se deben ajustar mediante pruebas.

## 8. Aplicación actual
M01 R7 — Backrooms modular 2.5D. Entrega en design-proposals/escenarios/mapa01-r7-modular-backrooms-25d-20261022. El plano mezcla plazas, recintos, grupos modulares, laberinto amplio y servicios, con una arena abierta.

Estado: diseño visual y distribución validados por Iván como escenario inicial. El juego y su generador no se han modificado en esta tarea. R5 y su aprobación se conservan; los estudios intermedios R6 no gobiernan el nuevo trazado.
