import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://localhost:44373/api/categories');
                const result = await response.json();

                if (result.success) {
                    // Filter main categories (those without parent)
                    const mainCategories = result.data.filter(cat => cat.parentId === null);

                    // For each main category, find its subcategories
                    const categoriesWithSubs = mainCategories.map(mainCat => {
                        return {
                            ...mainCat,
                            subcategories: result.data.filter(cat => cat.parentId === mainCat.categoryId)
                        };
                    });

                    setCategories(categoriesWithSubs);
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

    if (isLoading) {
        return <div className="text-center py-3">Loading navigation...</div>;
    }

    if (error) {
        return <div className="text-center py-3 text-danger">Error: {error}</div>;
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        {categories.map(category => (
                            <li key={category.categoryId} className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id={`${category.name.toLowerCase().replace(/\s+/g, '')}Dropdown`}
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {category.name}
                                </a>
                                <ul
                                    className="dropdown-menu"
                                    aria-labelledby={`${category.name.toLowerCase().replace(/\s+/g, '')}Dropdown`}
                                >
                                    {category.subcategories && category.subcategories.map(subcat => (
                                        <li key={subcat.categoryId}>
                                            <NavLink
                                                className="dropdown-item"
                                                to={`/${category.name.toLowerCase().replace(/\s+/g, '-')}/${subcat.name.toLowerCase().replace(/\s+/g, '-')}`}
                                            >
                                                {subcat.name}
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;