# Grietas dimensionales — validación técnica local

16/10/2026. Prototipo optativo basado en el juego existente. **Aceptación manual de Iván pendiente**; instrucciones en [PRUEBA_GRIETAS.md](PRUEBA_GRIETAS.md).

## Resultado técnico

- `node --test tests/*.test.js`: 86 pruebas, **85 aprobadas, 0 fallidas, 1 omitida**. La omitida requiere habilitar explícitamente los emuladores P05; no se ejecutó integración de servicios en esta operación.
- Incluye 5 pruebas de grietas, 5 de IA dimensional, 1 de exclusión de checkpoints del prototipo, 2 nuevas regresiones de ingreso instantáneo del director y regresiones existentes de calendario, jefe normal, armas, estadísticas, cuentas y continuidad.
- `npm.cmd run build` y `npm.cmd run build:check`: correctos, 83 scripts, SDK Firebase sin cambios de dependencia. Bundle `32a01f2dab`.
- `tests/rifts-browser.py`: **4 escenarios aprobados**, fuente/compilado × escritorio/móvil emulado, sin errores JavaScript ni intentos remotos registrados. Gesto de inicio, interfaz, pausa, alerta y WebAudio medido con señal no nula. Apertura/cierre, entrada, cancelación de huida por daño, retirada, victoria y calendario intacto comprobados.
- La prueba directa encontró una posición libre y alcanzable en **64 semillas distintas**, tanto en fuente como compilado.
- Capturas de apertura/combate revisadas visualmente. Arte, controles, sonido y balance continúan provisionales.

Los ensayos del navegador son aislados: perfil vacío y servidor de prueba con puerto propio. No se automatizó la pestaña ni se leyeron cuentas del usuario. Se coloca al personaje cerca de la grieta y se comprueba el ingreso caminando con una tecla real, sin botón y conservando el movimiento. Posiciones, reloj de cierre, daño cancelador y muerte del jefe se inyectan en los demás casos de transición; **no demuestran que un jugador haya ganado, aceptado el balance o escuchado los altavoces físicos**. Las subidas de nivel se eligen durante el caso controlado de victoria, respetando la pausa de mejoras.

La primera revisión EV-028 registró84/83 aprobadas/0 fallos/1 omitida y bundle24c29481e1 con entrada mediante botón. La decisión posterior A-023/D-311 reemplaza ese control por contacto instantáneo. Revalidación actual EV-029:86/85 aprobadas/0 fallos/1 omitida y bundle32a01f2dab.

## Incidencias durante la verificación

- Revisión independiente detectó daño posible si una pared separaba el centro anunciado del pulso y al jugador, aunque la línea desde el jefe quedara libre. Reproducido con prueba fallida y corregido: se verifican ambas líneas antes de dañar. Prueba específica y suite final aprobadas.
- La cola por defecto del servidor Python de ensayo provocó rechazos intermitentes al cargar los83 scripts de `dev.html` en Windows. Se ajustó a128, igual que el ensayo P03 existente; la ejecución final pasó. El servidor del juego es el existente de Node y no necesitó este cambio.
- `node --test` sin ruta también intenta ejecutar `js/ui/test.js`, que es una interfaz heredada para navegador y requiere `G`. El comando de suite correcto es el indicado arriba, limitado a `tests/*.test.js`; no se modificó esa interfaz ajena a la tarea.

## Alcance y límites

`?prueba=grieta` prepara el primer sector despejado sin acreditar oleadas. `?grietas=local` prueba apariciones del25% al despejar sectores normales desdeS2. Ambos requieren loopback y quedan deshabilitados si se usa `cuentas=local`.

La grieta vive45 segundos activos, se cierra si se ignora y activa el encuentro al contacto con línea libre, sin botón, tecla, confirmación ni espera. Pasar cerca sin tocar no activa; el contacto no detiene el movimiento ni crea más de un jefe. La variante Custodio usa el mismo sprite, vida×1,35, daño×1,15, llegada anunciada1,5s y pulso adicional anunciado1,2s. Este aviso del enemigo no retrasa la entrada. Victoria/retirada vuelven al sector despejado sin modificar calendario ni contar dos veces un sector. Conserva XP220 temporal habitual; no implementa premios especiales.

No hay persistencia de grietas P05, arena aparte, nuevo catálogo gráfico, economía, ranking, aceptación en teléfonos físicos ni despliegue externo. El requisito permanente de sonido/alerta/localización se conserva en [OBSERVACIONES_VISUALES.md](OBSERVACIONES_VISUALES.md) paraP09.

## Conservación

Respaldo previo: `development-backups/SCP-SURVIVOR-antes-grietas-20261016-131838.zip` en el directorio padre (295 archivos; SHA256 `70cd642acf5d2faf788aa9f01339ecf3c40682529163a7b10e8dc8bee59a42bc`). Los12 archivos originales de assets permanecen idénticos por comparación de bytes; no se eliminó ningún archivo. Originales y ZIP anteriores conservados. No se publicaron estos cambios en GitHub ni se activaron servicios Firebase reales.

Resultados brutos y capturas: `migration-audit/rifts-20261016-node.txt` y `migration-audit/rifts-20261016-browser/` en el padre. [GRIETAS-CAMBIOS.diff](GRIETAS-CAMBIOS.diff) reúne el cambio legible de fuentes y documentación; el bundle generado se resume por hash.

Actualización de contacto instantáneo: `migration-audit/rifts-instant-20261016-node.txt` y `migration-audit/rifts-instant-20261016-browser/`; [diff incremental](GRIETAS-INGRESO-INSTANTANEO.diff). Respaldo anterior a este cambio: `development-backups/SCP-SURVIVOR-antes-ingreso-instantaneo-20261016.zip`. Sin eliminación de archivos ni modificaciones de recursos gráficos.
