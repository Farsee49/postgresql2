console.log('Felix===GoodBoy');

const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/posttest';

const client = new Client ({ connectionString });

const createUser = async (user) => {
    const { name, age, email } = user;
    try{
        const {rows: [user]} = await client.query(`
        INSERT INTO users (name, age, email)
        VALUES ($1, $2, $3)
        RETURNING *;
        ` ,[name, age, email])
        
        //console.log(user);
        return user;
    }catch (ex) {
        console.log('ERROR CREATING SINGLE USER!!!!');
        console.log(ex.error);
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
const getOwnersAndPuppies = async () => {
  try{
    const { rows } = await client.query(`
    SELECT users.name AS "Owner" , puppies.name AS "Petname"
    FROM puppies
    INNER JOIN users ON puppies."ownerId" = users.Id
    
    `);
    return rows;
  }catch(ex){
    console.log('ERROR GETTING OWNERS AND PUPS!!!');
    console.log(ex.error)
  }
};



module.exports = {
    client,
    createUser,
    createPuppy,
    createTrick,
    addTrickToPuppy,
    getOwnersAndPuppies
};