import React from 'react'
import Layout from '../../component/layout/Layout'
import AdminMenu from '../../component/layout/AdminMenu'

const CreateProduct = () => {
  return (
    <Layout title={'DashBoard-CreateProduct'}>
         <div class='container m-5 p-5'>
        <div class='grid grid-cols-6 gap-4'>
          <div class='col-start-1 col-end-3'>
            <AdminMenu/>
          </div>
          <div class='col-span-3'>
          <h1>CreateProduct</h1>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateProduct