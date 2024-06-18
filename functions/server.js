const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
const app = express();
app.use(cors());
app.use(express.json());

const regClient=[]

app.get('/',(req,res)=>{
    if (regClient.length>0) {
        res.sendFile(path.join(__dirname, '../index.html'));
    }else{
        regClient.push(req.body);
        res.send(`<a href="https://chachaxocode76.netlify.app/">LOGIN</a>`)
    }
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

module.exports.handler = serverless(app);
