// import mongoose
const mongoose = require("mongoose")

// define a book schema
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    }, 
    publishedYear: {
        type: Number,
        required: true,
    },
    genre: {
        type: [String],
    },
    language: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        default: "United States",
    },
    rating: {
        type: Number,
        min: 0,
        max: 10,
        default: 0,
    },
    summary: {
        type: String,
    },
    coverImageUrl:{
        type: String,
    },
}, {
    timestamps: true
})

// define a model
const Book = mongoose.model('Book', bookSchema)

// export the model
module.exports = Book