import json
from SimpleWebSocketServer import SimpleWebSocketServer, WebSocket

clients = {}

class SimpleEcho(WebSocket):

    def _send_b12_message(self, data):
        data['id'] = self.address
        for _, client in clients.items():
            client.sendMessage(json.dumps(data))

    def handleMessage(self):
        # echo message back to client
        print('{}-{}'.format(self.address, self.data))
        data = json.loads(self.data)
        data['event'] = 'position'
        self._send_b12_message(data)

    def handleConnected(self):
        clients[self.address] = self
        print(self.address, 'connected')

    def handleClose(self):
        print(self.address, 'closed')
        del clients[self.address]
        data = {'event': 'delete'}
        self._send_b12_message(data)


server = SimpleWebSocketServer('', 8000, SimpleEcho)
server.serveforever()
