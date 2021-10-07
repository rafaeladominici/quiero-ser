// Formulario envío (documentación: https://datosgobar.github.io/georef-ar-api/)
const selectProvincia = 'https://apis.datos.gob.ar/georef/api/provincias';

// Select provincias
$(document).ready(function (e) {
    $.get(selectProvincia, function (data) { 
        $('#provincia').empty(); 
        for (const provincia of data.provincias) {
            $('#provincia').append(`<option value='${provincia.id}'>${provincia.nombre}</option>`);
        };
    });
});


// Select localidades a partir de provincia elegida
$('#provincia').change(function (e) {
    e.preventDefault();
    let selectLocalidad = `https://apis.datos.gob.ar/georef/api/municipios?provincia=${this.value}&campos=id,nombre&max=1000`;
    $.get(selectLocalidad, function (data) { 
        $('#localidad').empty(); 
        for (const municipio of data.municipios) {
            $('#localidad').append(`<option value='${municipio.id}'>${municipio.nombre}</option>`);
        };
    });
});


// Desaparecer/aparecer modal
$(document).ready(() => {
    $('#confirmar-compra').on('click', () => {
        $('.modal-pago').hide();
        $('.modal-envio').hide();
        $('.modal-thanks').modal('show');
    });
});


// Validación campos nulos - form 1
$('#btn-elegir-medio-pago').click(function (e) {
    if ($('#nombre').val() != "" &&
    $('#provincia').val() != "" &&
    $('#localidad').val() != "" &&
    $('#direccion').val() != "" &&
    $('#telefono').val() != "") {
        e.preventDefault();
        $('.modal-pago').modal('show');
    } else {
        swal({
            title: 'Por favor, complete todos los datos',
            icon: 'warning',
            button: 'OK',
        });
    };
});