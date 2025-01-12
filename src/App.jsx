import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Headere from './components/Headere';
import Footer from './components/Footer';
import Login from './components/Login';

// Admin Components
import AdminDashboard from './components/AdminDashboard';

// Store Components
import StoreDashboard from './components/StoreDashboard';

// Kitchen Components
import KitchenDashboard from './components/KitchenDashboard';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Headere />
        <Routes>
          {/* Root Route */}
          {/* http://localhost:3000 */}
          <Route path='/' element={<Login />} />

          {/* 🛠️ Admin Routes */}
          {/* http://localhost:3000/admin */}
          <Route path='/admin' element={<AdminDashboard />} />
          
          {/* 🏬 Store Routes */}
          {/* http://localhost:3000/store */}
          <Route path='/store' element={<StoreDashboard />} />
          

          {/* 🍳 Kitchen Routes */}
          {/* http://localhost:3000/kitchen */}
          <Route path='/kitchen' element={<KitchenDashboard />} />
          {/* http://localhost:3000/kitchen/add */}
         
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
