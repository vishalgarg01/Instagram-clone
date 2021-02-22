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
    pic:{
        type:String,
        default:"https://res.cloudinary.com/vishalgarg01/image/upload/v1613980506/1234_vx5gy0.png"
       },
    followers:[{type:ObjectId,ref:"User"}],
    following:[{type:ObjectId,ref:"User"}],
});

module.exports = mongoose.model('User', userSchema);