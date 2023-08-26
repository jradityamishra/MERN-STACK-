import React, { useEffect, useState } from 'react'
import {useNavigate,useLocation} from 'react-router-dom'
const Spinner = () => {
  const navigate=useNavigate();
  const location=useLocation();
  const[count,setCount]=useState(5);
  useEffect(()=>{
    const interval=setInterval(()=>{
      setCount((prevValue)=> --prevValue)
    },1000)
    count === 0 && navigate('/login',{
      state:location.pathname,
    })
    return ()=>clearInterval(interval)
  },[count,navigate,location])
  return (
   <>
   <div class='flex flex-col h-screen justify-center items-center '>
   <h1 class='p-10'>Redirecting  to you in {count} second</h1>
    <div
  class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] "
  role="status"> 
  <span
    class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
    >Loading...</span>
</div>
</div>
   </>
  )
}

export default Spinner