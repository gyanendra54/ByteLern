import React, { useReducer,  createContext } from 'react'
import {BrowserRouter, Routes, Route, useActionData } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import Navbar from './component/Navbar';
import Home from './component/Home';
import About from './component/About';
import Signup from './component/Signup';
import Contact from './component/Contact';
import Login from './component/Login';
import Logout from './component/Logout';
import ErrorPage from './component/ErrorPage';
import Explore from './component/Explore';
import Aboutme from './component/Aboutme';
import { initialState, reducer } from '../src/reducer/UseReducer';
export const UserContext=createContext(); 
const Routing =()=>{
  return(
  <Routes>
  <Route path='/' element={<Home />} />
  <Route path='/profile' element={<About/>} />
  <Route path='/signup' element={<Signup />} />
  <Route path='/contact' element={<Contact/>} />
  <Route path='/login' element={<Login />} />
  <Route path='/logout' element={<Logout/>} />
  <Route path='/explore' element={<Explore/>} />
  <Route path='/aboutme' element={<Aboutme/>} />
  <Route path='*' element={<ErrorPage/>} />
  </Routes>
  )
}

export default function App() {
   const [state, dispatch]=useReducer(reducer, initialState)
  return (
    <>
    <UserContext.Provider value={{state, dispatch}}>
    <BrowserRouter>
    <Navbar/>
    <Routing/>
    </BrowserRouter>
    </UserContext.Provider>
    //my name is gyanendra kumar bais
    
    </>
    
  )
}
