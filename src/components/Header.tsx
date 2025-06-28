import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, ChevronDown, Shield } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const { items } = useCart();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const categories = [
    'Wood Carvings',
    'Sculptures',
    'Custom Work',
    'Tools & Supplies',
    'Gifts'
  ];

  return (
    <header className="bg-white shadow-sm border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-amber-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">NW</span>
            </div>
            <span className="text-xl font-bold text-stone-800">NoMadWorx</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-stone-700 hover:text-amber-800 transition-colors">
              Home
            </Link>
            
            {/* Products Dropdown */}
            <div className="relative group">
              <button 
                className="flex items-center text-stone-700 hover:text-amber-800 transition-colors"
                onMouseEnter={() => setIsProductsOpen(true)}
                onMouseLeave={() => setIsProductsOpen(false)}
              >
                Products
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {isProductsOpen && (
                <div 
                  className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-stone-200 z-50"
                  onMouseEnter={() => setIsProductsOpen(true)}
                  onMouseLeave={() => setIsProductsOpen(false)}
                >
                  <div className="py-2">
                    <Link
                      to="/products"
                      className="block px-4 py-2 text-stone-700 hover:bg-stone-50 hover:text-amber-800 transition-colors"
                    >
                      All Products
                    </Link>
                    {categories.map((category) => (
                      <Link
                        key={category}
                        to={`/products/${category.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block px-4 py-2 text-stone-700 hover:bg-stone-50 hover:text-amber-800 transition-colors"
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link to="/blog" className="text-stone-700 hover:text-amber-800 transition-colors">
              Blog
            </Link>
            <Link to="/about" className="text-stone-700 hover:text-amber-800 transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-stone-700 hover:text-amber-800 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="text-stone-700 hover:text-amber-800 transition-colors">
              <Search className="h-5 w-5" />
            </button>
            
            <Link to="/cart" className="relative text-stone-700 hover:text-amber-800 transition-colors">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-800 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Admin Access */}
            <Link 
              to="/admin/login" 
              className="hidden md:flex items-center text-stone-700 hover:text-amber-800 transition-colors"
              title="Admin Login"
            >
              <Shield className="h-5 w-5" />
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-stone-700 hover:text-amber-800 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-stone-200">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-stone-700 hover:text-amber-800 transition-colors">
                Home
              </Link>
              <Link to="/products" className="text-stone-700 hover:text-amber-800 transition-colors">
                All Products
              </Link>
              {categories.map((category) => (
                <Link
                  key={category}
                  to={`/products/${category.toLowerCase().replace(/\s+/g, '-')}`}
                  className="pl-4 text-stone-600 hover:text-amber-800 transition-colors"
                >
                  {category}
                </Link>
              ))}
              <Link to="/blog" className="text-stone-700 hover:text-amber-800 transition-colors">
                Blog
              </Link>
              <Link to="/about" className="text-stone-700 hover:text-amber-800 transition-colors">
                About
              </Link>
              <Link to="/contact" className="text-stone-700 hover:text-amber-800 transition-colors">
                Contact
              </Link>
              <Link to="/admin/login" className="flex items-center text-stone-700 hover:text-amber-800 transition-colors">
                <Shield className="h-4 w-4 mr-2" />
                Admin Login
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;