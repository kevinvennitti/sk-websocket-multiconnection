var express = require('express');
var app = express();
var path = require('path');
var server = require('http').Server(app);
var io = require('socket.io')(server);

var peopleId = [];

server.listen(3000);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function (req, res) {
  res.render('index');
});


io.on('connection', function (socket) {
  console.log("Quelqu'un s'est connecté !", socket.id);
  peopleId.push(socket.id);

  socket.emit('hello', {
    list: peopleId
  });

  socket.broadcast.emit('someoneHasConnected', {
    id: socket.id
  });

  socket.on('disconnect', function () {
    console.log("Quelqu'un s'est déconnecté", socket.id);

    let index = peopleId.indexOf(socket.id);
    if (index > -1) {
      peopleId.splice(index, 1);
    }

    io.sockets.emit('someoneHasDisconnected', {
      id: socket.id
    })
  })
});
