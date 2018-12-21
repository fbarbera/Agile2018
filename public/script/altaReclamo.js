
var uploadTask;
var imagenASubir;

function save() {
   var database = firebase.database();
    firebase.auth().signInAnonymously().catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        // ...
    });

    var expresion;
    var calle = document.getElementById('calleId').value;
    var entre1 = document.getElementById('entre1Id').value;
    var entre2 = document.getElementById('entre2Id').value;
    var altura = document.getElementById('alturaId').value;
    var categoria = document.getElementById('categoriaId');
    var id_categoria = categoria.options[categoria.selectedIndex].value;
    var contacto = document.getElementById('contactoId').value;
    var comentario = document.getElementById('comentarioId').value;
    var clave = document.getElementById("claveId");
    var ubicacion = document.getElementById("ubicacionId");
    var fichero = document.getElementById("fichero");
    //expresion = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/;

    //if (calle == "" || entre1 == "" || entre2 == "" || altura == "" || categoria == "" || id_categoria == "" || contacto == "" || comentario == "" || clave == "") {
      //  alert("Todos los campos son obligatorios.");

   // }
   // else {
        var KeyRec;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                //count de la coleccion
                guardaStorage(fichero.files);
                var count = database.ref('reclamos');
                count.once('value', function (snapshot) {
                    var cuenta = snapshot.numChildren();
                    //le sumo uno a la coleccion
                    cuenta++;
                    //fin count de la coleccion
                    var isAnonymous = user.isAnonymous;
                    var uid = user.uid;
                    fecha = new Date();
                    var rtaSaveRec = database.ref('reclamos');
                    var rtaSaveRecKey = rtaSaveRec.push()
                    rtaSaveRecKey.set({
                        userId: uid,
                        calle: calle,
                        entre1: entre1,
                        entre2: entre2,
                        altura: altura,
                        categoria: id_categoria,
                        numeroContacto: contacto,
                        comentario: comentario,
                        fechaCreacion: fecha.toLocaleString(),
                        nroReclamo: cuenta,
                        estado: 'ingresado',
                        imagen: uploadTask.blob_,
                        ubicacion: ubicacion.innerText
                        
                    })
                    swal("Gracias!", "Su Reclamo nro  " + cuenta + "  ha sido generado", "success");
                });
                //fin count
            } else {
                //console.log('fallo');
                swal("Ups! Su Reclamo no fue creado");
                // User is signed out.
                // ...
            }
            //KeyRec = rtaSaveRecKey.key;
        });

   // }
}

function takePhoto() {
    fichero = document.getElementById("fichero");
     imagenASubir = fichero.files[0];
    
    }
     function guardaStorage(imagenASubir){
        var storage = firebase.storage();
        StorageFoto = storage.ref();
        uploadTask = StorageFoto.child('StorageFoto/' + imagenASubir[0].name).put(imagenASubir[0]);
     }
     
function showPosition(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
            ubicacion = document.getElementById("ubicacionId");
            var location = {
                longitude: position.coords.longitude,
                latitude: position.coords.latitude
            }
            //console.log(location);
            ubicacion.innerText = location.longitude + ', ' + location.latitude;
            //showInMap(location);
        
            latlon = position.coords.latitude + "," +  position.coords.longitude;

            var map = L.map('mapLocId').
            setView( [position.coords.latitude, position.coords.longitude],
            12);
        
            L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data © OpenStreetMap contributors, CC-BY-SA, Jortilles',
        maxZoom: 18
        }).addTo(map);
        
        L.control.scale().addTo(map);
        
        var marker = L.marker([  position.coords.latitude, position.coords.longitude ],{draggable: true}).addTo(map);  
        marker.bindPopup("Usted registra el reclamo aqui").openPopup();
        });
    } else{
        alert("Sorry, your browser does not support HTML5 geolocation.");
    }
}

/*
function gtmapaa(){
    
    //var map = document.getElementById('map').addEventListener('click', mapaa, true);
    var map = document.getElementById('map').value;
    var map = L.map('map').
    setView( [longitude, latitude],
    12);

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: 'Map data © OpenStreetMap contributors, CC-BY-SA, Jortilles',
maxZoom: 18
}).addTo(map);

L.control.scale().addTo(map);

var marker = L.marker([  41.4780103, 2.3043663 ],{draggable: true}).addTo(map);  
marker.bindPopup("Hola Mundo!Aqui estan nuestras oficinas").openPopup();

}

var longitude;
var latitude;
/*
function getLocation() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);

    } else {
        console.log("Geo Location not supported by browser");
    }
}

//function that retrieves the position

function showPosition(position) {
    var ubicacion = document.getElementById("ubicacionId");
    var location = {
        longitude: position.coords.longitude,
        latitude: position.coords.latitude
    }
    //console.log(location);
    ubicacion.innerText = location.longitude + ', ' + location.latitude;
    showInMap(location);
}
*/
