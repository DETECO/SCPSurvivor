# V2-trial-01 — primera prueba del recorrido

18/10/2026. Petición A-031 de Iván: comenzar la adaptación para realizar la primera prueba. Se continúa el juego existente con agentes Sol medio, implementación/pruebas acotadas y revisión de raíz.

## Implementado en este ensayo

- Modo optativo `?prueba=mapa-v2`, solo loopback y sin cuentas. Acceso `&rapida=1` inicia el primer mapa en 4:30; los siguientes empiezan 0:00.
- Reloj de 300 s de juego activo y jefe obligatorio por mapa. Aparición a los 240 s y semilla 1337 son parámetros provisionales y reproducibles del ensayo.
- A los 300 s aparece puerta blindada, señal sonora/llamada visible y dos soldados de cobertura. Se cierra el spawn normal y los refuerzos antes de ejecutar IA enemiga. El jefe se procesa antes del corte, incluso con un salto grande de tiempo simulado.
- Enemigos vivos permanecen tras abrir puerta o derrotar jefe. No se reintroducen/reposicionan remanentes después del corte.
- La puerta bloquea avance con jefe vivo. Con jefe derrotado y puerta llegada, contacto inmediato cambia de mapa y conserva vida/build/armas; no hay extracción ni huida en V2.
- Aliados separados de EnemyMgr, ordenados visualmente por profundidad, con sprite Guardia existente. Daño 9, intervalo 0,65 s y alcance 440 provisionales; línea de visión, sin daño al jugador. EnemyMgr registra bajas una sola vez.
- Localizador de objetivo/puerta y reloj por mapa. Interfaz de ensayo sin accesorios ni mochila. Se conservan crédito y controles existentes.
- Captura/restauración del esquema de guardado anterior bloqueadas en V2; datos previos conservados. Modo anterior disponible para regresión.

## Verificación ejecutada

| Copia | Verificación | Resultado |
| --- | --- | --- |
| Local de desarrollo | 26 archivos Node, 126 casos | 125 aprobados, 0 fallos, 1 integración optativa de emuladores omitida |
| Preparada para GitHub | 26 archivos Node, 126 casos | 124 aprobados, 0 fallos, 2 omitidos: emuladores y callable real sin dependencias de `functions` en ese checkout |
| Ambas | 13 pruebas específicas nuevas de V2 y guardia de checkpoint |Aprobadas; reloj/corte, jefe, contacto, remanentes, mezcla/escalada, aislamiento, daño aliado y regresiones |
| Ambas |Build y build:check |Aprobados; 86 scripts en orden y sintaxis válida |
| Local |Fuente/index × escritorio/táctil emulado | 4 escenarios aprobados |
| Publicación |Fuente/index × escritorio/táctil emulado | 4 escenarios aprobados |

La prueba de callable real omitida en el checkout de publicación sí pasó en la copia local con sus dependencias. Los emuladores no se ejecutaron de nuevo para esta entrega de recorrido sin cuentas. No se modificó el backend ni se usa esta omisión como aceptación P05.

Ensayos de navegador aislados: comprobaron menú/crédito, ausencia de selección de mods, inicio en 270 s, pausa, puerta a los 300 s con jefe vivo, bloqueo de cruce, cese de refuerzos, conservación de remanente, daño aliado con disparos del jugador temporalmente desactivados, muerte de jefe, contacto inmediato, conservación de vida/build/armas, nuevo mapa 0:00 e inicio normal en 0:00. Ningún error JavaScript, intento remoto o fallo HTTP registrado en esos ocho escenarios.

Se controlaron posición, tiempo, HP de jefe/remanente e invulnerabilidad. No es una partida humana de cinco minutos ni prueba de balance, rendimiento o dispositivo físico. El fixture de remanente se introdujo antes del corte en la versión final del ensayo. Tras 300 s puede bajar el número de enemigos por muertes: la comprobación usa identidades para verificar que no aparecen enemigos nuevos.

Rojo/verde: 5 pruebas del director fallaron antes de su implementación y 5 del módulo de prueba antes de existir. Se añadieron regresiones para evitar doble cómputo de bajas y para usar el campo de rutas del jugador real al colocar aliados. La inspección visual detectó y corrigió su superposición en la puerta.

Comandos ejecutados en PowerShell:

```powershell
node --test tests/v2-map-director.test.js tests/v2-map-trial.test.js tests/p05-checkpoints.test.js
npm.cmd run build
npm.cmd run build:check
node tools/render-roadmap.js --check
```

La suite completa utilizó los 26 archivos `.test.js` de juego/P05 y V2 disponibles; la adaptación Worker local en curso se excluyó de esta entrega y de su suite. `tests/v2-map-browser.py` requiere Playwright/Chromium y admite `SCP_TEST_ROOT`/`SCP_TEST_ARTIFACTS`. JSON de resultados y hashes: [V2-PRIMERA-PRUEBA-VALIDACION.json](V2-PRIMERA-PRUEBA-VALIDACION.json).

## Qué no se cierra

La aceptación manual de Iván sigue pendiente. RC-03–RC-06 tienen un prototipo local, no aceptación final ni todas sus dependencias persistentes cerradas. P05 real, colección/economía, P06 replanteada, azar definitivo de armas, cofres de premios, nuevos mapas/grietas/saltos, voz y acabado visual continúan pendientes. El 52/100 es histórico; avance V2 sin calcular.

El SDK/bundle local incluye preparación de cuentas anterior que todavía no se publica. La copia de GitHub se construyó y probó por separado desde su fuente conservada: no incorpora el Worker o configuración de backend incompletos. Los hashes de ambas copias se registran por separado; no se exige que sean iguales.

Prueba del usuario: [PRUEBA_MAPA_V2.md](PRUEBA_MAPA_V2.md). Diff de esta entrega: [V2-PRIMERA-PRUEBA-CAMBIOS.diff](V2-PRIMERA-PRUEBA-CAMBIOS.diff). No se cambió facturación ni se sustituyeron assets aprobados.
