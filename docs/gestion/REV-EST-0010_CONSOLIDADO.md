# Consolidado incremental — REV-EST-0010

25/10/2026, fecha del cliente · Juanillo / ESTRUCTURA · Control0.12. **Consolidación local y cola de trabajo preparadas; no implementa ni publica funciones nuevas.** [Fuentes conservadas](revisiones/REV-EST-0010/MANIFIESTO.json).

## Estado real del proyecto

Hay una demo roguelite jugable publicada en0.38: avance por mapas, combate existente y sus premios de ensayo, radar/menús, cinco BIO16/32 en salas separadas, origen congelado/retorno, poderes anómalos de ensayo y apoyos con burbujas. El NPC sortea pistola/subfusil/escopeta, reserva infinita con cargador/recarga y tasas/rarezas vigentes. Soldados y apoyos muestran los sprites aceptados y montajeLOT006. [Recibo de grietas](LOT-EST-005_PUBLICACION.json) · [recibo de montaje](LOT-EST-006_PUBLICACION.json).

El código público sigue `4adf3bed24e9a2f3ecd69ce54db286f794e3cd94`, bundle `be687713b2`. El cierre documental autorizado ya está en `1143a4fb1fa5349d68c90c1de4f715fd8b9fb9da`; Pages confirma built y17/17documentos/capturas seleccionados coinciden porSHA256. El bloqueo de autorización anterior quedó resuelto. Esta lectura no repite las279pruebas de juego o los278hashes de recursos: consulta sus recibos y comprueba la publicación documental actual.

Es un prototipo funcional de ensayo, con balance/contenido/pruebas físicas pendientes. Las cuentas, persistencia, gacha y economía reales no quedan terminadas por publicar esta demo. Las diez categorías permanentes por soldado y las ultimates mantienen sus contratos/progresión pendientes de integración. El52/100 es histórico y no representa el avanceV2; no se inventa un porcentaje nuevo.

## Cobertura de las áreas y novedades

| Área | Revisado realmente | Resultado y siguiente dependencia |
|---|---|---|
| ARMAS | ResumenR3 idéntico aREV0009 y dos turnos recientes; seguimiento del turno activo | Armas faltantes aceptadas/montadas. Diez propuestas de poderesA/B sin elección. Iván autorizó publicar únicamente su visor privado y24PNG; el despliegue estaba en curso, sin convertirlo en elección o integración. No se replica ese visor privado en el repositorio público. |
| PERSONAJES | ÍndiceR3, entrega enlazada y dos turnos recientes, incluido reporte nuevo | Compañeras ya públicas porLOT005/006. Iván reporta piernas pequeñas respecto al cuerpo y pide revisar apoyos; reparación en curso en el área. No se acredita arreglada todavía. Mantener sprites/montaje aceptados y exigir regresión de seis humanos16/32 tras la corrección. |
| NIVELES | DiferenciasR7.4→R7.5, escala/entrega de grietas y dos turnos recientes | M01vigente240×160/cámara512. El estado antiguo «publicación no confirmada» se resuelve con recibos005/006; cinco salas ya públicas. Arte final, absorción detallada según portal, balance y matriz completa de variantes siguen pendientes. No sustituir los parámetros de ensayo por recomendaciones posteriores sin registrar revisión. |
| MENUS | Delta de pauta, ficha completaMEN005, láminaA y dos turnos recientes | **MEN-005-A r1 está aceptada** para prueba horizontal, cita «Apruebo la opción 1 por ahora .», mensaje `01a1730f-9ef3-7d11-abf2-81923ddf65f4`. No pedir otra elección. B/C siguen sin aceptar; adaptación deA aún sin evidencia de integración. [LOT007 preparado](lotes/LOT-EST-007-r1.md). |
| SONIDO | Pauta sin cambios frente aREV0007, inventario y dos turnos recientes | SON001aceptado e integrado según informe dePROGRAMACION/código. La frase antigua de la pauta «integración pendiente» no vence esa evidencia. NPCsinvoz y sin sonido característico final; cues de grieta provisionales. No se modificó la pauta del área. |
| ICONO APP | Pauta/hash sin cambios y dos turnos recientes | ICON-APP-001/R1 ya registrado en índice y revisiones; no falta volver a localizar aprobación. No es entrega nueva. No se repite la prueba física. |
| PROGRAMACION | Dos turnos recientes, aprobación deLOT006, informe completo de preparación de fusión ygate | Montaje aceptado por Iván y publicado. **384poses de katana/láser/F24 corresponden a un overlay aislado**, no fusión funcional. Gatecerrado. Revalidar el rig tras la reparación de piernas antes de integrar LOT002. |

