# ENSAYO-POD-001 r2 — extras propios y compatibilidad

24/10/2026 · Corrección de PROGRAMACION tras revisión de ESTRUCTURA sobre LOT-EST-005r1. Conserva el lote, las decisiones24–29 y las reglas de garantía/cupos; sustituye únicamente el primer perfil de poderes de ENSAYO-GRI-001r1. No aprobación final de catálogo o balance.

Se detectaron dos incumplimientos: el extraMAX multiplicaba todos los daños por1,3 y el premio mezclaba poderes ajenos sin una tabla de compatibilidad. Se elimina ese multiplicador y se concreta una tabla mínima: **cada BIO entrega solo su poder propio**. Una oferta puede tener una sola opción válida; tres es el máximo. Duplicado mejorable asciende; propioMAX concede el apoyo táctico existente de saturación. Un cuarto nuevo mantiene rechazo/reemplazo pausado y comienza en rango1.

| Anomalía / poder compatible | Rangos1–5 conservados | ExtraMAX propio, acotado |
|---|---|---|
| Esporario / Pulso de esporas | 12daño base,4s,radio160 | +40u de radio:200. Sin multiplicador de daño adicional |
| Larva / Cápsula vítrea | 18base,3,5s,alcance420 | Perfora1blanco adicional. Trayectoria y daño de rango5 conservados |
| Malla / Tensión orgánica | 14base,5s,radio240,hasta3blancos | Un cuarto blanco máximo |
| Portador / Salva espinosa | 9base por proyectil,5s,alcance400,5espinas | 7espinas; mismo daño por proyectil de rango5 |
| Huésped / Brote de cuarentena | 20base,6s,radio210,hasta8blancos | Un único eco a0,45s en el punto del primer pulso; mismo daño de rango5, sin repetición recursiva |

Los rangos2–5 mantienen +18%de daño base por rango, identificado como cifra de ensayo. Los generales del jugador se aplican una sola vez. El eco es un efecto del mundo: queda congelado si pertenece al origen, no golpea desde allí a la sala; al retornar restaura su tiempo restante. Reemplazar el poder retira también ecos/proyectiles suspendidos; morir/reiniciar limpia todo.

Pruebas dirigidas: compatibilidadexacta y saturaciónMAX; alcance200 frente a160, perforación0→1sin aumento de daño,3→4blancos,5→7espinas y eco único suspendido/restaurado sin tercer pulso. La prueba usa enemigos reales del juego con vida/control de tiempo de QA; no certifica balance.

La ampliación de NPC conserva14personalidades y usa un recuerdo general de casaV2 en calmaD1–D4, una vez por recinto. No asigna el perro/familia de otro perfil. Papel amarillo/pasillos requieren tags verdaderos de la sala: las composiciones actuales no los tienen y no disparan esas frases. Las burbujas se limitan al área visible, priorizando HUD/controles/telegráficos. El NPC agotado puede seguir hablando una vez avisada su munición; no vuelve a disparar ni se recarga. Sin voz ni sonido nuevo.
