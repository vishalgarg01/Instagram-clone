const express=require('express');
const bodyParser = require('body-parser');
var router = express.Router();
const mongoose=require('mongoose');
const requirelogin =require('../middleware/requireLogin');
var Post = require('../models/post')
var User = require('../models/user');

router.use(bodyParser.json());

router.get('/user/:id',requirelogin,(req,res)=>{
    User.findOne({_id:req.params.id})
    .select("-password")//send all details except password
    .then(user=>{
        Post.find({postedBy:req.params.id})
        .populate("postedBy","_id name")
        .exec((err,posts)=>{
            if(err){
                return res.status(422).json({error:err})
            }
            res.json({user,posts})
        })
    }).catch(err=>{
        return res.status(404).json({error:"User not found"})
    })
})

module.exports=router;
