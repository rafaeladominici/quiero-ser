/* buscadorBotones = document.querySelector('#categories-filter');
document.addEventListener('DOMContentLoaded', filtrarProductosBoton);


function filtrarProductos (e) {
    e.preventDefault();
    $.ajax({
        url:'assets/json/inventario.json',
        data: 'json',
        dataType: 'json',
        success: mostrarProductos
    });
}

document.addEventListener('DOMContentLoaded', () => {
    $.ajax({
        url: 'assets/json/inventario.json',
        success: function(data){
            cargarListaProductos(data);
        }
    });
});

function filtrarProductosBoton (e) {
    e.preventDefault();
    $.ajax({
        url:'assets/json/inventario.json',
        data: 'json',
        dataType: 'json',
        success: mostrarProductosBoton
    })
}  */