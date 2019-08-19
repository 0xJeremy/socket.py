# socket.py

## Installation

Node.js installation:
```
npm install socket.py
```

Python installation:
```
pip install NodeSocket
```

These libraries are developed in parallel, and designed to be used together.

## Features

Socket.py enables real-time bidirectional communication between a Node.js server, and a Python process. It consists of:

- a Node.js server
- a Python process with NodeSocket

Its main features are:

### Speed

Connections are made using Unix sockets and can pass information from processes extremely quickly and reliably.

### Auto-connection support

Unless specifically disabled, this library will automatically connect the Node.js and Python process to ensure the connection is accessible in all parts of the program. Future versions will support auto-reconnection as well.

### Disconnection detection

An event is triggered in the Node.js server when a Python process disconnects. The library will also keep track of the state of the socket connection and allow querying of the connection status.

### Easy of use

This library was designed to lower the barrier to entry as much as possible. As such there are built in functions that can send and receive strings, JSON data, and raw binary data.

## How to use — Node.js

The following example imports and creates the data socket in Node.js, and then sets up a listener event.
```javascript
const socket = require('socket.py');

socket.on('dataJson', (data) => {
	/* your code here */
});
```

The following events are emitted from socket.py:
```javascript
socket.on('dataRaw', (data) => {
	/* this event will relay raw data from python */
});

socket.on('dataString', (data) => {
	/* this event will relay a string from python */
});

socket.on('dataJson', (data) => {
	/* this event will relay a JSON object from python */
});
```

For advanced users, there is also
```javascript
socket.on('data', (data) => {
	/* this event will emit the raw bytes received over the data socket */
});
```

There are also the following methods exported as part of socket.py:
```
getAddress() => will return the socket address (returns a string)

openSocket() => will open the data socket (called automatically, not necessary to use unless the connection is interrupted)

isOpen() => will return the state of the socket (returns a boolean)

write(msg) => write to Python

pipe(msg) => pipe data to python

getSocket() => returns the socket object itself (for advanced users only)

lastData() => returns the last piece of data received over the socket (does not include data emitted by the 'data' event)
```

## How to use — Python

The following is a simple example of how to use NodeSocket in Python:
```python
from NodeSocket import NodeSocket

socket = NodeSocket()

socket.sendRaw('NodeSocket Test!')
response = socket.lastData()
```

Here are the functions accessible from the NodeSocket library:
```
recv(size) => will cause NodeSocket to read from the data socket, and will return any data in the socket (size, in bytes, defaults to 256)

lastData() => will return the last piece of data received from Node.js

sendRaw(msg) => will send raw data to Node.js (matches the 'dataRaw' event in socket.py)

sendJson(msg) => will send a Json object to Node.js (matches the 'dataJson' event in socket.py)

sendString(msg) => will send a string to Node.js (matches the 'dataString' event in socket.py)

open() => will open the data socket (called by default, do not call unless the connection is interrupted)

close() => will close the data socket

isOpen() => returns if the socket is open (returns a boolean)
```