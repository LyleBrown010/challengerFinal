const sql = require('./db.js'); 

// constructor 
const Book = function(book){
    this.bookTitle = book.bookTitle;
    this.category = book.category; 
    this.bookUrl = book.bookUrl;
};

// create/add new book
Book.create = (newBook, result) => {
    sql.query("INSERT INTO books SET?", newBook, (err, res) => {
        if(err){
            console.log('error: ', err);
            result(err, null); 
            return;
        }

        console.log("created book: ", {id: res.insertId, ...newBook});
        result(null, {id: res.insertId, ...newBook}); 
    });
};

//display all books 
Book.getAll = (bookTitle, result) => {
    let query = "SELECT * FROM books"; 

    if(bookTitle){
        query += `WHERE bookTitle LIKE '%${bookTitle}%'`;
    }

    sql.query(query, (err, res) => {
        if(err){
            console.log("error: ", err); 
            result(null, err); 
            return;
        }

        console.log("books: ", res); 
        result(null, res); 
    });
};

// display a single book 
Book.findById = (id, result) => {
    sql.query(`SELECT * FROM books WHERE bookID = '${id}'`, (err, res) => {
        if(err){
            console.log("error: ", err); 
            result(err, null);
            return;
        }
        if(res.length){
            console.log("found Book: ", res[0]); 
            result(null, res[0]); 
            return;
        }

        //not found book 
        result({kind: "not_found"}, null); 
    });
};

// update a book
Book.updateById = (id, book, result) => {
    sql.query(
        "UPDATE books SET bookTitle = ?, category = ?, bookUrl = ? WHERE bookID = ?", [book.bookTitle, book.category, book.bookUrl, id],

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
            console.log("updated book: ", {id: id, ...book})
            result(null, {id: id, ...book});
        }
    )
}


// delete a book 
Book.remove = (id, result) => {
    sql.query("DELETE FROM books WHERE bookID = ?", id, (err, res) => {
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
        console.log("deleted book with id: ", id); 
        result(null, res); 
    });
};

module.exports = Book; 