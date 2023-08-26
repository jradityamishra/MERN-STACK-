import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Layout from './component/layout/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Policy from './pages/Policy'
import Pagenotfound from './pages/Pagenotfound'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/user/Dashboard'
import Private from './component/routes/Private'
import ForgotPassword from './pages/Auth/ForgotPassword'
const App = () => {
  return (
   
    <>
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/dashboard' element={<Private/>}>
        <Route path='' element={<Dashboard/>}/>
        </Route>
        <Route path='/forgotpassword' element={<ForgotPassword/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/policy' element={<Policy/>}/>
        <Route path='/*' element={<Pagenotfound/>}/>
        <Route path='/signup' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      
      
      </Routes>
    </>
  )
}

export default App