const { WebSocketServer } = require('ws');
const uuid = require('uuid');

class PeerProxy {
    constructor(httpServer) {
        const wss = new WebSocketServer({ noServer: true });

        httpServer.on('upgrade', (request, socket, head) => {
            wss.handleUpgrade(request, socket, head, function done(ws) {
                wss.emit('connection', ws, request)
            });
        });

        let connections = [];

        wss.on('connection', (ws) => {
            const connection = { id: uuid.v4(), alive: true, ws: ws };
            connections.push(connection);

            ws.on('message', function message(data) {
                connections.forEach((c) => {
                  if (c.id !== connection.id) {
                    c.ws.send(data);
                  }
                });
            });

            ws.on('close', () => {
                connections.findIndex((o, i) => {
                  if (o.id === connection.id) {
                    connections.splice(i, 1);
                    return true;
                  }
                });
            });

            ws.on('pong', () => {
                connection.alive = true;
            });
        });

        setInterval(() => {
            connections.forEach((c) => {
              // Kill any connection that didn't respond to the ping last time
              if (!c.alive) {
                c.ws.terminate();
              } else {
                c.alive = false;
                c.ws.ping();
              }
            });
        }, 10000);
    }
}

module.exports = { PeerProxy };