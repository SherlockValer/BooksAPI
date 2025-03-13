const mongoose = require('mongoose')
require('dotenv').config()

const booksUri = process.env.MONGODB

async function connectDB() {
    await mongoose
        .connect(booksUri)
        .then(() => {
            console.log("Connected to database.")
        })
        .catch((error) => {
            console.log("Error connecting to the database.")
        })
}

module.exports = {connectDB}