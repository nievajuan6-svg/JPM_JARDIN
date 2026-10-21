Hola. Necesito agregar un panel de administración súper sencillo y gratuito a mi sitio web estático en HTML (que está alojado en Netlify) para que una persona sin conocimientos técnicos pueda actualizar los proyectos, fotos y datos de contacto (como el teléfono o dirección) sin tocar código. 

Quiero utilizar **Static CMS** (el sucesor de Netlify CMS). Por favor, ayúdame a realizar los siguientes 3 pasos en mi repositorio:

1. **Crear la estructura del CMS:**
   - Crea una carpeta llamada `admin` en la raíz del proyecto.
   - Dentro de esa carpeta, crea un archivo llamado `index.html` con la estructura básica que carga el script del CMS de Static CMS.
   - Dentro de la misma carpeta `admin`, crea un archivo de configuración llamado `config.yml`.

2. **Configurar el `config.yml`:**
   - Configura el backend para que use `git-gateway` (conectado a Netlify).
   - Define una colección editable para los **Proyectos** (con campos para: Título del proyecto, Descripción, Foto principal y Pie de foto).
   - Define un archivo de configuración global o colección para los **Datos de Contacto** (Teléfono de WhatsApp, Dirección, Horarios) de modo que la directora pueda cambiarlos fácilmente si cambian los directivos.

3. **Verificar dependencias:**
   - Asegúrate de que no falte ninguna directiva o etiqueta en el archivo principal `index.html` de la web para que todo quede listo para activar Netlify Identity.

Por favor, dame los códigos exactos para los archivos `admin/index.html` y `admin/config.yml`.