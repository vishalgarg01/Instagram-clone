import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter,Route, Switch} from 'react-router-dom';
import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import Signup from './components/screens/Signup';
import Login from './components/screens/Login';
import CreatePost from './components/screens/CreatePost';
function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/signin' component={Login}/>
        <Route path='/signup' component={Signup}/>
        <Route path='/profile' component={Profile}/>
        <Route path='/create' component={CreatePost}/>
      </Switch>
    </BrowserRouter>
   
  );
} 
export default App;
