var fs = require('fs');
var data = null
if(fs.existsSync('dev.env')){
	data = fs.readFileSync('dev.env', 'utf8');	
}else if(fs.existsSync('prod.env')){
	data = fs.readFileSync('prod.env', 'utf8');		
}
if(data === null) return;
var env = {};
data.split(/\n/).forEach(function(line){
	var match = line.match(/^([^=:]+?)[=\:](.*)/);
	if(match && match[0]) env[match[1]] = match[2];
});
module.exports = env;