# Guía de traspaso — Sitio del Jardín Juana Paula Manso

Esta guía está escrita para alguien que **no sabe programar**. Explica qué es el sitio, cómo funciona, cómo se edita y qué hacer si algo se rompe. No contiene claves ni contraseñas: esas las tiene quien administra el proyecto (ver "Datos que hay que pedir").

---

## 1. Qué es esto, en simple

- Es la página web del jardín: **https://jpmjardin.netlify.app/**
- Son archivos simples (HTML, CSS, JS), **sin base de datos ni programas raros**.
- Los archivos viven en **GitHub** (el "depósito" del proyecto): `https://github.com/nievajuan6-svg/JPM_JARDIN` (si el proyecto se transfirió, la dirección tendrá otro usuario).
- **Netlify** toma esos archivos y los publica en internet. Cada vez que cambia algo en GitHub, Netlify vuelve a publicar solo, en 1 o 2 minutos.

```
Maestra edita en /admin/  →  se guarda en GitHub  →  Netlify publica  →  se ve en la web
```

Los dos servicios son gratuitos.

---

## 2. Cómo se editan las novedades y los textos (para la maestra y los directivos)

1. Entrar a **https://jpmjardin.netlify.app/admin/** (también hay un botón "Ingresar" en el menú del sitio).
2. Tocar **Editar la portada** (o **Editar información** para la parte institucional).
3. Escribir **usuario y contraseña**. En esa computadora o celular se recuerdan.
4. Elegir la pestaña que se quiere cambiar (por ejemplo **Novedades**).
5. Cambiar lo que haga falta y tocar **Guardar cambios**.
6. Esperar 1 o 2 minutos y recargar la página (en la PC: `Ctrl + F5`).

### Novedades
- **+ Agregar novedades** crea una nueva, que queda **arriba de todas**.
- Cada novedad tiene título, fecha (opcional), texto (opcional) y **fotos (una o varias)**.
- Con **+ Agregar fotos** se pueden elegir varias fotos juntas desde la galería. Se suben solas y se achican.
- Con 1 foto se muestra al costado del texto; con varias, en una grilla. Al tocar una foto se abre en grande.
- Para borrar una novedad: botón **Quitar**. Para ordenar: flechas ↑ ↓.
- Si no queda ninguna novedad, la sección desaparece sola de la web.

### Consejos para quienes editan
- Guardar **una vez cuando terminan**, no tras cada foto, para no generar publicaciones de más.
- No hace falta achicar las fotos antes: el panel lo hace.
- Si dos personas editan a la vez y una recibe un error, que recargue la página y repita el cambio.

---

## 3. Qué hay en cada archivo (mapa del proyecto)

| Archivo o carpeta | Para qué sirve |
|---|---|
| `index.html` | La página principal (diseño y estructura). |
| `informacion.html` | La página de información institucional. |
| `content/site.json` | **Todos los textos y fotos editables** de la portada (lo que cambia el panel). |
| `Jardín-informacion.md` | El texto de la página de información institucional (también lo edita el panel). |
| `content-loader.js` | Lee `site.json` y arma las secciones en la web. |
| `admin/` | El panel de edición (pantalla de acceso y editor). |
| `netlify/functions/git.mjs` | La "pieza segura" que verifica usuario y contraseña y guarda los cambios en GitHub. |
| `netlify.toml` | Le dice a Netlify dónde está esa pieza. |
| `images/webp/` | Fotos del sitio ya optimizadas. |
| `images/uploads/` | Fotos que sube el panel. |
| `bitacora.md` | Lista de tareas y datos pendientes del jardín. |
| `README.md` | Resumen técnico y de configuración. |

> Importante: **`content/site.json` y `Jardín-informacion.md` los modifica el panel.** Si se editan a mano, hacerlo con cuidado (una coma de más rompe el sitio) y mantener la codificación UTF-8 para que los acentos se vean bien.

---

## 4. Las cuentas y variables que hacen funcionar el panel

El panel necesita dos "secretos" guardados en Netlify (no están en el repositorio, por seguridad):

| Variable | Qué es |
|---|---|
| `EDITORS` | Las personas que pueden entrar al panel. Formato: `nombre:clave,nombre2:clave2` (ejemplo: `maria:Sol2026,ana:Luna2026`). Sin espacios; las claves no pueden llevar comas. |
| `GITHUB_TOKEN` | Un permiso de GitHub que deja guardar cambios en este repositorio. Es un texto largo que empieza con `github_pat_`. |
| `GITHUB_REPO` (opcional) | Solo si el repositorio cambia de dueño o nombre. Formato `usuario/repositorio`. |

Dónde se cargan: **Netlify → el sitio → Project configuration → Environment variables**. Después de cambiar una variable hay que ir a **Deploys → Trigger deploy** para que tome el cambio.

### Agregar, quitar o cambiar a una persona
1. Netlify → Environment variables → editar `EDITORS`.
2. Agregar o quitar el par `usuario:clave` (separados por comas).
3. **Trigger deploy**.

