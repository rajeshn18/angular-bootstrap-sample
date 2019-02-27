const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const moment = require('moment');
const path = require('path');
const iotHubClient = require('./IoThub/iot-hub.js');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res/*, next*/) {
  res.redirect('/');
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Broadcast to all.
wss.broadcast = function broadcast(data) {

  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      try {
        console.log('sending data ' + data);
        client.send(data);
      } catch (e) {
        console.log("err in socket readystate");
        console.error(e);
      }
    }
  });
};

// HostName=ElevatorHub.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=samOC2v9gTUBz5RYx7h1JuU3jQQQ1QWAZ/vtWrsEsfI=

//var iotHubReader = new iotHubClient(process.env['Azure.IoT.IoTHub.ConnectionString'], process.env['Azure.IoT.IoTHub.ConsumerGroup']);

//var iotHubReader = new iotHubClient('HostName=ElevatorHub.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=samOC2v9gTUBz5RYx7h1JuU3jQQQ1QWAZ/vtWrsEsfI=', 'elevatorconsmergrp');
var iotHubReader = new iotHubClient('HostName=ElevatorIotHub.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=RZR+Kwq8SbgVUbG57vmTBJxoN3HYtYtqwu1piFCOEX0=', 'elevconsumergrp ');
try{
  iotHubReader.startReadMessage(function (obj, date) {
    try {
      console.log(date);
      date = date || Date.now()
      wss.broadcast(JSON.stringify(Object.assign(obj, { time: moment.utc(date).format('YYYY:MM:DD[T]hh:mm:ss') })));
    } catch (err) {
      console.log("errors");
      console.log(obj);
      console.error(err);
    }
  });
}
catch(e){
  console.log("Exception" + e);
}


var port = normalizePort(process.env.PORT || '3000');
server.listen(port, function listening() {
  console.log('Listening on %d', server.address().port);
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
