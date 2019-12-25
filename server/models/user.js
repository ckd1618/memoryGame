let mongoose = require('mongoose');

var Schema = mongoose.Schema;
var PostSchema = new mongoose.Schema({
    content: {type: String, required: true, minlength: 10},
    _author: {type: Schema.Types.ObjectId, ref: 'User'}
    // https://mongoosejs.com/docs/populate.html
}, {timestamps: true})
mongoose.model('Post', PostSchema);

var UserSchema = new mongoose.Schema({
    // username: { type: String, required: [true, "User Name is required"], unique: [true, "This name is taken, enter another username."], minlength: [3, "Name must be 3 or more characters"] },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    posts: [PostSchema]
}, {timestamps: true})
mongoose.model('User', UserSchema);

