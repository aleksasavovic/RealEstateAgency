import mongoose, { SchemaTypes } from 'mongoose'
import user from './user';

const Schema = mongoose.Schema;

let conversation = new Schema({
   
   
    buyer:{
        type:String
    },
    seller:{
        type:String
    },
    realEstateId:{
        type:Schema.Types.ObjectId,
        ref:'RealEstate'
        
    },
    messages:{
        type:Array
    },
    newestDate:{
        type:Date
    },
    title:{
        type:String
    },
    archivedBySeller:{
        type:Boolean
    },
    archivedByBuyer:{
        type:Boolean
    },
    offerSent:{
        type:Boolean
    },
    offerAccepted:{
        type:Boolean
    },
    aprovedByAgent:{
        type:Boolean
    },
    seenByBuyer:{
        type:Boolean
    },
    seenBySeller:{
        type:Boolean
    }
    
});

export default mongoose.model('Conversation', conversation, 'conversations');