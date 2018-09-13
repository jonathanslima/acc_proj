$(document).ready(function(){
	if(localStorage.getItem('rememberUser')){
		$('#user').val(localStorage.getItem('rememberUser'));
		$('#rememberUser').prop('checked', true);
	}
	
});