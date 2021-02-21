const mongoose=require('mongoose');
const {ObjectId} =mongoose.Schema.Types
const Schema= mongoose.Schema;
const userSchema=new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    followers:[{type:ObjectId,ref:"User"}],
    following:[{type:ObjectId,ref:"User"}]
});

module.exports = mongoose.model('User', userSchema);