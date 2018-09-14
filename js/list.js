$(document).ready(function(){

	var $user = $('#user'),
			$pass = $('#pass'),
			count = 1,
			$nextList = $('#nextList'),
			$prevList = $('#prevList'),
			allUsersData,
			ul = $('.list-container'),
			li;

	var mountList = function(count){
		$.ajax({
			url: "https://reqres.in/api/users?page=" + count,
			type: "GET",

			success: function(response){
				// console.log(response);
				// console.log(response.data);

				allUsersData = response.data;

				allUsersData.map(function(user){
					li = '<li class="list-container-li"><a href="javascript:;" class="list-container-a">' + user.first_name + ' ' + user.last_name + '</a></li>';

					ul.append(li);
				})
			},
			error: function(){
				console.log('falhou');
				$('.invalid-feedback').fadeIn();
			}
		});
	}

	mountList();

	$nextList.on('click', function(){
		ul.empty('.list-container-li');
		count = count + 1;
		if(count > 3){
			console.error(count);
			$(this).attr('disabled', 'disabled')
		}
		console.log(count);
		mountList(count);
	});

	$prevList.on('click', function(){
		ul.empty('.list-container-li');
		count = count - 1;

		if(count > 1){
			console.error(count);
			$(this).attr('disabled', 'disabled')
		}
		mountList(count);
	});

});