var vows = require('vows'),
    app = require('../app'),
		tobi   = require('tobi'),
    assert = require('assert');

app.listen(3000);

var options = { body: 'tester' }
console.log("body:" + options.body);

var newbie = function(){ return tobi.createBrowser(3000, "localhost") };

vows.describe('Plantillas').addBatch({
	'Si realizo un requerimiento POST sin los parametros id y template': {
		topic: function() {
			var browser = newbie();
			browser.post('/plantillas', this.callback);
		},
		'debe fallar': function(res, $){
			res.should.have.status(500);
//			assert.equal(res.headers['content-type'], 'text/plain; charset=utf-8');
      res.should.have.header('Content-Type', 'text/plain; charset=utf-8');
		}
	},
	'Si realizo un POST con los parametros id y template': {
		topic: function(){
			var browser = newbie();
			var data = JSON.stringify({body: 'id=12&template=%3Cp%3Etest%3C%2Fp%3E'});
			browser.post('/plantillas', { body: 'id=12&template=%3Cp%3Etest%3C%2Fp%3E' } , this.callback);
		},
		'debe resultar correcto': function(res, $){
			res.should.have.status(200);
		}
	},
}).export(module);

