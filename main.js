const express = require('express');
const database = require('./BackEnd/RunDatabase')

const app = express();
const ip = '127.0.0.1';
const PORT = 3000;
const FRONTEND = __dirname + '/FrontEnd/';

//App Settings
app.set('case sensitive routing', false);
app.use(express.json());

app.get(['/', '/index'], (req, res) => {
    res.sendFile(FRONTEND + 'index.html');
});

app.get('/about', (req, res) =>{
    res.sendFile(FRONTEND + 'about.html');
});

app.get('/arrestsbyrace', (req, res) =>{
    res.sendFile(FRONTEND + 'ArrestsByRace.html')
});

app.get('/crimebylocation', (req, res) =>{
    res.sendFile(FRONTEND + 'CrimeByLocation.html')
});

app.get('/femalevictims', (req, res) =>{
    res.sendFile(FRONTEND + 'FemaleVictims.html')
});

app.get('/guncrimes', (req, res) =>{
    res.sendFile(FRONTEND + 'GunCrimes.html')
});

app.get('/theftbyseason', (req, res) =>{
    res.sendFile(FRONTEND + 'TheftBySeason.html')
});
app.post('/database', (req, res) =>{
    let query = req.body.rq;

    try {
        if (typeof query == 'string') {
            query = query.replaceAll('_', ' ');
            database.accessDatabase(query).then(function (dataset) {
                res.json(dataset);
            });


        } else {
            res.status(400).send("Incorrect query!");
        }
    }
    catch (e) {
        res.status(400).send("Something went incredibly wrong! Exception encountered: " + e );
    }
});

app.use(express.static(FRONTEND));

app.listen(PORT, ip, (error) =>{
        if(!error)
            console.log(`Server is Successfully Running: http://${ip}:${PORT}`);

        else
            console.log("Error occurred, server can't start", error);
    }
);
