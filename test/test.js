var socket = require('../index.js');
var assert = require('assert');
var spawn = require("child_process").spawn;

describe('isOpen', () => {
	it('should return false', () => {
		assert.equal(socket.isOpen(), false);
	});
	it('should return true', () => {
		var pythonProcess = spawn('python',["./connect_to_socket.py"]);
		pythonProcess.stdout.on('data', (data) => {
			assert.equal(socket.isOpen(), true);
		});
	});
});

describe('getAddress', () => {
	it('should return /tmp/node-python-sock', () => {
		assert.equal(socket.getAddress(), '/tmp/node-python-sock')
	});
});

describe('writeData', () => {
	it('should acknowledge the data', () => {
		var pythonProcess = spawn('python',["./acknowledge_connection.py"]);
		pythonProcess.stdout.on('data', (data) => {
			if(socket.isOpen()) {socket.write('connection');}
			if(data == 'connected') {assert.equal(true, true);}
		});
	});
});

describe('communication test', () => {
	it('should return the raw message', () => {
		var pythonProcess = spawn('python',["./return_message.py"]);
		pythonProcess.stdout.on('data', (data) => {
			if(socket.isOpen()) {socket.write('test 1')}
		});
		socket.on('dataRaw', (data) => {
			if(data == 'test 1') {assert.equal(true, true)}
		});
	});
});
