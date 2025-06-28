import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart, Share2, Check, X } from 'lucide-react';
import { getProductById } from '../data/products';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const product = getProductById(id || '');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  if (!product) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">Product Not Found</h2>
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            to="/products"
            className="inline-flex items-center text-stone-600 hover:text-amber-800 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <div className="aspect-square overflow-hidden rounded-lg mb-4">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                      selectedImage === index
                        ? 'border-amber-600'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-stone-800 mb-4">{product.name}</h1>
            
            <div className="flex items-center mb-6">
              <span className="text-3xl font-bold text-amber-800">${product.price}</span>
              <div className="ml-4 flex items-center">
                {product.inStock ? (
                  <div className="flex items-center text-green-600">
                    <Check className="h-5 w-5 mr-1" />
                    <span>In Stock</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600">
                    <X className="h-5 w-5 mr-1" />
                    <span>Out of Stock</span>
                  </div>
                )}
              </div>
            </div>

            <p className="text-stone-600 mb-6 leading-relaxed">{product.description}</p>

            <div className="border-t border-stone-200 pt-6 mb-6">
              <h3 className="font-semibold text-stone-800 mb-2">Product Details</h3>
              <p className="text-stone-600">{product.details}</p>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="font-medium text-stone-800">Quantity:</label>
                <div className="flex items-center border border-stone-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-stone-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-stone-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex-1 flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-colors ${
                    product.inStock
                      ? 'bg-amber-600 hover:bg-amber-700 text-white'
                      : 'bg-stone-300 text-stone-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
                
                <button className="px-4 py-3 border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors">
                  <Heart className="h-5 w-5" />
                </button>
                
                <button className="px-4 py-3 border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-8 space-y-4">
              <div className="border-t border-stone-200 pt-4">
                <h4 className="font-medium text-stone-800 mb-2">Care Instructions</h4>
                <p className="text-stone-600 text-sm">
                  Dust regularly with a soft cloth. For deeper cleaning, use a slightly damp cloth 
                  followed by immediate drying. Avoid harsh chemicals and excessive moisture.
                </p>
              </div>
              
              <div className="border-t border-stone-200 pt-4">
                <h4 className="font-medium text-stone-800 mb-2">Shipping Information</h4>
                <p className="text-stone-600 text-sm">
                  Carefully packaged and insured. Standard shipping takes 5-7 business days. 
                  Expedited shipping available at checkout.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;