##Example website using express-represent
Notice the contentTypes folder. That has all the multi media types that you want your site to respond to.

This is an example website built using express-represent. Note:

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
	
in the server.js file that overrides express' response.send method. This is just one way to do it. You can also create another method on the response object and use that in your handlers instead of resp.send. 