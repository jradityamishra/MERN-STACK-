import React from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../component/layout/Layout'
import {useCart} from "../context/cart"
import { useAuth } from '../context/auth'
const Cart = () => {
    const[auth,setAuth]=useAuth();
    const [cart,setCart]=useCart();
    const navigate=useNavigate();

    //TOTAL PRICE
    const totalprice=()=>{
        try{
            let total=0;
            cart?.map(item=>{total=total+item.price})
            return total ;

        }catch(error){console.log(error)}
    }

    //REMOVE ITEMS
    const removeCartItem=(id)=>{

        try{
           let mycart=[...cart]  //jitna v cart ka items hai 
           let index=mycart.findIndex(item=>item._id=== id)
           mycart.splice(index,1)
           setCart(mycart)
           localStorage.setItem("cart",JSON.stringify(mycart))
        }catch(error)
        {console.log(error)}
    }
  return (
<Layout title={"cart page"}>
<div>
   <div>
   <h1 className='text-center bg-light p-2 mb-1'>
    {`Hello ${auth?.token && auth?.user?.name}`}
   </h1>
   <h4 className='text-center'>
    {cart?.length > 1 ? `You have ${cart.length} items in your cart `:"Your cart is empty"}
   </h4>
   </div>
   <div className='flex justify-around '>
    <div className='w-1/2'>
        {cart?.map((c)=>(
            <>
                <div className='flex'>
                    <div className=' '>
                    <img className="rounded-t-lg w-1/5"
                    src={`/api/v1/product/get-photo/${c._id}`}
                    alt={c.name} />
                    </div>
                    <div>
                        <h4>{c.name}</h4>
                        <p>{c.description.substring(0,30)}</p>
                        <p>Price:{c.price}</p>
                        <button className='px-3 py-1 bg-red-600 rounded text-white' onClick={()=>removeCartItem(c._id)}>remove</button>

                    </div>
                </div>
            </>
        ))}
    </div>
    <div className='text-center'>
        <h4>Cart Summary</h4>
        <p>Total | Checkout | Payment</p>
        <hr />
        <h4>Total :{totalprice()} </h4>
    </div>
   </div>
</div>
</Layout>
  )
}

export default Cart