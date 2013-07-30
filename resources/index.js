var Resource = require('../resource');
module.exports = function index(app){
	var self = new Resource();
	self.title = "express-represnet, organize your code in a ReSTful way.";
	self.js.push("index");
	app.get("/(index)?.:format?", function(req, resp, next){
		resp.represent("index/index", self, {header: "Purpose", copy: "Use a representational paradigm with ExpressJS."}, next);
	});
	app.post("/(index)?.:format?", function(req, resp, next){
		var model = {header: "Purpose", copy: req.body.copy};
		resp.represent("index/index", self, model, next);
	});
	return self;
};