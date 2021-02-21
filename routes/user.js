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

router.put('/follow',requirelogin,(req,res)=>{
    User.findByIdAndUpdate(req.body.followId,{  //whom we want to follow
        $push:{followers:req.user._id} //push id of loggedin user to followers of person he follow
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        //now update following of user who follow other
      User.findByIdAndUpdate(req.user._id,{
          $push:{following:req.body.followId}
          
      },{new:true}).select("-password").then(result=>{
          res.json(result)
      }).catch(err=>{
          return res.status(422).json({error:err})
      })

    }
    )
})
router.put('/unfollow',requirelogin,(req,res)=>{
    User.findByIdAndUpdate(req.body.unfollowId,{
        $pull:{followers:req.user._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
      User.findByIdAndUpdate(req.user._id,{
          $pull:{following:req.body.unfollowId}
          
      },{new:true}).select("-password").then(result=>{
          res.json(result)
      }).catch(err=>{
          return res.status(422).json({error:err})
      })

    }
    )
})

module.exports=router;
