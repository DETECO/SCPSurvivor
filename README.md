# SCP Survivor

Juego gratuito de supervivencia para navegador, con soldados, armas modificables y expediciones entre escenarios anómalos. **SCP Survivor es el nombre provisional del proyecto.**

El desarrollo tomará como base [PokéSurvivor, de JPTER78](https://github.com/JPTER78/pokesurvivor), adaptando sus sistemas al diseño de nuestro juego.

## Estado actual

**En planificación. La adaptación de SCP Survivor todavía no está implementada ni publicada.**

Este repositorio está destinado a guardar el roadmap, la base de referencia y los futuros avances del juego. Las funciones descritas a continuación corresponden al diseño previsto; todavía no son funciones jugables de SCP Survivor.

## Concepto del juego

Controlas a un soldado que atraviesa sectores conectados, con salas y corredores inspirados en Backrooms. Las expediciones continúan de un escenario al siguiente y aumentan su dificultad por sectores y oleadas.

- Movimiento manual, apuntado y disparo automáticos, y habilidades activadas por el jugador.
- Dos armas equipadas, con una activa, cargadores y recarga automática.
- Modificaciones de armas que permiten combinar ventajas y compensaciones.
- Preparación de entre 5 y 30 segundos entre oleadas.
- Entidades hostiles y jefes con patrones propios; siempre será posible intentar escapar de un jefe.
- Extracción en determinados escenarios, con conservación de recompensas y penalización de puntuación.
- Pérdida de equipo al morir y recuperación aleatoria simulada de parte de lo perdido.
- Experiencia, mejoras permanentes del soldado, almacén, mochilas y buzón de excedentes.

## Primera versión completa prevista

| Contenido | Alcance inicial |
|---|---|
| Soldados | Guardia básico y médico operativo |
| Armas | Pistola, subfusil y escopeta |
| Modificaciones | Seis modelos, con dos espacios por arma |
| Mochilas | Dos modelos con capacidades diferentes |
| Escenario | Una ambientación modular que genera varios sectores |
| Enemigos | Dos tipos normales y un jefe |
| Progresión permanente | Diez categorías de mejora por soldado |
| Clasificación | Global y por país, después de su validación |

La economía prevista utiliza tickets separados de reclutamiento y suministros. El equipo sobrante se recicla para conseguir suministros; las copias del kit gratuito tienen aporte cero al reciclaje.

Se ha aprobado combinar contratos renovables con misiones diarias y semanales. Sus objetivos, premios y límites siguen pendientes de definición. Esta decisión se incorporará al roadmap en su próxima actualización indicada por el director.

## Plataformas prioritarias

- Safari en iPhone 13 y iPhone 15.
- Chrome en Infinix Note 40 5G.
- Controles táctiles y adaptación a orientación horizontal y vertical.

La compatibilidad y el rendimiento de la adaptación deberán comprobarse en esos dispositivos.

## Archivos de referencia

Estructura del paquete preparado para la subida manual:

```text
README.md               Presentación del proyecto
RoadmapSCP.md            Registro de decisiones, etapas y pendientes
base-pokesurvivor/       Copia selectiva del código original inspeccionado
LEEME-PAQUETE.txt        Información sobre el paquete entregado
```

La base corresponde a la rama `main` de PokéSurvivor, commit:

```text
a1006e6e3d0cea9162238a90b0ffdd7fd38397b6
```

Incluye HTML, CSS y JavaScript con Canvas 2D. La copia entregada contiene 118 archivos y conserva la documentación del original en [base-pokesurvivor/README.md](base-pokesurvivor/README.md).

**La copia es parcial:** faltan los sprites de `assets/pokemon/` y el archivo generado `app.min.js`. Conserva configuraciones de servicios del proyecto original; su aislamiento para SCP Survivor sigue pendiente. Este paquete no constituye una versión completa lista para jugar o publicar. No se ha ejecutado el juego ni su build durante esta planificación.

## Roadmap y seguimiento

[RoadmapSCP.md](RoadmapSCP.md) contiene la auditoría, las decisiones registradas, las tareas ponderadas, sus dependencias y los criterios de aceptación. Es el registro maestro; este README ofrece una presentación resumida y no sustituye el plan.

El roadmap se actualizará cuando lo indique el director. La copia entregada actualmente corresponde a la versión **0.7**. Los pesos y el plan integral siguen pendientes de aprobación final; el progreso documental no demuestra funcionalidades implementadas.

La meta es una **primera versión completa, probada y publicada**. La demo y la primera partida mínima son hitos intermedios. Cooperativo, Hardcore con muerte permanente y ranking propio, códigos y regalos quedan para ampliaciones posteriores.

La futura web de seguimiento será independiente y mostrará el plan y sus avances verificados.
