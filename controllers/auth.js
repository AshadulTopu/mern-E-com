
const User = require('../models/user');
const {hashPassword, comparePassword} = require('../helpers/auth');
const JWT = require('jsonwebtoken');


exports.register = async ( req, res)=>{
    try {
        // destructuring name email password from req.body
        const {name, email, password, phone, address} = req.body;
        // console.log(password);
        // validation check
        if(!name.trim()){
            res.send('name is required');
        }
        if(!email){
            res.send('email is required');
        }
        if(!password || password.length < 7){
            res.send('password is required and must be at least 7 characters');
        }
        if(!phone){
            res.send('phone is required');
        }

        // check if user exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            res.send('user already exists');
        }

        // hash password
        const hashedPassword = await hashPassword(password);
        // console.log(password);
        // console.log(hashedPassword);

        // register user 
        const user = await new User(
            {
                name,
                email,
                password: hashedPassword,
                phone,
                address
            }).save();
        
        // generate token
        const token = JWT.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '7d'
            }
        )

        // send token and response to user
        res.status(201).json({
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token
        })
    }
    catch (err) {
        console.log(err);
    }
}