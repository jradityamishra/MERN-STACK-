import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Helmet} from 'react-helmet';
import { Toaster } from 'react-hot-toast';
const Layout = ({children,title,description,keyword,auther}) => {
  return (
   <div>
    <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keyword} />
                <meta name="author" content={auther} />
                <title>{title}</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
   <Header/>
     <main style={{minHeight:'70vh'}}>
      <Toaster/>   
        {children}
    </main>
    <Footer/>
   </div>
  )
}
Layout.defaultProps={
  title:'ecommerce app - sale season',
  description:'mern stack project',
  Keyword:'MERN(react,node,express,mongodb)',
  auther:'Assigner'
}
export default Layout