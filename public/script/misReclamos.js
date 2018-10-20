var selectReclamos = document.getElementById("reclamosId");
obtenerReclamos();

function obtenerReclamos() {
  firebase.auth().signInAnonymously().catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
    // ...
  });
  var datos;
  firebase.auth().onAuthStateChanged({
    function(_userId) {
      var userId = _userId.uid;
      console.log(userId);
      if (userId) {
        firebase.database().ref('/reclamos/' + userId).once('value').then(function (snapshot) {
          datos = (snapshot.val() && snapshot.val().userId) || userId;
          alert(datos);
        });
      } else {
        console.log("error user");
      }// ...     
    }
  });
  console.log(datos);

}