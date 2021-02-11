const jwt=require('jsonwebtoken');
const {JWT_SECRET}=require('../keys');
const mongoose=require('mongoose');
var User = require('../models/user')

module.exports=(req,res,next)=>{
    const {authorization} =req.headers
    //format of  authorization ===Bearer token
    if(!authorization){
        res.status(401).json({err:"you must be logged in"})
    }
    else{
       const token = authorization.replace("Bearer " ,"")//recive only token not Bearer word
       jwt.verify(token,JWT_SECRET,(err,payload)=>{
           if(err)
           return res.status(401).json({error:"you must be logged in"})
           const {_id}=payload  //_id comes from token in auth/signin/domatch
           User.findById(_id)
           .then(userdata=>{
               req.user =userdata;
               next()
           })
       })   
    }
}