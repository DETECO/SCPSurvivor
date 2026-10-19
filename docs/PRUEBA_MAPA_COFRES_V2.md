# Prueba B1/B2: mapa abierto y cofres de exploración

19/10/2026 · V2-trial-02 · Arte y balance provisionales. Sin cuenta ni guardado.

[Practicar con un cofre garantizado](https://deteco.github.io/SCPSurvivor/?prueba=mapa-v2&cofres=prueba) · [Partida normal](https://deteco.github.io/SCPSurvivor/) · [Jefe y puerta desde 4:30](https://deteco.github.io/SCPSurvivor/?rapida=1).

## Primera prueba

1. Abre la práctica de cofres y pulsa **Iniciar prueba de cofres**. El menú mantiene el crédito «Desarrollado por Ivan Vivanco».
2. Apareces cerca de un cofre de prueba. Muévete con WASD/flechas o arrastrando en pantalla táctil. El disparo automático sigue funcionando.
3. Acércate al cofre y permanece junto a él durante **3,5 segundos**, a no más de 50 unidades y sin pared entre ambos. No necesitas un botón de apertura.
4. Aléjate mientras se abre: el progreso retrocede a razón de 1,5 segundos por segundo. Vuelve para continuar. Recibir daño por sí solo no cancela la apertura.
5. Pausa y continúa: ni el reloj ni la apertura avanzan durante la pausa. También se detienen durante la elección de mejora.
6. Comprueba el mensaje **tickets ficticios (sin cuenta)**. El cofre solo entrega una vez. No son monedas reales, no activan gacha y desaparecen al reiniciar o recargar.
7. Explora el mapa y prueba sus rutas amplias, obstáculos y espacios laterales. Tiene seis posibles ubicaciones de exploración; no son seis cofres garantizados.

La ayuda de práctica fuerza un cofre al comenzar el primer mapa y consume su cupo. Sirve para probar la interacción sin depender de un sorteo. Los siguientes mapas siguen las probabilidades normales.

## Aparición normal

Se intenta generar un cofre una vez en **1:00, 2:00, 3:00 y 4:00** del mapa. Cada oportunidad es independiente; no garantiza aparición ni llegar al máximo.

| Mapa | Probabilidad por oportunidad | Máximo por mapa | Tickets ficticios por cofre |
| --- | --- | --- | --- |
| 1–3 | 10 % | 1 | 1–2 |
| 4–7 | 15 % | 2 | 1–2 |
| 8 en adelante | 20 % | 3 | 1–3 |

El contenido queda fijado al aparecer y abrir un cofre no libera cupo. Antes de descubrirlo hay un aviso sin ubicación. Después de verlo, el indicador muestra dirección, distancia y progreso. Las cajas de campo anteriores siguen siendo elementos decorativos destructibles, sin este premio.

La prueba rápida empieza en 4:30 y **no otorga sorteos anteriores** como si hubieras jugado esos minutos. Para comprobar la apertura usa el enlace de práctica.

## Recorrido conservado

Cada mapa dura cinco minutos activos; el jefe aparece provisionalmente en 4:00. En 5:00 llega la puerta de la Fundación con dos aliados y cesan las apariciones enemigas, incluidos refuerzos. Los enemigos que queden siguen vivos. Debes derrotar al jefe y caminar sobre la puerta para avanzar al instante. El siguiente mapa comienza en 0:00; conserva vida, experiencia y equipo de la expedición.

## Ejecutar localmente

En PowerShell, dentro de la carpeta del juego:

```powershell
npm.cmd run build
npm.cmd run serve
```

Abre `http://127.0.0.1:8000/?prueba=mapa-v2&cofres=prueba`. No abras `index.html` con doble clic.

## Pendientes

Esta entrega prueba la geometría inicial de **160 × 100 casillas** y los cofres de exploración con su tabla base. Quedan abiertos el bono acumulado de diez minutos y los hitos anteriores, premios de jefe y grieta, economía real, persistencia, variantes finales de mapa, arte/audio definitivo, balance y aceptación de Iván. Las dos armas simultáneas, tres poderes y ultimate siguen pendientes del bloque de combate. No cierra P05 ni completa V2.

Los ensayos automáticos y sus límites se registran en [V2-B1-B2-REPORT.md](V2-B1-B2-REPORT.md); no sustituyen la prueba manual ni verifican rendimiento en teléfonos físicos.
