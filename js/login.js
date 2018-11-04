$(document).ready(function(){
	$('#btn-login').on('click', function(e){
		e.preventDefault();
		var $user = $('#user');
		var $pass = $('#pass');
		$('.button-outline').addClass('button-spinner');

		$.get({
			url: "https://reqres.in/api/login",
			type: "POST",
			data: {
			    "email": $user.val(),
			    "password": $pass.val()
			},
			success: function(response){
				var token = JSON.stringify(response);
				var date = moment(new Date());
				localStorage.setItem('expire_in', date.add(3, 'minutes'));
				localStorage.setItem('token', token);

				if($('#rememberUser').prop('checked')){
					localStorage.setItem('rememberUser', $user.val());
				}

				$('.button-outline').addClass('button-check');

				setTimeout(function(){
					window.location.href = '/list.html';				
				}, 3000);
			},
			error: function(){
				console.log('falhou');
				$('.alert-danger').slideDown();
				$('.alert-danger span').text('Um erro aconteceu ao tentar fazer login, tente novamente :(');
				$('.button-outline').removeClass('button-spinner');
			}
		});
	});

	$('#pass').on('focus', function(){
		$('#passwordHelpInline').slideDown();
	});
});