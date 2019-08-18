import sys 
sys.path.append('..')
from python.NodeSocket.NodeSocket import NodeSocket

socket = NodeSocket()

socket.writeRaw('connected')

socket.writeRaw(socket.lastData())
