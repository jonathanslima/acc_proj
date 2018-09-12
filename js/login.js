$(document).ready(function(){
	$('#btn-login').on('click', function(e){
		e.preventDefault();
		console.log('oioioi');
		$.ajax({
	    url: "https://reqres.in/api/login",
	    type: "POST",
	    data: {
			    "email": "peter@klaven",
			    "password": "cityslicka"
			},
	    success: function(response){
	        console.log(response);

	        var token = JSON.stringify(response);
	        localStorage.setItem('token', token);
	    }
		});
	})
});