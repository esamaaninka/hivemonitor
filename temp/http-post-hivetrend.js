var request = require('request');
var d = new Date();

//console.log(d.toUTCString());

var data = JSON.stringify({
    "datetime":d.toUTCString(),
    "hive_id":"1",
    "hive_weight":"34.3",
    "hive_temp":"35.4",
    "hive_humidity":"35.2",
    "hive_battery_voltage":"11.9",
    "ambient_temp":"-3.3",
    "ambient_humidity":"34.2"
  });

  var options = {
  'method': 'POST',
  'url': 'http://192.168.1.102:7071/api/sethivedata2',
  'headers': {
    'Content-Type': 'application/json'
  },
  body: data
  };

  request(options, function (error, response) { 
  if (error) throw new Error(error);

  console.log(response.body);
});