import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let User = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
   
    email: {
        type: String
    },
    city: {
        type: String
    },
    picture: {
        type: String
    },
   
    type: {
        type: String
    },
    blockList:{
        type:Array
    },
    aproved:{
        type:Boolean
    }
    
})

export default mongoose.model('User', User, 'users');