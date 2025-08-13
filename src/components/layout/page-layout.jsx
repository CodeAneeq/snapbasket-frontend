import React from 'react'
import Navbar from '../navbar/navbar'
import Footer from '../footer/footer'

const PageLayout = ({children}) => {
  return (
    <>
    <Navbar></Navbar>
    {children}
    <Footer></Footer>
    </>
  )
}

export default PageLayout