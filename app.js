var schedule = require('node-schedule');
var request = require('request');

var address = "http://www.actstudent.org/account/";

//check ACT account site every minute
var j = schedule.scheduleJob('* 1 * * *', function(){
  
});