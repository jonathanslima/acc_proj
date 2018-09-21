$(document).ready(function(){

	var allUsersData,
			arr,
			$blockPagination = $('.block-pagination'),
			count = 1,
			$nextList = $('#nextList'),
			$numPage = 1,
			$prevList = $('#prevList'),
			$tbody = $('.list-container'),
			totalPages = localStorage.getItem('totalPages'),
			tr;


	var mountList = function(count){
		$.ajax({
			// url: "https://reqres.in/api/users?per_page=12" + count,			
			url: "https://reqres.in/api/users?page=" + count,
			type: "GET",

			success: function(response){
				console.log(response);
				allUsersData = response.data;

				allUsersData.map(function(user){
					tr =  '<tr class="list-container-li">' 
							+ '<th class="id" scope="row">' + user.id + '</th>'
							+ '<td class="fname">' + user.first_name + '</td>'
							+ '<td class="lname">' + user.last_name + '</td>'
							+ '<td>'
							+ '<a href="javascript:;" class="list-container-a">' 
							+ '<i class="fas fa-address-card"></i>' 
							+ '</a>'
							+ '</td>'
							+ '</tr>';
					
					$('.spinner-table').remove();	
					$tbody.append(tr);
				})
				localStorage.setItem('totalPages', response.total_pages);

				return response;
			},
			error: function(){
				console.log('falhou');
				$('.invalid-feedback').fadeIn();
			}
		});
	}

	var ordArrByIndex = function(){
		arr = [];
		$('.id').map(function(){
			arr.push($(this).text());
		})
	}

	$('.fa-angle-up').on('click', function(){
		ordArrByIndex();
		arr.reverse();
		console.log(arr)
	});

	$('.fa-angle-down').on('click', function(){
		ordArrByIndex();
		arr.sort();
		console.log(arr)
	});

	var cleanTable = function(){
		$tbody.empty('.list-container-li');
		$tbody.append('<img class="spinner-table" src="img/spinner-table.gif" alt="">');
	}

	var mountPagination = function(){
		for(var i = 1; i <= totalPages; i++){
			$blockPagination.append('<li class="page-item page"><a class="page-link" href="#">' + i + '</a></li>');
		}

		$('.page').on('click', function(){
			$numPage = $(this).text();
			$nextList.removeAttr('disabled');
			$prevList.removeAttr('disabled');

			if($numPage == totalPages){
				$nextList.attr('disabled', 'disabled')
				$nextList.addClass('disabled')
			}
	
			cleanTable();
			mountList($numPage);
			console.log($numPage);
	
			return $numPage;
		})
	}

	/* next page */
	$nextList.on('click', function(){
		cleanTable();
		$prevList.removeAttr('disabled');
		$numPage = parseInt($numPage) + 1;

		if($numPage == totalPages){
			console.log('contador next: ', $numPage);
			$(this).attr('disabled', 'disabled')
			$(this).addClass('disabled')
		}else{
			$(this).removeClass('disabled')
		}

		mountList($numPage);
	});

	/* prev page */
	$prevList.on('click', function(){
		cleanTable();
		$nextList.removeAttr('disabled');
		$numPage = $numPage - 1;

		if($numPage < 2){
			console.log('contador prev: ', $numPage);
			$(this).attr('disabled', 'disabled')
			$(this).addClass('disabled')
		}else{
			$(this).removeClass('disabled')
		}

		mountList($numPage);
	});

	/* Call */
	mountList();
	mountPagination();

});