Los turnos en curso no se dan por finalizados. El manifiesto fija las fuentes leídas y las conversaciones consultadas quedan resumidas en la cobertura conservada; no se afirma haber releído siete historiales completos. No se modifican las pautas de las especialidades.

## Coherencia y conflictos concretos

1. **HUD:** la aprobaciónA resuelve una elección que el corte anterior aún llamaba pendiente. La lámina no cambia categorías/estadísticas de cartas, cooldowns ni habilita una ultimate. Adaptar datos reales, no los números ilustrativos. Alcance inicial horizontal, con regresión vertical/PC.
2. **Proporciones y fusión:** la incidencia de piernas no revoca el arte aceptado ni significa que el montaje de armas no se aplicó. Puede cambiar el rig y sus puntos de unión: las384poses anteriores deben volver a comprobarse antes de abrir el gate. Es dependencia técnica, no una nueva aprobación de receta.
3. **Poderes:** el ensayo actual de cinco poderes propios sigue vigente. Publicar/comparar diez opcionesA/B no acepta ninguna ni autoriza reemplazar el comportamiento actual.
4. **Ultimates:** están aprobadas como sistema de cinco niveles permanentes y efectos variados, pero falta cerrar su relación con la habilidad del soldado y sus condiciones de uso antes de implementar. No se inventan controles/estadísticas por la nueva láminaHUD.
5. **Evidencia/estados:** se enlazan las publicaciones actuales para resolver frases anteriores «solo local»; se conserva su contexto histórico. El montajeLOT006 fue aceptado mediante «Aprueba. Y continua»; no equivale a balance, iPhone físico o aceptación de propuestas futuras.

No hay una nueva elección que impida cerrar esta consolidación. Las eleccionesA/B de poderes y el contrato concreto deultimate se tratarán al abordar esos bloques; el trabajo independiente puede seguir.

## Orden recomendado

1. Terminar la corrección de proporciones ya encargada enPERSONAJES; comprobar menú/combate/apoyos16/32 y conservar físicas/cámara/estadísticas. Registrar entrega técnica y actualización de evidencia antes de publicarla.
2. Implementar y probar MEN-005-A con el [LOT-EST-007r1](lotes/LOT-EST-007-r1.md) listo. Es independiente de la receta de fusión y no cambia reglas.
3. Retomar [LOT-EST-002r1](lotes/LOT-EST-002-r1.md): validar nuevo rig y ataquesCC04/TE01/F24, integrar estación/confirmación, transacción única y reposición. Las384poses son entrada de revisión, no permiso para saltar pruebas o abrir el gate.
4. Elegir poderesA/B cuando el visor privado esté disponible; después cerrar ultimate y su interacción con soldado. Gacha, progresión permanente y guardado requieren sus contratos/servicios y pruebas, no se conectan por esta consolidación.

**Lote preparado:**LOT007/HUD; conserva decisiones y recursos deMENUS. La fusión mantiene LOT002 y sus dependencias, sin crear una receta nueva. **Conflictos abiertos:** rig/piernas en reparación, poderesA/B sin elegir y especificaciónultimate incompleta. **Cobertura:** siete áreas, revisiones y turnos recientes declarados arriba. **Publicación vigente:**0.38; este consolidado queda local para coordinación y no cambia el juego público.
