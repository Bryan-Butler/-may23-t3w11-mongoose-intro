const mongoose = require('mongoose');

/**
 * connect or create and connect to a database
 */

async function databaseConnect(){
    try{
        //DB connection can take some time, especially if the db is in the cloud
        await mongoose.connect('mongodb://localhost:27017/PetDB')
        console.log('database connected!!')
    } catch (error){
        console.warn(`database connection failed: ${JSON.stringify(error)}`);
    }
}

module.exports = {
    databaseConnect
}