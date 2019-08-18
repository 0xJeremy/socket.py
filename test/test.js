var socket = require('../index.js')
var assert = require('assert');

describe('isOpen', function() {
	it('should return true', function() {
		assert.equal(socket.isOpen(), false);
	})
})

describe('getAddress', function() {
	it('should return /tmp/node-python-sock', function() {
		assert.equal(socket.getAddress(), '/tmp/node-python-sock')
	})
})