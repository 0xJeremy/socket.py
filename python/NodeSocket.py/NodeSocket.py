import socket
from json import dumps as stringToJSON

class NodeSocket():
	def __init__(self, path='/tmp/node-python-sock', openSocket=True):
		self.sendHistory = []
		self.path = path
		if openSocket:
			self.open()

	def send(self, dataType=None, flags=None, data=None):
		msg = {'type': dataType,
			   'flags': flags,
			   'data': data}
		jsonMsg = stringToJSON(msg)
		self.client.send(jsonMsg.encode())
		self.sendHistory.append(msg)

	def open(self):
		self.client = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
		self.client.connect(self.path)
		self.socketOpen = True

	def close(self):
		self.client.close()
		self.socketOpen = False

	def isOpen(self):
		return self.socketOpen
