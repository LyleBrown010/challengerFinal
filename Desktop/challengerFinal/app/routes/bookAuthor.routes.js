const express = require('express');
const router = express.Router();

module.exports = app => {
    const bookAuthor = require("../controllers/bookAuthor.controller.js");

    // add book author details 
    router.post("/", bookAuthor.create);

    // display all books and auhtors 
    router.get("/bookDetails", bookAuthor.findAll);

    // update book author details 

    // delete a book author 
    router.delete("/:id", bookAuthor.delete)

    app.use('/api/bookAuthor', router)

}
