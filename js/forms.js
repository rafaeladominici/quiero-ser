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


// Desaparecer modal
$(document).ready(() => {
    $('#confirmar-compra').on('click', () => {
        $('.modal-pago').hide();
    });
});

$(document).ready(() => {
    $('#confirmar-compra').on('click', () => {
        $('.modal-envio').hide();
    });
});



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
            title: 'El formulario está incompleto',
            icon: 'warning',
            button: 'OK',
        });
    };
});






/* // Warning formulario incompleto
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
            title: 'El formulario está incompleto',
            icon: 'warning',
            button: 'OK',
        });
    };
}); */