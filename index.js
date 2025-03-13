// import connectDB
const {connectDB} = require('./db/db.connect')
connectDB()

// import express
const express = require('express')
const app = express()
app.use(express.json())

// import model
const Book = require('./models/book.models')

// import cors
const cors = require('cors')
app.use(cors())

//* (1) API to create new book in the books database.
async function createNewBook(newBookData) {
    try {
        const newBook = new Book(newBookData)
        const saveBook = await newBook.save()
        return saveBook
    } catch(error) {
        console.log(error)
    }
}

app.post("/books", async(req, res) => {
    try {
        const newBook = await createNewBook(req.body)
        if(newBook) {
            res.status(201).json({message: "Book added successfully.", newBook: newBook})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to create a new book."})
    }
})

//* (2) Run API to create another book.

//* (3) Read all books in the database
async function readAllBooks() {
    try {
        const books = await Book.find()
        return books
    } catch(error) {
        console.log(error)
    }
}

app.get("/books", async(req, res) => {
    try {
        const books = await readAllBooks()
        if(books.length !=0) {
            res.json(books)
        } else {
            res.status(404).json({error: "Book not found."})
        }
    } catch(error) {
        res.status(500).json({error: "Failed to fetch data."})
    }
})

//* (4) Read a book's details by its title.
async function readBookByTitle(bookTitle) {
    try {
        const book = await Book.findOne({title: bookTitle})
        return book
    } catch(error) {
        console.log(error)
    }
}

app.get("/books/:bookTitle", async(req, res) => {
    try {   
        const book = await readBookByTitle(req.params.bookTitle)
        if(book) {
            res.json(book)
        } else {
            res.status(404).json({error: "Book not found"})
        }
    } catch(error) {
        res.status(500).json({error: "Failed to read the book."})
    }
})

//* (5) Read all books by an author
async function readBooksByAuthor(bookAuthor) {
    try {
        const books = await Book.find({author: bookAuthor})
        return books
    } catch(error) {
        console.log(error)
    }
}

app.get("/books/authors/:authorName", async(req, res) => {
    try {
        const books = await readBooksByAuthor(req.params.authorName)
        if(books.length != 0) {
            res.json(books)
        } else {
            res.status(404).json({error: "Books not found"})
        }
    } catch(error) {
        res.status(500).json({error: "Failed to fetch books by author."})
    }
})

//* (6) Read books by genre
async function readBooksByGenre(bookGenre) {
    try {
        const books = await Book.find({genre: bookGenre})
        return books
    } catch(error) {
        console.log(error)
    }
}

app.get("/books/genres/:genreName", async(req, res) => {
    try {
        const books = await readBooksByGenre(req.params.genreName)
        if(books.length !=0) {
            res.json(books)
        } else {
            res.status(404).json({error: "Books not found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch books by genre"})
    }
})

//* (7) Read books released in the year 2012
async function readBooksByReleaseYear(bookReleaseYear) {
    try {
        const books = await Book.find({publishedYear: bookReleaseYear})
        return books
    } catch(error) {
        console.log(error)
    }
}

app.get("/books/release/:releaseYear", async(req, res) => {
    try {
        const books = await readBooksByReleaseYear(req.params.releaseYear)
        if(books.length != 0) {
            res.json(books)
        } else {
            res.status(404).json({error: "Books not found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch book by genre"})
    }
})

//* (8) Update book's rating by id
async function updateBookById(bookId, dataToUpdate) {
    try {
        const updatedBook = await Book.findByIdAndUpdate(bookId, dataToUpdate, {new: true})
        return updatedBook
    } catch (error) {
        console.log(error)
    }
}

app.post("/books/:bookId", async(req, res) => {
    try {
        const updated = await updateBookById(req.params.bookId, req.body)
        if(updated) {
            res.status(200).json({message: "Book updated successfully", updated: updated})
        } else {
            res.status(404).json({error: "Book does not exist."})
        }
    } catch(error) {
        res.status(500).json({error: "Failed to update book."})
    }
})

//* (9) Update book's rating by title
async function updateBookByTitle(bookTitle, dataToUpdate) {
    try {
        const updatedBook = await Book.findOneAndUpdate({title: bookTitle}, dataToUpdate, {new:true})
        return updatedBook
    } catch (error) {
        console.log(error)
    }
}

app.post("/books/titles/:bookTitle", async(req, res) => {
    try {
        const updated = await updateBookByTitle(req.params.bookTitle, req.body)
        if(updated) {
            res.status(200).json({message: "Book updated successfully", updated: updated})
        } else {
            res.status(404).json({error: "Book does not exist."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to update book."})
    }
})

//* (10) Delete a book by Id
async function deleteBookById(bookId) {
    try {
        const deletedBook = await Book.findByIdAndDelete(bookId)
        return deletedBook
    } catch (error) {
        console.log(error)
    }
}

app.delete("/books/:bookId", async(req, res) => {
    try {
        const deleted = await deleteBookById(req.params.bookId)
        if(deleted) {
            res.status(200).json({message: "Book deleted successfully"})
        } else {
            res.status(404).json({error: "Book not found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to delete book."})
    }
})

// start the server
const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})