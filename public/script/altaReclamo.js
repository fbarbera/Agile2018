
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
    expresion = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/;

    if (calle == "" || entre1 == "" || entre2 == "" || altura == "" || categoria == "" || id_categoria == "" || contacto == "" || comentario == "" || clave == "") {
        alert("Todos los campos son obligatorios.");

    }
    else {
        var KeyRec;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                //count de la coleccion
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
                        ubicacion: ubicacion.innerText
                    })
                    swal("Gracias!", "Su Reclamo nro  " + cuenta + "  ha sido generado", "success");
                });
                //fin count
            } else {
                console.log('fallo');
                swal("Ups! Su Reclamo no fue creado");
                // User is signed out.
                // ...
            }
            //KeyRec = rtaSaveRecKey.key;

        });



    }
}

function getLocation() {

    if (navigator.geolocation) {
        //navigator.geolocation.getCurrentPosition(showPosition);
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
    console.log(location);
    ubicacion.innerText = location.longitude + ', ' + location.latitude;
    showInMap(location);
}

function showInMap(pos) {
    var latlon = pos.latitude + "," + pos.longitude;

    var img_url = "https://maps.googleapis.com/maps/api/staticmap?center="+ latlon +"&zoom=14&size=400x300&sensor=false&key=AIzaSyBe4fc4rSJXLrlrGIkc5oiwEClhHKCjinY";
    var map = document.getElementById("showMapId");
    map.innerHTML = "<img src='" + img_url + "'>";
}
