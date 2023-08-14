const BookAuthor = require("../models/booksAuthor.model.js"); 
const bookRoutes = require("../routes/book.routes");

// add book author details 
exports.create = (req, res) => {
    // validate request
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty"
        }); 
    }

    // add book author details
    const bookAuthor = new BookAuthor({
        authorName: req.body.authorName,
        authorSurname: req.body.authorSurname,
        bookID: req.body.bookID
    }); 

    BookAuthor.create(bookAuthor, (err, data) => {
        if(err)
        req.status(500).send({
            message: err.message || "error occurred while adding the author book"
        });
        else res.send(data); 
    }); 
};

// display all books and auhtors 

// update book author details 
exports.update = (req, res) => {
    // validate request
    if(!req.body){
        res.status(400).send({
            message: "content can not be empty"
        });
    }
    console.log(req.body); 

    BookAuthor.updateById(
        req.params.id, 
        new BookAuthor(req.body), 
        (err, data) => {
            if(err){
                if(err.kind === "not_found"){
                    res.status(404).send({
                        message: `did not find author with id ${req.params.id}`
                    });
                }
                else{
                    res.status(500).send({
                        message: "error updating Author with id " +req.params.id
                    })
                }
            }
            else res.send(data);
        }
    )

}

// delete a book author 
exports.delete = (req, res) => {
    BookAuthor.remove(req.params.id, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `not found author with id ${req.params.id}`
                })
            }
            else{
                res.status(500).send({
                    message: "could not delete author with id " + req.params.id
                });
            }
        }
        else res.send({message: `Author was deleted Successfully`});
    });
};