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
            title: 'El formulario está incompleto',
            icon: 'warning',
            button: 'OK',
        });
    };
});


// Validación tipo dato - form 2
/* $('#confirmar-compra').click(function (e) {
    if ($('#tarjeta').val() == "" &&
    $('#nombre-apellido').val() == "" &&
    $('#ano-vencimiento').val() == "" &&
    $('#mes-vencimiento').val() == "" &&
    $('#codigo').val() == "") {
        e.preventDefault();
        $('.modal-pago').hide();
        $('.modal-envio').hide();
        $('.modal-thanks').modal('show'); 
    } 
    
    else if ($('#tarjeta').val().lenght == 16 &&
    //$('#tarjeta').val().isNaN &&
    $('#nombre-apellido').val() != "" &&
    $('#ano-vencimiento').val().lenght == 4 &&
    //$('#ano-vencimiento').val().isNaN && 
    $('#mes-vencimiento').val().lenght == 2 &&
    //$('#mes-vencimiento').val().isNaN && 
    $('#codigo').val().lenght == 3) {
        e.preventDefault();
        $('.modal-pago').hide();
        $('.modal-envio').hide();
        $('.modal-thanks').modal('show');        
    } 
    else {
        swal({
            title: 'Por favor, valide los datos ingresados',
            icon: 'warning',
            button: 'OK',
        })
    };
}); */
