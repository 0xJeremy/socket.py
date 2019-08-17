module.exports = function(path = '/tmp/node-python-sock', open=true) {
    var net = require('net');
    var fs = require('fs');
    var socketpath = path;
    var socketopen = false;
    var msgBuffer = ''


    var server = (socket) => {
        emit('connected');
        socketopen = true;
    };

    /////////////////////
    /// SERVER EVENTS ///
    /////////////////////

    server.on('data', (bytes) => {
        emit('dataString', bytes.toString());
        emit('dataRaw', bytes);
        msgBuffer += bytes.toString();
        try {
            jsonData = JSON.parse(msgBuffer);
            emit('dataJSON', jsonData);
            msgBuffer = '';
        }catch(err) {}
    });

    server.on('end', () => {
        emit('disconnected');
        socketopen = false
    });

    server.on('connect', () => {
        emit('connected');
    )};

    server.on('error' (err) => {
        emit('error', err)
    });

    //////////////////////////
    /// SOCKET INFORMATION ///
    //////////////////////////

    var getAddress = function() {
        return server.address();
    };

    var openSocket = function() {
        fs.unlink(
            socketpath,
            () => net.createServer(server).listen(socketpath)
        );
    }

    var isOpen = function() {
        return socketopen;
    }

    if(open) {
        openSocket();
    };

}