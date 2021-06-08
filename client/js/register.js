var main = function () {
	"use strict";

	function registerfunc() {
		var full_name = $('#register_window input[name="full_name"]').val(),
			date = $('#register_window input[name="date"]').val(),
			tel = $('#register_window input[name="tel"]').val(),
			email = $('#register_window input[name="email"]').val(),
			password = $('#register_window input[name="password"]').val(),
			repeat_password = $('#register_window input[name="repeat_password"]').val();
		if (repeat_password !== password) {
			alert("Пароли не совпадают!\nВведите пароли снова и повторите попытку");
			$('#register_window input[name="password"]').val("");
			$('#register_window input[name="repeat_password"]').val("");
		} else if ((full_name !== null && full_name.trim() !== "") && (date !== null && date.trim() !== "")) {
			if ((tel !== null && tel.trim() !== "") && (email !== null && email.trim() !== "") && (password !== null && password.trim() !== "") && !email.includes('doctor') && !email.includes('admin')) {

				$.ajax({
					url: '/users',
					type: 'POST',
					data: { 'username': full_name,
							'date_of_birth': date,
							'phone': tel,
							'email': email,
							'password': password }
				}).done(function(responde) {
					console.log(responde);
					alert('Аккаунт успешно создан!');
				}).fail(function(jqXHR, textStatus, error) {
					console.log(error);
					if (jqXHR.status === 501) {
						alert("Такой пользователь уже существует!\nИзмените логин и повторите "
						+ "попытку");
					} else {					
						alert("Произошла ошибка!\n"+jqXHR.status + " " + jqXHR.textStatus);	
					}
				});
			} else if (email !== null && email.trim() !== "" && email.includes('doctor')) {
				$.ajax({
					url: '/users',
					type: 'POST',
					data: { 'username': full_name,
						'date_of_birth': date,
						'phone': tel,
						'email': email,
						'password': password,
						'doctor': true,}
				}).done(function(responde) {
					console.log(responde);
					alert('Аккаунт успешно создан!');
				}).fail(function(jqXHR, textStatus, error) {
					console.log(error);
					if (jqXHR.status === 501) {
						alert("Такой пользователь уже существует!\nИзмените логин и повторите "
							+ "попытку");
					} else {
						alert("Произошла ошибка!\n"+jqXHR.status + " " + jqXHR.textStatus);
					}
				});
			} else if (email !== null && email.trim() !== "" && email.includes('admin')) {
				$.ajax({
					url: '/users',
					type: 'POST',
					data: { 'username': full_name,
						'date_of_birth': date,
						'phone': tel,
						'email': email,
						'password': password,
						'admin': true,}
				}).done(function(responde) {
					console.log(responde);
					alert('Аккаунт успешно создан!');
				}).fail(function(jqXHR, textStatus, error) {
					console.log(error);
					if (jqXHR.status === 501) {
						alert("Такой пользователь уже существует!\nИзмените логин и повторите "
							+ "попытку");
					} else {
						alert("Произошла ошибка!\n"+jqXHR.status + " " + jqXHR.textStatus);
					}
				});
			}
		}
	}

	$(".submit_register").on("click", function() {
		registerfunc();
	});

	$('input[name="repeat_password"]').on('keydown', function(e) {
		if (e.which === 13) {
			registerfunc();
		}
	});
}

$(document).ready(main);