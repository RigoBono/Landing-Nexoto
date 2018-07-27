function login() {
    if ($("#usr").val() && $("#pass").val()) {
        $.post("http://localhost:8080/nexotoAPI2/webapp/login.htm",
                {
                    usuario: $("#usr").val(),
                    pass: $("#pass").val()
                }, function (data) {
            data = JSON.parse(data);
            console.log(data);
            if (data.code === 0) {
                window.alert("Login correcto");
                localStorage['nombreUsuario'] = data.content.nombre;
                localStorage['paternoUsuario'] = data.content.paterno;
                localStorage['correoUsuario'] = data.content.correo;
                localStorage['paternoUsuario'] = data.content.paterno;
                localStorage['cliente'] = data.content.cliente.nombre;
                localStorage['idSubEmpresa'] = data.content.cliente.idSubEmpresa;
                localStorage['direccionUsuario'] = data.content.cliente.direccion.formatedAddress;
                localStorage['latitudUsuario'] = data.content.cliente.direccion.latitud;
                localStorage['longitudUsuario'] = data.content.cliente.direccion.longitud;
                localStorage['idUsuario']=data.content.idUsuario;
                window.location="console.html";
            } else {
                window.alert("Usuario o contraseña incorrectos");
            }
        });
    } else {
        window.alert("Por favor ingresa los dato");
    }


}
