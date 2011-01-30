var app = module.parent.exports;

app.post('/plantillas', function(req, res){
	console.log("body:" + req.body);
	console.log("params:" + req.params);
	console.log("query:" + req.query);
	if ( req.body == undefined || req.body.id == undefined || req.body.template == undefined ){
		console.log("[ERROR] Faltan parametros");
		res.send("Los parámetros id y template son requeridos para esta solicitud",
			 { 'Content-Type': 'text/plain; charset=utf-8' }, 500);
		return;
	}
	console.log("ID: " + req.body.id);
	console.log("Template: " + req.body.template);
	res.send(200);
});

