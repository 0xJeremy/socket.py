import socket
from json import dumps as dictToJson
from json import loads as jsonToDict

class NodeSocket():
	def __init__(self, path='/tmp/node-python-sock', openSocket=True):
		self.sendHistory = []
		self.path = path
		self.data = ''
		if openSocket:
			self.open()

	def recv(self, size=256):
		if self.socketOpen:
			tmp = ''
			while True:
				tmp += self.client.recv(size).decode().encode('utf-8')
				try:
					self.data = jsonToDict(tmp)
					return self.data
				except: continue
		return None;

	def lastData(self):
		return self.data

	def sendRaw(self, msg):
		self._send(dataType='raw', data=msg)

	def sendJson(self, msg):
		self._send(dataType='json', data=msg)

	def sendString(self, msg):
		self._send(dataType='string', data=msg)

	def _send(self, dataType, data=None):
		msg = {'type': dataType, 'data': data}
		self.client.send(dictToJson(msg).encode())
		self.sendHistory.append(msg)

	def open(self):
		while True:
			try:
				self.client = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
				self.client.connect(self.path)
				self.socketOpen = True
				return
			except: continue

	def close(self):
		self.client.close()
		self.socketOpen = False

	def isOpen(self):
		return self.socketOpen
