import React, { useState, useEffect } from 'react'
import Layout from '../../component/layout/Layout'
import AdminMenu from '../../component/layout/AdminMenu'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
const Products = () => {
    const [products, setProducts] = useState([]);

    //get all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get("/api/v1/product/get-product")
            setProducts(data.products);
            // if (data?.success) {

            //     toast.success(data.message)
            // }
            // else (toast.error(data.message))
        } catch (error) {
            console.log(error)
            toast.error("error in getting products")
        }
    }
    useEffect(() => {
        getAllProducts();
        console.log(products)
    }, [])
    return (
        <Layout title={"Dashboard-products"}>
            <div className="container m-5 p-5">
                <div class='grid grid-cols-6 gap-4'>
                    <div class='col-start-1 col-end-3'>
                        <AdminMenu />
                    </div>
                    <div class='col-span-3 flex flex-col justify-center'>
                        <h1 className='text-2xl font-bold underline  mx-10'>All Products List</h1>
                      {products.map((c)=>(
                        <>
                       <Link to={`/dashboard/admin/update-products/${c.slug}`}>
                       <div key={c._id} className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
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
                                               {c.description}
                                            </p>
                                            
                                        </div>
                                    </div>
                       </Link>
                        </>
                      ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Products