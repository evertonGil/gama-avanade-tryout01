$("#btn-apply-form").bind('click', function (){
	$('#apply-modal').modal();
});

$('#apply-modal').on('shown.bs.modal', function () {
	$('#formulario').show(0);
	$('#nome').trigger('focus');
});


var form =  $('#apply-modal form');

form.bind('submit', function(event){

	//console.log(form[0].checkValidity());

	if (form[0].checkValidity() === false) {
		 event.preventDefault();
		$('#apply-error').show(0);
		$('#apply-success').hide(0);
		form.addClass('was-validated');

		console.log("Formulario não passou");

	}
	else{
        event.preventDefault();
        event.stopPropagation();
		console.log("Enviando inscrição...");

		form.addClass('was-validated');

		$.ajax({
			method: 'POST',
			url: 'http://avanade.gama.academy/api/process_applications',
			dataType: 'json',
			headers: { EMAIL: 'egmsantos2@yahoo.com.br' }, // coloque seu email que usou para se inscrever aqui!
			contentType: 'application/json',
			data: JSON.stringify({ process_application: { name: $('#name').val(), email: $('#email').val() } }),
			success: function(json) { 
				
				$('#apply-success').show(0);
				$('#apply-error').hide(0);

				$('#name').val('');
				$('#email').val('');
				$('#formulario').removeClass('was-validated');
				
				console.log('inscrição enviada com sucesso.');

				
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log('Erro', jqXHR.responseText);

				$('.modal-body').prepend('<div id="apply-error" class="alert alert-danger">Inscrição concluida com sucesso! Aguarde nosso email de contato para maiores informções.</div>');
			}
		});
	}

	
});



/*
$("#btn-apply").bind('click', function(event){
	event.preventDefault();
	

});
*/
