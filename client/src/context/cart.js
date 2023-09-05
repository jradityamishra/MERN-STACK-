import React ,{useState,useEffect,useContext,createContext} from 'react'

const CartContext=createContext();



const CartProvider=({children})=>{
    const [cart,setCart]=useState([])
    useEffect(()=>{
    let exisitingItems=localStorage.getItem("cart");
    if(exisitingItems) setCart(JSON.parse(exisitingItems))
    },[])
    
    return(
        <CartContext.Provider value={[cart,setCart]}>
            {children}
        </CartContext.Provider>
    )
}


//custom hook

const useCart=()=>useContext(CartContext)

export {useCart,CartProvider};