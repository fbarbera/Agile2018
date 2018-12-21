

var selectReclamos = document.getElementById("reclamosId");
var ubicacion = document.getElementById("ubicacionId");
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
    }    
  });
}
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

function showInMap(reclamoPos){
  if(navigator.geolocation){

      var map = L.map('mapLocId').
      setView( [parseFloat(reclamoPos.split(',')[1].trim()), parseFloat(reclamoPos.split(',')[0].trim())],12);
  
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © OpenStreetMap contributors, CC-BY-SA, Jortilles',
      maxZoom: 18
      }).addTo(map);
      
      L.control.scale().addTo(map);
      
      var marker = L.marker([ parseFloat(reclamoPos.split(',')[1].trim()), parseFloat(reclamoPos.split(',')[0].trim()) ],{draggable: true}).addTo(map);  
      marker.bindPopup("Usted registro el reclamo aqui").openPopup();
  } 
}