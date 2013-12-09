var Resource = require('express-represent').Resource;
module.exports = function about(app){
	var self = new Resource();
	app.get("/about.:format?", function(req, resp, next){
		resp.send({
			model: {header: "About", copy: "This is a research on building web sites with ReST in mind. The paradigm here is think of your site or app as a set of resources who's default representation is in HTML. But I love the ability to just specifiy a file extension in the URL like about.json and get a JSON representation of that resource."}
			, view: 'about/index'
			, resource: self
		});
	});
	return self;
};