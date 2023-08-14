const sql = require('./db.js');

// constructor
const User = function(users){
    this.userID = users.userID; 
    this.firstName = users.firstName;
    this.lastName = users.lastName;
    this.gender = users.gender;
    this.userDOB = users.userDOB;
    this.emailAdd = users.emailAdd;
    this.userPass = users.userPass;
    this.profileUrl = users.profileUrl;
}

// create a user 
User.create = (newUser, result) => {
    sql.query("INSERT INTO users SET?", newUser, (err, res) => {
        if(err){
            console.log('error: ', err);
            result(err, null);
            return;
        }

        console.log("created user: ", {
            id: res.insertId, ... newUser
        });
        result(null, {id: res.insertId, ...newUser});
    });
}

// display all users
User.getAll = (userID, result) => {
    let query = "SELECT * FROM users"; 

    if(userID){
        query += `WHERE userID LIKE '%${userID}%'`;
    }

    sql.query(query, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(null, err); 
            return;
        }
        console.log("books: ", res); 
        result(null, res)
    });
}

// display single user
User.findById = (id, result) => {
    sql.query(`SELECT * FROM users WHERE bookID = '${id}'`, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
    })
}


// update user
// modify a user record
// delete a single user