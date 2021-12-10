const net = require('net');

const client = new net.Socket();


function connection(method, data, cb = function(data, err){}) {
  client.connect(8080, '152.70.249.195', function() {
    console.log('Connected');
    client.write(JSON.stringify({
      method,
      data
    }));
  });
  
  client.on('data', function(data) {
    // console.log('Received: ' + data);
    try {
      const json = JSON.parse(data)
      cb(json)
    } catch (error) {
      cb(null, error)
    }
    client.destroy(); // kill client after server's response
  });
  
}

module.exports = connection