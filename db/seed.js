const { 
	client,
	createUser,
	createPuppy,
	createTrick,
	addTrickToPuppy,
	getOwnersAndPuppies
		 } = require('./index');

const { users, puppies, tricks } = require('./seed_data');



const dropTables = async () => {
    try{
        await client.query(`
				DROP TABLE IF EXISTS puppy_tricks;
				DROP TABLE IF EXISTS tricks;
        DROP TABLE IF EXISTS puppies;
        DROP TABLE IF EXISTS users;
        `)
    }catch (ex) {
        console.log('SHIT WENT WRONG DROPPING TABLES!!!!');
        console.log(ex);
    }

};


const createTables = async () => {
    try{
        await client.query(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            age INTEGER,
						email VARCHAR(255)
        );
        `)

        await client.query(`
        CREATE TABLE puppies (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            age INTEGER,
            email VARCHAR(255),
            "ownerId" INTEGER REFERENCES users(id)
        );
        `)

				await client.query(`
				CREATE TABLE tricks (
					id SERIAL PRIMARY KEY,
					title VARCHAR(255)
				);
				`)

				await client.query(`
				CREATE TABLE puppy_tricks (
					id SERIAL PRIMARY KEY,
					"puppyId" INTEGER REFERENCES puppies (id),
					"trickId" INTEGER REFERENCES tricks (id)
				)
				`)
			
    }catch (ex) {
        console.log('SHIT WENT WRONG CREATING TABLES!!!!');
        console.log(ex);
    }

};


const createInitialUsers = async () => {
    try{
        await Promise.all(users.map(createUser));
    }catch (ex) {
        console.log('SHIT WENT WRONG CREATING INITIAL USER!!!!');
        console.log(ex.error);
    }

};

const createInitialPuppies = async () => {
    try{
        await Promise.all(puppies.map(createPuppy));
    }catch (ex) {
        console.log('SHIT WENT WRONG CREATING INITIAL PUPPY!!!!');
        console.log(ex.error);
    }

};

const createInitialTricks = async () => {
    try{
        await Promise.all(tricks.map(createTrick));
    }catch (ex) {
        console.log('SHIT WENT WRONG CREATING INITIAL TRICK!!!!');
        console.log(ex.error);
    }

};
const buildDB = async ()  => {
    try{
        console.log('Starting to build Database...');
        client.connect();
        console.log('Starting to Drop Tables...');
        await dropTables();
        console.log('Finished Dropping Tables...');
        console.log('Starting to Create Tables...');
        await createTables();
        console.log('Finished Creating Tables...');
        console.log('Creating Initial Users...');
        await createInitialUsers();
        console.log('Finished Creating Initial Users...');
        console.log('Creating Initial Puppies...');
        await createInitialPuppies();
        console.log('Finished Creating Initial Puppies...');
				console.log('Creating Initial Tricks...');
				await createInitialTricks();
				console.log('Finished Creating Initial Tricks...');
				await addTrickToPuppy(1, 1);
				await addTrickToPuppy(2, 5);
				await addTrickToPuppy(4, 3);
				await addTrickToPuppy(3, 1);
				await addTrickToPuppy(3, 5);
				await addTrickToPuppy(3, 4);

				const ownersAndTheirPuppies = await getOwnersAndPuppies();
				console.log(ownersAndTheirPuppies);
    }catch (ex){
        console.log('SHIT WENT WRONG BUILDING THIS DATABASE!!!!!');
        console.log(ex);
    }
};

buildDB();