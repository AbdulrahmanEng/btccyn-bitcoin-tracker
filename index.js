'use strict';

let express = require('express');
let path = require('path');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);

const port = (process.env.PORT || 3000);

app.use(express.static(path.join(__dirname + '/public')));

io.on('connection', (socket) => {
  console.log('new connection made');

  socket.emit('message-from-server', {
    greeting: 'Hello users'
  });

  socket.on('message-from-client', function(msg) {
    console.log(msg);
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
