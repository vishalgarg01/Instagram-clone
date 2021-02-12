import React from 'react';
import {Link} from 'react-router-dom';

const Signup=()=>{
    return(
        <div className="mycard">
        <div className="card authcard">
           <h2>Instagram</h2>
           <input type="text" placeholder="name"/>
           <input type="text" placeholder="email"/>
           <input type="password" placeholder="password"/>
           <button className="btn #64b5f6 blue darken-1">Signup
           </button>
           <h5>
               <Link to="/signin">Already have an Account?</Link>
           </h5>
        </div>
    </div>
    )
}
export default Signup;