# Prueba vigente — SCP Survivor 0.40.1

26/10/2026 · LOT-EST-008 r1 + correctivo técnico de carga r2. [Recibo de PROGRAMACION](gestion/LOT-EST-008_PUBLICACION.json) · [revisión independiente](gestion/informes/LOT-EST-008-juanillo.md).

## Cómo probar los cambios

1. Abre la [práctica de grietas con apoyo](https://deteco.github.io/SCPSurvivor/?prueba=combate-v2&ensayo=grietas&apoyo=si&graficos=32&revision=0.40.1). Selecciona el encuentro y el estilo de portal en el menú. La opción de ronda permite recorrer las cinco BIO y los seis portales sin editar el enlace. El apoyo forzado es una ayuda de esta práctica; no cambia su probabilidad en una partida normal.
2. Cruza el portal caminando. Cada BIO tiene su sala C1-r2 aprobada y tres ataques señalados. La cámara conserva el tamaño del personaje antes, dentro y después. Durante la carga no avanza el mapa de origen ni se pierde vida. La descarga empieza al aparecer el portal; si tarda, avisa a10s y retorna de forma segura a30s. Un archivo fallido también retorna sin premio.
3. Combate y esquiva. La retirada del ensayo avisa a75s y abre una sola vez a90s, durante5s, en el centro señalado. Vencer permite volver por el portal central después de resolver el premio. Retirarse no da premio de victoria.
4. El primer poder se garantiza. Después se mantiene el25% de ensayo y la garantía tras tres victorias sin poder. Se obtiene el poder compatible con la BIO: **Pulso de esporas, Cápsula vítrea, Látigo tendinoso, Corona de espinas o Membrana de rechazo**. Son automáticos y esperan un blanco válido; el HUD muestra su nivel y disponibilidad. Máximo tres, con reemplazo o rechazo del cuarto.
5. Si sobrevive, el compañero vuelve contigo, sigue ayudando y entra en la siguiente grieta. Conserva nombre, arma, HP, cargador y recarga. Tiene reserva ilimitada, recarga su cargador y puede morir. No concede XP por sus bajas ni remata al jefe. Pausa y elecciones congelan sus acciones.
6. En la [expedición normal](https://deteco.github.io/SCPSurvivor/?prueba=combate-v2&graficos=32&revision=0.40.1), comprueba la presión creciente por minuto y mapa. El dado50/50 sigue tirándose en los minutos1–4 desde mapa2, con máximo dos grietas y peligrosidad50/32/8/7/3. La presencia del apoyo sigue33% enD1–D4 y10% enD5. No todas las grietas dan compañero o premio posterior al primero.

## Cristales de experiencia

| Valor que contiene el cristal | Apariencia |
|---|---|
| 1–12 XP | Fragmento verde pequeño |
| 13–29 XP | Cristal cian |
| 30–99 XP | Racimo violeta |
| 100+ XP | Núcleo ámbar grande |

Ensayo actual: Perseguidor12, Biológico20, élite84 y Custodio220. El Custodio de esta expedición deja un núcleo220; los cristales compactados cambian de aspecto según su valor real y conservan la suma exacta. Las cinco BIO dan su premio de poder y no XP adicional. Los multiplicadores del soldado se aplican al recoger, una sola vez.

Las cifras de dificultad y poderes siguen en calibración. Se verificaron navegador y controles emulados; queda pendiente teléfono físico y aceptación humana del balance, especialmente D5. Las cinco salas C1 son composiciones fijas aprobadas; sus variantes interiores procedurales requieren trabajo posterior. El registro de LOT005 se conserva como historial y no describe todos los cambios de esta versión.
