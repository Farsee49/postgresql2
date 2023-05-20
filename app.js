const express = require('express');
const morgan = require('morgan');
const { client } = require('./db');
const apiRouter= require('./api');

const puppiesRouter = require('./api/puppies');
const usersRouter = require('./api/users');

const app =  express();
const PORT = 4444
app.use(morgan('dev'));

app.use('/api', apiRouter);
app.use('/puppies', puppiesRouter);
app.use('/users', usersRouter);




app.listen(PORT, () => {
    client.connect();
    console.log(`PORTAL OPENED ON PORT:${PORT}`)
});






