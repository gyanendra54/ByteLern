import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import gkumar from "../images/gyanendrabais.jpg"
import about from "../images/about.png"

export default function About() {
  const [userData, setUserData]=useState("");
  const navigate=useNavigate();

  const callAboutPage=async()=>{
    try {
      const res=await fetch ("/api/about", {
        method:'GET',
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        credentials:"include"
      });
      const data=await res.json();
      
      setUserData(data);
      console.log(userData)
      console.log(data)
      
      if(!(res.status===200)){
        const error=new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error)
      navigate("/signup")
      
    }
  }
  useEffect(()=>{
     callAboutPage()
  },[]);
  
  return (
    <>
    <div className="container mt-5 emp-profile">
      <form method='GET'>
        <div className="row">
          <div className="col-md-4">
            <div className="profile-img">
              <img className='img1' src={userData.name=== "Gyanendra Kumar Bais" ? gkumar : about} alt="" />
              </div>   
          </div>
          <div className="col-md-6 mt-5">
            <div className="profile-head">
              <h5>{userData.name}</h5>
              <h6>{userData.work}</h6>
              <ul className="nav nav-tabs" role="tablist">
                 <li className="nav-item">
                    <a className= 'nav-link active mt-5' id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home">Profile</a>
              </li>
             </ul>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-8 pl-5 about-info">
          <div className="tab-content profile-tab" id="myTabContent">
              <div className="tab-pane fade show active"  id='home' role='tabpanel'aria-labelledby='home-tab'>
                <div className="row">
                  <div className="col-md-6">
                    <label >User ID</label>
                  </div>
                  <div className="col-md-6">
                    <p>{userData._id}</p>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <label >Name</label>
                  </div>
                  <div className="col-md-6">
                    <p>{userData.name}</p>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <label >Email</label>
                  </div>
                  <div className="col-md-6">
                    <p>{userData.email}</p>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <label >phone</label>
                  </div>
                  <div className="col-md-6">
                    <p>{userData.phone}</p>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <label >Profession</label>
                  </div>
                  <div className="col-md-6">
                    <p>{userData.work}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-2">
            <button className='About-button mt-2'><NavLink to="/logout" className="signup-image-link">logout</NavLink></button>
          </div>
      </form>
    </div>
    </>
  )
}
