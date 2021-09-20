
function closeLoading(){
    jQuery("#result-task").empty();
    jQuery('#result').empty();
    jQuery('#load').hide();
    jQuery('#load').removeClass('loading-shop'); //Removemos la clase loading
    jQuery('body').removeClass('scroll');
}

function limpiarChecksTabla(){
    $("#checkAll").prop('checked', false);
    $(".check").each(function(index) {
        $(this).prop('checked', false);
    });
}

function cerrarModal(modal){
    $("#"+modal).modal('toggle');
}

function comprobarEmail(email){
    var caract = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);
    var respuesta = false;

    if (!caract.test(email))    respuesta = false;
    else                        respuesta = true;

    return respuesta;
}
