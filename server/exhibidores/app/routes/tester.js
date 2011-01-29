var app = module.parent.exports;

var broadcast = require('../../broadcast');
var faye_service = module.parent.faye_service;

// Pantallas para testeo de publicación y exhibición.
app.get('/publicador',function(req,res){
	res.render('publicador/index', {
		locals: { title: 'Publicador', faye_mount: broadcast.mount_path() }
	});
});

app.get('/exhibidor', function(req, res){
	res.render('exhibidor/index', {
		locals: { title: 'Exhibidor', faye_mount: broadcast.mount_path() }
	});
});

