import React from 'react'
import Layout from '../../component/layout/Layout'
import AdminMenu from '../../component/layout/AdminMenu'
import { useAuth } from "../../context/auth"

const Admindashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div class='container m-5 p-5'>
        <div class='grid grid-cols-6 gap-4'>
          <div class='col-start-1 col-end-3'>
            <AdminMenu />
          </div>
          <div class='col-span-3'>
            <div
              class="block w-full  rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
              <div
                class="border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50 dark:text-neutral-50">
              <span>Admin Name :</span>  {auth?.user?.name}
              </div>
              <ul class="w-full">
                <li
                  class="w-full border-b-2 border-neutral-100 border-opacity-100 px-4 py-3 dark:border-opacity-50">
              <span>Email :</span>  {auth?.user?.email}
                 
                </li>
                <li
                  class="w-full border-b-2 border-neutral-100 border-opacity-100 px-4 py-3 dark:border-opacity-50">
              <span>Phone Number :</span>  {auth?.user?.phone}
                 
                </li>
                <li class="w-full px-4 py-3 dark:border-opacity-50">
              <span>Address :</span>  {auth?.user?.address}
                  
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Admindashboard