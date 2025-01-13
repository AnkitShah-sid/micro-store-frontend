import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Headere from './components/Headere';
import Footer from './components/Footer';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./App.css";

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
        {/* Header: Always displayed */}
        <Headere />
        

        {/* Main App Routes */}
        <Routes>
          {/* 🔑 Authentication Route */}
          {/* Example: http://localhost:3000 */}
          <Route path="/" element={<Login />} />

          {/* 🛠️ Admin Routes */}
          {/* Example: http://localhost:3000/admin */}
          <Route path="/admin" element={<AdminDashboard />} />

          {/* 🏬 Store Routes */}
          {/* Example: http://localhost:3000/store */}
          <Route path="/store" element={<StoreDashboard />} />

          {/* 🍳 Kitchen Routes */}
          {/* Example: http://localhost:3000/kitchen */}
          <Route path="/kitchen" element={<KitchenDashboard />} />
        </Routes>

        {/* Footer: Always displayed */}
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
