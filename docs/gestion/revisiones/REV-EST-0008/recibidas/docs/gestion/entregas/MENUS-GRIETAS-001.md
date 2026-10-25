# MENUS-GRIETAS-001 — Lectura y entrada de grietas

**Fecha:** 24/10/2026 · **Área:** MENUS  
**Estado:** requisitos de interfaz para la integración LOT-EST-005 r1. No es aprobación visual ni cambia reglas maestras.

## Referencias de interfaz y evidencia

- HUD vigente de INC-VIS-001 r1 / 0.35: [incidencia](../INC-VIS-001.md) y [informe de PROGRAMACION](../informes/INC-VIS-001-programacion.md). La referencia vigente reúne personaje, reloj y pausa; vida, nivel/XP y objetivo/localizador. Munición y habilidades siguen en sus controles.
- Estilo y comportamiento móvil ya aprobados: [MEN-001, MEN-002 y MEN-003](../../PAUTA_MENUS.md). Sirven de referencia visual/operativa; no constituyen aprobación de un HUD in-game nuevo. MEN-005-A/B/C sigue sin elección y no se aplica aquí.
- Mecánica y estados del ensayo: [Prueba jugable de grietas LOT-EST-005 r1](../../PRUEBA_GRIETAS_INTEGRALES.md) y [registro de implementación](../REGISTRO_IMPLEMENTACION.md). Esta ficha no duplica sus resultados.
- Identidades D1–D5: [Anomalías biológicas V2](../../ANOMALIAS_GRIETAS_VERSION_2_BIOLOGICA.md). Reglas de burbujas: [Diálogos de compañeros para grietas](../../DIALOGOS_COMPANEROS_GRIETA_V1.md). La implementación conserva allí sus dueños de área.

## Requisitos de lectura y entrada

1. **Entrada e identificación.** Mantener el ingreso por contacto/cruce de la grieta abierta; no agregar botón, tecla, confirmación ni espera. Al entrar, mostrar el grado y el nombre de la anomalía presente:
   
   | Grado | Identificación |
   | --- | --- |
   | D1 | BIO-01 · Esporario Blanco |
   | D2 | BIO-02 · Larva de Vidrio |
   | D3 | BIO-03 · Malla Tendinosa |
   | D4 | BIO-04 · Portador de Espinas |
   | D5 | BIO-05 · Huésped de Cuarentena |

   No mostrar porcentajes de aparición como si fueran dificultad del encuentro.

2. **Relojes separados.** Diferenciar el reloj del mapa de origen del reloj propio del recinto; mostrar cada uno con su contexto y restante, sin sustituir ni duplicar el reloj global. En ENSAYO-GRI-001 r1, el aviso de retirada ocurre a 1:15 y la única ventana se abre a 1:30 por cinco segundos activos (hasta 1:35). Señalar claramente esa ventana; vencida, no vuelve a abrirse. Los valores son de ensayo, no balance final.

3. **Burbujas y telegráficos.** Como máximo una burbuja a la vez, dentro de pantalla y sin cubrir jugador, controles, radar, reloj, anomalía ni señales de ataque. El telegráfico y la retirada tienen prioridad visual; no se conserva ni reproduce después una burbuja táctica caducada. El texto debe entenderse sin sonido.

4. **Elección del cuarto poder.** Se mantienen hasta tres poderes activos y sin botón de activación manual. Al ofrecerse un cuarto, pausar la partida y presentar la oferta junto a los tres poderes actuales para que Iván pueda rechazarla o sustituir uno. La elección no agrega una cuarta ranura; el poder reemplazado pierde sus efectos. Mostrar los poderes y rangos adquiridos al consultar pausa/equipo, como indica el ensayo.

## Criterios de revisión

- La entrada se entiende con los controles actuales y distingue cada BIO por grado y nombre.
- El reloj local y el del mapa no se confunden; la ventana de salida de cinco segundos se identifica y no tapa controles ni telegráficos.
- Ninguna burbuja oculta una señal de ataque; pausa/elección detienen el tiempo activo del encuentro.
- El cuarto poder no se aplica automáticamente ni deja efectos del poder sustituido.

## Límites y dependencias

ESTRUCTURA conserva la autoridad sobre reglas, tiempos de ensayo y poderes; NIVELES, sobre patrones y telegráficos; PERSONAJES, sobre contenido y prioridad de diálogos; PROGRAMACION, sobre integración y evidencia. La ficha no cambia sus pautas ni encarga otra propuesta visual. No modifica ni decide MEN-005.
