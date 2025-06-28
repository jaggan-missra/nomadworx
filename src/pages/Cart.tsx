import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import PaymentModal from '../components/PaymentModal';

const Cart = () => {
  const { items, total, updateQuantity, removeItem, clearCart } = useCart();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handlePaymentSuccess = () => {
    clearCart();
    alert('Payment successful! Thank you for your order. You will receive a confirmation email shortly.');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-16 w-16 text-stone-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-stone-800 mb-4">Your cart is empty</h2>
          <p className="text-stone-600 mb-8">Discover our beautiful handcrafted wood pieces</p>
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const taxAmount = total * 0.18; // 18% GST
  const finalTotal = total + taxAmount;

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-stone-800">Shopping Cart</h1>
          <Link
            to="/products"
            className="inline-flex items-center text-stone-600 hover:text-amber-800 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-stone-800">
                    Cart Items ({items.length})
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>

                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border border-stone-200 rounded-lg">
                      <Link to={`/product/${item.id}`} className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      </Link>
                      
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/product/${item.id}`}
                          className="text-lg font-semibold text-stone-800 hover:text-amber-800 transition-colors truncate block"
                        >
                          {item.name}
                        </Link>
                        <p className="text-stone-600">${item.price.toFixed(2)} each</p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 rounded-lg hover:bg-stone-100 transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded-lg hover:bg-stone-100 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-semibold text-stone-800">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-700 transition-colors mt-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-stone-800 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-stone-600">Subtotal</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">GST (18%)</span>
                  <span className="font-medium">${taxAmount.toFixed(2)}</span>
                </div>
                <div className="border-t border-stone-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-stone-800">Total (USD)</span>
                    <span className="text-lg font-semibold text-stone-800">
                      ${finalTotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-sm text-stone-600">Total (INR)</span>
                    <span className="text-sm text-stone-600">
                      ₹{(finalTotal * 83).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setIsPaymentModalOpen(true)}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors mb-4"
              >
                Proceed to Payment
              </button>
              
              <div className="text-center">
                <p className="text-stone-500 text-sm">
                  Secure checkout with multiple payment options
                </p>
              </div>

              {/* Payment Methods Preview */}
              <div className="mt-6 p-4 bg-stone-50 rounded-lg">
                <h3 className="font-semibold text-stone-800 mb-2">Accepted Payment Methods</h3>
                <div className="grid grid-cols-3 gap-2 text-xs text-stone-600">
                  <div>• Razorpay</div>
                  <div>• PayU</div>
                  <div>• CCAvenue</div>
                  <div>• BillDesk</div>
                  <div>• PhonePe</div>
                  <div>• UPI</div>
                  <div>• PayPal</div>
                  <div>• Credit Cards</div>
                  <div>• Net Banking</div>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="mt-4 p-4 bg-stone-50 rounded-lg">
                <h3 className="font-semibold text-stone-800 mb-2">Shipping Information</h3>
                <ul className="text-stone-600 text-sm space-y-1">
                  <li>• Free shipping on all orders</li>
                  <li>• Carefully packaged and insured</li>
                  <li>• 5-7 business days delivery</li>
                  <li>• Tracking information provided</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        total={finalTotal}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default Cart;