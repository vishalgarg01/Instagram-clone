import React, { useEffect, useState,useContext } from 'react';
import {UserContext} from '../../App'
const Profile=()=>{
    const {state,dispatch}=useContext(UserContext)
    const [mypics,setPics]=useState([])
    useEffect(()=>{
        fetch('/mypost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            // console.log(state)
            // console.log(result)
            setPics(result.mypost)
        })
    },[])
    return(
        <div style={{maxWidth:"550px",margin:"0px auto"}}>
            <div style={{
                display:"flex",justifyContent:"space-around",margin:"18px,0px",
                borderBottom:"1px solid grey"}}>
                <div>
                    <img style={{width:"160px",height:"160px",borderRadius:"80px"}} alt=""
                    src ={state?state.user.pic:"loading"}/>
                </div>
                <div>
                    <h1>{state?state.user.name:"loading"}</h1>
                    <h5>{state?state.user.email:"loading"}</h5>
                    <div  style={{
                display:"flex",justifyContent:"space-around",width:"108%"}}>
                        <h6>{mypics.length} posts</h6>
                        <h6>{state?state.user.followers.length:"loading"} followers</h6>
                        <h6>{state?state.user.following.length:"loading"} following</h6>
                    </div>
                </div>
            </div>
        
            <div className="gallery">
                {
                    mypics.map(item=>{
                        return(
                            <img key={item._id} className="item" src ={item.photo} alt={item.title}/>
                        );
                    })
                }
            </div>
        </div>
    )
}
export default Profile;