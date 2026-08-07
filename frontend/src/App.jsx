import { Routes,Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home'
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Chat from './components/chat/chat';
import Profile from './components/auth/Profile';
import { useDispatch } from 'react-redux';
import { getUserProfile } from "./redux/auth/auth.slice";
import { useEffect } from 'react';


const App = () => {

  const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserProfile());
    }, [dispatch]);

  return (
    <div className='h-screen'>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/chat' element={<Chat/>} />
        <Route path='/profile' element={<Profile/>} />
      </Routes>
    </div>
  )
}

export default App;
