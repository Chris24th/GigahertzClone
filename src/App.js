import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import CategoryPage from './pages/CategoryPage';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Repair from './pages/Repair';

function App() {
  return (
    <Router>
      <Header />
      <Navigation />
      <div className="container my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/laptops/gaming" element={<CategoryPage title="Gaming Laptops" />} />
          <Route path="/laptops/mainstream" element={<CategoryPage title="Mainstream Laptops" />} />

          <Route path="/handheld/cellphones" element={<CategoryPage title="Cellphones" />} />
          <Route path="/handheld/tablets" element={<CategoryPage title="Tablets" />} />
          <Route path="/handheld/consoles" element={<CategoryPage title="Consoles" />} />

          <Route path="/desktops/gaming-entry" element={<CategoryPage title="Gaming Entry Regular" />} />
          <Route path="/desktops/mainstream-entry" element={<CategoryPage title="Mainstream Entry Regular" />} />

          <Route path="/network/wifi-routers" element={<CategoryPage title="Wi-Fi Routers" />} />
          <Route path="/network/home-mesh" element={<CategoryPage title="Home Mesh Wi-Fi" />} />
          <Route path="/network/desktop-switches" element={<CategoryPage title="Desktop Switches" />} />

          <Route path="/components/sodimm-ram" element={<CategoryPage title="SODIMM RAM" />} />
          <Route path="/components/solid-state-drives" element={<CategoryPage title="Solid State Drives" />} />

          <Route path="/brands/asus" element={<CategoryPage title="ASUS" />} />
          <Route path="/brands/acer" element={<CategoryPage title="Acer" />} />
          <Route path="/brands/lenovo" element={<CategoryPage title="Lenovo" />} />
          <Route path="/brands/msi" element={<CategoryPage title="MSI" />} />
          <Route path="/brands/dell" element={<CategoryPage title="Dell" />} />
          <Route path="/brands/hp" element={<CategoryPage title="HP" />} />
          <Route path="/brands/jisulife" element={<CategoryPage title="JisuLife" />} />
          <Route path="/brands/epson" element={<CategoryPage title="Epson" />} />
          <Route path="/brands/a4tech" element={<CategoryPage title="A4Tech" />} />
          <Route path="/brands/playstation" element={<CategoryPage title="PlayStation" />} />
          <Route path="/brands/logitech" element={<CategoryPage title="Logitech" />} />
          <Route path="/brands/aula" element={<CategoryPage title="Aula" />} />
          <Route path="/brands/huawei" element={<CategoryPage title="Huawei" />} />
          <Route path="/brands/xiaomi" element={<CategoryPage title="Xiaomi" />} />
          <Route path="/brands/samsung" element={<CategoryPage title="Samsung" />} />
          <Route path="/brands/gigahertz" element={<CategoryPage title="Gigahertz" />} />

          <Route path="/replacement-parts/lcd" element={<CategoryPage title="LCD Replacement Parts" />} />
          <Route path="/replacement-parts/io-board" element={<CategoryPage title="IO Board Replacement Parts" />} />
          <Route path="/replacement-parts/battery" element={<CategoryPage title="Battery Replacement Parts" />} />

          <Route path="/repair-and-service" element={<Repair />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;