const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        // validate(value){
        //     if(!validator.isEmail(value)){
        //         throw new Error('Email is invalid');
        //     }
        // }
    },
    password:{
        type: String,
        required: true,
        // trim: true,
        min: 7,
        max: 64,
    },
    phone:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    address:{
        // type: String,
        type: Object,
        trim: true,
    },
    role:{
        type: String,
        default: 'user'
    },
},
{
    timestamps: true,
    versionKey: false
}
)


const User = mongoose.model('Users', userSchema);
module.exports = User