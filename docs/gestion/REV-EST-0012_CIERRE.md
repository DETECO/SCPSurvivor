# Cierre de REV-EST-0012 — jugabilidad y grietas

27/10/2026 · Juanillo / ESTRUCTURA · Control 0.15 · **Demo0.40.1 publicada y comprobada**. [Jugar](https://deteco.github.io/SCPSurvivor/?prueba=combate-v2&revision=0.40.1) · [guía vigente](../PRUEBA_JUGABILIDAD_008.md) · [recibo técnico](LOT-EST-008_PUBLICACION.json) · [validación independiente](LOT-EST-008_VALIDACION.json).

PROGRAMACION implementó LOT008 y publicó el primer corte0.40. La comprobación pública detectó un problema intermitente con la espera de las láminas C1; se corrigió en0.40.1 mediante precarga, reutilización y espera técnica30s, sin cambiar combate ni diseños. Runtime final `72969306342e84c2d012f2f3941a600c295d0250`, bundle público `92f07645d0`, 125scripts. Se conservan el primer corte y su comprobación incompleta como evidencia del incidente.

## Cambios consolidados y comprobados

- **Compañero:** vuelve vivo con la misma identidad, arma, HP y cargador; ayuda fuera, pasa de mapa y puede morir. Reserva ilimitada con recarga. La nueva permanencia de EST-JUG-001 sustituye el descarte anterior al salir.
- **Variedad y escala:** cinco BIO con sus cinco salas C1-r2, seis estilos independientes de portal y selector/ronda de práctica. El tamaño vertical del personaje se conserva en todos los mapas y recintos. C1-r2 queda aceptado visualmente por APR-003, consolidado en [AD01](REV-EST-0012_ADENDA_C1_R2.md); CON-NIV-08 resuelta en este alcance.
- **Combate y poderes:** BIO mayores y más resistentes, navegación comprobada con radios reales, tres ataques señalados; oleadas que aumentan por minuto/mapa. Se integran los cinco poderes elegidos R4 y sus diez atlas, con activación visible, máximo tres y cuarto reemplazable.
- **XP:** valores distintos por enemigo y cuatro cristales según valor, forma, color y tamaño. Totales y compactación exactos; el Custodio de la expedición deja un núcleo220. No se confunde con el reparto histórico de enemigos ajenos a contención.
- **Carga pública:** [AD02](REV-EST-0012_ADENDA_CARGA.md) documenta la guarda técnica y la solución; no modifica una decisión jugable. Una respuesta retenida15,17s reales terminó en combate con origen y HP congelados; archivo fallido y espera30s retornan sin premio.

## Cobertura real y continuidad

318/318 pruebas del juego y build/check en fuente/clon. PROGRAMACION verifica trece grupos públicos, incluidos diez encuentros BIO×16/32, y doce grupos de poderes;24/24 archivos públicos coinciden. Juanillo repite independientemente cinco entradas/victorias/premios/regresos, comprueba XP/cristales, compañero y escala; sin errores JS. Mantiene además su regresión de HUD en cuatro formatos y352montajes del corte de jugabilidad, sin atribuir esas pruebas al teléfono físico. [Informe con métodos y límites](informes/LOT-EST-008-juanillo.md).

Balance humano, D5 y teléfono físico siguen pendientes. Las cinco salas son fijas; sus variantes interiores procedurales no se declaran terminadas. Fusión/ARM-JUG-001 y servicios reales conservan sus límites: el siguiente lote de armas sigue documentado en [LOT002](lotes/LOT-EST-002-r1.md), con su gate cerrado; este cierre no lo implementa ni activa nuevas funciones por extensión.

Revisión incremental: ARMAS R4/R6, NIVELES hasta R7.9/APR-003, entrega PERSONAJES004 y la implementación/publicación LOT008. MENUS/SONIDO/ICONO conservan los cortes citados; no se declara otra lectura completa de sus conversaciones. Se preservan REV0012 original, AD01 y la guarda anterior en sus fuentes. [Corte documental previo al cierre](revisiones/REV-EST-0012-CIERRE/MANIFIESTO.json). Las53tareas y el52/100histórico permanecen; no representan un porcentaje calculado de V2.
