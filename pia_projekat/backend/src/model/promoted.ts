import mongoose, { SchemaTypes } from 'mongoose'
import user from './user';

const Schema = mongoose.Schema;

let promoted = new Schema({
   
    realEstateID:{
        type:Schema.Types.ObjectId,
        ref:'RealEstate'
        
    }
    
});

export default mongoose.model('Promoted', promoted, 'promoted');