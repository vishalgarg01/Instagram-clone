const express=require('express');
const bodyParser = require('body-parser');
var router = express.Router();
const mongoose=require('mongoose');
const requirelogin =require('../middleware/requireLogin');
var Post = require('../models/post')

router.use(bodyParser.json());

router.get('/allpost',requirelogin,(req,res)=>{
    Post.find()
    .populate("postedBy","_id name") //populate show details of 1st argument and only those fields which specified in 2nd argument
    .populate("comments.postedBy","_id name")
    .then(posts=>{
        res.json({posts})
    }).catch(err=>{console.log(err);})
})

router.post('/createpost',requirelogin,(req,res)=>{
    const {title,body,pic}=req.body;
    if(!title || !body ){
        return res.status(422).json({error:"Please add all fields"});
    }
    req.user.password=undefined;
    const post=new Post({
        title,body,photo:pic,
        postedBy:req.user //req.user store data of user who logged in. present in requielogin.js 
    })
    post.save()
    .then(result=>{
        res.json({post:result})
    }).catch(err=>{console.log(err);})
})

router.get('/mypost',requirelogin,(req,res)=>{
    Post.find({ postedBy:req.user._id})
    .populate("postedBy","_id name")
    .then(mypost=>{
        res.json({mypost})
    }).catch(err=>{console.log(err);})
})

router.put('/like',requirelogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})
router.put('/unlike',requirelogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

router.put('/comment',requirelogin,(req,res)=>{
    const comment={text:req.body.text,postedBy:req.user._id}
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("postedBy","_id name") 
    .populate("comments.postedBy","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

module.exports=router;
