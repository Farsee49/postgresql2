console.log('Felix===GoodBoy');

const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/posttest';

const client = new Client ({ connectionString });


////////////////////DATABASE ADAPTERS!!!!!!!/////////////////////////////////////

const createUser = async (user) => {
    const { username, age, email, password } = user;
    try{
        const {rows: [user]} = await client.query(`
        INSERT INTO users (username, age, email, password)
        VALUES ($1, $2, $3, $4)
      
        RETURNING *;
        ` ,[username, age, email,password])
        
        //console.log(user);
        return user;
    }catch (ex) {
        console.log('ERROR CREATING SINGLE USER!!!!');
        console.log(ex);
    }

};

const createPuppy = async (puppy) => {
    const { name, email, age, ownerId } = puppy;
    try{
        const {rows: [puppy]} = await client.query(`
        INSERT INTO puppies (name, email, age, "ownerId")
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        ` ,[name, email, age, ownerId]);
        
       //console.log(puppy);
        return puppy;
    }catch (ex) {
        console.log('ERROR CREATING SINGLE PUPPY!!!!');
        console.log(ex.error);
    }

};

const updateUser = async (id, fields = {}) =>{

  /*
  Update SQL syntax
  UPDATE users
  SET "userName" = 'newusername' "age"= <new-age>
  */
  try{
    const setString = Object.keys(fields).map(
      (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');

    if (setString.length === 0) {
      return;
    }
    const {rows: [user]} = await client.query(`
    UPDATE users
    SET ${ setString }
    WHERE id=${id}
    RETURNING *;
  `, Object.values(fields));

  return user;
  
   
    
  }catch(ex){
    console.log('ERROR UPDATING USERS !!!');
    console.log(ex)
  }

}

const createTrick = async (trickTitle) => {
    try{
        await client.query(`
        INSERT INTO tricks (title)
        VALUES ($1)
        RETURNING *;
        ` ,[trickTitle]);
        
        //console.log(trickTitle);
       
    }catch (ex) {
        console.log('ERROR CREATING SINGLE PUPPY!!!!');
        console.log(ex.error);
    }

};

const addTrickToPuppy = async (puppyId, trickId) => {
  try{
    await client.query(`
    INSERT INTO puppy_tricks ("puppyId", "trickId")
    VALUES ($1, $2);
    `,[puppyId, trickId]);

  }catch(ex){
    console.log('ERROR ADDING TRICK TO PUPPY!!!');
    console.log(ex.error)
  }
};

// LEFT JOIN RIGHT JOIN AND INNER JOIN
const getOwnersAndPuppies = async () => {
  try{
    const { rows } = await client.query(`
    SELECT users.username AS "Owner" , puppies.name AS "Petname"
    FROM puppies
    INNER JOIN users ON puppies."ownerId" = users.Id
    
    `);
    return rows;
  }catch(ex){
    console.log('ERROR GETTING OWNERS AND PUPS!!!');
    console.log(ex.error)
  }
};

const getAllPuppies = async () => {
  try{
   const { rows } = await client.query(`
   SELECT * FROM puppies;
   `)
    return rows;

  }catch(ex){
    console.log('ERROR FETCHING ALL PUPPIES!!!');
    console.log(ex.error)
  }
};

const getAllUsers = async () => {
  try{
   const { rows } = await client.query(`
   SELECT * FROM users;
   `)
    return rows;

  }catch(ex){
    console.log('ERROR FETCHING ALL USERS!!!');
    console.log(ex.error)
  }
};



module.exports = {
    client,
    createUser,
    createPuppy,
    createTrick,
    addTrickToPuppy,
    getOwnersAndPuppies,
    updateUser,
    getAllPuppies,
    getAllUsers
};