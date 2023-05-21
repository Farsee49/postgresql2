require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const bodyparser =require('body-parser');

//console.log(process.env.SECRET_KEY)

const { client } = require('./db');
const apiRouter= require('./api');

const puppiesRouter = require('./api/puppies');
const usersRouter = require('./api/users');

const app =  express();
const PORT = 4444
app.use(morgan('dev'));
///bodyparser allows access invoking the json method to 
///the info in the body request through req.body///////
app.use(bodyparser.json());

app.use('/api', apiRouter);




app.listen(PORT, () => {
    client.connect();
    console.log(`PORTAL OPENED ON PORT:${PORT}`)
});






