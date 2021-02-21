const express=require('express');
const http=require('http');
const port=5000;
const mongoose=require('mongoose');
const app=express();
const {MONGOURI}=require('./keys')
const router=require('./routes/auth');
const postrouter=require('./routes/post');
const userrouter=require('./routes/user');

const User =require('./models/user');
const Post =require('./models/post');

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

app.use(express.json());
app.use('/',router);
app.use('/',postrouter);
app.use('/',userrouter);


app.listen(port,()=>{
    console.log("server running at port ",port)
})
