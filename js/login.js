$(document).ready(function(){
	$('#btn-login').on('click', function(e){
		e.preventDefault();
		var $user = $('#user');
		var $pass = $('#pass');

		$.ajax({
			url: "https://reqres.in/api/login",
			type: "POST",
			data: {
			    "email": $user.val(),
			    "password": $pass.val()
			},
			success: function(response){
				$('.button-outline').addClass('button-spinner');
				setTimeout(function(){
					var token = JSON.stringify(response);
					localStorage.setItem('token', token);

					if($('#rememberUser').prop('checked')){
						localStorage.setItem('rememberUser', $user.val());
					}

					$('.button-outline').addClass('button-check');
				}, 1000);

				setTimeout(function(){
					window.location.href = '/list.html';				
				}, 3000);
			},
			error: function(){
				console.log('falhou');
				$('.alert-danger').slideDown();
				$('.alert-danger span').text('Um erro aconteceu ao tentar fazer login, tente novamente :(');
			}
		});
	});

	$('#pass').on('focus', function(){
		$('#passwordHelpInline').slideDown();
	});
});