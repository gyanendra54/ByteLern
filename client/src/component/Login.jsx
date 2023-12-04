import React, {useContext, useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../App';
export default function Login() {
  const navigate=useNavigate();
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  const {state, dispatch}=useContext(UserContext);
  const UserLogin = async (e) => {
    
    e.preventDefault();
    const res = await fetch('/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
  
    try {
      const data = await res.json();
  
      if (res.status === 400 || !data) {
        window.alert('Invalid credentials');
        console.log('Bad request');
      } else {
        dispatch({type:"USER", payload:true})
        window.alert('Login successful');
        navigate('/');
      }
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  };
  
  
  return (
    <section className='signup'>
    <div className='container mt-5'>
      <div className='signup-content'>
        <div className='signup-form'>
          <h2 className='form-title'>LogIn</h2>
          <form method="POST" className='register-form'>
            
            <div className='form-group'>
              <label htmlFor='email'>
                <i className='zmdi zmdi-email'></i>
              </label>
              <input type='email' name='email' id='email' autoComplete='off' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Your Email' />
            </div>     
            <div className='form-group'>
              <label htmlFor='password'>
                <i className='zmdi zmdi-lock'></i>
              </label>
              <input type='password' name='password' id='password' autoComplete='off' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Your Password' />
            </div>
            
            <div className='form-group form-button'>
              <input type='submit' name='signup' id='signup' className='form-submit' value='Login' onClick={UserLogin} />
            </div>
          </form>
        </div>
      </div>
      <NavLink to="/signup" className="signup-image-link">Create an account</NavLink>
    </div>
  </section>
  )
}

