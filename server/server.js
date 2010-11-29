var faye = require('./faye-node'),
    http = require('http'),
    url = require('url');

var port = 8000;

var bayeux = new faye.NodeAdapter({
	mount: '/rtw',
	timeout: 45
});

var client = new faye.Client("http://localhost:" + port + "/rtw");

var server = http.createServer(function(request, response){
	params = url.parse(request.url, true);
	query = params['query'];
	if( query != undefined ){
		var channel = query.channel;
		var msg = query.msg;	
		if( channel != undefined && msg != undefined ){
			console.log("Channel: " + channel + ", msg: " + msg);
			client.publish(channel, { text: msg });
			response.writeHead(200, {'Content-type': 'text-plain'});
			response.write("Enviado: \"" + msg + "\" \nCanal: " + channel);
			response.end();
		}else{
			response.writeHead(200, {'Content-type': 'text-plain'});
			response.write("Mensaje no enviado, falta el mensaje o el canal.\n");
			response.write("Debe especificar las variables msg y channel en la petici&oacute;n ");
			response.write("(ej: http://10.86.37.195:8000/?channel=aaa/12&msg=test)");
			response.end();
		}
	}
	
});

bayeux.attach(server);

console.log('Server started! [listen on port '+ port +']');
server.listen(port);
