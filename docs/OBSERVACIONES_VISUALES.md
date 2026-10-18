# Observaciones visuales — pendientes de P09

**Estructura 0.22:** distinguir visualmente cofre de exploración, premio de jefe y premio de grieta; no presentar las cajas decorativas como cofres funcionales. Diseñar puntos laterales sin tapar el paso, zona de jefe/puerta y lecturas de descubrimiento/apertura. La escala 160 × 100 es de prueba. Estos requisitos usan [las reglas aprobadas](ESTRUCTURA_REGLAS_APROBADAS.md); no sustituyen arte aprobado ni acreditan su acabado.

**Prototipo V2-trial-01:** puerta y soldados reutilizan sprites existentes y dibujo temporal; llamada visible y tono sintetizado, sin voz final grabada. Se ordenan aliados/props/jugador por profundidad. Revisar en P09 escala, silueta, legibilidad, llegada, efectos y voz; la prueba actual no aprueba arte definitivo.

**V2-ESTRUCTURA · 18/10/2026.** Mantener estas observaciones compatibles. Añadir al diseño visual/audio la puerta blindada y brecha de transición a5:00, llegada y llamada de los soldados, cobertura aliada, aviso de jefe pendiente y diferenciación de puerta normal/grieta opcional/salto dimensional. No denominar extracción de fin de partida a la transición. Retirar de la futura interfaz mochilas y ranuras de accesorios; conservar crédito y marcadores de daño pendientes. Arte existente intacto. [Pauta vigente](../PAUTA_DESARROLLO.md).

Registradas el15/10/2026 a partir de la prueba de Iván. No son un rediseño aprobado ni cambian los pesos, criterios o avance del roadmap.

## Marcadores de daño

La captura de una partida muestra cifras con precisión de coma flotante sin formatear, por ejemplo7.200000000000001. Es un defecto de presentación: corregir el formato mostrado conservando el daño interno y las fórmulas de combate. No requiere modificar balance ni esperar a aprobar el arte final.

Iván considera los marcadores actuales simples y desproporcionados. En P09 definir tamaño relativo al personaje, tipografía, borde/contraste, colores, duración, animación y agrupación de impactos. Probar legibilidad sin tapar enemigos/avisos; diferenciar tipos de daño solo conforme al diseño aprobado. No considerar aprobado el aspecto del prototipo.

## Grietas dimensionales — requisito para P09

Añadido el16/10/2026 por petición de Iván. Al aparecer una grieta debe emitirse **una alerta sonora y un aviso visible en pantalla**. Este requisito se conserva para el acabado P09; su incorporación provisional no acredita audio ni diseño final aprobados.

La grieta debe existir físicamente en un punto alcanzable del escenario, permanecer abierta durante un tiempo limitado y cerrarse si no se utiliza. El jugador debe poder localizarla: marcador en el mundo e indicador en el HUD con dirección, distancia y tiempo restante. El indicador debe seguir siendo útil cuando la grieta quede fuera de la pantalla y no debe tapar los controles, enemigos o avisos de ataque.

Por instrucción posterior de Iván, **tocar o cruzar la grieta activa inicia la entrada al instante**, sin botón, tecla, confirmación ni espera. Estar cerca sin contacto no debe entrar; un contacto solo inicia un encuentro. La señal visual debe permitir reconocer el área de contacto para entrar deliberadamente o evitarla. El aviso de llegada del jefe de1,5 s prepara su aparición/ataque y no se presenta como espera para entrar.

Para la prueba local se utilizan efectos, sonido, colores y el sprite existente del Custodio como recursos provisionales. En P09 revisar silueta y lectura del portal, contraste, escala respecto al personaje, animación de apertura/cierre, señal del jefe dimensional y avisos de ataque. La información no puede depender solo del color o del sonido. No generar ni sustituir arte aprobado por esta prueba.

La ubicación, los 45 s de apertura, la aparición del25 % y los multiplicadores de combate son parámetros del prototipo; no son valores de balance final ni amplían el catálogo aprobado. El recorrido de prueba y la aceptación manual pendiente se registran en [PRUEBA_GRIETAS.md](PRUEBA_GRIETAS.md).

## Alcance del acabado

P09 reúne interfaz, arte, audio y experiencia móvil final: personajes/criaturas, sprites y animaciones, aspecto de mapas/escenarios, HUD, barras, controles, colores y efectos. La identidad prevista negro/blanco/rojo y las referencias GBA con mayor definición deben concretarse en diseños revisados; no sustituir recursos previamente aprobados.

P03 cubre el funcionamiento de sectores/mapas/oleadas y P07 la progresión permanente. Su aceptación técnica no implica aprobación visual. P10 valida legibilidad, controles y rendimiento en dispositivos reales. Esta observación no adelanta ni da por terminadas esas fases.
