function closechido(){
  console.log("saliendo");
  localStorage['nombreUsuario'] = "";
  localStorage['paternoUsuario'] = "";
  localStorage['correoUsuario'] = "";
  localStorage['paternoUsuario'] = "";
  localStorage['cliente'] = "";
  localStorage['idSubEmpresa'] = ""
  localStorage['direccionUsuario'] = "";
  localStorage['latitudUsuario'] = ""
  localStorage['longitudUsuario'] = ""
  localStorage['idUsuario']="";
  window.location="/login.html";
}


if(localStorage['idUsuario']){
  if(localStorage['idUsuario']===""){
    window.location="/login.html";
  }
}else{
  window.location="/login.html";
}
