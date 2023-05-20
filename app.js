const express = require('express');
const morgan = require('morgan');
const apiRouter= require('./api');
const app =  express();
const PORT = 4444
app.use(morgan('dev'));

app.use('/api', apiRouter);




app.listen(PORT, () => {
    console.log(`PORTAL OPENED ON PORT:${PORT}`)
});






