'use strict'

var Emitter = require('events').EventEmitter;
var emit = Emitter.prototype.emit;

function Socket(path = '/tmp/node-python-sock', open=true) {
    this.net = require('net');
    this.fs = require('fs');
    this.socketpath = path;
    this.socketopen = false;
    this.msgBuffer = '';

    this.server = net.createServer((socket) => {
        emit('connected');
        this.socketopen = true;
    });

    /////////////////////
    /// SERVER EVENTS ///
    /////////////////////

    this.server.on('data', (bytes) => {
        emit('dataString', bytes.toString());
        emit('dataRaw', bytes);
        this.msgBuffer += bytes.toString();
        try {
            var jsonData = JSON.parse(msgBuffer);
            emit('dataJSON', jsonData);
            this.msgBuffer = '';
        }catch(err) {};
    });

    this.server.on('end', () => {
        emit('disconnected');
        socketopen = false;
    });

    this.server.on('connect', () => {
        emit('connected');
    });

    this.server.on('error', (err) => {
        emit('error', err);
    });

    //////////////////////////
    /// SOCKET INFORMATION ///
    //////////////////////////

    this.getAddress = function() {
        return this.server.address();
    };

    this.openSocket = function() {
        fs.unlink(
            this.socketpath,
            () => this.server.listen(this.socketpath)
        );
    }

    this.isOpen = function() {
        return this.socketopen;
    }

    if(open) {
        this.openSocket();
    };

}

Socket.prototype.__proto__ = Emitter.prototype;

module.exports = exports = new Socket();
