import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <p className='text-h5'>Home</p>
      <Link to={'/login'}><span className='relative hover-underline'>Login</span></Link><br />
      <Link to={'/signup'}><span className='relative hover-underline'>Signup</span></Link>
    </div>
  )
}

export default Home
