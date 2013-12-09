var Resource = require('../lib/resource');
module.exports = function index(app){
	var self = new Resource();
	self.title = "express-represent, represent requests via content negotiation.";
	self.js.push("index");
	app.get("/(index)?.:format?", function(req, resp, next){
		resp.send({resource: self
			, view: "index/index"
			, model:{header: "Purpose", copy: "Use a representational paradigm with ExpressJS."}
		});
	});
	app.post("/(index)?.:format?", function(req, resp, next){
		var model = {header: "Purpose", copy: req.body.copy};
		resp.send({resource: self, view: "index/index", model:model});
	});
	return self;
};