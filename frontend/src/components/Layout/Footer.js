import React from 'react'
import { Link } from 'react-router-dom'
import Contact from './../../pages/Contact';

const Footer = () => {
  return (
    <div className='footer'>
      <h1 className='text-center'>
        All Rights Reserved &copy; KTech
      </h1>
      <p className='text-center mt-3'>
        <Link to='/about'>About</Link>
        <Link to='/contact'>Contact</Link>
        <Link to='/privacy'>Privacy Policy</Link>
      </p>
    </div>
  )
}

export default Footer
