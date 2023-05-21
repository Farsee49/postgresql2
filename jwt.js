const jwt = require('jsonwebtoken');
const SECRET = 'MY SECRET';  /////secret can be anything/////
const user ={
    username: "paris",
    password: "paris123"
};

////Token created with jwt.sign()////////
const token = jwt.sign(user, SECRET);
console.log(token);

////Decoding User Info with jwt.verify()///////
const userInfo = jwt.verify(token, SECRET);
console.log(userInfo);