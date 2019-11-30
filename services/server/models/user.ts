import * as mongoose from 'mongoose';

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "User Name is required"],
        unique: [true, "This name is taken, enter another username."],
        minlength: [3, "Name must be 3 or more characters"]
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
}, {timestamps: true})

