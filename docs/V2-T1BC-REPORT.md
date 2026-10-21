# Resultados T1B + T1C

**Publicación comprobada:** runtime `00d5770`, índice/compilado/CSS/roadmap coincidentes; diez recorridos online aprobados (escritorio/táctil × cinco modos). [Recibo](V2-T1BC-PUBLICACION.json). Aceptación manual y teléfono físico pendientes.

21/10/2026 · Roadmap 0.30 · A-040/D-336/EV-045. **Implementado como ensayo, aceptación manual pendiente.** La publicación se acredita por el recibo de Pages cuando esté disponible.

T1B + T1C implementados como ensayo: terminal voluntario con reemplazo de una copia y pausa completa; ramas/cartas revisadas por familia; cuarta arma, porra de corto alcance sin munición; HUD de ramas/recargas y consulta de equipo; daño compacto y radar circular fijo sin revelar cofres desconocidos. Cuatro prácticas explícitas: terminal, máximos, saturación y melee. Sin cuentas/guardado/economía real. Arte y balance provisionales; fusión, grieta separada, poderes y ultimate pendientes.

[Guía y accesos de prueba](PRUEBA_T1BC.md) · [Validación estructurada y hashes](V2-T1BC-VALIDACION.json).

## Cambios y fichas

Terminal cercano al inicio de cada mapa: acercamiento con línea libre, botón voluntario, elección pausada y reemplazo revalidado por ID/modelo. Copia nueva sin ramas propias; otra copia/generales intactos. Cancelar no muta equipo, doble confirmación se rechaza. Reutilizable y sin coste durante este ensayo; no fija economía final ni compra permanente. Reloj, daño, efectos, recargas, spawns y XP se detienen durante el panel.

Porra: daño 18, intervalo0,7s, alcance64u, arco 90°, hasta 3 blancos, sin proyectiles/munición/recarga. Solo golpea con línea libre y dentro del arco; conserva temporizador independiente junto a balística. Manejo añade 4° por rango1–5 y 10° extra; Especialización +3% alcance por rango y10% extra, además de un blanco en el extra. Potencia/Ritmo y generales conservan sus fichas T1A. No se anuncia energía/explosivos/arrojadizas ni más modelos implementados.

HUD: tarjetas de cada arma con recursos y P/R/M/E; toque abre consulta pausada con estadísticas y generales. Apoyo táctico con duración visible. Radar circular de alcance900u y norte fijo, objetivos en borde y límite de marcas; cofres desconocidos no se revelan. Leyenda en pausa. Marcadores de daño compactos con formato limitado, sin cambiar el daño real. La distribución futura de 3 poderes + 1 ultimate es texto informativo; esas habilidades no están habilitadas.

Prácticas explícitas terminal/maximos/saturacion/melee, identificadas en menú. No alteran modo normal ni representan progreso real de cuenta. Modo anterior T1A permanece con `?prueba=infinito-v2`, B3 con `?prueba=mapa-v2`; nuevo `?prueba=combate-v2` y entrada Pages por defecto.

## Pruebas realmente ejecutadas

- source: 208 casos Node, 207 aprobados, 0 fallos, 1 omitidos; navegador combinado 4 escenarios × 5 modos.
- publication: 208 casos Node, 206 aprobados, 0 fallos, 2 omitidos; navegador combinado 4 escenarios × 5 modos.
- Build/check aprobados en ambas copias. Se conservaron diferencias de configuración/CSP y dependencias, sin publicar preparación Worker.
- Regresión T1A/B3 ejecutada sobre fuente/compilado y escritorio/táctil emulado. Validación registra cantidades exactas, omisiones y hashes.
- QA usa posiciones, tiempo, invulnerabilidad y blancos durables controlados para comprobar UI y daño real; no demuestra dificultad natural, balance, rendimiento ni teléfono físico. Las prácticas públicas no añaden esa invulnerabilidad.
- Revisar recibo de publicación para resultados online; subir código no acredita por sí solo el despliegue.

Revisión de integración realizada por root; corrigió aislamiento del catálogo anterior y bloqueo melee por cobertura destructible, con regresiones aprobadas. Luna max entregó los marcadores de daño; root integró el resto. La revisión adicional de Luna se interrumpió sin informe y no se presenta como completada.

## Pendientes

Aceptación manual BC01–BC12 y móvil físico; balance y acabado visual final. Fusión/receta/herencia/topologías nuevas, grieta separada/origen congelado, poderes, pasiva/ultimate definitiva, economía y reanudación exacta quedan en tramos posteriores. T1A tiene feedback general positivo de Iván; no se extrapola a este paquete ni a todos sus casos. El contrato completo 2+3+1 sigue parcial.

Se preservan arte aprobado, crédito, Cloud/ZIP/sources y 53 tareas históricas con 52/100. Avance V2 sin calcular. Cuentas/guardado/economía reales desactivados, Firebase Spark sin billing. Respaldo previo local: development-backups/t1bc-20261021-antes.zip y migration-audit/t1bc-before.json.
