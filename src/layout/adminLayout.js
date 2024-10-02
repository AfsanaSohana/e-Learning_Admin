import React from 'react';
import Sidebar from './include/sidebar';
import Header from './include/header';
import Footer from './include/footer';


function AdminLayout({children}) {
  return (
    <div id="app">
      <Sidebar />
        <div class="content">
          <Header />
            <div class="container-fluid pt-4 px-4">
                <div class="row g-4">
                <main>{children}</main>
                </div>
                </div>
          <Footer />
        </div>
      </div>
  );
}

export default AdminLayout