### Crear o renovar el token de GitHub
Hace falta cuando se cambia de dueño, o cuando el token vence (en ese caso el panel avisa "GitHub no aceptó el permiso").
1. Iniciar sesión en GitHub con la cuenta **dueña del repositorio**.
2. Ir a **https://github.com/settings/personal-access-tokens/new** (o: foto de perfil → Settings → al final del menú izquierdo "Developer settings" → Fine-grained tokens → Generate new token).
3. Nombre: `jardin-panel`. Vencimiento: el más largo posible (sin vencimiento si se puede).
4. **Repository access** → *Only select repositories* → elegir `JPM_JARDIN`.
5. **Permissions → Repository permissions → Contents → Read and write**.
6. **Generate token** y copiarlo (se muestra una sola vez).
7. Pegarlo en Netlify como valor de `GITHUB_TOKEN` y hacer **Trigger deploy**.
8. Anotar en un calendario la fecha de vencimiento, con aviso 10 días antes.

---

## 5. Cómo se traspasa el proyecto a otra persona

Quien lo recibe necesita una cuenta de GitHub y una de Netlify (ambas gratuitas).

1. **El repositorio:** quien entrega va a GitHub → el repo → **Settings → General → Danger Zone → Transfer ownership**, y lo pasa a la cuenta nueva. Se lleva todo el historial.
   - Alternativa: descargar un ZIP (botón verde **Code → Download ZIP**) y subirlo a un repositorio nuevo.
2. **El sitio en Netlify:** la persona nueva entra a Netlify → **Add new site → Import an existing project → GitHub** y elige el repositorio. Configuración: dejar el comando de build vacío y la carpeta de publicación en `.`. (Alternativa: que quien entrega transfiera el sitio desde Netlify.)
   - Si crea un sitio nuevo, la dirección será distinta de `jpmjardin.netlify.app`. Se puede cambiar el nombre en *Site configuration → Change site name*. Si el sitio cambia de dirección, actualizar también las direcciones `jpmjardin.netlify.app` dentro de `index.html` (vista previa al compartir).
3. **El token y las variables:** la persona nueva crea **su propio token** (sección 4) y carga `GITHUB_TOKEN`, `EDITORS` y, si cambió el dueño o nombre del repo, `GITHUB_REPO`.
4. **Probar:** entrar a `/admin/` en una ventana de incógnito, cambiar algo chico, guardar y comprobar que aparece un commit en GitHub y el cambio en la web.
5. Quien entregó puede borrar su token en GitHub (Settings → Developer settings → Fine-grained tokens) una vez que todo funciona con el nuevo.

---

## 6. Qué mirar si algo falla

| Síntoma | Causa probable | Qué hacer |
|---|---|---|
| "Usuario o contraseña incorrecta" | Dato mal escrito o `EDITORS` mal cargado | Revisar `EDITORS` en Netlify (sin espacios, formato `nombre:clave`), hacer Trigger deploy. |
| "Faltan EDITORS y GITHUB_TOKEN" | Variables sin cargar o falta publicar | Cargarlas y hacer Trigger deploy. |
| "GitHub no aceptó el permiso" | Token vencido, borrado o sin permiso | Crear un token nuevo (sección 4). |
| Guardó pero no se ve el cambio | Netlify aún publicando, o caché del navegador | Esperar 2 minutos, recargar con `Ctrl + F5`. Revisar **Deploys** en Netlify. |
| Error al guardar con otra persona editando | Dos guardados a la vez | Recargar el panel y repetir el cambio. |
| La web se rompe después de editar a mano `site.json` | Falta una coma o comilla | Ir al historial de GitHub y volver al commit anterior (ver abajo). |
| Netlify avisa de límites o pausas | El plan gratuito tiene cupo de publicaciones | Cada guardado y cada foto es una publicación. Guardar de a una vez y revisar el aviso en Netlify. |

### Volver atrás un cambio
En GitHub → pestaña **Code → N commits** (historial). Abrir el commit con el problema y usar **Revert** (o copiar el contenido anterior del archivo). Todo cambio queda registrado con fecha y con el nombre de quien lo hizo (`(por maria)`).

### Ver quién cambió qué
`https://github.com/<usuario>/JPM_JARDIN/commits/main`. Cada guardado desde el panel termina con `(por usuario)`.

---

## 7. Cosas que conviene saber

- **No hay costos** mientras se usen los planes gratuitos de GitHub y Netlify.
- **El jardín no declara una corriente pedagógica** (por ejemplo, no se nombra "Waldorf" en los textos): los textos hablan de naturaleza, juego, arte y comunidad sin etiquetas.
- Hay **datos pendientes de confirmar** (email del jardín, redes, número de escuela, requisitos de inscripción, etc.) listados en `bitacora.md`.
- La **parte de diseño** (colores, tipografías) está en `index.html`; si no se sabe qué se está haciendo, mejor no tocarla. El panel permite cambiar todo el contenido sin tocar el diseño.
- **Respaldo:** el repositorio de GitHub es el respaldo de todo. Descargar un ZIP de vez en cuando es una buena copia extra.
