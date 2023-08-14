const express = require('express');
const router = express.Router();

module.exports = app => {
    const books = require("../controllers/book.controller.js");

    // add a new book
    router.post("/", books.create);

    // display all books
    router.get("/", books.findAll);

    // display a single book
    router.get("/:id", books.findOne);

    // Update a Tutorial with id
    router.put("/:id", books.update);

    // delete a book
    router.delete("/:id", books.delete); 

    app.use('/api/books', router);
};