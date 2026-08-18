import mongoose from 'mongoose';

const LinkSchema=new mongoose.Schema({
    longUrl:{
        type:String,
        required:true
    },
    shortCode:{
        type:String,
        required:true,
        unique:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true   

    },
    clickCount:{
        type:Number,
        default:0,
        
    }

})
export default mongoose.model("links",LinkSchema);