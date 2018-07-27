var nombreUsuario = localStorage['nombreUsuario'];
var paternoUsuario = localStorage['paternoUsuario'];
var correoUsuario = localStorage['correoUsuario'];
var paternoUsuario = localStorage['paternoUsuario'];
var cliente = localStorage['cliente'];
var idSubEmpresa = localStorage['idSubEmpresa'];
var direccionUsuario = localStorage['direccionUsuario'];
var latitudUsuario = localStorage['latitudUsuario'];
var longitudUsuario = localStorage['longitudUsuario'];
var idUsuario = localStorage['idUsuario'];

document.getElementById("nombreUsuario").innerHTML = nombreUsuario + " " + paternoUsuario;

var usuario;
var subempresa;
var tarifa;
var viaje;
var estimado;
var distanciaKM;
var tiempoMIN;
var origenEmpresa;

var ubicacionOrigen;
var ubicacionDestino;

var origen = {
    latitud: 0.0,
    longitud: 0.0,
    formatedAddress: ""
};

var destino = {
    latitud: 0.0,
    longitud: 0.0,
    formatedAddress: "",
    geoplace: ""
};


$("#botonSolicitar").on("click", function() {
    var nombrePasajero = $("#nombrePasajero").val();
    var referencia = $("#referencia").val();
    var origen = $("#origin-input").val();
    var destino = $("#destination-input").val();

    if (!nombrePasajero && !referencia && !destino) {
        alert("Ingresa los campos forzosos");
    } else {
        getDistanceReal();



    }

});

function disableFields() {
    $("#origin-input").prop("disabled", true);
    $("#referencia").prop("disabled", true);
    $("#nombrePasajero").prop("disabled", true);
    $("#destination-input").prop("disabled", true);
}

function clearInputs() {
    $("#origin-input").val("");
    $("#referencia").val("");
    $("#nombrePasajero").val("");
    $("#destination-input").val("");
}

function enabledFields() {
    $("#origin-input").prop("disabled", false);
    $("#referencia").prop("disabled", false);
    $("#nombrePasajero").prop("disabled", false);
    $("#destination-input").prop("disabled", false);
}

if (!idSubEmpresa) {
    window.location = "login.html";
} else {
    $.post("http://localhost:8080/nexotoAPI2/webapp/getSubEmpresa.htm", {
            idUsuario: idUsuario
        },
        function(data) {

            data = JSON.parse(data);
            console.log(data);
            subempresa = data.content.subempresa;
            tarifa = data.content.tarifa;
            getGeoPlaceOrigin();
        });
}


var config = {
    apiKey: "AIzaSyDQi0aTm3Qhlpr2g29THbY248R3kUT8tP0",
    authDomain: "nexoto-9d0c2.firebaseapp.com",
    databaseURL: "https://nexoto-9d0c2.firebaseio.com",
    projectId: "nexoto-9d0c2",
    storageBucket: "nexoto-9d0c2.appspot.com",
    messagingSenderId: "593581355055"
};
firebase.initializeApp(config);


function post_trip(idViaje, cliente, pasajero, telefonoPasajero, lat, lon, address, referencia) {
    firebase.database().ref().child("viajes").child(String(idViaje)).set({
        idViaje: idViaje,
        cliente: cliente,
        pasajero: pasajero,
        telefonoPasajero: telefonoPasajero,
        timestamp: new Date().getTime(),
        dtSolicitud: new Date().toString(),
        lat: lat,
        lon: lon,
        address: address,
        usuario: nombreUsuario + " " + paternoUsuario,
        referencia: referencia
    });

}

var placeOrigin;

function getGeoPlaceOrigin() {
    console.log("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + subempresa.direccion.latitud + "," + subempresa.direccion.longitud + "&key=AIzaSyCBSg_aqCu2iRw3R1B56k0vioZYx9f_BQc");
    $.ajax({
        url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + subempresa.direccion.latitud + "," + subempresa.direccion.longitud + "&key=AIzaSyCBSg_aqCu2iRw3R1B56k0vioZYx9f_BQc",
        type: "GET",
        dataType: 'json',
        cache: false,
        crossDomain: true,
        success: function(data) {
            ubicacionOrigen = data;
            placeOrigin = data.results[0].place_id;
            console.log(this.originPlaceId);
        }
    });
}

function getDistanceReal() {
    var origen = placeOrigin;
    console.log("origen local " + origen);
    var service = new google.maps.DistanceMatrixService();


    console.log(origen + " " + destino);
    var origin1 = new google.maps.LatLng(subempresa.direccion.latitud, subempresa.direccion.longitud);

    var lat1 = $("#lat1").val();
    var lon1 = $("#lon1").val();
    var destinationB = new google.maps.LatLng(destino.latitud, destino.longitud);
    service.getDistanceMatrix({
        origins: [origin1],
        destinations: [destinationB],
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.METRIC
    }, callback);
    console.log("https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&mode=driving&origins=place_id:" + origen + "&destinations=place_id:" + destino + "&key=AIzaSyCBSg_aqCu2iRw3R1B56k0vioZYx9f_BQc");

}

function callback(data) {
    console.log(data);
    distanciaKM = data.rows[0].elements[0].distance.value / 1000;
    tiempoMIN = data.rows[0].elements[0].duration.value / 60;
    estimado = 0;
    console.log("distancia: " + distanciaKM + " y kmppe " + tarifa.tarifaKM);

    estimado = (distanciaKM * tarifa.tarifaKM) + (tiempoMIN * tarifa.tarifaMin);


    document.getElementById("distanciaAprox").innerHTML = Math.round(distanciaKM * 100) / 100;
    document.getElementById("tiempoAprox").innerHTML = Math.round(tiempoMIN * 100) / 100;;
    document.getElementById("costoAprox").innerHTML = Math.round(estimado * 100) / 100;

}


function validateData() {
    console.log("entro");
    var nombre = $("#nombrePasajero").val();
    var telefono = ""
    var referencia = $("#referencia").val();
    $.post("http://localhost:8080/nexotoAPI2/webapp/solicitarViaje.htm", {
        idSolicitante: idUsuario,
        nombrePasajero: nombre,
        correoPasajero: "",
        telefonoPasajero: telefono,
        observaciones: referencia,
        lat1: destino.latitud,
        lon1: destino.longitud,
        formatedAddress1: destino.formatedAddress,
        lat2: origen.latitud,
        lon2: origen.longitud,
        formatedAddress2: origen.formatedAddress,
        empresa_paga: 3,
        costoEmpresa: document.getElementById("costoAprox").innerHTML,
        costoPasajero: document.getElementById("costoAprox").innerHTML,
        distancia: document.getElementById("distanciaAprox").innerHTML
    }, function(data) {
        data = JSON.parse(data);
        if (data.content.idViaje) {
            post_trip(data.content.idViaje, subempresa.nombre, nombre, "-", subempresa.direccion.latitud, subempresa.direccion.longitud, subempresa.direccion.formatedAddress, referencia);
            clearInputs();
            alert("Viaje solicitado")
        } else {
            window.alert("Algo salio mal, intenta más tarde");
            cancel();
        }
    });



}
