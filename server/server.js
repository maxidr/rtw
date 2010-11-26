var Faye = require('./faye-node');
var port = 8000;
server = new Faye.NodeAdapter({mount: '/'});
console.log('Server started! [listen on port '+ port +']');
server.listen(port);
