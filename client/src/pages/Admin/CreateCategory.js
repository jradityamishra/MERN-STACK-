import React, { useEffect, useState } from 'react'
import Layout from '../../component/layout/Layout'
import AdminMenu from '../../component/layout/AdminMenu'
import toast from 'react-hot-toast'
import axios from "axios"
const CreateCategory = () => {
  const [categories, setCategories] = useState([]);

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);
  return (
    <Layout title={'DashBoard-CreateCategory'}>
      <div class='container m-5 p-5'>
        <div class='grid grid-cols-6 gap-4'>
          <div class='col-start-1 col-end-3'>
            <AdminMenu />
          </div>
          <div class='col-span-3 flex flex-col justify-center'>
            <h1 className='text-2xl font-bold underline  mx-10'>Manage Category</h1>
            <div className='flex justify-center'>
              <div className="flex flex-col w-3/4">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                      <table className="min-w-full text-left text-sm font-light">
                        <thead className="border-b font-medium dark:border-neutral-500">
                          <tr>
                           
                            <th scope="col" className="px-6 py-4">Name</th>
                            <th scope="col" className="px-2 py-4">Action</th>
                          
                          </tr>
                        </thead>
                        <tbody>
                          
                           
                          {categories?.map((value)=>(
                           <>
                          <tr className="border-b dark:border-neutral-500">

                           <td key={value._id} class="whitespace-nowrap px-6 py-4">{value.name}</td>
                            <td><button className='bg-blue-600  px-5 py-2 rounded text-white font-semibold'>Edit</button></td>
                            </tr>  
                           </>
                          ))}
                           
                          
                         
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateCategory