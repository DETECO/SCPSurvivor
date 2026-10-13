# Aislamiento de la preparación

- index.html, dev.html y 404.html no habilitan scripts ni conexiones: CSP script-src none y connect-src none.
- La interfaz original de dev.html está dentro de template; solo se muestra el aviso estático de preparación.
- js/app.min.js original se omite. No puede reactivar los servicios anteriores desde index.html.
- firebase-config.js establece preparación activa, funciones remotas desactivadas y URLs/configuración nulas.
- main.js retorna antes de arrancar o registrar service worker; db.initCloud bloquea configuración y descargas del SDK.
- Signups exige un flag explícito y URL propia. Net tiene TURN nulo, STUN vacío y guardas de apertura. Social.start queda desactivado.
- sw.js no registra listeners ni borra cachés. Las claves literales ps.* pasan a scp-survivor.*; no se ejecuta migración ni se toca almacenamiento del navegador.
- .firebaserc apunta a demo-scp-survivor. No hay objetivo Hosting, RTDB, Functions o Cloudflare preparado para desplegar. Firestore/RTDB deniegan lectura/escritura; functions/index.js no exporta handlers.
- Herramientas de descarga/dominio/SEO y Cloudflare originales se conservan como referencia .txt. tools/build.js queda bloqueado por PREPARATION_ONLY antes de npx.
- No hay CNAME/sitemap activos, donaciones ni contacto del autor en configuración UI. Los enlaces de proyecto apuntan a DETECO/SCPSurvivor; la atribución conserva la fuente real.

Estas son comprobaciones de estructura y texto. No se han ejecutado navegador, inspección de tráfico, compilación, scripts del repositorio ni emuladores. No se certifica funcionamiento por ejecución.

Se usa una carpeta independiente sin .git para no alterar la referencia. Instalación, TDD del juego, commits, scripts de habilidades y despliegues quedan fuera del alcance estático aprobado. Los sistemas funcionales permanecen para adaptación posterior.
