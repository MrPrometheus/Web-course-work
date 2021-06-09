var express = require("express"),
	http = require("http"),
	app = express(),
	mongoose = require("mongoose"),
	UsersController = require("./controllers/users_controller.js");
	AppoController = require("./controllers/appointments_controller.js");
	
app.use('/',express.static(__dirname + "/client"));

http.createServer(app).listen(3000);
// объекты JSON
app.use(express.urlencoded({ extended: true }));
// подключаемся к хранилищу данных Amazeriffic в Mongo
mongoose.connect('mongodb://localhost/clinic', {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true 
	}).then(res => {
		console.log("DB Connected!")
	}).catch(err => {
		console.log(Error, err.message);
	});

app.get("/users.json", UsersController.index); 
app.post("/users", UsersController.create); 
app.post("/accounts", UsersController.login);
app.get("/users/:id", UsersController.show);
app.get("/users/:id/account", UsersController.getaccount);
app.put("/users/:id", UsersController.update);
app.delete("/users/:id", UsersController.destroy);

app.get("/appoint.json", AppoController.index);

app.get("/users/:id/appoint.json", AppoController.index);
app.post("/users/:id/appoint", AppoController.create);
app.put("/users/:id/appoint/:idappo", AppoController.update);
app.delete("/users/:id/appoint/:idappo", AppoController.destroy);