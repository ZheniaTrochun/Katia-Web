const subscriptionSubmit = () => {
	const login = $('#login').val();
	const loginRegExpr = new RegExp('^[A-Z].*$');

  const phone = $('#phone').val();
  const phoneRegExp = /^[0-9]{7}/;

	if(!loginRegExpr.test(login)) {
		$('#login').css('color', 'red');
		return;
	} else {
		$('#login').css('color', '#555');
	}

  if(!phoneRegExp.test(phone)) {
		$('#phone').css('color', 'red');
		return;
	} else {
		$('#phone').css('color', '#555');
	}

	const email = $('#email').val();
	const emailRegExpr = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

	if(!emailRegExpr.test(email)) {
		$('#email').val('-');
		return;
	} else {
		$('#email').css('color', '#555');
	}

  $.ajax({
    type: 'POST',
    url: '/subscribe',
    data: {
      login: $('#login').val(),
      phone: $('#phone').val(),
      email: $('#email').val(),
      time: $('#time').val()
    },
    success: (res) => {
      console.log(res);
    }
  });

	$('#myModal').modal('toggle');
	$('#successModal').modal('show');
}
