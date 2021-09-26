// Para comentar todo junto: alt + shift + a

// Constantes y variables
let carrito = {};
const cards = document.getElementById('cards');
const templateCard = document.getElementById('template-card').content;
const disfraces = document.getElementById('disfraces');
const fragment = document.createDocumentFragment();
const templateCarrito = document.getElementById('template-carrito').content;
const templateCarritoTotal = document.getElementById('template-carrito-total').content;
const totalCarrito = document.getElementById('total-carrito');


// Evento - Carga DOM
document.addEventListener('DOMContentLoaded', (e) => { 
    fetchData(); 
    if (localStorage.getItem('verificar-carrito-vacio')) {
        carrito = JSON.parse(localStorage.getItem('verificar-carrito-vacio'));
        infoCarrito();
    };
});


// Traer inventario de cards desde .json
const fetchData = async (e) => {
    const res = await fetch('assets/json/inventario.json'); //esperar lectura de información
    const data = await res.json(); //esperar respuesta json y guardar información
    infoCards(data);
};


//////// FILTRO VERRRRRRRRRRR
/* disfracesList.innerHTML = ""
const filtrarPrincipes = async (e) => {
    const dataFetch = await fetch('assets/json/inventario.json');
    const response = await dataFetch.json();
    const data = response.filter(el => el.category == 'principes');
    infoCards();
};

$('#principes').on("click", filtrarPrincipes) */


// Función para los elementos de las cards
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


// Evento - Agregar carrito
cards.addEventListener('click', (e) => {
    agregarCarrito(e); 
});


// Función para agregar al carrito
const agregarCarrito = (e) => { 
    if (e.target.classList.contains('btn-dark')) { //tiene el elemento?
        setCarrito(e.target.parentElement);
    };
    e.stopPropagation();
};


// Función para manipular carrito
const setCarrito = objeto => {
    const disfrazCompra = { 
        id: objeto.querySelector('.btn-dark').dataset.id,
        precio: objeto.querySelector('span').textContent,
        personaje: objeto.querySelector('.card-personaje').textContent,
        cantidad: 1,
    };
 
    // Para sumar cantidades de disfraz duplicado
    if (carrito.hasOwnProperty(disfrazCompra.id)) { //chequeo boolean
        disfrazCompra.cantidad = carrito[disfrazCompra.id].cantidad + 1; //sumar 1 ud
    };

    carrito[disfrazCompra.id] = {...disfrazCompra}; //suma disfraces en carrito
    infoCarrito();
};


// Función para hacer push carrito
const infoCarrito = (e) => {
    disfraces.innerHTML = '';
    Object.values(carrito).forEach(disfrazCompra => { //desde setCarrito
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


// Evento - Agregar/eliminar disfraces de carrito
disfraces.addEventListener('click', (e) => {
    botonAction(e)
});


// Función suma total y vaciar carrito
const infoTotalCarrito = (e) => {
    totalCarrito.innerHTML = '';
    if(Object.keys(carrito).length == 0) { //cuando Q=0  
        totalCarrito.innerHTML = `<th colspan="5">Aún no has elegido tu disfraz</th>` 
        return
    };

    const precioTotal = Object.values(carrito).reduce((sumaDisfraces, {cantidad, precio}) => sumaDisfraces + cantidad * precio, 0);

    templateCarritoTotal.querySelector('span').textContent = precioTotal; //precio total

    const clone = templateCarritoTotal.cloneNode(true);
    fragment.appendChild(clone);
    totalCarrito.appendChild(fragment);

    const vaciarCarrito = document.getElementById('vaciar-carrito');
    vaciarCarrito.addEventListener('click', (e) => {
        carrito = {};

        infoCarrito();
    });
};


// Botones más/menos
const botonAction = (e) => {
    if (e.target.classList.contains("btn-info")) {
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
            carrito[e.target.dataset.id] = {...disfrazCompra}
        };

        infoCarrito();
    };
      
    if (disfrazCompra.cantidad == 0) {
        delete carrito[e.target.dataset.id]

        infoCarrito();
    };
    e.stopPropagation();
};


/* // VER CÓMO HACER ESTO 
// Función para filtrar disfraces
infoCards(data)

const filtroDisfraces = $('#categories-filter');
function filtarAction (e) {
    const filtro = e.target.value;
    if (filtro == 'todas') {
        infoCards(data)
    } else {
        const filtroCategoria = disfraces.filtro(categoria == filtro)
        infoCards(filtroCategoria)
    }
}
filtroDisfraces.on('change', (e) => {
    filtarAction (e)
}) */

//VERRRRRRRRRRRRRRRRRRRRRRRRRRR
$(document).ready(function() {
    //totalCarrito.innerHTML = '';
    if(Object.keys(carrito).length == 0) {
        $('#finalizar-compra').attr('disabled', false);
        
    } else {
        $('#finalizar-compra').attr('disabled', true);
    }
});