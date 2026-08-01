import React from 'react'
import { Routes,Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home'
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Chat from './components/chat/chat';

const App = () => {
  return (
    <div className='h-screen'>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/chat' element={<Chat/>} />
      </Routes>
    </div>
  )
}

export default App;