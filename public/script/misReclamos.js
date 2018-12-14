

var selectReclamos = document.getElementById("reclamosId");
//selectReclamos.onclick=irAlReclamo(selectReclamos.options[selectReclamos.selectedIndex].value);
var reclamosArray = [];
obtenerReclamos();

function obtenerReclamos() {
  var database = firebase.database();
  firebase.auth().signInAnonymously().catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
    // ...
  });
  var datos;

  firebase.auth().onAuthStateChanged(function (_userId) {
    var userId = _userId.uid;
    console.log(userId);
    if (userId) {
      /*firebase.database().ref('/reclamos/' + userId).once('value').then(function (snapshot) {
        datos = (snapshot.val() && snapshot.val().userId) || userId;
        alert(datos);
        });*/
      var keyRec;
      var reclamosCol = database.ref('reclamos');
      reclamosCol.orderByChild("userId").equalTo(userId).on('child_added', function (ss) {
        var reclamosCol = ss.val();
        reclamosCol.key = ss.key;        
        reclamosArray.splice(0, reclamosArray.length,{
          categoria: reclamosCol.categoria,
          nroReclamo: reclamosCol.nroReclamo,
          estado: reclamosCol.estado,
          ubicacion: reclamosCol.ubicacion
        });
        KeyRec = reclamosCol.key;
        for (i in reclamosArray) {
          var optionRec = document.createElement("option");
          optionRec.index=i;
          optionRec.value = reclamosArray[i].ubicacion;
          optionRec.text = 'Reclamo numero: ' + reclamosArray[i].nroReclamo + ' - Estado: ' + reclamosArray[i].estado +' - Categoria: '+ reclamosArray[i].categoria;
          selectReclamos.appendChild(optionRec);
        }
      });
    } else {
      console.log("error user");
    }// ...     

  });
  //console.log(datos);
}

/*var app = new Vue({
  el: '#app',
  data: {
      selected: '',
      options:[]
  }
})*/

selectReclamos.addEventListener('change', function () {
  var reclamo = selectReclamos;
  console.log(reclamo);
  buscarReclamo(reclamo);
})


function buscarReclamo(reclamo) {
  var detalleId = document.getElementById("detalle");
  var nroReclamoInput = document.getElementById("nroReclamoId");
  var estadoShow = document.getElementById("estadoId");
  var categoriaShow = document.getElementById("categoriaId");
detalleId.hidden=false;
nroReclamoInput.value=reclamo.selectedOptions[0].innerText.split('Reclamo numero:',2)[1].split('-',2)[0];
estadoShow.value=reclamo.selectedOptions[0].innerText.split('Estado:',2)[1].split('-',2)[0];
categoriaShow.value=reclamo.selectedOptions[0].innerText.split('Categoria:',2)[1];;
showInMap(reclamo.value); 
}

function showInMap(reclamoPos) {

  /*var latlon = reclamoPos.ubicacion;

  var img_url = "https://maps.googleapis.com/maps/api/staticmap?center="+ latlon +"&zoom=14&size=400x300&sensor=false&key=AIzaSyBe4fc4rSJXLrlrGIkc5oiwEClhHKCjinY";
  var map = document.getElementById("mapLocId");
  map.innerHTML = "<img src='" + img_url + "'>";*/
  var mapDiv = document.getElementById("mapLocId");
  var mapProp= {
    center:{lat: parseFloat(reclamoPos.split(',')[1].trim()), lng: parseFloat(reclamoPos.split(',')[0].trim())},//new google.maps.LatLng(reclamoPos),
    zoom:8
  };
  var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
  mapDiv.hidden=false;
  
}