var urlPage = 'http://138.68.19.221:1500/api/v1/pets';
$(document).ready(function(){
	//console.log('document listo');
	loadPet('583870cb28bbcee3798c4cbe');
});
/*Get obtener la lista de mascotas*/
function loadPet(petId){
	$.ajax({
		url:urlPage + '/' +petId,
		//ejecutara el succees cuando la conexion esta bien
		//servidor responde 2xx si sale 400 o500 es error
		success:function(data , status, request){
			console.log('status:',status);
			console.log('data:',data);
			console.log('request:',request);
			renderPet(data);
		},
		//ejecutara cuando hay un error
		error: function(request, options, error){
			alert("error");
		},
		//se ejecutara cuando se acaba la peticion al servidor
		//si todo sale bien o hay error
		complete: function(){

		}	
	});
}
/*Pintar la informacion de la mascota*/
function renderPet(pet){
	//Puso un id para buscarlo en el html
	var labelName = $('#labelName');
	var fotoPet = $('#fotoPet');
	var parrafoDescripcion = $('#parrafoDescripcion');
	var labelAge = $('#labelAge');
	//actualiza los valores del perro
	labelName.text(pet.name);
	//actualiza la imagen del perro, debes de ingresarle la src de la img
	fotoPet.attr('src',pet.mainPicture);
	//actauliza el parrafo de la descripcion
	parrafoDescripcion.text(pet.description);
	//empieza lo de underscore
	var templateAge = "<%= number %> <span> <%= type %></span>";
	var compiled = _.template(templateAge);
	//aqui en la variable p ,van todas las cosas que queremos en el nuevo parrafo
	/*var p = compiled({
		number: pet.age.number,
		type:pet.age.type
	});*/
	
	//otro
	var paramsTemplate = {
		number: pet.age.number
	};
	if(pet.age.type == "years"){
		paramsTemplate.type = "Años";
	}else{
		paramsTemplate.type = "Meses";
	}
	//opcion 2 para hacer el if mas concreto
	paramsTemplate.type = pet.age.type == 'years'?'Años':'Meses';
	var p = compiled(paramsTemplate);
	labelAge.html(p);
}