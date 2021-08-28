const { MongoClient } = require('mongodb');
const uri = process.env.URI;
const mongodbClient = new MongoClient(uri);
let mongodb;

async function connect() {
    try {
        await mongodbClient.connect();
        mongodb = mongodbClient.db('discord');
        console.log('Connected successfully to database!');
    } catch (err) {
        console.log(err);
        connect();
    }
}

function getDb() {
    return mongodb;
}

async function getCol(colName) {
    return await mongodb.collection(colName);
}



module.exports = {
    connect,
    getDb,
    getCol
}