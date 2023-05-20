const express = require('express');
const apiRouter = express.Router();
const puppiesRouter = require('./puppies');
const usersRouter = require('./users');



apiRouter.use('*', (req, res, next) => {
    console.log('Request for API: GRANTED')
    next();
});
apiRouter.use('/puppies', puppiesRouter);
apiRouter.use('/users', usersRouter);

// apiRouter.get('/puppies', async (req, res, next)=>{
//     const results = await getAllPuppies()
//     res.send(results)
//     console.log('pup route')
//     console.log(results)
// })


module.exports = 
    apiRouter;
