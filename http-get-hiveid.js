// debuggerissa näyttää ok, mutta saa 204 virheen??!!
// https vaatii ehkä ssl3 päivitystä tms. toimii nyt http
const http = require('http');

const options = {
    hostname: '192.168.1.102',
    port: 7071,
    path:'/api/gethiveid?id=1',
    method: 'GET'	
  }
  const req = http.request(options, (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);
  
    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });
  
  req.on('error', (e) => {
    console.error(e);
  });
  req.end();
  