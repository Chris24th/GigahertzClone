
import React from 'react';

const CategoryPage = ({ title }) => (
    <section>
        <h2>{title}</h2>
        <div className="row">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="col-md-3 mb-4">
                    <div className="bg-secondary" style={{ height: '200px' }}></div>
                </div>
            ))}
        </div>
    </section>
);


export default CategoryPage;