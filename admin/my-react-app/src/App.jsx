
import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Add from './pages/Add';
import BlogLists from './pages/BlogLists';
import Comments from './pages/Comments';
import Login from './pages/Login';
import { useContext } from 'react';
import { context } from './pages/Provider';
import { ToastContainer} from 'react-toastify';

function App() {
  const {isAuth} = useContext(context)

  return (
    <>
    <ToastContainer />
    {
      <Routes>
      {<Route path='/' element={<><Login/></>} />}
      {isAuth&&
      <>
      <Route path='/dashboard' element={<><Home/></>} />
      <Route path='/add' element={<><Add/></>} />
      <Route path='/list' element={<><BlogLists/></>}/>
      <Route path='/comments' element={<><Comments/></>} />
      </>
      }
    </Routes> 
    }

    
    </>
  )
}

export default App
