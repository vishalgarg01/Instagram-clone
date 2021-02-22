import React, { useEffect, useState } from 'react';
import {Link,useHistory} from 'react-router-dom';
import M from 'materialize-css';

const Signup=()=>{
    const history=useHistory(); //to navigate after success
    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");
    const [image,setImage]=useState("");
    const [url,setUrl]=useState(undefined); //if user not set pic then default pic used

    useEffect(()=>{
        if(url){
            uploadFields()
        }
    },[url])
    const uploadPic=()=>{
        const data=new FormData() //need to upload image
        data.append("file",image)
        data.append("upload_preset","Instagram") //cloudinary
        data.append("cloud_name","vishalgarg01") //cloud name on cloudinary
        fetch("	https://api.cloudinary.com/v1_1/vishalgarg01/image/upload",{
            method:"post",
            body:data
        }).then(res=>res.json())
        .then(data=>{
            setUrl(data.url)
        }).catch(err=>{console.log(err)})
    }
    const uploadFields=()=>{
         //email validation regexEmail
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
           M.toast({html:"invalid email", classes:"#c62828 red darken-3"})
           return;
        }
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,password,email,pic:url
            })
        }).then(res=>res.json())
            .then(data=>{
                if(data.error){
                    M.toast({html:data.error, classes:"#c62828 red darken-3"})
                }
                else{
                    M.toast({html:data.message, classes:"#43a047 green darken-1"})
                    history.push('/signin');//navigate to login page
                }
            }).catch(err=>{console.log(err)})
    }

    const Postdata=()=>{
       if(image){
           uploadPic()
       }else{
           uploadFields()
       }
    }

    return(
        <div className="mycard">
        <div className="card authcard">
           <h2>Instagram</h2>
           <input type="text" placeholder="name" value={name} onChange={(e)=>setName(e.target.value)}/>
           <input type="text" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
           <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
           <div className="file-field input-field">
                <div className="btn #64b5f6 blue darken-2">
                    <span>Upload Pic</span>
                    <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"/>
                </div>
            </div>
           
           <button className="btn #64b5f6 blue darken-1"
           onClick={()=>Postdata()}>Signup
           </button>
           <h5>
               <Link to="/signin">Already have an Account?</Link>
           </h5>
        </div>
    </div>
    )
}
export default Signup;