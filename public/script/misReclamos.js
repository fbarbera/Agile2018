var selectReclamos = document.getElementById("reclamosId");
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
  
  firebase.auth().onAuthStateChanged(function(_userId) {
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
          //console.log(reclamos)
          var reclamosArray = [];
          reclamosArray.splice(0, reclamosArray.length, {altura: reclamosCol.altura, nroReclamo: reclamosCol.nroReclamo});
          console.log(reclamosArray);
          KeyRec = reclamosCol.key;
          for (i in reclamosArray) {
            var optionRec = document.createElement("option");
            optionRec.value = reclamosArray[i].altura;
            optionRec.text = reclamosArray[i].altura + ' - ' + reclamosArray[i].nroReclamo;
            selectReclamos.appendChild(optionRec);
          }
        });
      } else {
        console.log("error user");
      }// ...     
    
  });
  //console.log(datos);

}