var faye = require('./faye-node'),
    http = require('http'),    
    url = require('url'),
    express = require('express');
var app = express.createServer();

var port = 8000;

var bayeux = new faye.NodeAdapter({
	mount: '/rtw',
	timeout: 45
});

var client = new faye.Client("http://localhost:" + port + "/rtw");

//var server = http.createServer(function(request, response){
//	params = url.parse(request.url, true);
//	query = params['query'];
//	if( query != undefined ){
//		var channel = query.channel;
//		var msg = query.msg;	
//		if( channel != undefined && msg != undefined ){
//			console.log("Channel: " + channel + ", msg: " + msg);
//			client.publish(channel, { text: msg });
//			response.writeHead(200, {'Content-type': 'text-plain'});
//			response.write("Enviado: \"" + msg + "\" \nCanal: " + channel);
//			response.end();
//		}else{
//			response.writeHead(200, {'Content-type': 'text-plain'});
//			response.write("Mensaje no enviado, falta el mensaje o el canal.\n");
//			response.write("Debe especificar las variables msg y channel en la petici&oacute;n ");
//			response.write("(ej: http://10.86.37.195:8000/?channel=aaa/12&msg=test)");
//			response.end();
//		}
//	}	
//});

app.configure(function(){
	app.use(express.methodOverride());
  app.use(express.bodyDecoder());
  app.use(app.router);
  app.use(express.staticProvider(__dirname + '/public'));
});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});


app.get('/tester', function(req, res){
	res.send('hello word');
});

app.get('/plantillas/:id', function(req, res){
	res.send('Plantilla: ' + req.params.id);
});

app.post('/exhibidores/publicar', function(req, res){
	var canal = req.params.canal;
	var data = req.params.data;
	if( canal != undefined && data != undefined ){
		console.log("Canal: " + canal + ", data: " + data);
		client.publish(canal, {text: data});
	}else{
		res.send("ERROR");
	}
});

bayeux.attach(app);

console.log('Server started! [listen on port '+ port +']');
//server.listen(port);
app.listen(port);
