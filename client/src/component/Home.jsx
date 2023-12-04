import React, {useState, useEffect} from 'react'
import {NavLink}  from 'react-router-dom'
import home from "../images/home.jpg"

export default function Home() {
  const [userName, setUserName]=useState("");
 
 
  const [show, setshow]= useState(false);
  
  const callHomePage=async()=>{
    try {
      const res=await fetch ("/api/getdata", {
        method:'GET',
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        credentials:"include"
      });
      const data=await res.json();
      
      setUserName(data.name)
      setshow(true)
      
      console.log(data.name)
      
    } catch (error) {
      console.log(error)
      navigate("/signup")
    }
  }
  useEffect(()=>{
     callHomePage()
  },[]);
  return (
   <>
   <div className="home-page">
      <img className='img2' src={home} alt="" />
      <div className="home-dv">
      <p className='home_para'>{show?"WELCOME!": ""}</p>
      <h1 className='head'>{show?userName: "Welcome to ByteLern - Your Gateway to Computer Science Excellence!"}</h1>
        <h5 className='home_head2'>{show ? "Happy to see you back!!!": ""}</h5>
        <p className='home-exp'><NavLink to="/explore" className="signup-image-link">Click here to explore</NavLink></p>
        
      </div>
    </div>
    </>
  )
}


