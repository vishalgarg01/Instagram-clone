import React from 'react';
import {Link} from 'react-router-dom';

const Login=()=>{
    return(
        <div className="mycard">
            <div className="card authcard">
               <h2>Instagram</h2>
               <input type="text" placeholder="email"/>
               <input type="password" placeholder="password"/>
               <button className="btn #64b5f6 blue darken-2">Login
               </button>
               <h5>
               <Link to="/signup">Don't have an Account?</Link>
                </h5>
            </div>
        </div>
    )
}
export default Login;