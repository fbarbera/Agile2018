function submit() {
 
    var database = firebase.database();

    var calle = document.getElementById('calleId');
    var id_calle = calle.options[calle.selectedIndex].value;
    var entre1 = document.getElementById('entre1Id');
    var id_entre1 = entre1.options[entre1.selectedIndex].value;
    var entre2 = document.getElementById('entre2Id');
    var id_entre2 = entre2.options[entre2.selectedIndex].value;
    var altura = document.getElementById('alturaId');
    var id_altura = altura.options[altura.selectedIndex].value;
    var descripcion = document.getElementById('descripcionId');
    var id_descripcion = descripcion.options[descripcion.selectedIndex].value;
    var contacto = document.getElementById('contactoId');
    var id_contacto = contacto.options[contacto.selectedIndex].value;
    var comentario = document.getElementById('comentarioId');
    var id_comentario = comentario.options[comentario.selectedIndex].value;

    alert(id_comentario);
    


    var KeyUsu = "";
    var KeyPue = "";

    var rtaMainUsu = database.ref('reclamos');
    rtaMainUsu.orderByChild("calle").equalTo(id_calle).on('child_added', function (ss) {
        var rtaMainUsu = ss.val();
        rtaMainUsu.key = ss.key;
        KeyUsu = rtaMainUsu.key;
        //alert(KeyUsu);
    });
    rtaMainUsu.orderByChild("entre1").equalTo(id_entre1).on('child_added', function (ss) {
        var rtaMainUsu = ss.val();
        rtaMainUsu.key = ss.key;
        KeyUsu = rtaMainUsu.key;
        //alert(KeyUsu);
    });
    rtaMainUsu.orderByChild("entre2").equalTo(id_entre2).on('child_added', function (ss) {
        var rtaMainUsu = ss.val();
        rtaMainUsu.key = ss.key;
        KeyUsu = rtaMainUsu.key;
        //alert(KeyUsu);
    });
    rtaMainUsu.orderByChild("altura").equalTo(id_altura).on('child_added', function (ss) {
        var rtaMainUsu = ss.val();
        rtaMainUsu.key = ss.key;
        KeyUsu = rtaMainUsu.key;
        //alert(KeyUsu);
    });
    rtaMainUsu.orderByChild("descripcion").equalTo(id_descripcion).on('child_added', function (ss) {
        var rtaMainUsu = ss.val();
        rtaMainUsu.key = ss.key;
        KeyUsu = rtaMainUsu.key;
        //alert(KeyUsu);
    });
    rtaMainUsu.orderByChild("contacto").equalTo(id_contacto).on('child_added', function (ss) {
        var rtaMainUsu = ss.val();
        rtaMainUsu.key = ss.key;
        KeyUsu = rtaMainUsu.key;
        //alert(KeyUsu);
    });
    rtaMainUsu.orderByChild("comentario").equalTo(id_comentario).on('child_added', function (ss) {
        var rtaMainUsu = ss.val();
        rtaMainUsu.key = ss.key;
        KeyUsu = rtaMainUsu.key;
        //alert(KeyUsu);
    });

    var rtaMainPue = database.ref('Puerta');
    rtaMainPue.orderByChild("Descripcion").equalTo(id_puerta).on('child_added', function (sss) {
        var rtaMainPue = sss.val();
        rtaMainPue.key = sss.key;

        KeyPue = rtaMainPue.Key;

        alert(KeyPue);

        //console.log(KeyPue);
    });

    alert(KeyPue);
    alert(KeyUsu);
	/*
	if(KeyPue =  KeyUsu)
	{
		alert("ok");
	}
	else 
	{
		alert("NOOOOOO");
	}
	*/

}