import React from 'react';
import { CreditCard, Smartphone, Building, Wallet } from 'lucide-react';

const PaymentMethods = () => {
  const methods = [
    {
      name: 'Cards & Banking',
      description: 'Credit/Debit Cards, Net Banking',
      icon: <CreditCard className="h-8 w-8" />,
      color: 'bg-blue-600',
      providers: ['Razorpay', 'PayU', 'CCAvenue', 'Easebuzz']
    },
    {
      name: 'UPI Payments',
      description: 'PhonePe, Paytm, Google Pay, UPI',
      icon: <Smartphone className="h-8 w-8" />,
      color: 'bg-green-600',
      providers: ['PhonePe', 'Paytm', 'Google Pay', 'UPI Direct']
    },
    {
      name: 'Digital Wallets',
      description: 'Amazon Pay, MobiKwik, FreeCharge',
      icon: <Wallet className="h-8 w-8" />,
      color: 'bg-purple-600',
      providers: ['Amazon Pay', 'MobiKwik', 'FreeCharge']
    },
    {
      name: 'International',
      description: 'PayPal, Stripe for global payments',
      icon: <Building className="h-8 w-8" />,
      color: 'bg-indigo-600',
      providers: ['PayPal', 'Stripe', 'Square']
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-stone-800 mb-4">Secure Payment Options</h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            We support multiple payment methods including UPI, digital wallets, cards, and international 
            payment gateways to make your shopping experience convenient and secure.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {methods.map((method, index) => (
            <div key={index} className="text-center p-6 rounded-lg border border-stone-200 hover:shadow-lg transition-shadow">
              <div className={`w-16 h-16 ${method.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white`}>
                {method.icon}
              </div>
              <h3 className="text-lg font-semibold text-stone-800 mb-2">{method.name}</h3>
              <p className="text-stone-600 text-sm mb-3">{method.description}</p>
              <div className="text-xs text-stone-500">
                {method.providers.join(' • ')}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-green-50 rounded-lg">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="font-semibold text-green-800 mb-2">SSL Secured</h4>
            <p className="text-green-700 text-sm">256-bit encryption for all transactions</p>
          </div>

          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="font-semibold text-blue-800 mb-2">PCI Compliant</h4>
            <p className="text-blue-700 text-sm">Industry standard security protocols</p>
          </div>

          <div className="text-center p-6 bg-purple-50 rounded-lg">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="font-semibold text-purple-800 mb-2">24/7 Support</h4>
            <p className="text-purple-700 text-sm">Round-the-clock payment assistance</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentMethods;