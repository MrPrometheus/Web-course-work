var main = function () {
	"use strict";

	function loginfunc() {
		var login = $('#login_window .form_request input[name="login"]').val();
		var password = $('#login_window .form_request input[name="password"]').val();
		if (login !== null && login.trim() !== "") {
			console.log('email: ' + login + ' password: ' + password);
			$.ajax({
				url: '/accounts',
				type: 'POST',
				data: { 'email': login,
						'password': password }
			}).done(function(responde) {
				window.location.replace('users/' + responde._id + '/');
			}).fail(function(jqXHR, textStatus, error) {
				console.log(error);
				alert("Пользователь не найден.\nПроверьте верность введенных данных и повторите попытку");
				$('#login_window .form_request input[name="password"]').val("");
			});
		}
	}

	$(".submit").on("click", function() {
		loginfunc()
	});

	$('input[name="password"]').on('keydown', function(e) {
		if (e.which === 13) {
			loginfunc();
		}
	});

	console.log("login.js выполнен");
}

$(document).ready(main);