const express = require('express');
const apiRouter = express.Router();


apiRouter.use('*', (req, res, next) => {
    console.log('15s')
    next();
});

apiRouter.get('/puppies',(req, res, next)=>{
    res.send(`OTTERS SWIMMING`)
    console.log('pup route')
})


module.exports = 
    apiRouter;
