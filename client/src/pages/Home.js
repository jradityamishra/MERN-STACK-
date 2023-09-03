import React, { useEffect, useState } from 'react'
import Layout from '../component/layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from "../context/auth"
import Products from './Admin/Products';
import {Checkbox,Radio, Select} from 'antd'
import { Prices}  from '../component/Prices';
const Home = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked,setChecked]=useState([]);
  const [radio,setRadio]=useState([]);


  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
     
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);
  //filter category
  const handleFilter=(value,id)=>{
    let all =[...checked]
    if(value){
      all.push(id);
    }
    else{
      all=all.filter((c)=>c !==id);
    }
    setChecked(all)
  }

  
  //get ALL PRODUCTS
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      if (data?.success) {
        toast.success(data.message)
        setProducts(data.products);

      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error)
      toast.error("error in getting in all products")
    }
  }
  useEffect(() => {
  if(!checked.length||!radio.length)  getAllProducts();
    
}, [checked.length, radio.length])
useEffect(()=>{
  if(checked.length || radio.length)filterProducts();
},[checked,radio])

  //FILTER PRODUCTS
  const filterProducts=async()=>{
    try{
      const {data}=await axios.post('/api/v1/product/product-filters',{checked,radio})
      setProducts(data?.products)
    }catch(error){
      console.log(error)}
  }
  
  
  return (
    <Layout title={'All Product-Best Offer'}>
      <div className="grid grid-col-8 gap-4">
        <div className='col-start-1 col-span-2  h-2'>
          <div className='flex flex-col justify-center m-5'>
           <h4> Filter By category</h4>
           <div className='flex flex-col mt-5'>
           
           {
            categories?.map(c=>(
              <Checkbox key={c.id} onChange={(e)=>handleFilter(e.target.checked,c._id)}>
                {c.name}
              </Checkbox>
            ))
           }
           </div>
           <h4> Filter By Price</h4>

           <div className='flex flex-col mt-5'>
            <Radio.Group onChange={e=>setRadio(e.target.value)}>
              {
                Prices?.map(p=>(
              <div key={p._id}>
              <Radio value={p.array}>{p.name}</Radio>
              </div>

                ))
              }
            </Radio.Group>
           </div>
           <div>
            <button className='px-3 py-2 bg-cyan-600 text-white rounded'
            onClick={()=>window.location.reload()}>RESET BUTTON</button>
           </div>
          </div>
        </div>
        <div className='col-start-3 col-span-2  h-2'>
        {JSON.stringify(radio,null,4)}
          <h1 className='text-center font-bold text-2xl underline m-3'>All Products</h1>
          <div className='flex flex-wrap '>
            <h1 className='text-xl'>Products</h1>
          </div>
          {products.map((c) => (
            <>
              <div key={c._id} className="block w-1/4 rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                <a href="#!">
                  <img className="rounded-t-lg"
                    src={`/api/v1/product/get-photo/${c._id}`}
                    alt={c.name} />
                </a>
                <div className="p-6">
                  <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                    {c.name}
                  </h5>
                  <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                    {c.description.substring(0,30)}...
                  </p>
                  <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                    {c.price}
                  </p>

                </div>
               <div className='flex justify-around'>
               <button
                  type="button"
                  class="inline-block m-2 rounded bg-blue-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  data-te-ripple-init
                  data-te-ripple-color="light">
                  Add to cart
                </button>
                <button
                  type="button"
                  class="inline-block m-2 rounded bg-green-500 px-3 pb-2 pt-2.5 text-xs font-sm uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  data-te-ripple-init
                  data-te-ripple-color="light">
                  More Details
                </button>
               </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Home