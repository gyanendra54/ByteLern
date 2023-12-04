import React, {useState} from 'react'
import { NavLink, useNavigate} from 'react-router-dom'
export default function Signup() {
  const [user, setUser]=useState({
    name:"", email:"", phone:"", work:"", password:"", cpassword:""
  });
  const navigate=useNavigate();
  let name, value
 const handleInputs=(e)=>{
    console.log(e)
    name=e.target.name;
    value=e.target.value;
    setUser({...user, [name]:value})
   
  }
  const PostData=async(e)=>{
    e.preventDefault();
    const {name, email, phone, work, password, cpassword}=user;
    const res = await fetch("/api/register", {
     method: 'POST',
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify({
       name, email, phone, work, password, cpassword
     })
   });
   const data=res.json();
  if(res.status===422 || !data){
    window.alert("invalid Registration!!!");
    console.log("invalid Registration");
  }else{
    window.alert("login successfully")
    navigate("/login")
  }
  }
  return (
    <section className='signup'>
    <div className='container'>
      <div className='signup-content'>
        <div className='signup-form'>
          <h2 className='form-title'>Sign up</h2>
          <form className='register-form' method='POST'>
            <div className='form-group'>
              <label htmlFor='name'>
                <i className='zmdi zmdi-account'></i>
              </label>
              <input type='text' name='name' id='name' autoComplete='off' 
              value={user.name}
              onChange={handleInputs} placeholder='Your Name' />
            </div>
            <div className='form-group'>
              <label htmlFor='email'>
                <i className='zmdi zmdi-email'></i>
              </label>
              <input type='email' name='email' id='email' autoComplete='off' 
              value={user.email}
              onChange={handleInputs}
               placeholder='Your Email' />
            </div>
            <div className='form-group'>
              <label htmlFor='phone'>
                <i className='zmdi zmdi-phone-in-talk'></i>
              </label>
              <input type='tel' name='phone' id='phone' autoComplete='off'
              value={user.phone}
              onChange={handleInputs}
               placeholder='Your Phone No.' />
            </div>
            <div className='form-group'>
              <label htmlFor='work'>
                <i className='zmdi zmdi-slideshow'></i>
              </label>
              <input type='text' name='work' id='work' autoComplete='off'
              value={user.work}
              onChange={handleInputs}
              placeholder='Your Profession' />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>
                <i className='zmdi zmdi-lock'></i>
              </label>
              <input type='password' name='password' id='password' autoComplete='off'
              value={user.password}
              onChange={handleInputs}
              placeholder='Your Password' />
            </div>
            <div className='form-group'>
              <label htmlFor='cpassword'>
                <i className='zmdi zmdi-lock'></i>
              </label>
              <input
                type='password'
                name='cpassword'
                id='cpassword'
                autoComplete='off'
                value={user.cpassword}
                onChange={handleInputs}
                placeholder='Confirm Password'
              />
            </div>
            <div className='form-group form-button'>
              <input type='submit' name='signup' id='signup' className='form-submit' value='Register' onClick={PostData} />
            </div>
          </form>
        </div>
      </div>
      <NavLink to="/login" className="signup-image-link">I have already register</NavLink>
    </div>
   
  </section>
  
  )
}
