import React from 'react';
import {Link} from 'react-router-dom'

export default function Navbar() {
  return (
    <div className='flex flex-row shadow-md bg-gray-400 place-content-between'>
      <div className='justify-start m-1'>
      <Link to="/" className='m-3 '>Home</Link>
      <input type="text" className="rounded shadow mt-2 mb-2" />
      
    </div>
    <div className='justify-end align-end m-3'>
      <Link to="/sign-up" className='m-3'>Sign Up</Link>
      <Link to="/sign-in" className='m-3'>Sign In</Link>
      <Link to="/profile/currentUser" className='m-3 justify-end'>Profile</Link>
    </div>
    </div>
    
  );
}
