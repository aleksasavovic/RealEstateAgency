import mongoose, { SchemaTypes } from 'mongoose'
import user from './user';

const Schema = mongoose.Schema;

let profit = new Schema({
   
    totalRevenue:{
        type:Number
        
    },
    agencyFee:{
        type:Number
    }
    
});

export default mongoose.model('profit', profit, 'profit');