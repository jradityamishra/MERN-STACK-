import React from 'react'
import Layout from '../../component/layout/Layout'
import UserMenu from '../../component/layout/UserMenu'

const Profile = () => {
  return (
    <Layout title={'DashBoard-Profile'}>
         <div class='container m-5 p-5'>
        <div class='grid grid-cols-6 gap-4'>
          <div class='col-start-1 col-end-3'>
            <UserMenu />
          </div>
          <div class='col-span-3'>
           <h1>Profile</h1>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile