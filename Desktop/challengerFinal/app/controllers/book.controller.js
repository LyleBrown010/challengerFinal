const Book = require("../models/book.model.js"); 

// create/add new book
exports.create = (req, res) => {
    // validate request
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty bro, jeez"
        }); 
    }

    // create/add a new book
    const book = new Book({
        bookTitle: req.body.bookTitle, 
        category: req.body.category,
        bookUrl: req.body.bookUrl
    });

    Book.create(book, (err, data) => {
        if(err)
        req.status(500).send({
            message: err.message || "Error occurred while adding the book (Probably your fault)"
        });
        else res.send(data); 
    });
};

// display all books 
exports.findAll = (req, res) => {
    const bookTitle = req.query.bookTitle; 

    Book.getAll(bookTitle, (err, data) => {
        if(err)
        req.status(500).send({
            message: err.message || "error occurrded while retrieving books"
        }); 
        else res.send(data);
    });
};

// display a single book 
exports.findOne = (req, res) => {
    Book.findById(req.params.id, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `not found book with id ${req.params.id}.`
                });
            }
            else{
                res.status(500).send({
                    message: "Error retrieving book with id" + req.params.id
                });
            }
        }
        else res.send(data)
    });
};

// update a book
exports.update = (req, res) => {
    // validate request
    if(!req.body){
        res.status(400).send({
            message: "How many times must i tell that this content can not be empty"
        }); 
    }
    console.log(req.body); 

    Book.updateById(
        req.params.id, 
        new Book(req.body), 
        (err, data) => {
            if(err){
                if(err.kind === "not_found"){
                    res.status(404).send({
                        message: `not found book with id ${req.params.id}.`
                    });
                }
                else{
                    res.status(500).send({
                        message: "error updating book with id " + req.params.id
                    })
                }
            }
            else res.send(data);
        }
    )
};

// delete a book
exports.delete = (req, res) => {
    Book.remove(req.params.id, (err, data) => {
        if(err){
            if(err.kind === "not_found") {
                res.status(404).send({
                    message: `not found book with id ${req.params.id}.`
                });
            }
            else {
                res.status(500).send({
                    message: "could not delete book with id " + req.params.id
                }); 
            }
        }
        else res.send({message: `book was deleted successfully`});
    });
};