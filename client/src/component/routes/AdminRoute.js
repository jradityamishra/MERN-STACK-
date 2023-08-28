import React,{useState,useEffect} from 'react'
import { useAuth } from '../../context/auth'
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import Spinner from '../Spinner';
const Adminroute = () => {
    const [ok,setOk]=useState(false);
    const [auth,setAuth]=useAuth();
    useEffect(()=>{
        const authCheck=async()=>{
            const res=await axios.get('/api/v1/auth/admin-auth',
            {
                headers:{
                    "Authorization":auth?.token //auth ma token mil raha hai ki nai than uska andar token check karenga
                }
            })
            if(res.data.ok){
                setOk(true)
            }else{
                setOk(false)
            }
        }
        if(auth?.token)authCheck()
    },[auth?.token])
  return ok ? <Outlet/>:<Spinner path=" " />
}

export default Adminroute