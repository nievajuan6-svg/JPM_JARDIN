# Jardín Juana Paula Manso

Sitio web del Jardín Juana Paula Manso (Las Ensenadas, Unquillo, Córdoba).

Static HTML/CSS/JS, sin build. El contenido editable se guarda en `content/site.json` y `Jardín-informacion.md`; el panel de administración está en `/admin/`.

- **Ver:** abrir `index.html` en el navegador.
- **Fotos:** `images/webp/` (webp optimizadas).
- **Estilo:** acuarela, tipografías Caveat + Nunito, paleta verde/terracota/mostaza.

## Panel de administración

El panel utiliza **Decap CMS** con Netlify Identity y Git Gateway. Static CMS, indicado en un borrador anterior del plan, está archivado y sin mantenimiento; Decap es el proyecto actualmente mantenido para este flujo.

Una vez conectado el repositorio con Netlify:

1. En el panel de Netlify, habilitar **Identity** para el sitio.
2. En Identity, configurar el registro como **Invite only** e invitar a las personas autorizadas.
3. Habilitar **Git Gateway** en los servicios de Identity.
4. Esperar a que Netlify publique la versión que contiene `admin/`, y abrir `https://jpmjardin.netlify.app/admin/`.

Desde **Portada** se editan los textos de la portada, bloques con fotos, proyectos, textos de Familias, contacto/inscripciones, galería, pie y referencias. Las listas permiten agregar, borrar y reordenar elementos; las fotos se suben al repositorio en `images/uploads/` y se optimizan a WebP. Desde **Información institucional** se editan los títulos, listas y textos largos de `Jardín-informacion.md`; esa misma fuente se muestra en `informacion.html`.

Los cambios se guardan como commits en `main` y Netlify vuelve a publicar el sitio. Al eliminar una foto de una lista se quita su referencia del contenido; el archivo de imagen ya guardado en el repositorio puede borrarse por separado desde la biblioteca multimedia si ya no se usa. No habilitar el registro público de cuentas.

Para probar localmente el sitio y su contenido editable, ejecutar `python -m http.server 8000` desde la carpeta del proyecto y abrir `http://localhost:8000/`. La autenticación y guardado del panel requieren la configuración de Netlify descrita arriba.
