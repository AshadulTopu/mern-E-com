const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');


// hash password
exports.hashPassword = (password) => {
    // console.log(password);
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if (err){ reject(err);}
            bcrypt.hash(password, salt, (err, hash) => {
                if (err){ reject(err);}
                resolve(hash);
                // console.log(hash);
            });
        });
    })
}

// the bcrypt package is used to hash and compare passwords
// the bcrypt function genSalt() generates a random salt for the password. you can specify the number of rounds as an argument, but it is not recommended to use more than 10 to 12 rounds.




// compare password
exports.comparePassword = (password, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    })
}


// another way
// exports.comparePassword = (password, hash) =>{
//     return bcrypt.compare(password, hash);
// }

