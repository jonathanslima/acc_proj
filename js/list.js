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
							+ '<a href="#" class="list-container-a show-card-user">' 
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

	function sortTable(order, p) {
    var asc   = order === 'asc';

    $tbody.find('.list-container-li').sort(function(a, b) {
        if (asc) {
						return $('.' + p, a).text().localeCompare($('.' + p, b).text());
						
        } else {
            return $('.' + p, b).text().localeCompare($('.' + p, a).text());
        }
    }).appendTo($tbody);
	}

	var sortFunc = function(p){
		sortTable('asc', p);
	}

	var reverseFunc = function(p){
		sortTable('desc', p);
	}

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

	$(document).on('click', $('.show-card-user'),  function(e){
		e.preventDefault();
		$.ajax({
			url: "https://reqres.in/api/users/" + $(e.target).closest('.list-container-li').find('.id').text(),
			type: "GET",
			success: function(data){
				console.log('entrou');
				console.log(data);
			},
			error: function(){
				console.log('entrou');
				console.log('error!!!');
			}
		});
	});

	$('.orderByIndex').on('click', function(){sortFunc('id')});
	$('.orderByFname').on('click', function(){sortFunc('fname')});
	$('.orderByLname').on('click', function(){sortFunc('lname')});

	$('.unorderByIndex').on('click', function(){reverseFunc('id')});
	$('.unorderByFname').on('click', function(){reverseFunc('fname')});
	$('.unorderByLname').on('click', function(){reverseFunc('lname')});

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