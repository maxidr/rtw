var faye = require('faye');

var mount_name = "/subscription";
var port = module.parent.service_port;
var client = new faye.Client("http://localhost:" + port + mount_name);



module.exports = {
	publish: function(canal, data){
		client.publish(canal, {text: data});
	},

	mount_path: function(){
		return mount_name;
	},

	start_service: function(){
		var service = new faye.NodeAdapter({
			mount: mount_name,
			timeout: 45
		});
		var app = module.parent.exports;
		service.attach(app);
	}
};

