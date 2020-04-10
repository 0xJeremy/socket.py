# socket.py

# THIS PROJECT IS DEPRECIATED. USE [SOCKET.ENGINE](https://github.com/0xJeremy/socket.engine) INSTEAD.

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

### Easy to use

This library was designed to lower the barrier to entry as much as possible. As such there are built in functions that can send and receive strings, JSON data, and raw binary data.

## How to use — Node.js

The following example imports and creates the data socket in Node.js, and then sets up a listener event.
```javascript
const socket = require('socket.py');

var channel = 'channel_1';

socket.write(channel, 'Hello from Node.js!');

socket.on('channel', (data) => {
	/* your code here */
});
```

Channels can be written to and read from. Channels do not need to be declared by either Node.js or Python ahead of time.
Channels do not even need to match between the processes. When the `write` command is called, a channel name and a message must be passed. This message can be of any JSON supported data type. When a message is received from Python, the channel it was passed through will emit the data.

There are also the following methods exported as part of socket.py:
```
getAddress() => will return the socket address (returns a string)

openSocket() => will open the data socket (called automatically, not necessary to use unless the connection is interrupted)

isOpen() => will return the state of the socket (returns a boolean)

write(channel, msg) => write to Python

pipe(msg) => pipe data to python (WARNING: This function is not fully tested)

getSocket() => returns the socket object itself (for advanced users only)

get(channel) => returns the last piece of data received over the on a specified channel
```

## How to use — Python

The following is a simple example of how to use NodeSocket in Python:
```python
from NodeSocket import NodeSocket

socket = NodeSocket.NodeSocket()

channel = 'channel_1'

socket.write(channel, 'Hello from Python!')

response = socket.get(channel)
```

Here are the functions accessible from the NodeSocket library:
```
open() => will open the data socket (called by default, do not call unless the connection is interrupted)

close() => will close the data socket

isOpen() => returns if the socket is open (returns a boolean)

get(channel) => will return the most recent data to a specific channel
```

The socket is read from automatically and runs on a separate thread. When the socket is created it will block until the socket is open, but will otherwise not interrupt program flow.
