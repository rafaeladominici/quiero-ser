// Constantes y variables
let carrito = {};
const cards = document.getElementById('cards');
const templateCard = document.getElementById('template-card').content;
const disfraces = document.getElementById('disfraces');
const fragment = document.createDocumentFragment();
const templateCarrito = document.getElementById('template-carrito').content;
const templateCarritoTotal = document.getElementById('template-carrito-total').content;
const totalCarrito = document.getElementById('total-carrito');
const vaciarCarrito = document.getElementById('btn-mickey-close');


// Carga DOM
document.addEventListener('DOMContentLoaded', (e) => { 
    fetchData(); 
    if (localStorage.getItem('verificar-carrito-vacio')) {
        carrito = JSON.parse(localStorage.getItem('verificar-carrito-vacio'));
        infoCarrito();
    };
});


// Traer inventario de cards desde .json
const fetchData = async (e) => {
    const response = await fetch('assets/json/inventario.json');
    const data = await response.json();
    infoCards(data);
};


// Elementos de las cards
const infoCards = data => {
    data.forEach(disfraz => {
        templateCard.querySelector('.card-imagen').setAttribute('src', disfraz.image);
        templateCard.querySelector('.card-personaje').textContent = disfraz.personaje;
        templateCard.querySelector('span').textContent = disfraz.precio;
        templateCard.querySelector('.btn-dark').dataset.id = disfraz.id;

        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    });
    cards.appendChild(fragment);
};


// Agregar carrito
cards.addEventListener('click', (e) => {
    agregarCarrito(e); 
});


const agregarCarrito = (e) => { 
    if (e.target.classList.contains('btn-dark')) {
        setCarrito(e.target.parentElement);
    };
    e.stopPropagation();
};


const setCarrito = objeto => {
    const disfrazCompra = { 
        id: objeto.querySelector('.btn-dark').dataset.id,
        precio: objeto.querySelector('span').textContent,
        personaje: objeto.querySelector('.card-personaje').textContent,
        cantidad: 1,
    };
 
    // Para sumar cantidades de disfraz duplicado
    if (carrito.hasOwnProperty(disfrazCompra.id)) { 
        disfrazCompra.cantidad = carrito[disfrazCompra.id].cantidad + 1;
    };

    carrito[disfrazCompra.id] = {...disfrazCompra};
    infoCarrito();
};


// Push carrito
const infoCarrito = (e) => {
    disfraces.innerHTML = '';
    Object.values(carrito).forEach(disfrazCompra => {
        templateCarrito.querySelector('.disfraz-id').textContent = disfrazCompra.id;
        templateCarrito.querySelector('.disfraz-carrito').textContent = disfrazCompra.personaje; 
        templateCarrito.querySelector('.cantidad-carrito').textContent = disfrazCompra.cantidad; 
        templateCarrito.querySelector('.btn-info').dataset.id = disfrazCompra.id;
        templateCarrito.querySelector('.btn-danger').dataset.id = disfrazCompra.id;
        templateCarrito.querySelector('.precio-carrito').textContent = disfrazCompra.cantidad * disfrazCompra.precio;

        const clone = templateCarrito.cloneNode(true);
        fragment.appendChild(clone);
    });
    disfraces.appendChild(fragment);

    infoTotalCarrito();

    localStorage.setItem('verificar-carrito-vacio', JSON.stringify(carrito));
};


// Agregar/eliminar disfraces
disfraces.addEventListener('click', (e) => {
    botonAction(e);
});


// Suma total y vaciar carrito
const infoTotalCarrito = (e) => {
    totalCarrito.innerHTML = '';
    if (Object.keys(carrito).length == 0) {
        totalCarrito.innerHTML = `<th colspan="5">Aún no has elegido tu disfraz</th>`
        $('.boton-finalizar-compra').hide(); 
        return
    };

    $('.boton-finalizar-compra').show();

    const precioTotal = Object.values(carrito).reduce((sumaDisfraces, {cantidad, precio}) => sumaDisfraces + cantidad * precio, 0);

    templateCarritoTotal.querySelector('span').textContent = precioTotal; 

    const clone = templateCarritoTotal.cloneNode(true);
    fragment.appendChild(clone);
    totalCarrito.appendChild(fragment);

    const vaciarCarrito = document.getElementById('vaciar-carrito');
    vaciarCarrito.addEventListener('click', (e) => {
        carrito = {};

        infoCarrito();
    });
};


// Vaciar carrito al finalizar compra
vaciarCarrito.addEventListener('click', (e) => {
    carrito = {};
    
    infoCarrito();
});


// Botones más/menos
const botonAction = (e) => {
    if (e.target.classList.contains('btn-info')) {
        const disfrazCompra = carrito[e.target.dataset.id];
        disfrazCompra.cantidad++;
        carrito[e.target.dataset.id] = {...disfrazCompra};

        infoCarrito();
    }; 

    if (e.target.classList.contains('btn-danger')) {
        const disfrazCompra = carrito[e.target.dataset.id];
        disfrazCompra.cantidad--;

        if (disfrazCompra.cantidad == 0) {
            delete carrito[e.target.dataset.id]
        }
        else {
            carrito[e.target.dataset.id] = {...disfrazCompra};
        };

        infoCarrito();
    };
      
    if (disfrazCompra.cantidad == 0) {
        delete carrito[e.target.dataset.id]

        infoCarrito();
    };
    e.stopPropagation();
};