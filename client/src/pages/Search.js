import React from 'react'
import Layout from '../component/layout/Layout'
import {useSearch} from "./../context/Search"
import {useNavigate} from 'react-router-dom'
const Search = () => {
    const navigate=useNavigate();
    const [values,setValues]=useSearch();
    console.log(values)
  return (
    <Layout title={"search result"}>
        <div>
            <div className='text-center'>
                <h1>Search Result</h1>
                <h6>{values?.results.length < 1 ? 'No product found':`found ${values ?.products.length}`}</h6>
                { values?.results.map((c) => (
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
                  data-te-ripple-color="light"
                  onClick={()=>navigate(`/productdetail/${c.slug}`)}>
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

export default Search