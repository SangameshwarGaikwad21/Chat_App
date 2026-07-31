import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div className='h-screen'>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>} />
      </Routes>
    </div>
  )
}

export default App;