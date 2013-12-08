var port = process.env.PORT;
var config = {};
var runAsUser = null;
var express = require('express');
var http = require('http');
var app = express();
var Fs = require('fs');
var cachedResources = [];
var rootPath = __dirname.replace('lib', '');
var resourcesFolder = rootPath + "/resources";
var Represent = require("./lib/represent");
function getEnvironmentConfig(){
	return require('./lib/env.js');
}
function ErrorMessage(error){
	if(typeof error === Object || error === 500){
		this.message = "Internal app Error";
		this.code = 500;
	}else if(error === 401){
		this.message = "Unauthorized";
		this.code = 401;
	}else if(error === 404){
		this.message = "Not found";
		this.code = 404;
	}
}
function requiredConfigsNotSet(){
	return process.env.THEME === undefined;
}

/* override express's response send with Represent.*/
express.response.send = function(result){
	if(!result.view){
		this.statusCode = result;
		this.set('Content-Type', 'text/plain');
		return this.end(arguments.length > 1 ? arguments[1] : null);
	}
	result.resource.user = this.req.user;
	Represent.execute({
		next: this.req.next
		, model: result.model
		, request: this.req
		, response: this
		, resource: result.resource
		, view: result.view
	});
};

if(requiredConfigsNotSet()){
	process.env = getEnvironmentConfig();
}
config.cookie = {
	secret: process.env.COOKIE_SECRET
	, key: process.env.COOKIE_KEY
};
Represent.themeRoot = process.env.THEME;
process.argv.forEach(function(value, fileName, args){
	if(/as:/.test(value)) runAsUser = /as\:([a-zA-Z-]+)/.exec(value)[1];
	if(/port:/.test(value)) port = /port:(\d+)/.exec(value)[1];
});
if(!port) port = 10000;
process.on('uncaughtException', function(err){
    console.trace('got an error:', err);
    //process.exit(1);
});
process.on('exit', function() {
  console.log('exited.');
});
//app.use(express.errorHandler({ dumpExceptions: true, showStack: true }))
app.use(express.compress());
console.log(rootPath + '/' + Represent.themeRoot);
app.use("/public", express.static(rootPath + '/themes/' + Represent.themeRoot));
app.set("views", rootPath + '/themes/' + Represent.themeRoot + '/views');
app.set("view engine", function(view, options, fn){
	return fn(view, options);
});
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieSession({ key: config.cookie.key, secret: config.cookie.secret}));
// load resource files.
Fs.readdirSync(resourcesFolder).forEach(function(file) {
	var key = file.replace('.js', '');
	var resource = require(resourcesFolder + "/" + file)(app);
	cachedResources.push(resource);
});
// send errors back to client.
app.use(function(err, req, res, next){
  //console.trace('error:', JSON.stringify(err));
  var error = new ErrorMessage(err);
  res.send(error.message);
});
app.listen(port, function(){
	if(runAsUser !== null){
		process.setgid(runAsUser);
		process.setuid(runAsUser);
	}
	console.log('listening on ', port);
});
