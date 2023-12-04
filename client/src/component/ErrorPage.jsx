import React from 'react'
import { NavLink } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <>
    <div id='not found'>
      <div className="notfound-404">
        <h1 className='head'>Sorry!! This Page not found</h1>
        <p className='mb-5 para'>The Page you are looking for might have been removed had its name changed or id temporarily unavailabe</p>
        <NavLink to="/">Back To HomePage</NavLink>
      </div>
    </div>
    </>
  )
}
