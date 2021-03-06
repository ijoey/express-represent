var Path = require('path');
var Fs = require('graceful-fs');
var Ejs = require('ejs');
function readFromFile(filePath, result, callback){
	Fs.readFile(filePath, {encoding: "utf-8"}
		, function(err, data){
			if(err) throw err;
			var output = Ejs.render(data, result);
			output = output.split(/\n/);
			output.forEach(function(s){ s = s.replace(/^\t+/, '')});
			output = output.join('');
			callback(output);
		});
}
module.exports = (function rss(){
	return {
		key: "application/rss+xml"
		, execute: function(exists, filePath, represent, result, callback){
			if(!exists){
				result.resource.status.code = 404;
				return callback(result, "Not found.");
			}
			readFromFile(filePath, result, function(output){
				result.output = output;
				var layout = represent.layoutRoot + result.resource.layout + ".rss";
				Fs.exists(layout, function(exists){
					if(!exists) return callback(output);
					readFromFile(layout, result, function(output){
						callback(result, output);		
					});
				});
			});
		}
	};
})();

