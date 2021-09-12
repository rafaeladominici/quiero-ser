// Para comentar todo junto: alt + shift + a

// Constantes y variables
const cards = document.getElementById('cards');
const templateCard = document.getElementById('template-card').content;
const disfraces = document.getElementById('disfraces');
const footerTable = document.getElementById('footer-table');
const fragment = document.createDocumentFragment();
const templateCarrito = document.getElementById('template-carrito').content;
const templateCarritoFotter = document.getElementById('template-carrito-footer').content;
let carrito = {};

// EVENTOS
document.addEventListener('DOMContentLoaded', e => { 
    fetchData() 
});
cards.addEventListener('click', e => {
    agregarCarrito(e) 
});

// Traer inventario de cards desde .json
const fetchData = async () => {
    const res = await fetch('assets/json/inventario.json'); // esperar lectura de información
    const data = await res.json() // esperar respuesta json y guardar información
    //console.log(data)
    infoCards(data)
};

// Función flecha para los elementos de las cards
const infoCards = data => {
    //console.log(data);
    data.forEach(disfraz => {
        templateCard.querySelector('h5').textContent = disfraz.title;
        templateCard.querySelector('p').textContent = disfraz.precio;
        templateCard.querySelector('img').setAttribute("src", disfraz.image);
        templateCard.querySelector('.btn-dark').dataset.id = disfraz.id;

        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);

        //console.log(disfraz)
    })
    cards.appendChild(fragment);
};

// Función flecha para agregar al carrito
const agregarCarrito = e => {
    //console.log(e.target.classList.contains('btn-dark')) // tiene el elemento?

    if (e.target.classList.contains('btn-dark')) {
        //console.log(e.target.parentElement)
        setCarrito(e.target.parentElement);
    }
};

// Función para manipular carrito
const setCarrito = objeto => {
    //console.log(objeto);
    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        title: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad: 1
    };
 
    // Para sumar cantidades de disfraz duplicado
    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1; //para sumar 1 ud
    };

    carrito[producto.id] = {...producto} //suma productos en carrito
    infoCarrito();
};

// Función flecha para info carrito    VER ESTO CÓMO SEGUIR
const infoCarrito = () => {
    console.log(carrito)
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id;
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title;
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad;
    })
}


//agregar lo de stop propagation