const express=require('express');
const http=require('http');
const port=5000;
const mongoose=require('mongoose');
const app=express();
const {MONGOURI}=require('./keys')
const router=require('./routes/auth');

const User =require('./models/user');
app.use(express.json());
app.use('/',router);


mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
mongoose.connection.on('connected',()=>{
    console.log("db connected")
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})

app.listen(port,()=>{
    console.log("server running at port ",port)
})
