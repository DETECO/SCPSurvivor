# REV-EST-0008 — Arma aleatoria y munición ilimitada del compañero

25/10/2026 · Juanillo / ESTRUCTURA. **Decisión registrada y ejecución reencargada; sin recibo público final todavía.**

Fuente: mensaje directo de Iván en ESTRUCTURA, seguido de «Continua». ID individual no expuesto. Cita y contrato en [LOT-EST-005 r2](lotes/LOT-EST-005-r2.md). Autoriza comunicación entre hilos y elección de modelo/esfuerzo por Juanillo.

**EST-NPC-001 r1:** arma aleatoria y reserva ilimitada para el compañero de grieta. Sustituye reserva finita y AF01 única del ensayo anterior. Conservar cargadores/recarga, tasas por peligrosidad, rarezas, apoyo temporal, sin remate/XP/transferencia e incapacitación. Modelos iniciales de ensayo: pistol/smg/shotgun ya funcionales, sin aceptar su nuevo arte por extensión. El jugador ya usa recarga sin reserva consumible; verificarlo al integrar, sin convertirlo en disparo continuo sin cargador.

El hilo PROGRAMACION se encontró con estado `systemError` y su último turno fallido. Había código local de manejo de carga y alias parcialmente añadido, pero no `LOT-EST-005_PUBLICACION.json`; el informe seguía con publicación en preparación. Git del clon muestra commits1ecd5aa/65818cb/6badccf de entregas intermedias: no acreditan el cierre público de todo el lote. Se envió reanudación concreta con gpt-6.1-sol/alto para conservar el trabajo y completar pruebas/publicación, incorporando la decisión nueva.

El [corte de seis fuentes previo a esta decisión](revisiones/REV-EST-0008/MANIFIESTO.json) conserva control0.8 y lote005r1, reglas/ensayo anteriores y su validación. No se reescriben esos resultados como si ya probaran munición infinita o variedad de armas.

PERSONAJES entregó [reparación femeninaR2](entregas/PERSONAJES-GRIETAS-002.md): stride reparado y originales conservados, pero fuentes con poses irregulares/incompletas y montaje de arma sin certificar; `integrationReady=false`. No bloquea el apoyo amarillo. ARMAS R2.2 tiene48poses propuestas de Subfusil/Escopeta/Porra pendientes de aceptación; no se afirma que esas armas ya usan su arte final.

Cobertura: petición actual, estado reciente PROGRAMACION/PERSONAJES/ARMAS, código NPC y jugador, manifiesto femeninoR2, informe/validación de lote005 y git local del clon. La prueba pública final sigue pendiente; se preserva la evidencia local de dos recorridos de la revisión anterior.

## Suplemento concurrente — compañeras modulares R3

Se recuperó una orden humana posterior en PERSONAJES: «Soluciona como implementar esto que tienes pendiente, quiero implementar las compañeras de contencion,»; turno `01a17308-69b8-7c81-b676-37be76790edc`. Ese encargo directo autoriza la integración local que realizó el área, aunque la distribución anterior de tareas dejaba el runtime en PROGRAMACION. No atribuirle una modificación sin autorización ni revertirla por aplicar una frontera de coordinación anterior a ese mensaje.

[PERSONAJES-COMPANERAS-003](entregas/PERSONAJES-COMPANERAS-003.md) entrega fuentes modulares nuevas R3 derivadas de los diseños,36PNG, ocho vistas en16/32, dos brazos propios, rig y nombres femeninos, conservando R1/R2. Declara27pruebas y6casos de navegador, sin publicación ni aceptación artística final nueva. Se leyeron el informe y LEEME R3, pautaPERSONAJESr3, registro de apariencias y montaje del renderer; no se repitieron sus seis ensayos en esta lectura.

PROGRAMACION recibió la conciliación: conservar la integración R3 al actualizar arma/munición del NPC y comprobar los tres modelos balísticos con esos rigs; no usar el bloqueo técnico de R2 como estado de R3. **Los resultados R3 con AF01fija/munición finita son antecedentes anteriores a EST-NPC-001**, no prueba de variedad de armas o reserva infinita. El cierre público del conjunto sigue siendo único en PROGRAMACION.
