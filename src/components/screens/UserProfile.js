import React, { useEffect, useState,useContext } from 'react';
import { useParams } from 'react-router-dom';
import {UserContext} from '../../App'
const Profile=()=>{
    const {state,dispatch}=useContext(UserContext)
    const [mypics,setPics]=useState([])
    const [userprofile,setProfile]=useState(null)
    const {userid}=useParams()
    //show follow/unfollow button if userid is/not found in following array 
    const [showfollow,setShowfollow]=useState(state?!state.following.includes(userid):true)
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

    const followUser=()=>{
        fetch("/follow",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            //add follower and following in state
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user" ,JSON.stringify(data))
            setProfile((prevstate)=>{
                return {
                    ...prevstate,
                    user:{
                        ...prevstate.user,
                        followers:[...prevstate.user.followers,data._id]
                    }
                }
            })
            setShowfollow(false)
        })
    }
    const unfollowUser=()=>{
        fetch("/unfollow",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                unfollowId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user" ,JSON.stringify(data))
            setProfile((prevstate)=>{
                const newFollower=prevstate.user.followers.filter(item=>item!=data._id)
                return {
                    ...prevstate,
                    user:{
                        ...prevstate.user,
                        followers:newFollower
                    }
                }
            })
            setShowfollow(true)
        })
    }
    return(
        <>
        {userprofile ?
            <div style={{maxWidth:"550px",margin:"0px auto"}}>
            <div style={{
                display:"flex",justifyContent:"space-around",margin:"18px,0px",
                borderBottom:"1px solid grey"}}>
                <div>
                    <img style={{width:"160px",height:"160px",borderRadius:"80px"}} alt=""
                    src ={userprofile.user.pic}/>
                </div>  
                <div>
                    <h1>{userprofile.user.name}</h1>
                    <h5>{userprofile.user.email}</h5>
                    <div  style={{
                display:"flex",justifyContent:"space-around",width:"108%"}}>
                        <h6>{userprofile.posts.length} posts</h6>
                        <h6>{userprofile.user.followers.length} followers</h6>
                        <h6>{userprofile.user.following.length} following</h6>
                    </div>
                    {
                        showfollow?
                        <button style={{margin:"10px"}} className="btn #64b5f6 blue darken-1"
                             onClick={()=>followUser()}>Follow
                         </button>
                        :
                        <button style={{margin:"10px"}} className="btn #64b5f6 blue darken-1"
                             onClick={()=>unfollowUser()}>Unfollow
                         </button>
                    }
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