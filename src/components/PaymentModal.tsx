import React, { useState } from 'react';
import { X, CreditCard, Smartphone, Building, Wallet } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  onPaymentSuccess: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, total, onPaymentSuccess }) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const paymentMethods = [
    {
      id: 'razorpay',
      name: 'Razorpay',
      description: 'Credit/Debit Cards, UPI, Net Banking',
      icon: <CreditCard className="h-6 w-6" />,
      color: 'bg-blue-600',
      category: 'cards'
    },
    {
      id: 'payu',
      name: 'PayU',
      description: 'All major payment methods',
      icon: <Building className="h-6 w-6" />,
      color: 'bg-green-600',
      category: 'cards'
    },
    {
      id: 'ccavenue',
      name: 'CCAvenue',
      description: 'Secure payment gateway',
      icon: <CreditCard className="h-6 w-6" />,
      color: 'bg-red-600',
      category: 'cards'
    },
    {
      id: 'easebuzz',
      name: 'Easebuzz',
      description: 'Fast & secure payments',
      icon: <CreditCard className="h-6 w-6" />,
      color: 'bg-purple-600',
      category: 'cards'
    },
    {
      id: 'billdesk',
      name: 'BillDesk',
      description: 'Net Banking & Cards',
      icon: <Building className="h-6 w-6" />,
      color: 'bg-orange-600',
      category: 'netbanking'
    },
    {
      id: 'phonepe',
      name: 'PhonePe',
      description: 'UPI & Digital Wallet',
      icon: <Smartphone className="h-6 w-6" />,
      color: 'bg-indigo-600',
      category: 'upi'
    },
    {
      id: 'paytm',
      name: 'Paytm',
      description: 'UPI, Wallet & More',
      icon: <Smartphone className="h-6 w-6" />,
      color: 'bg-blue-500',
      category: 'upi'
    },
    {
      id: 'gpay',
      name: 'Google Pay',
      description: 'UPI payments',
      icon: <Smartphone className="h-6 w-6" />,
      color: 'bg-red-500',
      category: 'upi'
    },
    {
      id: 'amazonpay',
      name: 'Amazon Pay',
      description: 'Amazon Wallet & UPI',
      icon: <Wallet className="h-6 w-6" />,
      color: 'bg-yellow-600',
      category: 'wallets'
    },
    {
      id: 'mobikwik',
      name: 'MobiKwik',
      description: 'Digital Wallet',
      icon: <Wallet className="h-6 w-6" />,
      color: 'bg-blue-400',
      category: 'wallets'
    },
    {
      id: 'freecharge',
      name: 'FreeCharge',
      description: 'Wallet & UPI',
      icon: <Wallet className="h-6 w-6" />,
      color: 'bg-green-500',
      category: 'wallets'
    },
    {
      id: 'upi_direct',
      name: 'UPI Direct',
      description: 'Pay directly via UPI',
      icon: <Smartphone className="h-6 w-6" />,
      color: 'bg-orange-600',
      category: 'upi'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'International payments',
      icon: <Wallet className="h-6 w-6" />,
      color: 'bg-blue-500',
      category: 'international'
    },
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Credit Cards & More',
      icon: <CreditCard className="h-6 w-6" />,
      color: 'bg-purple-500',
      category: 'international'
    }
  ];

  const handlePayment = async (method: string) => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, you would integrate with the actual payment gateway APIs
      switch (method) {
        case 'razorpay':
          await processRazorpayPayment();
          break;
        case 'payu':
          await processPayUPayment();
          break;
        case 'ccavenue':
          await processCCAvenuePayment();
          break;
        case 'easebuzz':
          await processEasebuzzPayment();
          break;
        case 'billdesk':
          await processBillDeskPayment();
          break;
        case 'phonepe':
          await processPhonePePayment();
          break;
        case 'paytm':
          await processPaytmPayment();
          break;
        case 'gpay':
          await processGooglePayPayment();
          break;
        case 'amazonpay':
          await processAmazonPayPayment();
          break;
        case 'mobikwik':
          await processMobiKwikPayment();
          break;
        case 'freecharge':
          await processFreeChargePayment();
          break;
        case 'upi_direct':
          await processUPIDirectPayment();
          break;
        case 'paypal':
          await processPayPalPayment();
          break;
        case 'stripe':
          await processStripePayment();
          break;
        default:
          throw new Error('Invalid payment method');
      }
      
      onPaymentSuccess();
      onClose();
    } catch (error) {
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Mock payment processing functions
  const processRazorpayPayment = async () => {
    console.log('Processing Razorpay payment...');
  };

  const processPayUPayment = async () => {
    console.log('Processing PayU payment...');
  };

  const processCCAvenuePayment = async () => {
    console.log('Processing CCAvenue payment...');
  };

  const processEasebuzzPayment = async () => {
    console.log('Processing Easebuzz payment...');
  };

  const processBillDeskPayment = async () => {
    console.log('Processing BillDesk payment...');
  };

  const processPhonePePayment = async () => {
    console.log('Processing PhonePe payment...');
  };

  const processPaytmPayment = async () => {
    console.log('Processing Paytm payment...');
  };

  const processGooglePayPayment = async () => {
    console.log('Processing Google Pay payment...');
  };

  const processAmazonPayPayment = async () => {
    console.log('Processing Amazon Pay payment...');
  };

  const processMobiKwikPayment = async () => {
    console.log('Processing MobiKwik payment...');
  };

  const processFreeChargePayment = async () => {
    console.log('Processing FreeCharge payment...');
  };

  const processUPIDirectPayment = async () => {
    console.log('Processing UPI Direct payment...');
  };

  const processPayPalPayment = async () => {
    console.log('Processing PayPal payment...');
  };

  const processStripePayment = async () => {
    console.log('Processing Stripe payment...');
  };

  const groupedMethods = paymentMethods.reduce((acc, method) => {
    if (!acc[method.category]) {
      acc[method.category] = [];
    }
    acc[method.category].push(method);
    return acc;
  }, {} as Record<string, typeof paymentMethods>);

  const categoryNames = {
    cards: 'Cards & General',
    upi: 'UPI Payments',
    wallets: 'Digital Wallets',
    netbanking: 'Net Banking',
    international: 'International'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-stone-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-stone-800">Choose Payment Method</h2>
            <button
              onClick={onClose}
              className="text-stone-400 hover:text-stone-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <p className="text-stone-600 mt-2">Total Amount: ₹{(total * 83).toFixed(2)}</p>
        </div>

        <div className="p-6">
          {Object.entries(groupedMethods).map(([category, methods]) => (
            <div key={category} className="mb-8">
              <h3 className="text-lg font-semibold text-stone-800 mb-4">
                {categoryNames[category as keyof typeof categoryNames]}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {methods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => handlePayment(method.id)}
                    disabled={isProcessing}
                    className={`p-4 border-2 rounded-lg transition-all hover:shadow-md ${
                      selectedMethod === method.id
                        ? 'border-amber-600 bg-amber-50'
                        : 'border-stone-200 hover:border-stone-300'
                    } ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg text-white ${method.color}`}>
                        {method.icon}
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-stone-800">{method.name}</h3>
                        <p className="text-stone-600 text-sm">{method.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}

          {isProcessing && (
            <div className="mt-6 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-amber-100 text-amber-800 rounded-lg">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-amber-800 mr-2"></div>
                Processing payment...
              </div>
            </div>
          )}

          <div className="mt-6 p-4 bg-stone-50 rounded-lg">
            <h3 className="font-semibold text-stone-800 mb-2">Secure Payment</h3>
            <ul className="text-stone-600 text-sm space-y-1">
              <li>• All payments are processed securely with 256-bit SSL encryption</li>
              <li>• Your card details and personal information are never stored</li>
              <li>• PCI DSS compliant payment processing</li>
              <li>• Multiple payment options for your convenience</li>
              <li>• Instant payment confirmation and receipt</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;