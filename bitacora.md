# Bitácora — Jardín Juana Paula Manso

Estado del sitio y todo lo que falta. Actualizado 2026-10-20.
Este archivo NO es el sitio; es la lista de trabajo. Anotar acá antes de tocar `index.html`.

---

## Estado actual

- Sitio de una sola página, HTML/CSS/JS a mano, sin build ni dependencias.
- Archivo vivo: `index.html` (UTF-8 con BOM). Editar con `Read`/`Edit`/`Write`; nunca con `Set-Content -Encoding UTF8` de PowerShell (rompe los acentos).
- Publicado: repo `https://github.com/nievajuan6-svg/JPM_JARDIN` (público, rama `main`) → Netlify `https://jpmjardin.netlify.app/`.
- Secciones: `#inicio` (hero), `#jardin` (4 bloques), `#proyectos` (carrusel), `#testimonios` (Familias), `#contacto` (datos + mapa), `#mas-fotos` (carrusel de fotos), `referencias` (Artículos y referencias), footer.
- Fotos: reales en `images/webp/` (webp, hasta 1500px, q82); originales `.jpeg`/`.JPG` en `images/`, sin borrar.
- Favicon + apple-touch-icon + `og-jardin.jpg` (Open Graph) cargados.

---

## PENDIENTE — textos NO son definitivos

- **Todos los textos del sitio son provisorios.** Falta que Juan los revise y los reescriba con la voz real del jardín.
- En particular, revisar:
  - Intro de "El jardín" y los 4 bloques (La naturaleza como aula / Ritmo y juego libre / Los chicos participan / Comunidad y familias).
  - Descripciones de cada proyecto del carrusel.
  - Los **testimonios de Familias** son de ejemplo, no reales: reemplazar por testimonios ciertos de las familias (con su permiso).
  - Pies de foto (`foto-pie`) y los textos del hero.

---

## PENDIENTE — chequear TODA la información de contacto

Hay que confirmar cada dato con Juan / con el jardín antes de darlo por bueno:

- [ ] **Dirección exacta**. Hoy figura "Rosario Vera Peñaloza, Las Ensenadas S/N". Confirmar calle y, sobre todo, si corresponde **Las Ensenadas** o **Barrio Cabana** (el hero y el footer ya dicen Cabana). Quedó inconsistente a propósito hasta confirmar.
- [ ] **Teléfono** 03543 48-7963 — confirmar formato y que sea el número correcto.
- [ ] **WhatsApp** — confirmar que ese número tiene WhatsApp y que es el canal de consultas.
- [ ] **Horario**. Hoy dice "Lunes a viernes, 08:00–16:30" y "Cierra a las 4:30 p. m.". Confirmar horario real y si hay horarios distintos por sala/turno.
- [ ] **Plus code** QM94+JH y **link de Google Maps** — verificar que apunten al lugar correcto.
- [ ] **Geocoordenadas del JSON-LD** (lat/long) — hoy son estimadas; reemplazar por las reales.
- [ ] **`openingHours` del JSON-LD** — hoy estimado; ajustar al horario real.
- [ ] **Email / redes** — ver si el jardín tiene correo, Instagram, Facebook, etc. Hoy no figuran.
- [ ] **Nombre oficial completo** de la institución y **número de escuela / CUE** si corresponde.

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

## PENDIENTE — página aparte con información más específica "para leer"

- [ ] Crear una **segunda página** (archivo nuevo, p. ej. `informacion.html`) para el contenido largo, que en la home solo se enlaza desde un botón/ítem.
- [ ] Debe usar el mismo estilo visual (acuarela, Caveat + Nunito, verdes/terracota/mostaza) y el mismo header/footer para no romper la identidad.
- [ ] Contenido a definir con Juan: propuesta pedagógica extensa, cómo es un día en el jardín, comedor, proyectos en detalle, historia del jardín, preguntas frecuentes, etc.
- [ ] Enlazarla desde el menú o desde la sección de inscripción ("Más información").
- [ ] Definir si el menú cambia en la página nueva (mismos anchors no aplican) y cómo vuelve a la home.

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
