'use strict'

var EventEmitter = require('events').EventEmitter;
var inherits = require('util').inherits;

function Socket(path = '/tmp/node-python-sock', open=true) {
    EventEmitter.call(this);
    this.net = require('net');
    this.fs = require('fs');
    this.socketpath = path;
    this.socketopen = false;
    this.msgBuffer = '';
    this.listener = null;
    this.channels = {}

    this.server = this.net.createServer((socket) => {
        this.listener = socket;
        this.socketopen = true;
        this.emit('connected');

        /////////////////////
        /// SERVER EVENTS ///
        /////////////////////

        socket.on('data', (bytes) => {
            this.msgBuffer += bytes.toString();
            try {
                var jsonData = JSON.parse(this.msgBuffer);
                this.emit(jsonData['type'], jsonData['data']);
                this.channels[jsonData['type']] = jsonData['data']
                this.msgBuffer = '';
            }catch(err) {};
        });

        socket.on('error', (err) => {
            this.emit('error', err);
        });

        socket.on('end', () => {
            this.emit('disconnected');
            this.socketopen = false;
        });

    });

    //////////////////////////
    /// SOCKET INFORMATION ///
    //////////////////////////

    this.getAddress = function() {
        return this.server.address();
    };

    this.openSocket = function() {
        this.fs.unlink(this.socketpath, () => {
            this.server.listen(this.socketpath);
        });
    }

    this.isOpen = function() {
        return this.socketopen;
    }

    this.write = function(dataType, data) {
        if(this.isOpen()) {
            var msg = {
                'type': dataType,
                'data': data
            }
            this.listener.write(JSON.stringify(msg))
        }
        else {throw 'Socket not connected'}
    }

    this.get = function(dataType) {
        return this.channels[dataType];
    }

    this.pipe = function(data) {
        if(this.isOpen()) {this.listener.pipe(data)}
        else {throw 'Socket not connected'}
    }

    this.getSocket = function() {
        return this.listener;
    }

    if(open) {
        this.openSocket();
    }

}

inherits(Socket, EventEmitter);

module.exports = exports = new Socket();
