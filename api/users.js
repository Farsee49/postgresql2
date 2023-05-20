const express = require('express');
const usersRouter = express.Router();
const {getAllUsers} = require('../db');


usersRouter.use('*', async (req, res, next)=>{
    console.log('Request for API/USERS: GRANTED');
    next();
});

////next() will return to next route handler!!!!

usersRouter.get('/', async (req, res, next)=>{
    const results = await getAllUsers();
    res.send(results)
    console.log('users route')
    console.log(results)
})


module.exports = usersRouter;