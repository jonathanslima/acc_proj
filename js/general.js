$(document).ready(function(){
	$('.alert .fas').on('click', function(){
		$(this).closest('.alert').slideUp();
	})
});