const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const users = new Schema({
    email:{
        type: String,
        unique: true
    },
    name:{
        type: String
    },
    password:{
        type: String
    }
})

const todos = new Schema({
    tittle:{
        type: String
    },
    done:{
        type: Boolean
    },
    catagories:{
        type: String
    },
    userId:{
        type: ObjectId    
    }
})

const UserModel = mongoose.model('User', users);
const TodoModel = mongoose.model('Todo',todos);

module.exports = {
    UserModel,
    TodoModel
}