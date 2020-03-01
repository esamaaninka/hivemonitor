
var request = require('request');
var options = {
  'method': 'POST',
  'url': 'http://192.168.1.102:7071/api/sethivedata?id=1',
  'headers': {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({"id":"1","hive-id":"1","weight":"21","temp":"35.2","humidity":"45.3","voltage":"12.1"})

};
request(options, function (error, response) { 
  if (error) throw new Error(error);
  console.log(response.body);
});

// jotain ongelmaa req.body undefined debuggerissa
// https vaatii ehkä ssl3 päivitystä tms. http kanssa toimii

/*
const http = require('http');

//
// tämä POST hivetrend dataa
var options = {
  'method': 'POST',
  'hostname': '192.168.1.102',
  'port': 7071,
  'path': '/api/sethivedata?id=1',
  'headers': {
    'Content-Type': 'application/json'
  },
  'maxRedirects': 20
};


var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on("error", function (error) {
    console.error(error);
  });
});



var postData = JSON.stringify({"id":"1","hive-id":"12","weight":"21","temp":"35.2","humidity":"45.3","voltage":"12.1"});

req.write(postData);
req.end();
*/