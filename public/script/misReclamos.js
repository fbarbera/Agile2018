var selectReclamos = document.getElementById("reclamosId");
obtenerReclamos();
function obtenerReclamos(){
    
    var userId = firebase.auth().currentUser.uid;
    console.log(userId);
return firebase.database().ref('/reclamos/' + userId).once('value').then(function(snapshot) {
  var datos = (snapshot.val() && snapshot.val().username) || 'Anonymous';
  alert(datos);
  // ...
});
}