const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const serverless = require('serverless-http');
const app = express();
app.use(cors());
app.use(express.json());

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        hello: 'world'
    });
});
app.get('/',(req,res)=>{
    res.send(JSON.stringify({asba:"liik"}))
})
app.use('/.netlify/functions/server', router); // route must match the redirect in netlify.toml

const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        console.log(`Received message => ${message}`);
    });
    ws.send('Hello! Message From Server!!');
});

module.exports.handler = serverless(app);
