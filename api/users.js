const express = require('express');
const jwt = require('jsonwebtoken');
const {SECRET_KEY} = process.env;
const usersRouter = express.Router();
const {getAllUsers, createUser} = require('../db');


// usersRouter.use('*', async (req, res, next)=>{
//     console.log('Request for API/USERS: GRANTED');
//     next();
// });

////next() will return to next route handler!!!!

usersRouter.get('/', async (req, res, next)=>{
    const results = await getAllUsers();
    res.send(results)
    console.log('users route')
    //console.log(results)
});

usersRouter.post('/register', async(req, res, next) => {
    const userDBInstance = await createUser(req.body);
    const token = jwt.sign(userDBInstance, SECRET_KEY);
    res.send({
            message: 'Thanks for joining',
            token,
            error: false
                    });
    //console.log(results)
    console.log(req.body)
    console.log(token);

})


module.exports = usersRouter;