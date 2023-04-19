const express = require('express');
//const database = require('./RunDatabase')

const app = express();
const ip = '127.0.0.1';
const PORT = 3000;
const FRONTEND = __dirname + '/FrontEnd/';
app.get(['/', '/index'], (req, res) => {
    res.sendFile(FRONTEND + 'index.html');
});

app.get('/about', (req, res) =>{
    res.sendFile(FRONTEND + 'about.html');
});

app.get('arrestsbyrace', (req, res) =>{
    res.sendFile(FRONTEND + 'ArrestsByRace.html')
});

app.use(express.static(FRONTEND));

app.listen(PORT, ip, (error) =>{
        if(!error)
            console.log(`Server is Successfully Running: http://${ip}:${PORT}`);

        else
            console.log("Error occurred, server can't start", error);
    }
);
