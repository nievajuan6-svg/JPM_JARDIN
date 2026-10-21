(async function () {
  const contenidoUrl = 'content/site.json';

  function leerCampo(objeto, ruta) {
    return ruta.split('.').reduce((valor, clave) => valor && valor[clave], objeto);
  }

  function ponerTexto(selector, valor) {
    const elemento = document.querySelector(selector);
    if (elemento && typeof valor === 'string') elemento.textContent = valor;
  }

  function ponerUrlSegura(elemento, atributo, valor) {
    if (!elemento || typeof valor !== 'string') return;
    try {
      const url = new URL(valor, window.location.href);
      if (url.protocol === 'https:') {
        elemento[atributo] = url.href;
      } else {
        console.error(`Se ignoró una URL con protocolo no permitido: ${url.protocol}`);
      }
    } catch (error) {
      console.error('No se pudo aplicar una URL del contenido del sitio.', error);
    }
  }

  function ponerEnlaceSeguro(elemento, valor) {
    ponerUrlSegura(elemento, 'href', valor);
  }

  function crearTarjetaFoto(bloque, indice) {
    const tarjeta = document.createElement('div');
    tarjeta.className = `bloque-foto${indice % 2 ? ' invertido' : ''}`;

    const marco = document.createElement('div');
    marco.className = 'foto-marco';
    const foto = document.createElement('div');
    foto.className = 'foto';
    if (bloque.foto) {
      const imagen = document.createElement('img');
      imagen.src = bloque.foto;
      imagen.alt = bloque.fotoAlt || bloque.titulo || '';
      imagen.loading = 'lazy';
      foto.append(imagen);
    }
    const pie = document.createElement('span');
    pie.className = 'foto-pie';
    pie.textContent = bloque.pie || '';
    marco.append(foto, pie);

    const texto = document.createElement('div');
    texto.className = 'bloque-texto';
    const titulo = document.createElement('h3');
    titulo.textContent = bloque.titulo || '';
    const descripcion = document.createElement('p');
    descripcion.textContent = bloque.texto || '';
    texto.append(titulo, descripcion);
    tarjeta.append(marco, texto);
    return tarjeta;
  }

  function renderizarBloques(items) {
    const contenedor = document.getElementById('bloques-jardin');
    if (!contenedor) return;
    contenedor.replaceChildren(...items.map(crearTarjetaFoto));
  }

  function renderizarFamilias(items) {
    const contenedor = document.getElementById('testimonios-lista');
    if (!contenedor) return;
    contenedor.replaceChildren(...items.map((item) => {
      const tarjeta = document.createElement('div');
      tarjeta.className = 'testimonio-card';
      const texto = document.createElement('p');
      texto.textContent = item.texto || '';
      tarjeta.append(texto);
      if (item.firma) {
        const firma = document.createElement('span');
        firma.className = 'testimonio-autor';
        firma.textContent = item.firma;
        tarjeta.append(firma);
      }
      return tarjeta;
    }));
  }

  function renderizarReferencias(items) {
    const contenedor = document.getElementById('referencias-lista');
    if (!contenedor) return;
    contenedor.replaceChildren(...items.map((item) => {
      const fila = document.createElement('li');
      const enlace = document.createElement('a');
      enlace.className = 'referencia';
      enlace.target = '_blank';
      enlace.rel = 'noopener';
      ponerEnlaceSeguro(enlace, item.url);

      const titulo = document.createElement('span');
      titulo.className = 'referencia-titulo';
      titulo.append(document.createTextNode(item.titulo || ''));
      const flecha = document.createElement('span');
      flecha.className = 'referencia-flecha';
      flecha.setAttribute('aria-hidden', 'true');
      flecha.textContent = '→';
      titulo.append(' ', flecha);

      const fuente = document.createElement('span');
      fuente.className = 'referencia-fuente';
      fuente.textContent = item.fuente || '';
      enlace.append(titulo, fuente);
      fila.append(enlace);
      return fila;
    }));
  }

  function aplicarContenido(datos) {
    document.querySelectorAll('[data-site-text]').forEach((elemento) => {
      const valor = leerCampo(datos, elemento.dataset.siteText);
      if (typeof valor === 'string') elemento.textContent = valor;
    });

    document.querySelectorAll('[data-site-image]').forEach((elemento) => {
      const valor = leerCampo(datos, elemento.dataset.siteImage);
      if (typeof valor === 'string' && valor) elemento.src = valor;
      const alt = leerCampo(datos, elemento.dataset.siteAlt);
      if (typeof alt === 'string') elemento.alt = alt;
    });

    ponerTexto('#proyectos .intro', datos.proyectos.introduccion);
    ponerTexto('#testimonios .intro', datos.familias.introduccion);
    ponerTexto('#contacto .intro', datos.contacto.introduccion);
    ponerTexto('#pie-institucional', `${datos.pie.institucion} · WhatsApp: ${datos.contacto.whatsappTexto}`);
    ponerTexto('#pie-lema', datos.pie.lema);

    const numero = String(datos.contacto.whatsappNumero || '').replace(/\D/g, '');
    if (/^[0-9]{10,15}$/.test(numero)) {
      const mensaje = encodeURIComponent('Hola, quisiera consultar por el Jardín Juana Paula Manso.');
      const url = `https://wa.me/${numero}?text=${mensaje}`;
      ['#contacto-whatsapp', '#boton-whatsapp', '.whatsapp-flotante'].forEach((selector) => {
        ponerEnlaceSeguro(document.querySelector(selector), url);
      });
      ponerEnlaceSeguro(document.getElementById('info-whatsapp'), url);
      ponerTexto('#info-whatsapp', `WhatsApp: ${datos.contacto.whatsappTexto}`);
      const schemaTelefono = document.querySelector('script[type="application/ld+json"]');
      if (schemaTelefono) {
        try {
          const schema = JSON.parse(schemaTelefono.textContent);
          schema.telephone = `+${numero}`;
          schema.address.streetAddress = `${datos.contacto.direccion}, ${datos.contacto.barrio}`;
          schema.address.addressLocality = datos.contacto.localidad.split(',')[0].trim();
          schema.hasMap = datos.contacto.mapaEnlace;
          schema.description = `${datos.textos.nombre}. ${datos.contacto.direccion}, ${datos.contacto.barrio}, ${datos.contacto.localidad}.`;
          schemaTelefono.textContent = JSON.stringify(schema);
        } catch (error) {
          console.error('No se pudieron actualizar los datos estructurados del sitio.', error);
        }
      }
    } else {
      console.error('El número de WhatsApp del contenido del sitio no tiene un formato válido.');
    }

    ponerTexto('#proyecto-titulo', datos.proyectos.items[0] ? datos.proyectos.items[0].titulo : 'No hay proyectos publicados');
    renderizarBloques(datos.jardin.bloques);
    renderizarFamilias(datos.familias.items);
    renderizarReferencias(datos.referencias.items);

    ponerTexto('#contacto .card:first-child p:nth-of-type(2)', `${datos.contacto.barrio} · ${datos.contacto.distancia}, ${datos.contacto.localidad}`);
    ponerTexto('#info-direccion', `${datos.contacto.direccion} · ${datos.contacto.barrio} · ${datos.contacto.localidad}`);
    ponerEnlaceSeguro(document.getElementById('boton-mapa'), datos.contacto.mapaEnlace);
    const mapa = document.getElementById('mapa-embed');
    ponerUrlSegura(mapa, 'src', datos.contacto.mapaInsertar);
    if (mapa) mapa.title = datos.textos.tituloMapa;

    if (document.body.dataset.page === 'info') {
      document.title = `Información institucional · ${datos.textos.nombre}`;
    } else {
      const metadata = document.querySelector('meta[name="description"]');
      if (metadata) metadata.content = datos.textos.seoDescripcion;
      const metaOgTitle = document.querySelector('meta[property="og:title"]');
      if (metaOgTitle) metaOgTitle.content = datos.textos.seoTitulo;
      const metaOgDescription = document.querySelector('meta[property="og:description"]');
      if (metaOgDescription) metaOgDescription.content = datos.textos.seoDescripcion;
      const metaTwitterTitle = document.querySelector('meta[name="twitter:title"]');
      if (metaTwitterTitle) metaTwitterTitle.content = datos.textos.seoTitulo;
      const metaTwitterDescription = document.querySelector('meta[name="twitter:description"]');
      if (metaTwitterDescription) metaTwitterDescription.content = datos.textos.seoDescripcion;
      document.title = datos.textos.seoTitulo;
    }

    window.dispatchEvent(new CustomEvent('jardin:proyectos', { detail: datos.proyectos.items }));
    window.dispatchEvent(new CustomEvent('jardin:galeria', { detail: datos.galeria }));
  }

  try {
    const respuesta = await fetch(contenidoUrl, { cache: 'no-cache' });
    if (!respuesta.ok) throw new Error(`Error HTTP ${respuesta.status} al cargar ${contenidoUrl}`);
    const datos = await respuesta.json();
    window.jardinSiteContent = datos;
    aplicarContenido(datos);
  } catch (error) {
    console.error('No se pudo cargar el contenido editable. Se conserva el contenido de respaldo de la página.', error);
  }

  if (document.body.dataset.page === 'info') {
    try {
      const respuesta = await fetch(encodeURI('Jardín-informacion.md'), { cache: 'no-cache' });
      if (!respuesta.ok) throw new Error(`Error HTTP ${respuesta.status} al cargar la información institucional`);
      let markdown = await respuesta.text();
      markdown = markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
      const htmlSeguro = DOMPurify.sanitize(marked.parse(markdown));
      const temporal = document.createElement('div');
      temporal.innerHTML = htmlSeguro;
      const destino = document.getElementById('contenido-institucional');
      if (!destino) throw new Error('No se encontró el contenedor de información institucional');

      const fragmento = document.createDocumentFragment();
      let seccion = null;
      [...temporal.children].forEach((elemento) => {
        if (elemento.tagName === 'H1') {
          fragmento.append(elemento);
        } else if (elemento.tagName === 'H2') {
          seccion = document.createElement('section');
          seccion.className = 'seccion';
          seccion.append(elemento);
          fragmento.append(seccion);
        } else if (seccion) {
          seccion.append(elemento);
        } else {
          fragmento.append(elemento);
        }
      });
      destino.replaceChildren(fragmento);
    } catch (error) {
      console.error('No se pudo cargar la información institucional editable. Se conserva el contenido de respaldo.', error);
    }
  }
})();
