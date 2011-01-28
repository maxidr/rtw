
/**
 * Module dependencies.
 */
require.paths.unshift('./node_modules');
var express = require('express');

var app = module.exports = express.createServer();

// Configuration

var port = 3000;

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyDecoder());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.staticProvider(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Faye (PUB/SUB)
var faye = require('faye');
var faye_mount_name = "/subscription";
var faye_service = new faye.NodeAdapter({
	mount: faye_mount_name,
	timeout: 45
});

var faye_client = new faye.Client("http://localhost:" + port + faye_mount_name);

faye_service.attach(app);

// Routes

app.get('/', function(req, res){
  res.render('index', {
    locals: {
      title: 'Express'
    }
  });
});

// Pantallas para testeo de publicación y exhibición.

app.get('/publicador',function(req,res){
	res.render('publicador/index', {
		locals: { title: 'Publicador', faye_mount: faye_mount_name }
	});
});

app.get('/exhibidor', function(req, res){
	res.render('exhibidor/index', {
		locals: { title: 'Exhibidor', faye_mount: faye_mount_name }
	});
});

// Only listen on $ node app.js

if (!module.parent) {
  app.listen(port);
  console.log("Express server listening on port %d", app.address().port)
}
