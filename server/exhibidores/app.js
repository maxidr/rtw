
/**
 * Module dependencies.
 */
require.paths.unshift('./node_modules');
var express = require('express');

var app = module.exports = express.createServer();

// Configuration

var port = module.service_port = 3000;

app.configure(function(){
  app.set('views', __dirname + '/app/views');
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

var broadcast_service = require('./broadcast').start_service();

// Routes

app.get('/', function(req, res){
  res.render('index', {
    locals: {
      title: 'Servidor de exhibidores'
    }
  });
});

require('./app/routes/tester');
require('./app/routes/plantillas');
require('./app/routes/exhibidores');

// Only listen on $ node app.js

if (!module.parent) {
  app.listen(port);
  console.log("Express server listening on port %d", app.address().port)
}

