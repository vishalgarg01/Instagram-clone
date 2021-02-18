import React,{useEffect,createContext,useReducer, useContext} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter,Route, Switch,useHistory} from 'react-router-dom';
import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import Signup from './components/screens/Signup';
import Login from './components/screens/Login';
import CreatePost from './components/screens/CreatePost';
import {reducer,initialState} from './reducers/userReducer'; 

export const UserContext=createContext()

const Routing=()=>{

  const history=useHistory()
  const {state,dispatch}=useContext(UserContext)
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
      history.push('/')
    }else{
      history.push('/signin')
    }
  },[])
  return (
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/signin' component={Login}/>
        <Route path='/signup' component={Signup}/>
        <Route path='/profile' component={Profile}/>
        <Route path='/create' component={CreatePost}/>
      </Switch>
  );
}

function App() {
  const [state,dispatch] =useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
        <Navbar/>
        <Routing/>
      </BrowserRouter>
    </UserContext.Provider>
  );
} 
export default App;
