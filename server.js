var express = require('express');
var app = express();

var reload = require('reload');
var http = require('http');

var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpackDevConfig = require('./webpack.base.config.js');


app.locals.reload = true;
var compiler = webpack(webpackDevConfig);
// app.get('*',(req, res) =>{
	
// });
app.use(webpackDevMiddleware(compiler,{
	publicPath:webpackDevConfig.output.publicPath,
	noInfo:true,
	stats:{
		colors:true
	}
}));
app.use(webpackHotMiddleware(compiler));
app.use(express.static('dist'));

app.get('*', function(req, res){
	console.log(req.url);
	if(/^\/*blog/.test(req.url)){
		var mockPath = req.url.split('/').slice(-1).toString();
		var data = require(`./client/mock/${mockPath}.json`);
		res.send(JSON.stringify(data || {}));
		return ;
	}
	res.end();
});

var server = http.createServer(app);
reload(server, app);

server.listen(3000,()=>{
	console.log('listen at http://localhost:3000');
})