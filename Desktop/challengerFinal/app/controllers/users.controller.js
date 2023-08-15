const User = require("../models/book.model.js");

// create a user 
exports.create = (req, res) => {
    // validate request
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty bro, jeez"
        }); 
    }

    // create a user 
    const user = new User({
        userID: req.body.userID, 
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender, 
        userDOB: req.body.userDOB,
        emailAdd: req.body.emailAdd,
        userPass: req.body.userPass,
        profileUrl: req.body.profileUrl
    });

    User.create (user, (err, data) => {
        if(err)
        req.status(500).send({
            message: err.message || "Error occurred while adding the user (Probably your fault)"
        });
        else res.send(data);
    });
};

// display all users
exports.findAll = (req, res) => {
    const 
}

// display single user


// update user


// delete a single user