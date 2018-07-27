function login() {
    if ($("#usr").val() && $("#pass").val()) {
        document.getElementById("usr").disabled = true;
        document.getElementById("pass").disabled = true;
        document.getElementById("envioLogin").disabled = true;
        $.post("http://nexoto.mx/webapp/login.htm",
                {
                    usuario: $("#usr").val(),
                    pass: $("#pass").val()
                }, function (data) {
            data = JSON.parse(data);
            if (data.code === 0) {
                window.alert("Login correcto");
            } else {

            }
        });
    } else {
        window.alert("Por favor ingresa los datos");
    }


}
