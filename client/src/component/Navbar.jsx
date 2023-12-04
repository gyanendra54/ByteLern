import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { UserContext } from '../App';
export default function Navbar() {
  const {state, dispatch}=useContext(UserContext);
  const RenderMenu=()=>{
    if(state){
      return(
        <>
        <li className="nav-item">
         <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
       </li>
       <li className="nav-item">
         <NavLink className="nav-link" to="/contact">Contact</NavLink>
       </li>
       <li className="nav-item">
         <NavLink className="nav-link" to="/profile">Profile</NavLink>
       </li>
       <li className="nav-item">
         <NavLink className="nav-link" to="/aboutme">About</NavLink>
       </li>
       <li className="nav-item">
         <NavLink className="nav-link" to="/logout">Logout</NavLink>
       </li>
       </>
      )
    }
    else{
      return(
        <>
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/contact">Contact</NavLink>
        </li>
        <li className="nav-item">
         <NavLink className="nav-link" to="/profile">Profile</NavLink>
       </li>
       <li className="nav-item">
          <NavLink className="nav-link" to="/signup">Register</NavLink>
        </li>
         <li className="nav-item">
          <NavLink className="nav-link" to="/login">Login</NavLink>
        </li>
        <li className="nav-item">
         <NavLink className="nav-link" to="/aboutme">About</NavLink>
       </li>  
        </>
      )
    }
  }
  return (
    <>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="/explore"><span className='nav'>ByteLern</span></NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
       <RenderMenu/>
      </ul>
    </div>
  </div>
</nav>
    </>
  )
}
