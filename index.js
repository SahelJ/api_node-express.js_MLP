//import
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const apiRouter = require('./apiRouter').router;

//Instance serveur
const port = process.env.PORT || 5000;

var app = express();
app.get('/', function (req, res){
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<p>API EN LIGNE</p>');
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routes
app.use('/api/', apiRouter);


app.use(cors({
origin: /http:\/\/localhost/
}));
app.options('*', cors());

app.listen(port, () => {
    console.log('Serveur en écoute...');
});