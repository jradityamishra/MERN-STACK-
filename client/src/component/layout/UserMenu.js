import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
  return (
    <div>
    <h1 className='font-bold text-2xl underline'>User Dashboard</h1>
        <ul class="w-96">
  <li
    class="w-full border-b-2 border-neutral-100 border-opacity-100 py-4 dark:border-opacity-50">
    <NavLink to='/dashboard/user/profile'>Profile</NavLink>
  </li>
  <li
    class="w-full border-b-2 border-neutral-100 border-opacity-100 py-4 dark:border-opacity-50">
    <NavLink to='/dashboard/user/order'>Orders</NavLink>
  
  </li>
  
</ul>
    </div>
  )
}

export default UserMenu