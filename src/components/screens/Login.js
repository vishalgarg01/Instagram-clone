import React, { useState } from 'react';
import {Link,useHistory} from 'react-router-dom';
import M from 'materialize-css';

const Login=()=>{
    const history=useHistory();
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");

    const Postdata=()=>{
        fetch("/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,email
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
                M.toast({html:data.error, classes:"#c62828 red darken-3"})
            }
            else{
                localStorage.setItem("jwt",data.token) //store token
                localStorage.setItem("user",JSON.stringify(data.user))//store user details
                M.toast({html:"success", classes:"#43a047 green darken-1"})
                history.push('/');//navigate to home page
            }
        }).catch(err=>{console.log(err);})
    }
    return(
        <div className="mycard">
            <div className="card authcard">
               <h2>Instagram</h2>
               <input type="text" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
               <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
               <button className="btn #64b5f6 blue darken-1"
                onClick={()=>Postdata()}>Login
             </button>
               <h5>
               <Link to="/signup">Don't have an Account?</Link>
                </h5>
            </div>
        </div>
    )
}
export default Login;