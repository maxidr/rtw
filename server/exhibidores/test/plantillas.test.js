//Plantillas:
//- Nueva: Dar de alta una plantilla
//  POST     /plantillas
//  Parámetros:
//  	- id
//  	- template
//  Respuesta: (content-type: text/plain)
//  	- OK: Vacio, status 200
//  	- ERROR: Descripción del error, status 500

//- Mostrar: Retorna el contenido de una plantilla específica
//	GET        /plantillas/{idTemplate}
//	Parámetros:
//		- idTemplate

var app = require('../app'),
    assert = require('assert');


module.exports = {
  'POST /plantillas sin los parametros requeridos (id y template)' : function(){
    assert.response(app,
      { url: '/plantillas', method: 'POST' },
      {
      	status: 500,
      	headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      	body: "Los parámetros id y template son requeridos para esta solicitud"
      });
  },
  'POST /plantillas con el parametro id': function(){
  	assert.response(app,
  		{ url: '/plantillas', method: 'POST' },
  		{
  			status: 500,
  			headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      	body: "Los parámetros id y template son requeridos para esta solicitud"
  		});
  },
};

