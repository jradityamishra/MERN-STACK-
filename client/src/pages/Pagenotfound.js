import React from 'react'
import Layout from '../component/layout/Layout'
import {useNavigate} from 'react-router-dom'
import { Navigate } from 'react-router-dom';
const Pagenotfound = () => {
    const navigate=useNavigate();
  return (
    <Layout title={'404'}>
        <section class="bg-white dark:bg-gray-900 ">
    <div class="container flex items-center justify-center min-h-screen px-6 py-12 mx-auto">
        <div class="w-full ">
            <div class="flex flex-col items-center max-w-lg mx-auto text-center">
                <p class="text-4xl font-bold text-black-500 dark:text-blue-400 m-8">404 </p>
                <h1 class="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">We lost this page</h1>
                <p class="mt-4 text-gray-500 dark:text-gray-400">Oops ! Page Not Found</p>

                <div class="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
                   

                    <button onClick={()=>{navigate('/')}} class="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                        Take me home
                    </button>
                </div>
            </div>

           
        </div>
    </div>
</section>
    </Layout>
  )
}

export default Pagenotfound