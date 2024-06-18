const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')))
const router = express.Router();
const regClient=[]
router.get('/', (req, res) => {
    res.json({
        hello: 'world'
    });
});
app.get('/home',(req,res)=>{
    res.send(JSON.stringify({dir:path.resolve(__dirname, '../public')}));
})
app.get('/test',(req,res)=>{
    res.send(JSON.stringify({message:'it works'}));
})
app.post('/api/auth/register',(req,res)=>{
    regClient.push(req.body);
    res.sendFile(path.join(__dirname, '../public/login.html'));
})
app.post('/api/auth/login',(req,res)=>{
    if (regClient.length>0) {
        res.sendFile(path.join(__dirname, '../public/login.html'));
    }else{
        res.send(JSON.stringify({response:"no reg found"}))
    }
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
