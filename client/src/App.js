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
import Adminroute from './component/routes/AdminRoute'
import Admindashboard from './pages/Admin/Admindashboard'
import CreateCategory from './pages/Admin/CreateCategory'
import CreateProduct from './pages/Admin/CreateProduct'
import User from './pages/Admin/User'
import Profile from './pages/user/Profile'
import Order from './pages/user/Order'
const App = () => {
  return (
   
    <>
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/dashboard' element={<Private/>}>
        <Route path='user' element={<Dashboard/>}/>
        <Route path='user/profile' element={<Profile/>}/>
        <Route path='user/order' element={<Order/>}/>
        
        </Route>
        <Route path='/dashboard' element={<Adminroute/>}>
        <Route path='admin' element={<Admindashboard/>}/>
        <Route path='admin/create-category' element={<CreateCategory/>}/>
        <Route path='admin/create-product' element={<CreateProduct/>}/>
        <Route path='admin/user' element={<User/>}/>
       
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