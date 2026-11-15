// =====================================================
// EJERCICIO 3.3 · TIENDA SIMULADA
// Tienes disponibles (en api.js):
//   obtenerProductos()  → Promise<[{ id, nombre, precio }, ...]>
//   obtenerStock(id)    → Promise<{ id, unidades }>
// Ambas fallan a veces. Completa los TODO.
// =====================================================

const cargando = document.getElementById('cargando');
const error = document.getElementById('error');
const mensajeError = document.getElementById('mensajeError');
const lista = document.getElementById('listaProductos');
const btnReintentar = document.getElementById('btnReintentar');

const mostrar = elemento => elemento.classList.remove('oculto');
const ocultar = elemento => elemento.classList.add('oculto');

// Pinta un producto en la lista. Ya está hecho: úsalo.
function pintarProducto(producto, unidades) {
  const li = document.createElement('li');
  const nombre = document.createElement('span');
  nombre.textContent = `${producto.nombre} · ${producto.precio.toFixed(2)} €`;
  const stock = document.createElement('span');
  stock.textContent = unidades > 0 ? `${unidades} uds.` : 'Agotado';
  if (unidades === 0) stock.classList.add('agotado');
  li.append(nombre, stock);
  lista.append(li);
}

// AMPLIACIÓN (ejercicio 3.4): esperar y conTimeout colocados antes de cargarTienda()
const esperar = ms => new Promise(resolve => setTimeout(resolve, ms));

const conTimeout = (promesa, ms) => {
  const timeout = esperar(ms).then(() => {
    throw new Error('Tiempo agotado');
  });
  return Promise.race([promesa, timeout]);
};

// Variable declarada fuera para guardar los productos y usarlos en el siguiente .then
let productosGlobal = [];

function cargarTienda() {
  // TODO 1: vaciar la lista, ocultar el error y mostrar «Cargando…»
  lista.innerHTML = '';
  ocultar(error);
  mostrar(cargando);

  // TODO 2 & Ampliación: obtener los productos envueltos en conTimeout
  // (puedes probar con 500 para forzar el error de tiempo agotado, o dejarlo en 2000)
  conTimeout(obtenerProductos(), 2000)
    .then(productos => {
      productosGlobal = productos; // Guardamos los productos fuera

      // TODO 3 & Ampliación: con Promise.all y conTimeout, pedir el stock de todos a la vez
      const peticiones = productos.map(p => obtenerStock(p.id));
      return conTimeout(Promise.all(peticiones), 2000);
    })
    .then(stocks => {
      // TODO 4: pintar cada producto con su stock usando pintarProducto
      productosGlobal.forEach((producto, i) => {
        pintarProducto(producto, stocks[i].unidades);
      });
    })
    .catch(err => {
      // TODO 5: si algo falla, mostrar el mensaje en #mensajeError y el bloque #error
      mensajeError.textContent = err.message;
      ocultar(cargando);
      mostrar(error);
    })
    .finally(() => {
      // TODO 6: ocultar «Cargando…» en finally
      ocultar(cargando);
    });
}

// TODO 7: que el botón «Reintentar» vuelva a llamar a cargarTienda
btnReintentar.addEventListener('click', cargarTienda);

cargarTienda();


// =====================================================
// AMPLIACIÓN (ejercicio 3.4): cuando tengas conTimeout, cópiala junto
// con esperar AL PRINCIPIO de este archivo (antes de la línea
// cargarTienda(), o dará error porque aún no existe) y envuelve con
// ella las dos peticiones de cargarTienda:
//   obtenerProductos()      →  conTimeout(obtenerProductos(), ms)
//   Promise.all(peticiones) →  conTimeout(Promise.all(peticiones), ms)
//
// 1. Pruébala con ms = 500. Esta API tarda entre 0,2 y 1 segundo en
//    cada petición, así que casi siempre saltará el error
//    «Tiempo agotado». Así compruebas que funciona.
// 2. Después déjala en 2000. Con esta API ya no saltará nunca, pero
//    con un servidor real (en AJAX) sí puede tardar más, y entonces
//    la tienda mostrará el error en lugar de quedarse «Cargando…».
// =====================================================
