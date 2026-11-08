# Bitácora — Jardín Juana Paula Manso

Estado del sitio y todo lo que falta. Actualizado 2026-10-21.
Este archivo NO es el sitio; es la lista de trabajo. Anotar acá antes de tocar `index.html`.

---

## Estado actual

- Sitio de dos páginas (`index.html` e `informacion.html`), HTML/CSS/JS a mano, sin build.
- Panel propio en `admin/`: acceso y edición con estilo del jardín; no debe abrir Decap ni el dashboard de Netlify.
- Archivos vivos: portada `index.html`, información institucional `informacion.html`, datos editables `content/site.json` y fuente institucional `Jardín-informacion.md`.
- `index.html` es UTF-8 con BOM. Editar con las herramientas de lectura y edición; nunca con `Set-Content -Encoding UTF8` de PowerShell (puede romper los acentos).
- Publicado: repo `https://github.com/nievajuan6-svg/JPM_JARDIN` (público, rama `main`) → Netlify `https://jpmjardin.netlify.app/`.
- Secciones: `#inicio` (hero), `#jardin` (4 bloques), `#proyectos` (carrusel), `#testimonios` (Familias), `#contacto` (datos + mapa), `#mas-fotos` (carrusel de fotos), `referencias` (Artículos y referencias), footer.
- Fotos: reales en `images/webp/` (webp, hasta 1500px, q82); originales `.jpeg`/`.JPG` en `images/`, sin borrar.
- Favicon + apple-touch-icon + `og-jardin.jpg` (Open Graph) cargados.
- El contenido del sitio y el nuevo panel aún deben publicarse en Netlify antes de probarlos en producción. No se hizo push en esta sesión.
- La autenticación y guardado reales del panel personalizado todavía no se pudieron probar con una sesión válida de Identity.

---

## PENDIENTE — textos NO son definitivos

- **Todos los textos del sitio son provisorios.** Falta que Juan los revise y los reescriba con la voz real del jardín.
- En particular, revisar:
  - Intro de "El jardín" y los 4 bloques (La naturaleza como aula / Ritmo y juego libre / Los chicos participan / Comunidad y familias).
  - Descripciones de cada proyecto del carrusel.
  - Los **testimonios de Familias** son de ejemplo, no reales: reemplazar por testimonios ciertos de las familias (con su permiso).
  - Pies de foto (`foto-pie`) y los textos del hero.

---

## DATOS CONFIRMADOS POR JUAN — contacto y ubicación

- [x] Ubicación: Rosario Vera Peñaloza s/n, Las Ensenadas; a 10 minutos de Unquillo (no 10 metros).
- [x] Contacto: María del Pilar Ruiz, directora; WhatsApp `+54 9 3516 50-6866` (`5493516506866` para el enlace).
- [x] Horario de atención: de 9 a 12, por la mañana.
- [x] Consultas e inscripciones: se comunican por WhatsApp.
- [x] Salas múltiples: 3 y 4 años, y 4 y 5 años.
- [x] María Inés Avaca corresponde a la sala de 3/4; Ivana Laura Reynoso es profesora de Educación Física.
- [x] La trayectoria de dirección se conserva como está redactada; Juan confirmó que se entiende correctamente.

## PENDIENTE — otros datos institucionales

- [ ] Confirmar si hay email o redes oficiales del jardín para agregarlos (no se inventaron).
- [ ] Confirmar nombre oficial completo y número de escuela / CUE, si corresponde.
- [ ] Confirmar que el plus code QM94+JH y su link de Google Maps señalan el lugar correcto.
- [ ] Obtener coordenadas precisas para reemplazar las estimadas del JSON-LD y revisar `openingHours`; no presentarlas como datos confirmados.
- [ ] Confirmar si corresponde mencionar Barrio Cabana en los metadatos o si toda referencia pública debe usar Las Ensenadas. No mezclar ambas ubicaciones sin confirmación.

---

## PENDIENTE — información para la INSCRIPCIÓN

Falta una sección que le diga a los padres TODO lo que necesitan saber para inscribir a un chico. Hoy la sección "Inscripciones y visitas" solo tiene dirección, teléfono, horario y mapa: es poco.

Cosas a definir y publicar (confirmar con Juan cuáles aplican y con qué detalle):

- [ ] **Edades / salas** que tiene el jardín (sala de 3, 4, 5, etc.) y qué sala corresponde a cada edad.
- [ ] **Requisitos de inscripción**: qué documentos y datos hacen falta (partida de nacimiento, DNI, libreta de vacunación, comprobante de domicilio, etc.).
- [ ] **Cómo es el proceso**: pasos, si hay entrevista previa, visita, formulario, listas de espera.
- [ ] **Fechas / período de inscripción** y de matriculación.
- [ ] **Vacantes**: cómo se asignan y qué hacer si no hay lugar.
- [ ] **Gratuidad / costos**: aclarar que es de gestión estatal (sin arancel) y si hay algún gasto (cooperadora, uniforme, materiales).
- [ ] **Comedor / alimentación**: si tiene comedor, merienda, vianda, qué se sirve y quién lo organiza. (Juan lo mencionó: confirmar y redactar.)
- [ ] **Jornada**: horarios de entrada y salida, si hay doble jornada o jornada extendida.
- [ ] **Qué traer / qué se necesita** el primer día (mochila, cambios de ropa, etc.).
- [ ] **Adaptación**: cómo se trabaja el período de inicio.
- [ ] **Contacto para inscribirse**: a quién llamar / dónde ir.
- [ ] **Transporte / accesibilidad** si aplica.

> Idea pendiente (NO hacer sin OK de Juan): los datos del artículo de IFTS1 mencionan comedor, accesibilidad y jornada extendida, pero son texto genérico de directorio, sin confirmar. NO copiarlos al sitio; usar solo lo que Juan confirme.

