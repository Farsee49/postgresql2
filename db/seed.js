const { 
	client,
	createUser,
	createPuppy,
	createTrick,
	addTrickToPuppy,
	getOwnersAndPuppies,
    updateUser
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
            name VARCHAR(255) ,
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
        console.log('ERROR CREATING INITIAL USER!!!!');
        console.log(ex.error);
    }

};

const createInitialPuppies = async () => {
    try{
        await Promise.all(puppies.map(createPuppy));
    }catch (ex) {
        console.log('ERROR CREATING INITIAL PUPPY!!!!');
        console.log(ex.error);
    }

};

const createInitialTricks = async () => {
    try{
        await Promise.all(tricks.map(createTrick));
    }catch (ex) {
        console.log('ERROR CREATING INITIAL TRICK!!!!');
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
				//console.log(ownersAndTheirPuppies);
                const udatedUser = await updateUser(8,{name: 'Petra', age: 24, email: 'petra@email.com'} )
                console.log(udatedUser)
                const { rows }= await client.query(`
                SELECT * FROM users;
                `)
                console.log(rows);

    
 //WHERE CLAUSE: finds records based on specified "WHERE" conditions
 // https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-where/;

    // const {rows: [userFelix]} = await client.query(`
    //     SELECT * FROM users
    //     WHERE "name"='Felix';
    // `)
    // console.log(userFelix);
    // const {rows} = await client.query(`
    //     SELECT * FROM users
    //     WHERE "age"= 33;
    // `)
    // console.log(rows);

    ////OPERATORS USING AND, OR and NOT//////////

    ///USE: AND
    // const {rows:[Sam]} = await client.query(`
    //     SELECT * FROM users
    //     WHERE "age"= 33
    //     AND "name" = 'Sam';
    // `)
    // console.log(Sam);

    ///USE: OR
    // const {rows:[singleUser]} = await client.query(`
    //     SELECT * FROM users
    //     WHERE "age"= 22
    //     OR "name" = 'Felix';
    // `)
    // console.log(singleUser);
    ///USE: NOT
    // const {rows} = await client.query(`
    //     SELECT * FROM users
    //     WHERE NOT "name"='Felix';
    // `)
    //  console.log(rows)


    }catch (ex){
        console.log('ERROR BUILDING THIS DATABASE!!!!!');
        console.log(ex);
    }
};

buildDB();