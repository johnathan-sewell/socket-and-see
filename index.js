
/* eslint-disable no-console */
'use strict';

const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
const appPort = process.env.PORT || 3000;

io.on('connection', function(socket) {
    console.log('a user connected on socket', socket.id);

    socket.on('broadcastMousePoint', (data) => {
        console.log(data);
        socket.broadcast.emit('drawMousePoint', {
            x: data.x,
            y: (300 - data.y)
        });
    });
});


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(function(req, res) {
    res.status(404).send('That\'s a 404.');
});

server.listen(appPort, () => {
    console.log(`listening on`, appPort);
});
