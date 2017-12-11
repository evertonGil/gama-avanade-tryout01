$("#btn-apply-form").bind('click', function (){

	$('#apply-modal').modal();

});

$('#apply-modal').on('shown.bs.modal', function () {
  $('#nome').trigger('focus')
});


var form =  $('#apply-modal form');

form.bind('submit', function(event){

	//console.log(form[0].checkValidity());

	if (form[0].checkValidity() === false) {
		console.log("Email invalido");
	}
	else{
        event.preventDefault();
        event.stopPropagation();
		console.log("Wnviando inscrição...");

		form.addClass('was-validated');

		$.ajax({
			method: 'POST',
			url: 'http://avanade.gama.academy/api/process_applications',
			dataType: 'json',
			headers: { EMAIL: 'egmsantos2@yahoo.com.br' }, // coloque seu email que usou para se inscrever aqui!
			contentType: 'application/json',
			data: JSON.stringify({ process_application: { name: $('#name').val(), email: $('#email').val() } }),
			success: function(json) { 
				// Código de successo!
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log('Erro', jqXHR.responseText);
				// Não esquece de tratar os erros
			}
		});
	}

	
});



/*
$("#btn-apply").bind('click', function(event){
	event.preventDefault();
	

});
*/
