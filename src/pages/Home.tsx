import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Users, Award, Truck } from 'lucide-react';
import { getFeaturedProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import PaymentMethods from '../components/PaymentMethods';

const Home = () => {
  const featuredProducts = getFeaturedProducts();
  const { addItem } = useCart();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-900 via-amber-800 to-stone-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Handcrafted Wood Art
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-amber-100 max-w-3xl mx-auto">
              Discover unique, handmade wood carvings and sculptures created with traditional techniques 
              and modern artistry. Each piece tells a story of craftsmanship and natural beauty.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="inline-flex items-center px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors"
              >
                Shop Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-amber-800 font-semibold rounded-lg transition-colors"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Master Craftsmanship</h3>
              <p className="text-stone-600">Each piece is hand-carved by skilled artisans with decades of experience.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Custom Orders</h3>
              <p className="text-stone-600">Bring your vision to life with our custom carving services.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Premium Materials</h3>
              <p className="text-stone-600">We use only sustainably sourced, high-quality wood species.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Safe Shipping</h3>
              <p className="text-stone-600">Carefully packaged and insured shipping for your peace of mind.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-800 mb-4">Featured Pieces</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Discover our most popular and stunning wood carvings, each piece carefully selected 
              to showcase the beauty of handcrafted artistry.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
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
          
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors"
            >
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Payment Methods Section */}
      <PaymentMethods />

      {/* CTA Section */}
      <section className="py-16 bg-amber-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Collection?</h2>
          <p className="text-amber-100 text-lg mb-8 max-w-2xl mx-auto">
            Each piece is a unique work of art that will bring natural beauty and craftsmanship to your home. 
            Browse our collection or contact us for custom work.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="inline-flex items-center px-8 py-3 bg-white text-amber-800 hover:bg-amber-50 font-semibold rounded-lg transition-colors"
            >
              Browse Collection
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-amber-800 font-semibold rounded-lg transition-colors"
            >
              Custom Orders
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;