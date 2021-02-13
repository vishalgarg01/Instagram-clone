import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';
import M from 'materialize-css';

const CreatePost=()=>{
    const [title,setTitle]=useState("");
    const [body,setBody]=useState("");
    const [image,setImage]=useState("");
    const [url,setUrl]=useState("");
    const history=useHistory();
    const PostDetails=()=>{
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
        }).catch(err=>{console.log(data)})

        fetch("/createpost",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                title,body,pic:url
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html:data.error, classes:"#c62828 red darken-3"})
            }
            else{
                M.toast({html:"Created post successfully", classes:"#43a047 green darken-1"})
                history.push('/');//navigate to login page
            }
        }).catch(err=>{console.log(err);})
    }
    return(
        <div className="card input-field"
            style={{margin:"30px auto",maxWidth:"500px",padding:"20px",textAlign:"center"}}>
            <input type="text" placeholder="title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
            <input type="text" placeholder="Body" value={body} onChange={(e)=>setBody(e.target.value)}/>
            
            <div className="file-field input-field">
                <div className="btn #64b5f6 blue darken-2">
                    <span>Upload Image</span>
                    <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"/>
                </div>
            </div>
            <button className="btn #64b5f6 blue darken-2" onClick={()=>PostDetails()}>Submit Post
           </button>
        </div>
    );
}
export default CreatePost;