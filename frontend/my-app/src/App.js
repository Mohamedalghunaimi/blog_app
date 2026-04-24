import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import SingleBlog from './pages/SingleBlog';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import { useContext } from 'react';
import { context } from './pages/Provider';

function App() {
    const {isAuth} = useContext(context)
  
  return (
    <>
    <ToastContainer/>
    <Routes>
      <Route path="/" element={<><Home/></>} />
      <Route path='/blog/:id' element={<><SingleBlog/></>} />
      {!isAuth&&<Route path='/login' element={<><Login/></>} />}
    </Routes>
    
    
    
    </>
  );
}

export default App;
