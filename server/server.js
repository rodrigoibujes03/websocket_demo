const http = require('http');
const WebSocket = require('ws');
const PORT = 8080;

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', connections: wss.clients.size }));
  } else {
    res.writeHead(200);
    res.end('WebSocket server running');
  }
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  ws.nombre = 'Anónimo';

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message.toString());

      if (data.tipo === 'nombre') {
        ws.nombre = data.nombre;
        // Avisar a todos que alguien entró
        broadcast({ tipo: 'sistema', texto: data.nombre + ' se unió al chat' });

      } else if (data.tipo === 'chat') {
        // Reenviar el mensaje a todos
        broadcast({ tipo: 'chat', nombre: data.nombre, texto: data.texto });
      }
    } catch(e) {}
  });

  ws.on('close', () => {
    broadcast({ tipo: 'sistema', texto: ws.nombre + ' salió del chat' });
  });
});

function broadcast(obj) {
  const msg = JSON.stringify(obj);
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg);
    }
  });
}

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});