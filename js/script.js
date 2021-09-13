// Para comentar todo junto: alt + shift + a

// Constantes y variables
let carrito = {};
const cards = document.getElementById('cards');
const templateCard = document.getElementById('template-card').content;
const disfraces = document.getElementById('disfraces');
const fragment = document.createDocumentFragment();
const templateCarrito = document.getElementById('template-carrito').content;
const templateCarritoFotter = document.getElementById('template-carrito-footer').content;
const footerTable = document.getElementById('footer-table');


// Evento - Carga DOM
document.addEventListener('DOMContentLoaded', e => { 
    fetchData() 
});


// Evento - Agregar carrito
cards.addEventListener('click', e => {
    agregarCarrito(e) 
});


// Evento - Agregar/eliminar disfraces de carrito
disfraces.addEventListener('click', e => {
    botonAction(e)
});


// Traer inventario de cards desde .json
const fetchData = async () => {
    const res = await fetch('assets/json/inventario.json'); //esperar lectura de información
    const data = await res.json() //esperar respuesta json y guardar información
    infoCards(data)
};


// Función para los elementos de las cards
const infoCards = data => {
    data.forEach(disfraz => {
        templateCard.querySelector('.btn-dark').dataset.id = disfraz.id;
        templateCard.querySelector('span').textContent = disfraz.precio;
        templateCard.querySelector('h5').textContent = disfraz.personaje;
        templateCard.querySelector('img').setAttribute("src", disfraz.image);

        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    });
    cards.appendChild(fragment);
};


// Función para agregar al carrito
const agregarCarrito = e => { 
    if (e.target.classList.contains('btn-dark')) { //tiene el elemento?
        setCarrito(e.target.parentElement);
    };
    e.stopPropagation()
};


// Función para manipular carrito
const setCarrito = objeto => {
    const disfrazCompra = { 
        id: objeto.querySelector('.btn-dark').dataset.id,
        precio: objeto.querySelector('span').textContent,
        personaje: objeto.querySelector('h5').textContent,
        cantidad: 1
    };
 
    // Para sumar cantidades de disfraz duplicado
    if (carrito.hasOwnProperty(disfrazCompra.id)) { 
        disfrazCompra.cantidad = carrito[disfrazCompra.id].cantidad + 1; //para sumar 1 ud
    };

    carrito[disfrazCompra.id] = {...disfrazCompra} //suma disfraces en carrito
    infoCarrito();
};


// Función para hacer push carrito
const infoCarrito = () => {
    disfraces.innerHTML = '';
    Object.values(carrito).forEach(disfrazCompra => { //desde setCarrito
        templateCarrito.querySelector('th').textContent = disfrazCompra.id;
        templateCarrito.querySelectorAll('td')[0].textContent = disfrazCompra.personaje; 
        templateCarrito.querySelectorAll('td')[2].textContent = disfrazCompra.cantidad; 
        templateCarrito.querySelector('.btn-info').dataset.id = disfrazCompra.id;
        templateCarrito.querySelector('.btn-danger').dataset.id = disfrazCompra.id;
        templateCarrito.querySelector('span').textContent = disfrazCompra.cantidad * disfrazCompra.precio;

        const clone = templateCarrito.cloneNode(true);
        fragment.appendChild(clone);
    });
    disfraces.appendChild(fragment);

    infoFooterCarrito();
};


// Función footer carrito - suma disfraces y vaciar carrito
const infoFooterCarrito = () => {
    footerTable.innerHTML = '';
    if(Object.keys(carrito).length === 0) { //cuando Q=0  
        footerTable.innerHTML = `<th scope="row" colspan="6">Aún no has elegido tu disfraz</th>`
        return
    };

    const cantidadX = Object.values(carrito).reduce((sumaDisfraces, {cantidad}) => sumaDisfraces + cantidad, 0);
    const precioX = Object.values(carrito).reduce((sumaDisfraces, {cantidad, precio}) => sumaDisfraces + cantidad * precio, 0);

    templateCarritoFotter.querySelectorAll('td')[0].textContent = cantidadX;
    templateCarritoFotter.querySelector('span').textContent = precioX;

    const clone = templateCarritoFotter.cloneNode(true);
    fragment.appendChild(clone);
    footerTable.appendChild(fragment);

    const vaciarCarrito = document.getElementById('vaciar-carrito');
    vaciarCarrito.addEventListener('click', () => {
        carrito = {};
        infoCarrito();
    });
};



const botonAction = e => {
    if (e.target.classList.contains('btn-info')) {
        console.log([e.target.dataset.id])
        const disfrazCompra = carrito[e.target.dataset.id]
        disfrazCompra.cantidad = [e.target.dataset.id].cantidad + 1
        carrito[e.target.dataset.id] = {...disfrazCompra}
    }

    /* if (e.target.classList.contains('btn-danger')) {
    disfrazCompra.cantidad = [e.target.dataset.id].cantidad - 1
    infoCarrito()
    } */
}

// ver lo del filtro de disfraces