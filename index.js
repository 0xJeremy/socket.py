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
    this.lastMsg = '';
    this.listener = null

    this.server = this.net.createServer((socket) => {
        this.listener = socket;
        this.socketopen = true;
        this.emit('connected');

        /////////////////////
        /// SERVER EVENTS ///
        /////////////////////

        socket.on('data', (bytes) => {
            this.emit('data', bytes)
            this.msgBuffer += bytes.toString();
            try {
                var jsonData = JSON.parse(msgBuffer);
                switch(jsonData['type']) {
                    case('raw'): this.emit('dataRaw', jsonData['data']); break;
                    case('string'): this.emit('dataString', jsonData['data']); break;
                    case('json'): this.emit('dataJson', jsonData['data']);
                }
                this.lastMsg = jsonData['data'];
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

    this.write = function(data) {
        if(this.isOpen()) {this.listener.write({data})}
        else {throw 'Socket not connected'}
    }

    this.pipe = function(data) {
        if(this.isOpen()) {this.listener.pipe(data)}
        else {throw 'Socket not connected'}
    }

    this.getSocket = function() {
        return this.listener;
    }

    this.lastData = function() {
        return this.lastMsg;
    }

    if(open) {
        this.openSocket();
    }

}

inherits(Socket, EventEmitter);

module.exports = exports = new Socket();
