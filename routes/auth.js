const express=require('express');
const bodyParser = require('body-parser');
var router = express.Router();
const mongoose=require('mongoose');
var User = require('../models/user')
const requirelogin =require('../middleware/requireLogin')

const bcrypt =require('bcryptjs');  //for hashing password

const jwt=require('jsonwebtoken');
const {JWT_SECRET}=require('../keys');
const requireLogin = require('../middleware/requireLogin');

router.use(bodyParser.json());

router.get('/protected',requireLogin,(req,res)=>{
    res.send("hello user");
})

router.post('/signup',(req,res)=>{
   const {name,email,password}=req.body
   if(!email ||!password || !name){
      return  res.status(422).json({error:"please add all fields"});
   }
   User.findOne({email:email})
   .then((saveduser)=>{
       if(saveduser){
        return  res.status(422).json({error:"User already exist"});
       }
       else{
           bcrypt.hash(password,12)  //hide password 
           .then(hashedpassword=>{
                const user =new User({
                    email,password:hashedpassword,name
                })
                user.save()
                .then((user)=>{
                    res.json({message:"saved successfully"});
                })
                .catch(err=>{console.log(err)})
           }) 
       }
   }) .catch(err=>{console.log(err)})
})
router.post('/signin',(req,res)=>{
    const {email,password}=req.body;
    if(!email ||!password ){
        return  res.status(422).json({error:"please add all fields"});
     }
     User.findOne({email:email})
     .then(saveduser=>{
         if(!saveduser){
            return res.status(422).json({error:"invalid email or password"});
         }
         bcrypt.compare(password,saveduser.password)
         .then(domatch=>{
             if(domatch){
                // res.json({message:"successfully signed in"})
                //if user found sign a token  
                const token =jwt.sign({_id:saveduser._id},JWT_SECRET)
                res.json({token})
             }
             else{
                return res.status(422).json({error:"invalid email or password"});
             }
         }).catch(err=>{console.log(err)})
     }).catch(err=>{console.log(err)})
})

module.exports=router;