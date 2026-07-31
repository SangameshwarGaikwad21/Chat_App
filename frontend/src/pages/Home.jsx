import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <div>
            Welcome to the Chat app

            <div>
                <Link to="/register">
                     Register 
                </Link>
               
            </div>
            <div>
               <Link to="/login">
                     Login
                </Link>
               
            </div>
        </div>
    </div>
  )
}

export default Home