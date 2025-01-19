const express = require('express'); 
const {WebSocketServer } = require('ws')
const path = require("path")


const app = express();
app.use(express.static(path.join(__dirname, './webchat/build')));

app.get('/', (req, res) => {
    res.send('Сервер працює!');
});
app.listen(80)

const wss = new WebSocketServer({ port: 8080 });
console.log('WebSocket-сервер розпочав роботу');

wss.on('connection', (ws) => {
    ws.on('message', (raw) => { 
        const data = JSON.parse(raw)

        wss.clients.forEach((client) => { // Розсилаємо повідомлення усім
            if (client.readyState == ws.OPEN) {
                client.send(JSON.stringify(data));
            }
        });
    });
});
