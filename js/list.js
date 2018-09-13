$(document).ready(function(){

	var $user = $('#user');
	var $pass = $('#pass');
	var count = 1;

	$.ajax({
		url: "https://reqres.in/api/users?page=" + count,
		type: "GET",

		success: function(response){
			console.log(response);
		},
		error: function(){
			console.log('falhou');
			$('.invalid-feedback').fadeIn();
		}
	});
});