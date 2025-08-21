import React, { useState } from 'react';
import { mockProducts, mockOutlets, mockCategories } from '../data/mockData';
import { useProducts, useOutlets } from '../hooks/useApi';

const DemoPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Use the hooks that will automatically fall back to mock data
  const { data: products = [], isLoading: productsLoading } = useProducts({
    category: selectedCategory,
    search: searchQuery
  });
  
  const { data: outlets = [], isLoading: outletsLoading } = useOutlets();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Little Lanka Demo
          </h1>
          <p className="text-xl text-gray-600">
            This page demonstrates the mock data functionality when the backend is not connected.
          </p>
          <div className="mt-4 p-4 bg-blue-100 rounded-lg">
            <p className="text-blue-800">
              💡 <strong>Tip:</strong> The data you see below is coming from mock data. 
              When you connect your backend, it will automatically switch to real data!
            </p>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Search & Filter Products</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F4952C] focus:border-transparent"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F4952C] focus:border-transparent"
            >
              <option value="">All Categories</option>
              {mockCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Products ({products.length})
            {productsLoading && <span className="text-gray-500 ml-2">Loading...</span>}
          </h2>
          
          {products.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No products found matching your criteria.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <div key={product.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                  <div className="aspect-square bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Image: {product.productName}</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{product.productName}</h3>
                  <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-[#F4952C]">${product.price}</span>
                    <span className="text-sm text-gray-500">{product.category}</span>
                  </div>
                  <div className="flex items-center mt-2">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                    <span className="text-sm text-gray-500 ml-2">({product.reviews} reviews)</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Outlets Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Outlets ({outlets.length})
            {outletsLoading && <span className="text-gray-500 ml-2">Loading...</span>}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {outlets.map(outlet => (
              <div key={outlet.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-3 flex items-center justify-center">
                    <span className="text-gray-500 text-xs">Logo</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{outlet.outletName}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      outlet.status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {outlet.status}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 mb-2">{outlet.description}</p>
                <div className="text-sm text-gray-500 space-y-1">
                  <p>📍 {outlet.location}</p>
                  <p>📞 {outlet.phone}</p>
                  <p>🕒 {outlet.openingHours}</p>
                </div>
                <div className="flex items-center mt-3">
                  <span className="text-yellow-500">★</span>
                  <span className="text-sm text-gray-600 ml-1">{outlet.rating}</span>
                  <span className="text-sm text-gray-500 ml-2">({outlet.reviews} reviews)</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Configuration Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Configuration</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-100 rounded-lg">
              <h3 className="font-semibold mb-2">Environment Variables</h3>
              <p className="text-sm text-gray-600">
                <strong>VITE_API_BASE_URL:</strong> {import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1'}
              </p>
            </div>
            
            <div className="p-4 bg-blue-100 rounded-lg">
              <h3 className="font-semibold mb-2">How It Works</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• When you run the app, it tries to connect to your backend first</li>
                <li>• If the backend is not available, it automatically falls back to mock data</li>
                <li>• You can see this in the browser console with "Backend not available, using mock data"</li>
                <li>• Once you connect your backend, it will automatically switch to real data</li>
                <li>• No code changes needed - it's completely automatic!</li>
              </ul>
            </div>
            
            <div className="p-4 bg-green-100 rounded-lg">
              <h3 className="font-semibold mb-2">Benefits</h3>
              <ul className="text-sm text-green-800 space-y-1">
                <li>✅ Your website works immediately without backend setup</li>
                <li>✅ You can develop and test the frontend independently</li>
                <li>✅ Realistic data for UI development and testing</li>
                <li>✅ Seamless transition to real backend when ready</li>
                <li>✅ No need to modify components - they work with both mock and real data</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;
