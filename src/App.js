import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import Repair from './pages/Repair';
import Login from './pages/Login';

function App() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://localhost:44373/api/categories');
        const result = await response.json();

        if (result.success) {
          setCategories(result.data);
        } else {
          setError(result.message || 'Failed to load categories');
        }
      } catch (err) {
        setError('Error connecting to the server');
        console.error('Error fetching categories:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Generate routes for all subcategories
  const generateCategoryRoutes = () => {
    if (!categories.length) return null;

    // Find parent categories
    const mainCategories = categories.filter(cat => cat.parentId === null);

    return mainCategories.flatMap(mainCat => {
      // Find subcategories for this main category
      const subcategories = categories.filter(cat => cat.parentId === mainCat.categoryId);

      return subcategories.map(subCat => {
        let baseRoute;

        // Handle special route cases
        if (mainCat.name === 'Handheld Devices') {
          baseRoute = 'handheld-devices';
        } else if (mainCat.name === 'Shop by Brands') {
          baseRoute = 'brands';
        } else if (mainCat.name === 'Replacement Parts') {
          baseRoute = 'replacement-parts';
        } else {
          baseRoute = mainCat.name.toLowerCase().replace(/\s+/g, '-');
        }

        const subRoute = subCat.name.toLowerCase().replace(/\s+/g, '-');
        const fullPath = `/${baseRoute}/${subRoute}`;

        return (
          <Route
            key={subCat.categoryId}
            path={fullPath}
            element={<CategoryPage title={subCat.name} categoryId={subCat.categoryId} />}
          />
        );
      });
    });
  };

  return (
    <Router>
      <Header />
      <Navigation />
      <div className="container my-4">
        {isLoading ? (
          <div className="text-center">Loading content...</div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
              <Routes>
                <Route path="/" element={<Home />} />
                {generateCategoryRoutes()}
                <Route path="/repair-and-service" element={<Repair />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<div className="text-center">Page not found</div>} />
              </Routes>
        )}
      </div>
      <Footer />
    </Router>
  );
}

export default App;