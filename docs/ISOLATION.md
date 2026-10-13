# Aislamiento — P01-local-01

## Estado actual

- `dev.html` carga 66 scripts locales ordenados; `index.html` usa un bundle propio. La interfaz visible tiene identidad SCP Survivor.
- CSP: scripts/estilos/imágenes del mismo origen; `connect-src 'none'`, `worker-src 'none'`, sin scripts inline ni formularios remotos.
- `G.LOCAL_TECHNICAL_MODE = true` habilita solamente el arranque de la escena P01; `G.PREPARATION_MODE = true` sigue bloqueando servicios. Cloud, social, multiplayer y signups permanecen en `false`; configuración/URLs Firebase/TURN/signups en `null`.
- `main.js` valida módulos y flags antes de iniciar; no llama a Flow/DB/login. No registra service worker. `sw.js` sigue inactivo y no borra cachés.
- Net mantiene TURN nulo y STUN vacío; Signups/Social/DB conservan sus guardas. Ninguna función se despliega. `.firebaserc` apunta solo a `demo-scp-survivor`; reglas Firestore/RTDB deniegan operaciones.
- Claves locales usan el namespace propio; no se ejecutó migración de guardados originales. Las pruebas usan contextos de navegador nuevos.
- Build local utiliza Terser con versión exacta y lock, sin descargar dependencias al ejecutar build. No se instalan dependencias de Functions ni herramientas de cloud.
- CNAME, objetivos de despliegue antiguos, financiación/contactos del autor y herramientas SEO antiguas solo figuran en referencias archivadas; no se activan. Copyright y procedencia se mantienen.

## Evidencia y límite

Chromium 154/Linux: dev y bundle, teclado y táctil emulado, pausa, foco/segundo plano, menú/reinicio, colisión y orientación. En los cuatro recorridos: **cero intentos remotos, cero errores y cero recursos HTTP fallidos**. El test registra solicitudes y bloquea cualquier destino diferente del servidor HTTP local; una tentativa remota habría hecho fallar la prueba. Los fallos simulados de módulo ausente/configuración de cloud inválida se comprueban por separado.

Esto acredita la versión y las rutas P01 ejecutadas. No acredita módulos de cuentas, economía, red o combate todavía inactivos, ni configuraciones futuras. Repetir la inspección al activarlos. Safari, teléfonos físicos, Firebase propio y publicación están pendientes de sus fases. No hay servicios de seguimiento ni nube activados.

La referencia original permanece intacta y la copia propia no tiene `.git`; entrega manual, sin commits ni ramas.
