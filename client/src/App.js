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
import Products from './pages/Admin/Products'
import UpdateProduct from './pages/Admin/UpdateProduct'
import Search from "./pages/Search"
import  ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
const App = () => {
  return (
   
    <>
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/productdetail/:slug' element={<ProductDetail/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/cart' element={<Cart/>}/>
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
        <Route path='admin/products' element={<Products/>}/>
        <Route path='admin/update-products/:slug' element={<UpdateProduct/>}/>
       
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