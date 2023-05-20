const express = require('express');
const puppiesRouter = express.Router();
const {getAllPuppies} = require('../db');


puppiesRouter.use('*', async (req, res, next)=>{
    console.log('Request for API/Puppies: GRANTED');
    next();
});

////next() will return to next route handler!!!!

puppiesRouter.get('/', async (req, res, next)=>{
    const results = await getAllPuppies()
    res.send(results)
    console.log('pup route')
    console.log(results)
})


module.exports = puppiesRouter;