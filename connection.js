const net = require('net');

const client = new net.Socket();

const ip = '152.70.249.195'
const ipTemp = '192.168.198.127'

function connection(method, data, cb = function(data, err){}) {
  client.connect(8080, ipTemp, function() {
    console.log('Connected');

    client.write(JSON.stringify({
      method,
      data
    }));
  });
  
  client.on('data', function(data) {
    try {
      const json = JSON.parse(data)
      if(json.ok) {
        cb(null, new Error("Something went wrong!"))
      } else {
        cb(json)
      }
    } catch (error) {
      cb(null, error)
    }
    client.destroy(); // kill client after server's response
  });
  
}

module.exports = connection