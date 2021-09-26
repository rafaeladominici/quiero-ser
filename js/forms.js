// Api Georef - Formulario envío
const selectProv = 'https://apis.datos.gob.ar/georef/api/provincias';

// Select provincias
$(document).ready(function () {
    $.get(selectProv, function (datos) { 
        $('#provincia').empty(); 
        for (const provincia of datos.provincias) {
            $('#provincia').append(`<option value='${provincia.id}'>${provincia.nombre}</option>`);
        };
    });
});


// Select localidades a partir de provincia elegida
$('#provincia').change(function (e) {
    e.preventDefault();
    let selectLocal = `https://apis.datos.gob.ar/georef/api/municipios?provincia=${this.value}&campos=id,nombre&max=1000`;
    $.get(selectLocal, function (datos) { 
        $('#localidad').empty(); 
        for (const municipio of datos.municipios) {
            $('#localidad').append(`<option value='${municipio.id}'>${municipio.nombre}</option>`);
        };
    });
});



// Pago con tarjeta
$(document).ready(function () {
    $('#toggle-campos').on('click', (e) => {
        $('.datos-tarjeta').slideToggle();
    });
});