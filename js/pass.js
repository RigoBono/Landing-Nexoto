function savePass() {
    var newPass = $("#password").val();
    var confirm = $("#matchPassword").val();

    if (newPass === confirm) {
        $.post("http://localhost:8080/nexotoAPI2/webapp/cambioContrasena.htm", {
                idUsuario: localStorage['idUsuario'],
                pass: newPass
            },
            function(data) {
                data = JSON.parse(data);
                if (data.code === 0) {
                    alert("Cambio hecho");
                } else {
                    alert("Ocurrio un error intenta mas tarde");
                }
            }
        );
    }
}
var nombreUsuario = localStorage['nombreUsuario'];
var paternoUsuario = localStorage['paternoUsuario'];
document.getElementById("nombreUsuario").innerHTML=nombreUsuario+" "+paternoUsuario;
