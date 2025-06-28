import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Filter, Grid, List } from 'lucide-react';
import { products, getProductsByCategory } from '../data/products';
import { useCart } from '../context/CartContext';

const Products = () => {
  const { category } = useParams();
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { addItem } = useCart();

  const categoryMap: { [key: string]: string } = {
    'wood-carvings': 'wood-carvings',
    'sculptures': 'sculptures',
    'custom-work': 'custom-work',
    'tools-supplies': 'tools-supplies',
    'gifts': 'gifts'
  };

  const actualCategory = category ? categoryMap[category] || category : 'all';
  const filteredProducts = getProductsByCategory(actualCategory);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const getCategoryTitle = (cat: string) => {
    switch (cat) {
      case 'wood-carvings': return 'Wood Carvings';
      case 'sculptures': return 'Sculptures';
      case 'custom-work': return 'Custom Work';
      case 'tools-supplies': return 'Tools & Supplies';
      case 'gifts': return 'Gifts';
      default: return 'All Products';
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-stone-800 mb-4">
            {getCategoryTitle(actualCategory)}
          </h1>
          <p className="text-stone-600">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-amber-600 text-white'
                  : 'bg-white text-stone-600 hover:bg-stone-100'
              }`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-amber-600 text-white'
                  : 'bg-white text-stone-600 hover:bg-stone-100'
              }`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Products Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sortedProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <Link to={`/product/${product.id}`}>
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-semibold text-stone-800 mb-2 hover:text-amber-800 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-stone-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-amber-800">${product.price}</span>
                    <button
                      onClick={() => addItem(product)}
                      disabled={!product.inStock}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        product.inStock
                          ? 'bg-amber-600 hover:bg-amber-700 text-white'
                          : 'bg-stone-300 text-stone-500 cursor-not-allowed'
                      }`}
                    >
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {sortedProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row">
                  <Link to={`/product/${product.id}`} className="md:w-1/3">
                    <div className="aspect-square md:aspect-video overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>
                  <div className="p-6 md:w-2/3 flex flex-col justify-between">
                    <div>
                      <Link to={`/product/${product.id}`}>
                        <h3 className="text-xl font-semibold text-stone-800 mb-2 hover:text-amber-800 transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-stone-600 mb-4">
                        {product.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-amber-800">${product.price}</span>
                      <button
                        onClick={() => addItem(product)}
                        disabled={!product.inStock}
                        className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                          product.inStock
                            ? 'bg-amber-600 hover:bg-amber-700 text-white'
                            : 'bg-stone-300 text-stone-500 cursor-not-allowed'
                        }`}
                      >
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-stone-600 text-lg">No products found in this category.</p>
            <Link
              to="/products"
              className="inline-flex items-center mt-4 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors"
            >
              View All Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;