import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Register from './pages/Register';

const App = () => {
  return (
    <div className='h-screen'>
      <Routes>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </div>
  )
}

export default App;