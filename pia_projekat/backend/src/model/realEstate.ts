import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let realEstate = new Schema({
    title: {
        type: String
    },
    adress: {
        type: Object
    },
    type: {
        type: String
    },
    floors: {
        type: Number
    },
   
    onFloor: {
        type: Number
    },
    rooms: {
        type: Number
    },
    equiped: {
        type: String
    },
    quadrature:{
        type:Number
    },
    pictures: {
        type: Array
    },
    price:{
        type:Number
    },
    owner:{
        type:String
    },
    aproved:{
        type:String
    },
    date:{
        type:Date
    },
    reason:{
        type:String
    },
    sold:{
        type:Boolean
    },
    viewed:{
        type:Array
    },
    views:{
        type:Number
    }
    
    
})

export default mongoose.model('RealEstate', realEstate, 'realEstate');