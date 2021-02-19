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
    likes:[             //an array which store ids of persons who like post
        {
            type:ObjectId,
            ref:"User"
        }],
    comments:[{
        text:String,
        postedBy:{ type:ObjectId,ref:"User"}
    }],
    postedBy:{
        type:ObjectId,
        ref:"User"
    }
});
module.exports = mongoose.model('Post', postSchema);