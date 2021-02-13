const mongoose=require('mongoose');
const Schema= mongoose.Schema;
const {ObjectId} =mongoose.Schema.Types
const postSchema=new Schema({
    title:{
        type:String,
        require:true
    },
    body:{
        type:String,
        require:true 
    },
    photo:{
        type:String,
        require:true 
    },
    postedBy:{
        type:ObjectId,
        ref:"User"
    }
});
module.exports = mongoose.model('Post', postSchema);