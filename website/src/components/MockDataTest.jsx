import React from 'react';
import { mockProducts } from '../data/mockData';

const MockDataTest = () => {
  console.log('MockDataTest rendered');
  console.log('Mock products:', mockProducts);
  console.log('Mock products length:', mockProducts.length);
  
  return (
    <div className="p-4 bg-blue-100 border rounded">
      <h3 className="font-bold">Mock Data Test</h3>
      <p>Mock products loaded: {mockProducts.length}</p>
      <ul>
        {mockProducts.slice(0, 3).map(product => (
          <li key={product.id}>
            {product.productName} - ${product.price} - {product.category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MockDataTest;
