# Primera prueba de mapas V2

**Actualización vigente 0.25 · B1/B2, 19/10/2026 (A-035/D-331/EV-040):** B1/B2 implementados como prototipo aislado: geometría inicial 160 × 100 y seis nodos alternativos; cuatro intentos de exploración en 60/120/180/240 s con probabilidades/topes por tramo y tickets ficticios en memoria. RC-10 sigue EC, evidenceComplete=false. Aceptación manual y P05 real pendientes; combate 2+3+1, bono de diez minutos/hitos, cofres de jefe/grieta y economía persistente pendientes. [Guía de mapa y cofres](PRUEBA_MAPA_COFRES_V2.md) · [Demo de práctica](https://deteco.github.io/SCPSurvivor/?prueba=mapa-v2&cofres=prueba) · [Resultados y límites](V2-B1-B2-REPORT.md). Publicación viva pendiente de verificar; consultar el informe antes de afirmar resultados.

## Probar online con GitHub Pages

[Jugar mapa completo](https://deteco.github.io/SCPSurvivor/) · [Prueba rápida: empezar en 4:30](https://deteco.github.io/SCPSurvivor/?rapida=1). Pulsa el botón de inicio del menú; no necesitas instalar ni mantener un servidor local. Mismas reglas del ensayo, sin cuentas ni guardado. La ampliación actual B1/B2 añade geometría inicial y cofres ficticios de exploración; ver la guía vigente. [Publicación y límites](GITHUB_PAGES.md).

Antecedente del 18/10/2026: primer prototipo del recorrido sin cofres. B1/B2 lo amplía con exploración ficticia; no cierra P05 ni integra guardado, economía, gacha o ranking. Arte y balance provisionales; las mejoras todavía usan las cartas anteriores.

## Abrir la prueba

Con el servidor local abierto:

- [Prueba rápida: comenzar en 4:30](http://127.0.0.1:8000/?prueba=mapa-v2&rapida=1).
- [Mapa completo: comenzar en 0:00](http://127.0.0.1:8000/?prueba=mapa-v2).

Si el servidor está cerrado, abrir PowerShell en la carpeta del proyecto y ejecutar:

```powershell
npm.cmd run serve
```

En el menú elige Guardia o Médico y las dos armas de prueba. Pulsa **Iniciar prueba rápida V2** o **Iniciar mapa V2 · 5 minutos**. No necesitas iniciar sesión. El crédito «Desarrollado por Ivan Vivanco» se conserva.

## Qué probar

1. Muévete con WASD/flechas o arrastrando en pantalla táctil. Disparo automático; Q/E o botones para cambiar arma y Espacio/habilidad para Sprint o curación.
2. En la prueba rápida ya aparece el jefe. En la completa aparece provisionalmente en 4:00. Debes derrotarlo para avanzar.
3. En 5:00 llega la brecha/puerta blindada con dos soldados aliados. Suena una alerta y aparece la llamada «¡Por aquí, te cubrimos!». Los disparos aliados usan daño real; la voz grabada queda para el acabado de audio.
4. Comprueba que dejan de aparecer enemigos y refuerzos. Los que queden siguen vivos y peligrosos; los soldados proporcionan cobertura junto a la puerta.
5. Sigue el indicador de dirección/distancia. Si el jefe vive, la puerta indica **DERROTA AL JEFE** y no permite pasar.
6. Cuando esté derrotado y hayan pasado cinco minutos, camina sobre la puerta: pasas al siguiente mapa **al instante**, sin botón ni espera.
7. En el siguiente mapa el reloj vuelve a 0:00 y conservas vida, experiencia, mejoras y estado de armas. La prueba rápida solo adelanta el primer mapa.
8. Pausa y continúa. El reloj del mapa debe quedarse detenido durante la pausa y mientras eliges una mejora.

Si derrotas al jefe antes de 5:00, debes esperar la llegada de la puerta. Si mueres, aparece el resultado y puedes reiniciar. No hay opción de extraer, huir del jefe, accesorios ni mochilas en este modo.

## Qué todavía no representa

- Usa las armas, soldados, enemigos y escenarios disponibles; no añade el catálogo final por familias ni sustituye diseños aprobados.
- Los aliados son cobertura de prueba, separados de la lista enemiga y sin daño recibido; no es la IA aliada final.
- Se conservan las cartas de mejora anteriores. El nuevo reparto aleatorio por arma se implementa después de cerrar sus reglas.
- Grietas opcionales, saltos dimensionales, cofres de jefe/grieta y tamaños finales de mapa se adaptarán después; B1/B2 incorpora exploración ficticia y escala inicial.
- Sin cuentas ni guardado: recargar pierde esta partida de prueba. Se bloquea la captura/restauración del esquema antiguo y se conservan sus datos.
- El modo anterior sigue disponible sin este parámetro. Esta convivencia permite comprobar regresiones; el diseño vigente sigue siendo V2.
- La aceptación de Iván sigue pendiente. Las simulaciones automáticas registradas no demuestran balance, FPS, rendimiento, dispositivo físico o funcionamiento en producción.

Las pruebas técnicas y sus límites se registran en `V2-PRIMERA-PRUEBA-REPORT.md` después de ejecutarlas. La pauta funcional vigente permanece en [PAUTA_DESARROLLO.md](../PAUTA_DESARROLLO.md).
