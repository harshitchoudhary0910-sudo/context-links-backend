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
LinkSchema.index({ userId: 1, _id: -1 });
export default mongoose.model("links",LinkSchema);