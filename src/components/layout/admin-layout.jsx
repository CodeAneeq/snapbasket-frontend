import React from 'react'
import Navbar from '../navbar/navbar'
import Footer from '../footer/footer'
import PageLayout from './page-layout'
import Sidebar from '../sidebar/sidebar'

const AdminLayout = ({children}) => {
  return (
    <PageLayout>
        <div className='flex'>

        <Sidebar></Sidebar>
        {children}
        </div>
    </PageLayout>
  )
}

export default AdminLayout