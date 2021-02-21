import React, { useEffect, useState,useContext } from 'react';
import { useParams } from 'react-router-dom';
import {UserContext} from '../../App'
const Profile=()=>{
    const {state,dispatch}=useContext(UserContext)
    const [mypics,setPics]=useState([])
    const [userprofile,setProfile]=useState(null)
    const {userid}=useParams()
   // console.log(userid)
    useEffect(()=>{
        fetch(`/user/${userid}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
           //  console.log(result)
             setProfile(result)
             
        })
    },[])
    return(
        <>
        {userprofile ?
            <div style={{maxWidth:"550px",margin:"0px auto"}}>
            <div style={{
                display:"flex",justifyContent:"space-around",margin:"18px,0px",
                borderBottom:"1px solid grey"}}>
                <div>
                    <img style={{width:"160px",height:"160px",borderRadius:"80px"}} alt=""
                    src ="https://images.unsplash.com/photo-1582556362337-6a785ee99c63?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjV8fHBlcnNvbnxlbnwwfDJ8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"/>
                </div>
                <div>
                    <h1>{userprofile.user.name}</h1>
                    <h5>{userprofile.user.email}</h5>
                    <div  style={{
                display:"flex",justifyContent:"space-around",width:"108%"}}>
                        <h6>{userprofile.posts.length} posts</h6>
                        <h6>40 followers</h6>
                        <h6>40 following</h6>
                    </div>
                </div>
            </div>
        
            <div className="gallery">
                {
                    userprofile.posts.map(item=>{
                        return(
                            <img key={item._id} className="item" src ={item.photo} alt={item.title}/>
                        );
                    })
                }
            </div>
        </div>
        :<h2>loading...!</h2>
        }

        </>
    )
}
export default Profile;