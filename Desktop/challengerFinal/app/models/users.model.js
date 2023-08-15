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
User.updateById = (id, user, result) => {
    sql.query(
        "UPDATE users SET userID = ?, firstName = ?, lastName = ?, gender = ?, userDOB = ?, emailAdd = ?, userPass = ?, profileUrl = ? WHERE userID = ?", [user.UserID, user.firstName, user.lastName, user.gender, user.userDOB, user.emailAdd, user.userPass, user.profileUrl, id], 

        (err, res) => {
            if(err){
                console.log("error: ", err); 
                result(null, err); 
                return; 
            }

            if(res.affectedRows == 0){
                // not found
                result({kind: "not_found"}, null); 
                return; 
            }
            console.log("updated user: ", {id: id, ...user})
            result(null, {id: id, ...user});
        }
    )
}


// delete a single user
User.remove = (id, result) => {
    sql.query("DELETE FROM users WHERE userID = ?", id, (err, res) => {
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
        console.log("deleted the user with id: ", id);
        result(null, res);
    });
}

module.exports = User; 