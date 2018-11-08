var selectReclamos = document.getElementById("reclamosId");
//selectReclamos.onclick=irAlReclamo(selectReclamos.options[selectReclamos.selectedIndex].value);
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
        var reclamosArray = [];
        reclamosArray.splice(0, reclamosArray.length, { 
          categoria: reclamosCol.categoria, 
          nroReclamo: reclamosCol.nroReclamo, 
          estado: reclamosCol.estado });
        KeyRec = reclamosCol.key;
        for (i in reclamosArray) {
          var optionRec = document.createElement("option");
          optionRec.value = reclamosArray[i].nroReclamo;
          optionRec.text =  ' Reclamo numero: ' + reclamosArray[i].nroReclamo + ' - Estado: ' + reclamosArray[i].estado;
          selectReclamos.appendChild(optionRec);
        }
      });
    } else {
      console.log("error user");
    }// ...     

  });
  //console.log(datos);
}


selectReclamos.addEventListener('change', function () {
  var index = selectReclamos.value;
  console.log(index);
})
