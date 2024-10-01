import React from 'react';
import Sidebar from './include/sidebar';
import Header from './include/header';
import Footer from './include/footer';





function AdminLayout({children}) {
  return (
    <div id="app">
      <Sidebar />
      <Header />
        <div id="main">    
            <main>{children}</main>
      <Footer />
        </div>
    </div>
  );
}

export default AdminLayout
