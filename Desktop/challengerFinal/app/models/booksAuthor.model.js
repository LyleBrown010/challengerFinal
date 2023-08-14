const Book = require('./book.model.js');
const sql = require('./db.js'); 

// constructor
const BookAuthor = function(bookAuthor){
    this.authorName = bookAuthor.authorName; 
    this.authorSurname = bookAuthor.authorSurname;
    this.bookID = bookAuthor.bookID; 
}; 

// add book author details 
BookAuthor.create = (newBookAuthor, result) => {
    sql.query("INSERT INTO bookauthor SET ?", newBookAuthor, (err, res) => {
        if(err){
            console.log('error: ', err); 
            result(err, null); 
            return;
        }
        console.log("added book details: ", {id: res.insertId, ...newBookAuthor}); 
        result(null, {id: res.insertId, ...newBookAuthor}); 
    });
};

// display all books and auhtors 

// update book author details 
BookAuthor.updateById = (id, bookAuthor, result) => {
    sql.query(
        "UPDATE bookauthor SET authorName = ?, authorSurname = ?, bookID = ?WHERE id = ?", [bookAuthor.authorName,  bookAuthor.authorSurname,  bookAuthor.bookID, id],
        
        (err, res) => {
            if(err){
                console.log("error: ", err);
                result(null, err);
                return;
            }
        
            if(res.affectedRows == 0 ){
                // not found 
                result({kind: "not_found"}, null);
                return; 
            }
            console.log("updated bookAuthor: ", {id: id, ...bookAuthor})
            result(null, {id: id, ...bookAuthor});
        }
    );
};

// delete a book author 
BookAuthor.remove = (id, result) => {
    sql.query("DELETE FROM bookauthor WHERE id: ", id, (err, res) => {
        if(err){
            console.log("error", err); 
            result(null, err); 
            return; 
        }

        if(res.affectedRows == 0){
            // not found 
            result({kind: "not_found"}, null); 
            return; 
        }
        console.log("deleted book author with id: ", id); 
        result(null, res);
    });
};

module.exports = AuthorBook; 