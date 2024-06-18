const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const serverless = require('serverless-http');
const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

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

server.listen(3030, () => {
    console.log(`Matchmaking Front-end listening at http://localhost:3030`);
});
module.exports.handler = serverless(app);
