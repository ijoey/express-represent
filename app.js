var port = process.env.PORT;
var runAsUser = null;
var express = require('express');
var app = express();
var fs = require('fs');
var cachedResources = [];
var resourcesFolder = __dirname + "/resources";
var Represent = require("./represent");


// run as:
// node app.js port:3001 as:joeyguerra
// as is the user name to run the process as in UNIX. Doesn't really work in Windows.

process.argv.forEach(function(value, fileName, args){
	if(/as:/.test(value)) runAsUser = /as\:([a-zA-Z-]+)/.exec(value)[1];
	if(/port:/.test(value)) port = /port:(\d+)/.exec(value)[1];
});
if(!port) port = 3000;
app.response.represent = function(view, resource, model, next){
	resource.user = this.req.user;
	Represent.execute({next: next, response: this, request: this.req, view: view, resource: resource, model: model});
};
app.configure(function(){
	app.use(express.compress());
	app.use("/public", express.static(Represent.themeRoot));
	app.set("views", __dirname + "/themes/default/views");
	app.set("view engine", function(view, options, fn){
		return fn(view, options);
	});
	app.use(express.methodOverride());
	app.use(express.bodyParser());
	app.use(express.cookieParser("somelongpassword...."));
	app.use(express.cookieSession({ secret: 'somelongpassword....', maxAge: 360*5 }));
	// load resource files.
	fs.readdirSync(resourcesFolder).forEach(function(file) {
		var key = file.replace('.js', '');
		var resource = require(resourcesFolder + "/" + file)(app);
		cachedResources.push(resource);
	});
});

// send errors back to client.
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});
app.listen(port, function(){
	if(runAsUser !== null){
		process.setgid(runAsUser);
		process.setuid(runAsUser);
	}
});