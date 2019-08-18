import sys 
sys.path.append('..')
from python.NodeSocket.NodeSocket import NodeSocket
import time

socket = NodeSocket()

if socket.lastData() == 'connection':
	print('connected')
