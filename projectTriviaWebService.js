const express = require('express');
const bodyParser = require("body-parser");
const triviaProjectWebService = express();
const triviaProjectDB = require('mongoose');
require("dotenv/config")
// app.use for authentication.
triviaProjectWebService.use(bodyParser.json());
//connect to db
triviaProjectWebService.connect(process.env.DB_CONNECTION_STRING, () => console.log("connected to DB"));
triviaProjectWebService.get('/', (req, res) => {

});

triviaProjectWebService.listen(3100);