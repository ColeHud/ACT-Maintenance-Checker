var request = require('request');
var address = "http://www.actstudent.org/account/";
var siteUp = false;

var notify = function()
{
	if(siteUp)
	{
		console.log("The site is up!");
	}
	else
	{
		console.log("The site is down :(");
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