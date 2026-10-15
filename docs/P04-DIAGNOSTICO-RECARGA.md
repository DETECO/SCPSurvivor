# Diagnóstico de la aserción P04 ammo=7

El probe `p04-reload-probe.py` ejecuta el test existente sin modificar sus archivos. Añade observaciones antes de cambiar mods.

Reproducción en `dev.html`, escritorio:

| Punto | Munición | Recarga pendiente | Capacidad | Mods |
|---|---:|---:|---:|---|
| Autoplay termina primera oleada | 0 | 0.9999999999999986 | 12 | ninguno |
| Fixture escribe ammo=7 | 7 | 0.2500999999999976 | 12 | ninguno |
| Después de marcar checkbox | 12 | 0 | 12 | ninguno |
| Después de 250 ms | 12 | 0 | 12 | ninguno |
| Después de confirmar mods | 12 | 0 | 18 | extended |

La munición se rellena antes de confirmar el editor. `js/systems/field-combat.js:104` completa una recarga normal y repone la capacidad anterior. `G.Expedition.update` mantiene los temporizadores de armas en preparación. `configureMods` solo limita la munición a la nueva capacidad y no la rellena.

La prueba introduce siete balas sin normalizar la recarga que dejó el combate real. El resultado depende del instante del combate y del tiempo que requieren las capturas y los clics. Otra ejecución tuvo ammo9/reload0 al terminar autoplay y pasó sin ningún cambio.

Corrección del fixture recomendada: escribir `ammo=7` y `reload=0` en la misma evaluación, manteniendo la aserción estricta ammo7/capacity18 y el control de que el contador de preparación sigue avanzando. Esto aísla la conducta que se pretende verificar, sin modificar mecánicas ni aflojar la prueba.

Para ensayar esa variante solo en memoria, el probe admite `P04_STABLE_FIXTURE=1`.
