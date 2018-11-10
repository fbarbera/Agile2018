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

    expresion = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/;

    if (calle == "" || entre1 == "" || entre2 == "" || altura == "" || categoria == "" || id_categoria == "" || contacto == "" || comentario == "" ||clave == ""  ) {
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
                        estado: 'ingresado'
                    })
                    
                });
                //fin count 
                swal("Gracias!", "Su Reclamo ha sido generado", "success");
            } else {
                console.log('fallo');
                swal("Ups! Su Reclamo no fue creado");
                // User is signed out.
                // ...
            }
            //KeyRec = rtaSaveRecKey.key;

        });
            
        //clave.hidden = false;
        //clave.value = KeyRec;

        /*rtaSaveRec.orderByChild("calle").equalTo(calle).on('child_added', function (ss) {
            var rtaSaveRec = ss.val();
            rtaSaveRec.key = ss.key;
            KeyRec = rtaSaveRec.key;        
        });
        rtaSaveRec.orderByChild("entre1").equalTo(entre1).on('child_added', function (ss) {
            var rtaSaveRec = ss.val();
            rtaSaveRec.key = ss.key;
            KeyRec = rtaSaveRec.key;        
        });
        rtaSaveRec.orderByChild("entre2").equalTo(entre2).on('child_added', function (ss) {
            var rtaSaveRec = ss.val();
            rtaSaveRec.key = ss.key;
            KeyRec = rtaSaveRec.key;        
        });
        rtaSaveRec.orderByChild("altura").equalTo(altura).on('child_added', function (ss) {
            var rtaSaveRec = ss.val();
            rtaSaveRec.key = ss.key;
            KeyRec = rtaSaveRec.key;        
        });
        rtaSaveRec.orderByChild("asunto").equalTo(id_asunto).on('child_added', function (ss) {
            var rtaSaveRec = ss.val();
            rtaSaveRec.key = ss.key;
            KeyRec = rtaSaveRec.key;        
        });
        rtaSaveRec.orderByChild("contacto").equalTo(contacto).on('child_added', function (ss) {
            var rtaSaveRec = ss.val();
            rtaSaveRec.key = ss.key;
            KeyRec = rtaSaveRec.key;        
        });
        rtaSaveRec.orderByChild("comentario").equalTo(comentario).on('child_added', function (ss) {
            var rtaSaveRec = ss.val();
            rtaSaveRec.key = ss.key;
            KeyRec = rtaSaveRec.key;        
        });  
        alert(database.ref('reclamos').);*/


        /*
        if(KeyPue =  KeyRec)
        {
            alert("ok");
        }
        else 
        {
            alert("NOOOOOO");
        }
        */

}
}
    