const sql = require('./db.js'); 

// constructor 
const Book = function(book){
    this.bookTitle = book.bookTitle;
    this.category = book.category; 
    this.bookUrl = book.bookUrl;
};

// creat