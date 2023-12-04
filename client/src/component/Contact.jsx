
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Contact() {
 const navigate=useNavigate();
  const [userData, setUserData]=useState({name:"", email:"", phone:"", message:""});
  const callContactPage=async()=>{
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
      
      setUserData({...userData, name:data.name, email:data.email, phone:data.phone});
      
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
     callContactPage()
  },[]);

  const handleInputs=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    setUserData({...userData, [name]:value});
    console.log(userData)
  }
  const contactForm=async(e)=>{
    e.preventDefault();
    const {name, email, phone, message}=userData;
   const res=await fetch('/api/contact', {
      method:'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name, email, phone, message
      })
    })
    const data=await res.json();
    if(!data.message){
      console.log("message not send")
      alert("plese write some message")
    }
    else{
      alert("message send");
      setUserData({...userData, message:""});
    }
  }
  return (
    <>
    <div className="contact_Info">
      <div className="container-fluid">
        <div className="row">
          <div className='flexwalah col-lg-10 offset-lg-1 d-flex justify-content-between'>
            <div className="contact_info_item d-flex justify-content-start align-items-center">
              <img src="https://img.icons8.com/office/24/000000/iphone.png" alt="phone" />
              <div className="contact_info_content">
                <div className="contact_info_title">
                  phone
                </div>
                <div className="contact_info_text">
                  9753692108

                </div>
              </div>
            </div>
            <div className="contact_info_item d-flex justify-content-start align-items-center">
              <img src="https://img.icons8.com/office/24/000000/email.png" alt="phone" />
              <div className="contact_info_content">
                <div className="contact_info_title">
                  Email
                </div>
                <div className="contact_info_text">
                  gyanendrabais54@gmail.com
                </div>
              </div>
            </div>
            <div className="contact_info_item d-flex justify-content-start align-items-center">
              <img src="https://img.icons8.com/office/24/000000/address.png" alt="phone" />
              <div className="contact_info_content">
                <div className="contact_info_title">
                  Address
                </div>
                <div className="contact_info_text">
                  Gwalior,MP
                </div>
              </div>
            </div>
          </div >
        </div>
      </div>
    </div>
    
    <div className="contact_form">
      <div className="container">
        <div className="row">
          <div className='col-lg-10 offset-lg-1'>
            <div className="contact_form_container py-5">
              <div className="contact_form_title">
                Get in Touch
              </div>
              <form method='POST' id='contact_form'>
                <div className="contact_form_name d-flex justify-content-between align-item-center">
                  <input type="text" id='contact_form_name'
                  className='contact_form_name input_field'
                  name='name'
                  value={userData.name}
                  onChange={handleInputs}
                  placeholder='Your name' required="true" />
                  <input type="email" id='contact_form_email'
                  className='contact_form_email input_field'
                  name='email'
                  value={userData.email}
                  onChange={handleInputs}
                  placeholder='Your Email' required="true" />
                  <input type="number" id='contact_form_phone'
                  className='contact_form_phone input_field'
                  name='phone'
                  value={userData.phone}
                  onChange={handleInputs}
                  placeholder='Your phone' required="true" />
                </div>
                <div className="contact_form_text">
                  <textarea className="text_field contact_form_message" name="message" value={userData.message} onChange={handleInputs} placeholder='Message' cols="70" rows="4"></textarea>
                </div>
                <div className="contact_form_button">
                  <button type='submit' className='button contact_submit_button' onClick={contactForm}>Send Message</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
