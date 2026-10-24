# Prueba local — REV-EST-0006

24/10/2026 · CONTROL_CAMBIOS 0.6 · lotes 001/002/003/004 r1.

Esta composición conserva el proyecto existente. El alcance de armas es **parcial**: AF01 jugable; Katana, láser y fusión todavía cerrados. No hay cuentas, guardado, economía ni servicios reales activos.

## Abrir

Publicación verificada el 24/10/2026: [AF01 en GitHub Pages](https://deteco.github.io/SCPSurvivor/?prueba=combate-v2&armas=r1&graficos=32). Resultados y límites en el [recibo de publicación](gestion/REV-EST-0006_PUBLICACION.json). Los enlaces siguientes permiten seguir trabajando localmente.

Con el servidor local iniciado en el puerto 8026:

- [Prueba AF01 y mapa actualizado, gráficos 32](http://127.0.0.1:8026/?prueba=combate-v2&armas=r1&graficos=32).
- [La misma prueba en 16](http://127.0.0.1:8026/?prueba=combate-v2&armas=r1&graficos=16).
- [Visor de los diez diseños de armas](http://127.0.0.1:8026/visor-armas-revision-r1.html). Es inspección visual; no equipa las armas en la partida.
- [Prueba anterior de combate, con el mapa actualizado](http://127.0.0.1:8026/?prueba=combate-v2).

Si se cierra el servidor, abrir PowerShell dentro de `SCP-SURVIVOR` y ejecutar:

```powershell
$env:SCP_PORT = '8026'
node .\tools\serve-local.js
```

Dejar esa ventana abierta. La dirección solo funciona en este computador.

## Qué probar

1. Entrar por el enlace AF01 e iniciar. Debe haber una pistola en nivel 1 y una ranura vacía, sin niveles ni equipo regalados por prácticas antiguas.
2. Recoger experiencia y elegir cartas de arma. La escala de cada copia es `1 → 2 → 3 → 4 → 5 → MAX`. Las mejoras generales siguen su sistema existente.
3. Resolver un premio de armamento de jefe/élite. La segunda pistola comienza en nivel 1 y progresa por separado. Con dos copias, un premio de ascenso debe elegir una copia elegible.
4. Con una copia MAX, completar la recarga. Su primer disparo añade otra bala 0,12 segundos después, sin gastar munición extra. Pausar, abrir cartas o usar el terminal debe congelar los relojes correspondientes. Después de 5:00 las armas siguen sirviendo para el jefe y los enemigos restantes.
5. Comparar 16 y 32 en el menú y durante la partida. Revisar Guardia y Médico, dirección de las armas y tamaño físico del personaje. La elección de resolución no cambia colisiones ni alcance.
6. Revisar M01 redistribuido en 240×160 casillas. En vertical la cámara muestra un ancho de mundo de 512 unidades; horizontal y escritorio conservan su encuadre. El calendario, jefe obligatorio y puerta mantienen sus reglas. Los mapas posteriores no han sido rediseñados por este lote.
7. Tras la primera interacción, escuchar la pista elegida del menú. Revisar volumen/silencio y que deje de sonar al empezar la partida; al volver al menú debe reutilizar la misma pista.

Si ya no quedan mejoras válidas, las cartas usan los apoyos tácticos existentes. Un premio de armamento con ambas copias MAX usa la misma salida táctica aprobada, una sola vez; la saturación no debe dejar bloqueada la puerta por experiencia sin opciones.

## Qué todavía no demuestra esta prueba

El director nuevo de grietas se comprobó aislado: desde mapa 2, oportunidades a 1:00/2:00/3:00/4:00, 50/50 y máximo dos apariciones confirmadas. **No está conectado a encuentros nuevos**. Las seis animaciones y el contacto de la práctica anterior se conservan; ver una animación no acredita la nueva selección de encuentros, recintos o NPC.

No están disponibles en combate CC04, TE01 ni F24. Falta validar la pose simultánea de Katana/láser con los dos brazos existentes y sus animaciones; después deben integrarse sala, interfaz de confirmación y recorrido completo. F24 no es arma inicial y la galería de menú no selecciona equipo.

Las comprobaciones automatizadas usan, cuando se indica, posiciones, experiencia, vida o tiempo controlados. No sustituyen la aceptación de balance, una partida natural completa ni la revisión en un teléfono físico. El [registro de implementación](gestion/REGISTRO_IMPLEMENTACION.md) identifica resultados y límites reales. Esta guía no acredita una publicación nueva en GitHub.
