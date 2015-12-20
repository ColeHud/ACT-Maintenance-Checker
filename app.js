var request = require('request');
var address = "http://www.actstudent.org/account/";
var siteUp = false;

// Twilio Credentials 
var accountSid = 'AC875dd9af14da990ead957aeb8f673598'; 
var authToken = '289c8aa340cb8c86e48b219afa426e02'; 

//require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken); 

var notify = function()
{
	if(siteUp)
	{
		console.log("The site is up!");

		client.messages.create({ 
			to: "2314140348", 
			from: "+12316741066", 
			body: "The ACT account site is BACK UP!!! :)"
		}, function(err, message) { 
			console.log("Message sent");
		});
	}
	else
	{
		console.log("The site is down :(");

		client.messages.create({ 
			to: "2314140348", 
			from: "+12316741066", 
			body: "The ACT account site is DOWN :("
		}, function(err, message) { 
			console.log("Message sent");
		});
	}
}

//check ACT website every 30 seconds
setInterval(function(){
	//request html body
	request(address, function (error, response, body) {
		if (!error && response.statusCode == 200) 
		{
			//check if the login prompt exists
    		if(body.indexOf("Create a new account") > -1)
    		{
    			console.log("+");

    			if(siteUp == false)
    			{
    				siteUp = true;
    				notify();
    			}
    		}
    		else
    		{
    			console.log("-");

    			if(siteUp == true)
    			{
    				siteUp = false;
    				notify();
    			}
    		}
  		}
	})

}, 30000);

//check ACT account site every minute
/*
var j = schedule.scheduleJob('10 * * * * *', function(){
	console.log("Scheduled");
	//request html body
	request(address, function (error, response, body) {
		if (!error && response.statusCode == 200) 
		{
			//check if the login prompt exists
    		if(body.indexOf("Already have an account?") > -1)
    		{
    			if(siteUp != true)
    			{
    				notify();
    			}
    			siteUp = true;
    		}
    		else
    		{
    			if(siteUp != true)
    			{
    				notify();
    			}
    			siteUp = false;
    		}
  		}
	})
});
*/