---

## PÁGINA INSTITUCIONAL

- [x] Se creó `informacion.html` para la información institucional ampliada, con navegación desde la portada.
- [x] La página lee `Jardín-informacion.md`, que funciona como fuente rectora de los textos institucionales.
- [ ] Revisar el resultado visual en navegador después de publicar.
- [ ] Agregar información adicional (por ejemplo, requisitos de inscripción o preguntas frecuentes) solo cuando el jardín la confirme.

---

## PENDIENTE — otros

- [ ] Aclarar gestión: es **escuela rural y estatal**, depende de la **Municipalidad de Unquillo**, barrio **Cabana** (Sierras Chicas). Ya está en meta description, OG, Twitter, JSON-LD, intro de "El jardín", hero y footer. Revisar que quede coherente y exacto.
- [ ] Confirmar la **orientación pedagógica** redactada (sin nombrar corrientes; el jardín no es "Waldorf declarado", no agregar esa palabra).
- [ ] Reemplazar/completar **"Artículos y referencias"** con más links cuando Juan los pase.
- [ ] Revisar el **Open Graph cacheado** (WhatsApp/IG) con Facebook Debugger → "Scrape Again".
- [ ] Actualizar `CLAUDE.md` (describe secciones viejas: habla de carrusel en Proyectos, no refleja hero/header/mobile/favicon/estatal/proyectos actuales).
- [ ] Revisar el sitio en el navegador **al final** y **preguntando a Juan primero** (regla del proyecto).

---

## Reglas de trabajo de este proyecto

- Nunca agregar nada que Juan no haya pedido. Si parece útil algo extra, preguntar antes.
- No mencionar "Waldorf" en los textos.
- Sin comentarios en el código.
- Sin build ni dependencias; JS puro.
- `index.html` es UTF-8 con BOM: cuidado con los acentos al editar.
- No tocar `especificaciones_y_prompts_de_dise_o.md` sin pedido de Juan.

---

## Registro de trabajo — 2026-10-21

### Actualización y aclaraciones de contenido

- Se actualizó el contenido de la web y el documento `Jardín-informacion.md` siguiendo las precisiones de Juan: distancia de 10 minutos desde Unquillo, contacto de la directora, horario de atención de 9 a 12, consultas e inscripciones por WhatsApp, asignación correcta de salas y docente de Educación Física.
- Se incorporó `informacion.html` para que los textos institucionales extensos no recarguen la portada.
- Se indicó mantener la redacción original salvo correcciones ortográficas o inconsistencias verificadas con Juan. No agregar la palabra «Waldorf».

### Navegación y acceso administrativo

- Se agregó el enlace «Ingresar» al menú de la portada y de la página institucional, con estilo acorde a la estética del jardín.
- Se igualó la barra de navegación entre ambas páginas y se conectó el botón «Salir» a Netlify Identity; debe aparecer solo durante una sesión activa.
- Se agregó y luego quitó una autorredirección en `admin/index.html` que podía recargar el panel durante el login. La portada conserva la redirección al panel cuando el acceso se inicia allí.
- En el sitio publicado se comprobó que `/admin/` entregaba el archivo administrativo, pero no se pudo confirmar con una cuenta autenticada el destino final del login. Tener presente que el código local no se refleja hasta publicar un deploy.

### Panel propio para docentes y directivas

- Juan indicó que el panel debe ser propio, permanecer dentro del sitio, evitar Decap y el dashboard de Netlify, y ser muy simple para maestras y directoras: subir foto, editar título y texto, y actualizar datos del jardín.
- Se reemplazó la interfaz inicial de `/admin/` por una pantalla de acceso con la estética del jardín y accesos separados para portada e información.
- Se está implementando un editor visual propio en `admin/editor.html` y `admin/editor.js`. La intención es editar títulos, textos, contacto y horario; subir o reemplazar imágenes; y agregar, quitar u ordenar bloques, proyectos y fotos del carrusel. La información institucional se presenta como texto editable visualmente.
- Se eliminó la configuración `admin/config.yml` y la carga de Decap CMS. El editor propio usa Netlify Identity para autenticar y Git Gateway para leer/guardar archivos en `content/site.json`, `Jardín-informacion.md` e `images/uploads/`; Netlify queda como servicio de autenticación y almacenamiento Git, no como interfaz de edición.
- La interfaz se armó con etiquetas en español y controles enfocados en tareas habituales, sin pedir a las docentes que editen JSON o código.

### Verificaciones y tareas para la próxima sesión

- [x] Se verificaron sintaxis de los scripts, formato JSON del contenido, ausencia de referencias al runtime de Decap y respuesta HTTP local de `/admin/`, `admin/editor.html`, `admin/editor.js` y `content/site.json`.
- [ ] Publicar estos cambios en Netlify mediante push/deploy.
- [ ] Probar el inicio de sesión desde `/admin/` con una cuenta invitada y confirmar que permanezca en el dominio del jardín.
- [ ] Probar lectura y guardado real del contenido, carga de imagen, actualización de la portada y publicación automática del deploy.
- [ ] Si Git Gateway rechaza la petición, revisar en Netlify que Identity esté habilitado, que las cuentas estén confirmadas/invitadas y que Git Gateway tenga conexión al repositorio.
- [ ] Probar el panel en móvil y revisar sus instrucciones con una maestra o directora para verificar que el flujo sea realmente simple.

**Estado al cerrar:** trabajo local; sin push. El panel propio está implementado a nivel de interfaz y flujo de código, pero la autenticación y el guardado en producción quedan pendientes de la primera prueba después del deploy.
