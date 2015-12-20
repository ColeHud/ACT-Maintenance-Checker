var request = require('request');

var address = "http://www.actstudent.org/account/";
request(address, function (error, response, body) {
		if (!error && response.statusCode == 200) 
		{
			console.log(body);
		}

	})