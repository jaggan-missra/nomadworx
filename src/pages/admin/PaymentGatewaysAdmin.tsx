import React, { useState } from 'react';
import { Save, Eye, EyeOff, Key, Globe, TestTube, CheckCircle, XCircle, Settings, Copy, AlertTriangle } from 'lucide-react';

interface PaymentGateway {
  id: string;
  name: string;
  displayName: string;
  description: string;
  logo: string;
  enabled: boolean;
  testMode: boolean;
  supportedCurrencies: string[];
  supportedCountries: string[];
  fees: {
    percentage: number;
    fixed: number;
    currency: string;
  };
  credentials: {
    [key: string]: {
      value: string;
      label: string;
      type: 'text' | 'password' | 'select' | 'textarea';
      required: boolean;
      placeholder?: string;
      options?: string[];
      helpText?: string;
    };
  };
  webhookUrl?: string;
  status: 'active' | 'inactive' | 'pending' | 'error';
  lastTested?: string;
  category: 'cards' | 'upi' | 'wallets' | 'netbanking' | 'international';
  features: string[];
}

const PaymentGatewaysAdmin = () => {
  const [showCredentials, setShowCredentials] = useState<{ [key: string]: boolean }>({});
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedGateway, setSelectedGateway] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState('all');

  const [gateways, setGateways] = useState<PaymentGateway[]>([
    {
      id: 'razorpay',
      name: 'razorpay',
      displayName: 'Razorpay',
      description: 'Leading payment gateway for India with support for UPI, cards, net banking, and wallets',
      logo: '🔷',
      enabled: true,
      testMode: false,
      supportedCurrencies: ['INR', 'USD'],
      supportedCountries: ['IN', 'US', 'MY', 'SG'],
      fees: { percentage: 2.0, fixed: 0, currency: 'INR' },
      category: 'cards',
      features: ['UPI', 'Cards', 'Net Banking', 'Wallets', 'EMI', 'International Cards'],
      credentials: {
        keyId: {
          value: '',
          label: 'Key ID',
          type: 'text',
          required: true,
          placeholder: 'rzp_test_xxxxxxxxxx',
          helpText: 'Get this from Razorpay Dashboard > Settings > API Keys'
        },
        keySecret: {
          value: '',
          label: 'Key Secret',
          type: 'password',
          required: true,
          placeholder: 'Your secret key',
          helpText: 'Keep this secret and never share publicly'
        },
        webhookSecret: {
          value: '',
          label: 'Webhook Secret',
          type: 'password',
          required: false,
          placeholder: 'Webhook secret for verification',
          helpText: 'Used to verify webhook authenticity'
        }
      },
      webhookUrl: 'https://nomadworx.com/api/webhooks/razorpay',
      status: 'active',
      lastTested: '2024-01-15T10:30:00Z'
    },
    {
      id: 'payu',
      name: 'payu',
      displayName: 'PayU',
      description: 'Comprehensive payment solution with global reach and local expertise',
      logo: '💳',
      enabled: true,
      testMode: false,
      supportedCurrencies: ['INR', 'USD', 'EUR'],
      supportedCountries: ['IN', 'US', 'PL', 'TR', 'AR'],
      fees: { percentage: 2.3, fixed: 0, currency: 'INR' },
      category: 'cards',
      features: ['Cards', 'Net Banking', 'UPI', 'Wallets', 'EMI'],
      credentials: {
        merchantId: {
          value: '',
          label: 'Merchant ID',
          type: 'text',
          required: true,
          placeholder: 'Your merchant ID',
          helpText: 'Provided by PayU during onboarding'
        },
        merchantKey: {
          value: '',
          label: 'Merchant Key',
          type: 'password',
          required: true,
          placeholder: 'Your merchant key',
          helpText: 'Secret key for API authentication'
        },
        salt: {
          value: '',
          label: 'Salt',
          type: 'password',
          required: true,
          placeholder: 'Salt for hash generation',
          helpText: 'Used for generating secure hashes'
        },
        environment: {
          value: 'production',
          label: 'Environment',
          type: 'select',
          required: true,
          options: ['test', 'production'],
          helpText: 'Select test for development, production for live'
        }
      },
      webhookUrl: 'https://nomadworx.com/api/webhooks/payu',
      status: 'active',
      lastTested: '2024-01-14T15:45:00Z'
    },
    {
      id: 'ccavenue',
      name: 'ccavenue',
      displayName: 'CCAvenue',
      description: 'India\'s first payment aggregator with comprehensive payment solutions',
      logo: '🏦',
      enabled: true,
      testMode: true,
      supportedCurrencies: ['INR'],
      supportedCountries: ['IN'],
      fees: { percentage: 2.5, fixed: 0, currency: 'INR' },
      category: 'cards',
      features: ['Cards', 'Net Banking', 'UPI', 'Wallets', 'EMI', 'Cash Cards'],
      credentials: {
        merchantId: {
          value: '',
          label: 'Merchant ID',
          type: 'text',
          required: true,
          placeholder: 'Your merchant ID',
          helpText: 'Unique identifier provided by CCAvenue'
        },
        accessCode: {
          value: '',
          label: 'Access Code',
          type: 'text',
          required: true,
          placeholder: 'Access code',
          helpText: 'Access code for API integration'
        },
        workingKey: {
          value: '',
          label: 'Working Key',
          type: 'password',
          required: true,
          placeholder: 'Working key for encryption',
          helpText: 'Used for encrypting transaction data'
        }
      },
      webhookUrl: 'https://nomadworx.com/api/webhooks/ccavenue',
      status: 'pending',
      lastTested: '2024-01-13T09:20:00Z'
    },
    {
      id: 'easebuzz',
      name: 'easebuzz',
      displayName: 'Easebuzz',
      description: 'Complete payment solution with instant settlements and competitive pricing',
      logo: '⚡',
      enabled: false,
      testMode: true,
      supportedCurrencies: ['INR'],
      supportedCountries: ['IN'],
      fees: { percentage: 1.75, fixed: 0, currency: 'INR' },
      category: 'cards',
      features: ['Cards', 'Net Banking', 'UPI', 'Wallets', 'EMI', 'Instant Settlement'],
      credentials: {
        merchantKey: {
          value: '',
          label: 'Merchant Key',
          type: 'text',
          required: true,
          placeholder: 'Your merchant key',
          helpText: 'Unique merchant identifier from Easebuzz'
        },
        salt: {
          value: '',
          label: 'Salt',
          type: 'password',
          required: true,
          placeholder: 'Salt for hash generation',
          helpText: 'Secret salt for secure hash generation'
        },
        environment: {
          value: 'test',
          label: 'Environment',
          type: 'select',
          required: true,
          options: ['test', 'production'],
          helpText: 'Environment for API calls'
        },
        subMerchantId: {
          value: '',
          label: 'Sub Merchant ID',
          type: 'text',
          required: false,
          placeholder: 'Sub merchant ID (optional)',
          helpText: 'For marketplace/aggregator models'
        }
      },
      webhookUrl: 'https://nomadworx.com/api/webhooks/easebuzz',
      status: 'inactive'
    },
    {
      id: 'billdesk',
      name: 'billdesk',
      displayName: 'BillDesk',
      description: 'Trusted payment gateway with strong focus on security and reliability',
      logo: '💼',
      enabled: false,
      testMode: true,
      supportedCurrencies: ['INR'],
      supportedCountries: ['IN'],
      fees: { percentage: 1.8, fixed: 0, currency: 'INR' },
      category: 'netbanking',
      features: ['Net Banking', 'Cards', 'UPI', 'Wallets'],
      credentials: {
        merchantId: {
          value: '',
          label: 'Merchant ID',
          type: 'text',
          required: true,
          placeholder: 'Your merchant ID',
          helpText: 'Merchant identifier from BillDesk'
        },
        securityId: {
          value: '',
          label: 'Security ID',
          type: 'text',
          required: true,
          placeholder: 'Security ID',
          helpText: 'Security identifier for authentication'
        },
        checksum: {
          value: '',
          label: 'Checksum Key',
          type: 'password',
          required: true,
          placeholder: 'Checksum key',
          helpText: 'Key for generating checksums'
        }
      },
      webhookUrl: 'https://nomadworx.com/api/webhooks/billdesk',
      status: 'inactive'
    },
    {
      id: 'phonepe',
      name: 'phonepe',
      displayName: 'PhonePe',
      description: 'Digital payments platform with UPI and wallet integration',
      logo: '📱',
      enabled: true,
      testMode: false,
      supportedCurrencies: ['INR'],
      supportedCountries: ['IN'],
      fees: { percentage: 1.5, fixed: 0, currency: 'INR' },
      category: 'upi',
      features: ['UPI', 'PhonePe Wallet', 'QR Code', 'Intent Flow'],
      credentials: {
        merchantId: {
          value: '',
          label: 'Merchant ID',
          type: 'text',
          required: true,
          placeholder: 'Your merchant ID',
          helpText: 'Merchant ID from PhonePe Business'
        },
        saltKey: {
          value: '',
          label: 'Salt Key',
          type: 'password',
          required: true,
          placeholder: 'Salt key for API',
          helpText: 'Salt key for API authentication'
        },
        saltIndex: {
          value: '',
          label: 'Salt Index',
          type: 'text',
          required: true,
          placeholder: 'Salt index',
          helpText: 'Index of the salt key'
        }
      },
      webhookUrl: 'https://nomadworx.com/api/webhooks/phonepe',
      status: 'active',
      lastTested: '2024-01-15T14:20:00Z'
    },
    {
      id: 'paytm',
      name: 'paytm',
      displayName: 'Paytm',
      description: 'Leading digital payments and financial services platform',
      logo: '💙',
      enabled: false,
      testMode: true,
      supportedCurrencies: ['INR'],
      supportedCountries: ['IN'],
      fees: { percentage: 1.8, fixed: 0, currency: 'INR' },
      category: 'upi',
      features: ['UPI', 'Paytm Wallet', 'Cards', 'Net Banking', 'Postpaid'],
      credentials: {
        merchantId: {
          value: '',
          label: 'Merchant ID',
          type: 'text',
          required: true,
          placeholder: 'Your merchant ID',
          helpText: 'Merchant ID from Paytm Business'
        },
        merchantKey: {
          value: '',
          label: 'Merchant Key',
          type: 'password',
          required: true,
          placeholder: 'Merchant key',
          helpText: 'Secret key for API calls'
        },
        website: {
          value: '',
          label: 'Website',
          type: 'text',
          required: true,
          placeholder: 'Website identifier',
          helpText: 'Website identifier from Paytm'
        },
        industryType: {
          value: '',
          label: 'Industry Type',
          type: 'text',
          required: true,
          placeholder: 'Industry type',
          helpText: 'Industry type code from Paytm'
        }
      },
      webhookUrl: 'https://nomadworx.com/api/webhooks/paytm',
      status: 'inactive'
    },
    {
      id: 'gpay_business',
      name: 'gpay_business',
      displayName: 'Google Pay for Business',
      description: 'Google Pay integration for UPI and digital payments',
      logo: '🔴',
      enabled: false,
      testMode: true,
      supportedCurrencies: ['INR'],
      supportedCountries: ['IN'],
      fees: { percentage: 0.0, fixed: 0, currency: 'INR' },
      category: 'upi',
      features: ['UPI', 'QR Code', 'Intent Flow', 'Deep Linking'],
      credentials: {
        merchantId: {
          value: '',
          label: 'Merchant ID',
          type: 'text',
          required: true,
          placeholder: 'Google Pay merchant ID',
          helpText: 'Merchant ID from Google Pay Business'
        },
        merchantName: {
          value: '',
          label: 'Merchant Name',
          type: 'text',
          required: true,
          placeholder: 'Business name',
          helpText: 'Your business name as registered'
        },
        vpa: {
          value: '',
          label: 'VPA (Virtual Payment Address)',
          type: 'text',
          required: true,
          placeholder: 'merchant@payu',
          helpText: 'Your UPI VPA for receiving payments'
        }
      },
      webhookUrl: 'https://nomadworx.com/api/webhooks/gpay',
      status: 'inactive'
    },
    {
      id: 'amazonpay',
      name: 'amazonpay',
      displayName: 'Amazon Pay',
      description: 'Amazon Pay for seamless checkout experience',
      logo: '🟠',
      enabled: false,
      testMode: true,
      supportedCurrencies: ['INR', 'USD'],
      supportedCountries: ['IN', 'US', 'UK', 'DE', 'JP'],
      fees: { percentage: 2.9, fixed: 0, currency: 'INR' },
      category: 'wallets',
      features: ['Amazon Wallet', 'UPI', 'Cards', 'EMI'],
      credentials: {
        sellerId: {
          value: '',
          label: 'Seller ID',
          type: 'text',
          required: true,
          placeholder: 'Amazon seller ID',
          helpText: 'Your Amazon seller/merchant ID'
        },
        accessKey: {
          value: '',
          label: 'Access Key',
          type: 'text',
          required: true,
          placeholder: 'Access key',
          helpText: 'Access key from Amazon Pay'
        },
        secretKey: {
          value: '',
          label: 'Secret Key',
          type: 'password',
          required: true,
          placeholder: 'Secret key',
          helpText: 'Secret key for API authentication'
        },
        region: {
          value: 'IN',
          label: 'Region',
          type: 'select',
          required: true,
          options: ['IN', 'US', 'UK', 'DE', 'JP'],
          helpText: 'Amazon Pay region'
        }
      },
      webhookUrl: 'https://nomadworx.com/api/webhooks/amazonpay',
      status: 'inactive'
    },
    {
      id: 'mobikwik',
      name: 'mobikwik',
      displayName: 'MobiKwik',
      description: 'Digital wallet and payment gateway solution',
      logo: '🔵',
      enabled: false,
      testMode: true,
      supportedCurrencies: ['INR'],
      supportedCountries: ['IN'],
      fees: { percentage: 2.0, fixed: 0, currency: 'INR' },
      category: 'wallets',
      features: ['MobiKwik Wallet', 'UPI', 'Cards', 'Net Banking'],
      credentials: {
        merchantId: {
          value: '',
          label: 'Merchant ID',
          type: 'text',
          required: true,
          placeholder: 'MobiKwik merchant ID',
          helpText: 'Merchant ID from MobiKwik'
        },
        secretKey: {
          value: '',
          label: 'Secret Key',
          type: 'password',
          required: true,
          placeholder: 'Secret key',
          helpText: 'Secret key for API calls'
        },
        checksumKey: {
          value: '',
          label: 'Checksum Key',
          type: 'password',
          required: true,
          placeholder: 'Checksum key',
          helpText: 'Key for generating checksums'
        }
      },
      webhookUrl: 'https://nomadworx.com/api/webhooks/mobikwik',
      status: 'inactive'
    },
    {
      id: 'freecharge',
      name: 'freecharge',
      displayName: 'FreeCharge',
      description: 'Digital wallet and UPI payment solution',
      logo: '🟢',
      enabled: false,
      testMode: true,
      supportedCurrencies: ['INR'],
      supportedCountries: ['IN'],
      fees: { percentage: 1.9, fixed: 0, currency: 'INR' },
      category: 'wallets',
      features: ['FreeCharge Wallet', 'UPI', 'Cards'],
      credentials: {
        merchantId: {
          value: '',
          label: 'Merchant ID',
          type: 'text',
          required: true,
          placeholder: 'FreeCharge merchant ID',
          helpText: 'Merchant ID from FreeCharge'
        },
        secretKey: {
          value: '',
          label: 'Secret Key',
          type: 'password',
          required: true,
          placeholder: 'Secret key',
          helpText: 'Secret key for authentication'
        }
      },
      webhookUrl: 'https://nomadworx.com/api/webhooks/freecharge',
      status: 'inactive'
    },
    {
      id: 'paypal',
      name: 'paypal',
      displayName: 'PayPal',
      description: 'Global payment platform for international transactions',
      logo: '🌐',
      enabled: true,
      testMode: true,
      supportedCurrencies: ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY'],
      supportedCountries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'IT', 'ES'],
      fees: { percentage: 2.9, fixed: 0.30, currency: 'USD' },
      category: 'international',
      features: ['PayPal Wallet', 'Credit Cards', 'Bank Transfer', 'Buy Now Pay Later'],
      credentials: {
        clientId: {
          value: '',
          label: 'Client ID',
          type: 'text',
          required: true,
          placeholder: 'PayPal client ID',
          helpText: 'Client ID from PayPal Developer Dashboard'
        },
        clientSecret: {
          value: '',
          label: 'Client Secret',
          type: 'password',
          required: true,
          placeholder: 'PayPal client secret',
          helpText: 'Client secret for API authentication'
        },
        environment: {
          value: 'sandbox',
          label: 'Environment',
          type: 'select',
          required: true,
          options: ['sandbox', 'live'],
          helpText: 'PayPal environment'
        }
      },
      webhookUrl: 'https://nomadworx.com/api/webhooks/paypal',
      status: 'active',
      lastTested: '2024-01-15T11:15:00Z'
    },
    {
      id: 'stripe',
      name: 'stripe',
      displayName: 'Stripe',
      description: 'Advanced payment infrastructure for global businesses',
      logo: '⚡',
      enabled: false,
      testMode: true,
      supportedCurrencies: ['USD', 'EUR', 'GBP', 'INR', 'CAD', 'AUD'],
      supportedCountries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'IT', 'ES', 'IN'],
      fees: { percentage: 2.9, fixed: 0.30, currency: 'USD' },
      category: 'international',
      features: ['Credit Cards', 'Bank Transfer', 'Digital Wallets', 'Subscriptions', 'Connect'],
      credentials: {
        publishableKey: {
          value: '',
          label: 'Publishable Key',
          type: 'text',
          required: true,
          placeholder: 'pk_test_...',
          helpText: 'Publishable key for client-side integration'
        },
        secretKey: {
          value: '',
          label: 'Secret Key',
          type: 'password',
          required: true,
          placeholder: 'sk_test_...',
          helpText: 'Secret key for server-side API calls'
        },
        webhookSecret: {
          value: '',
          label: 'Webhook Secret',
          type: 'password',
          required: false,
          placeholder: 'whsec_...',
          helpText: 'Webhook endpoint secret for verification'
        }
      },
      webhookUrl: 'https://nomadworx.com/api/webhooks/stripe',
      status: 'inactive'
    },
    {
      id: 'square',
      name: 'square',
      displayName: 'Square',
      description: 'Payment processing for businesses of all sizes',
      logo: '⬜',
      enabled: false,
      testMode: true,
      supportedCurrencies: ['USD', 'CAD', 'GBP', 'AUD', 'JPY'],
      supportedCountries: ['US', 'CA', 'GB', 'AU', 'JP'],
      fees: { percentage: 2.6, fixed: 0.10, currency: 'USD' },
      category: 'international',
      features: ['Credit Cards', 'Digital Wallets', 'In-Person Payments', 'Invoicing'],
      credentials: {
        applicationId: {
          value: '',
          label: 'Application ID',
          type: 'text',
          required: true,
          placeholder: 'Square application ID',
          helpText: 'Application ID from Square Developer Dashboard'
        },
        accessToken: {
          value: '',
          label: 'Access Token',
          type: 'password',
          required: true,
          placeholder: 'Access token',
          helpText: 'Access token for API authentication'
        },
        environment: {
          value: 'sandbox',
          label: 'Environment',
          type: 'select',
          required: true,
          options: ['sandbox', 'production'],
          helpText: 'Square environment'
        }
      },
      webhookUrl: 'https://nomadworx.com/api/webhooks/square',
      status: 'inactive'
    }
  ]);

  const handleCredentialChange = (gatewayId: string, credentialKey: string, value: string) => {
    setGateways(gateways.map(gateway => 
      gateway.id === gatewayId 
        ? {
            ...gateway,
            credentials: {
              ...gateway.credentials,
              [credentialKey]: {
                ...gateway.credentials[credentialKey],
                value
              }
            }
          }
        : gateway
    ));
  };

  const handleToggleGateway = (gatewayId: string) => {
    setGateways(gateways.map(gateway => 
      gateway.id === gatewayId 
        ? { ...gateway, enabled: !gateway.enabled }
        : gateway
    ));
  };

  const handleToggleTestMode = (gatewayId: string) => {
    setGateways(gateways.map(gateway => 
      gateway.id === gatewayId 
        ? { ...gateway, testMode: !gateway.testMode }
        : gateway
    ));
  };

  const handleTestConnection = async (gatewayId: string) => {
    // Simulate API test
    setGateways(gateways.map(gateway => 
      gateway.id === gatewayId 
        ? { 
            ...gateway, 
            status: 'pending',
            lastTested: new Date().toISOString()
          }
        : gateway
    ));

    // Simulate test result after 2 seconds
    setTimeout(() => {
      setGateways(prev => prev.map(gateway => 
        gateway.id === gatewayId 
          ? { 
              ...gateway, 
              status: Math.random() > 0.2 ? 'active' : 'error'
            }
          : gateway
      ));
    }, 2000);
  };

  const handleSaveSettings = () => {
    // Save settings to backend
    alert('Payment gateway settings saved successfully!');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'inactive': return <XCircle className="h-5 w-5 text-red-500" />;
      case 'pending': return <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-amber-500"></div>;
      case 'error': return <XCircle className="h-5 w-5 text-red-500" />;
      default: return <XCircle className="h-5 w-5 text-stone-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-amber-100 text-amber-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-stone-100 text-stone-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'cards': return 'bg-blue-100 text-blue-800';
      case 'upi': return 'bg-green-100 text-green-800';
      case 'wallets': return 'bg-purple-100 text-purple-800';
      case 'netbanking': return 'bg-orange-100 text-orange-800';
      case 'international': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-stone-100 text-stone-800';
    }
  };

  const filteredGateways = categoryFilter === 'all' 
    ? gateways 
    : gateways.filter(g => g.category === categoryFilter);

  const enabledGateways = gateways.filter(g => g.enabled);
  const totalTransactionFees = enabledGateways.length > 0 
    ? enabledGateways.reduce((sum, g) => sum + g.fees.percentage, 0) / enabledGateways.length 
    : 0;

  const categories = [
    { id: 'all', name: 'All Gateways', count: gateways.length },
    { id: 'cards', name: 'Cards & General', count: gateways.filter(g => g.category === 'cards').length },
    { id: 'upi', name: 'UPI Providers', count: gateways.filter(g => g.category === 'upi').length },
    { id: 'wallets', name: 'Digital Wallets', count: gateways.filter(g => g.category === 'wallets').length },
    { id: 'netbanking', name: 'Net Banking', count: gateways.filter(g => g.category === 'netbanking').length },
    { id: 'international', name: 'International', count: gateways.filter(g => g.category === 'international').length }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-800">Payment Gateways</h1>
          <p className="text-stone-600">Configure and manage payment gateway integrations</p>
        </div>
        <button
          onClick={handleSaveSettings}
          className="flex items-center px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors"
        >
          <Save className="h-5 w-5 mr-2" />
          Save All Settings
        </button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-stone-600 text-sm">Total Gateways</p>
          <p className="text-2xl font-bold text-stone-800">{gateways.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-stone-600 text-sm">Active Gateways</p>
          <p className="text-2xl font-bold text-green-600">{enabledGateways.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-stone-600 text-sm">Test Mode</p>
          <p className="text-2xl font-bold text-amber-600">
            {gateways.filter(g => g.enabled && g.testMode).length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-stone-600 text-sm">Avg. Fees</p>
          <p className="text-2xl font-bold text-blue-600">
            {totalTransactionFees.toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setCategoryFilter(category.id)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                categoryFilter === category.id
                  ? 'bg-amber-600 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-stone-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-amber-500 text-amber-600'
                  : 'border-transparent text-stone-500 hover:text-stone-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('configuration')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'configuration'
                  ? 'border-amber-500 text-amber-600'
                  : 'border-transparent text-stone-500 hover:text-stone-700'
              }`}
            >
              Configuration
            </button>
            <button
              onClick={() => setActiveTab('webhooks')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'webhooks'
                  ? 'border-amber-500 text-amber-600'
                  : 'border-transparent text-stone-500 hover:text-stone-700'
              }`}
            >
              Webhooks
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGateways.map((gateway) => (
                  <div key={gateway.id} className="border border-stone-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{gateway.logo}</span>
                        <div>
                          <h3 className="font-semibold text-stone-800">{gateway.displayName}</h3>
                          <p className="text-stone-500 text-sm">{gateway.fees.percentage}% + {gateway.fees.fixed} {gateway.fees.currency}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(gateway.status)}
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={gateway.enabled}
                            onChange={() => handleToggleGateway(gateway.id)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                        </label>
                      </div>
                    </div>
                    
                    <p className="text-stone-600 text-sm mb-4">{gateway.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-stone-500">Status:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(gateway.status)}`}>
                          {gateway.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-stone-500">Category:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(gateway.category)}`}>
                          {gateway.category}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-stone-500">Mode:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          gateway.testMode ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {gateway.testMode ? 'Test' : 'Live'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-stone-500">Features:</span>
                        <span className="text-stone-800 text-xs">{gateway.features.slice(0, 2).join(', ')}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedGateway(gateway.id)}
                        className="flex-1 px-3 py-2 bg-amber-100 text-amber-800 hover:bg-amber-200 rounded-lg transition-colors text-sm font-medium"
                      >
                        <Settings className="h-4 w-4 inline mr-1" />
                        Configure
                      </button>
                      <button
                        onClick={() => handleTestConnection(gateway.id)}
                        disabled={!gateway.enabled}
                        className="px-3 py-2 bg-blue-100 text-blue-800 hover:bg-blue-200 disabled:bg-stone-100 disabled:text-stone-400 rounded-lg transition-colors text-sm font-medium"
                      >
                        <TestTube className="h-4 w-4 inline mr-1" />
                        Test
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Configuration Tab */}
          {activeTab === 'configuration' && (
            <div className="space-y-6">
              {selectedGateway ? (
                <div>
                  {(() => {
                    const gateway = gateways.find(g => g.id === selectedGateway);
                    if (!gateway) return null;

                    return (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{gateway.logo}</span>
                            <div>
                              <h2 className="text-xl font-bold text-stone-800">{gateway.displayName} Configuration</h2>
                              <p className="text-stone-600">{gateway.description}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => setSelectedGateway(null)}
                            className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-700 rounded-lg transition-colors"
                          >
                            Back to Overview
                          </button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <h3 className="font-semibold text-stone-800">API Credentials</h3>
                            {Object.entries(gateway.credentials).map(([key, credential]) => (
                              <div key={key}>
                                <label className="block text-sm font-medium text-stone-700 mb-2">
                                  {credential.label}
                                  {credential.required && <span className="text-red-500 ml-1">*</span>}
                                </label>
                                {credential.type === 'select' ? (
                                  <select
                                    value={credential.value}
                                    onChange={(e) => handleCredentialChange(gateway.id, key, e.target.value)}
                                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                                  >
                                    {credential.options?.map(option => (
                                      <option key={option} value={option}>{option}</option>
                                    ))}
                                  </select>
                                ) : credential.type === 'textarea' ? (
                                  <textarea
                                    value={credential.value}
                                    onChange={(e) => handleCredentialChange(gateway.id, key, e.target.value)}
                                    placeholder={credential.placeholder}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                                  />
                                ) : (
                                  <div className="relative">
                                    <input
                                      type={credential.type === 'password' && !showCredentials[`${gateway.id}-${key}`] ? 'password' : 'text'}
                                      value={credential.value}
                                      onChange={(e) => handleCredentialChange(gateway.id, key, e.target.value)}
                                      placeholder={credential.placeholder}
                                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    />
                                    {credential.type === 'password' && (
                                      <button
                                        type="button"
                                        onClick={() => setShowCredentials({
                                          ...showCredentials,
                                          [`${gateway.id}-${key}`]: !showCredentials[`${gateway.id}-${key}`]
                                        })}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-400 hover:text-stone-600"
                                      >
                                        {showCredentials[`${gateway.id}-${key}`] ? 
                                          <EyeOff className="h-4 w-4" /> : 
                                          <Eye className="h-4 w-4" />
                                        }
                                      </button>
                                    )}
                                  </div>
                                )}
                                {credential.helpText && (
                                  <p className="text-xs text-stone-500 mt-1">{credential.helpText}</p>
                                )}
                              </div>
                            ))}
                          </div>

                          <div className="space-y-4">
                            <h3 className="font-semibold text-stone-800">Gateway Settings</h3>
                            
                            <div className="flex items-center justify-between p-4 bg-stone-50 rounded-lg">
                              <div>
                                <h4 className="font-medium text-stone-800">Enable Gateway</h4>
                                <p className="text-stone-600 text-sm">Allow customers to use this payment method</p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={gateway.enabled}
                                  onChange={() => handleToggleGateway(gateway.id)}
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                              </label>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-stone-50 rounded-lg">
                              <div>
                                <h4 className="font-medium text-stone-800">Test Mode</h4>
                                <p className="text-stone-600 text-sm">Use test credentials for development</p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={gateway.testMode}
                                  onChange={() => handleToggleTestMode(gateway.id)}
                                  className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                              </label>
                            </div>

                            <div className="p-4 bg-stone-50 rounded-lg">
                              <h4 className="font-medium text-stone-800 mb-2">Supported Features</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-stone-600">Category:</span>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(gateway.category)}`}>
                                    {gateway.category}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-stone-600">Currencies:</span>
                                  <span className="text-stone-800">{gateway.supportedCurrencies.join(', ')}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-stone-600">Countries:</span>
                                  <span className="text-stone-800">{gateway.supportedCountries.join(', ')}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-stone-600">Transaction Fee:</span>
                                  <span className="text-stone-800">{gateway.fees.percentage}% + {gateway.fees.fixed} {gateway.fees.currency}</span>
                                </div>
                              </div>
                            </div>

                            <div className="p-4 bg-blue-50 rounded-lg">
                              <h4 className="font-medium text-blue-800 mb-2">Payment Features</h4>
                              <div className="flex flex-wrap gap-1">
                                {gateway.features.map((feature, index) => (
                                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                                    {feature}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <button
                              onClick={() => handleTestConnection(gateway.id)}
                              className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                            >
                              <TestTube className="h-5 w-5 mr-2" />
                              Test Connection
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Settings className="h-16 w-16 text-stone-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-stone-800 mb-2">Select a Payment Gateway</h3>
                  <p className="text-stone-600">Choose a gateway from the overview tab to configure its settings</p>
                </div>
              )}
            </div>
          )}

          {/* Webhooks Tab */}
          {activeTab === 'webhooks' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-stone-800 mb-4">Webhook Configuration</h2>
                <p className="text-stone-600 mb-6">
                  Webhooks allow payment gateways to notify your application about payment events in real-time.
                </p>
              </div>

              <div className="space-y-4">
                {gateways.filter(g => g.enabled).map((gateway) => (
                  <div key={gateway.id} className="border border-stone-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{gateway.logo}</span>
                        <h3 className="font-semibold text-stone-800">{gateway.displayName}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(gateway.category)}`}>
                          {gateway.category}
                        </span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(gateway.status)}`}>
                        {gateway.status}
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">
                          Webhook URL
                        </label>
                        <div className="flex">
                          <input
                            type="text"
                            value={gateway.webhookUrl || ''}
                            readOnly
                            className="flex-1 px-3 py-2 border border-stone-300 rounded-l-lg bg-stone-50 text-stone-600"
                          />
                          <button
                            onClick={() => copyToClipboard(gateway.webhookUrl || '')}
                            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-r-lg transition-colors"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-stone-500">Events:</span>
                          <p className="text-stone-800">payment.success, payment.failed, refund.processed</p>
                        </div>
                        <div>
                          <span className="text-stone-500">Method:</span>
                          <p className="text-stone-800">POST</p>
                        </div>
                        <div>
                          <span className="text-stone-500">Format:</span>
                          <p className="text-stone-800">JSON</p>
                        </div>
                      </div>

                      <div className="text-sm">
                        <span className="text-stone-500">Supported Features:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {gateway.features.map((feature, index) => (
                            <span key={index} className="px-2 py-1 bg-stone-100 text-stone-700 rounded text-xs">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-800 mb-2">Important Security Notes</h4>
                    <ul className="text-amber-700 text-sm space-y-1">
                      <li>• Ensure your webhook endpoints are publicly accessible over HTTPS</li>
                      <li>• Implement proper signature verification for security</li>
                      <li>• Handle webhook retries and implement idempotency</li>
                      <li>• Test webhooks in development environment first</li>
                      <li>• Monitor webhook delivery and failure rates</li>
                      <li>• Keep webhook secrets secure and rotate them regularly</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">Gateway-Specific Notes</h4>
                <div className="text-blue-700 text-sm space-y-2">
                  <p><strong>UPI Gateways:</strong> Support real-time payment notifications and QR code generation</p>
                  <p><strong>Wallet Providers:</strong> May require additional KYC verification for higher transaction limits</p>
                  <p><strong>International Gateways:</strong> Consider currency conversion rates and international fees</p>
                  <p><strong>Net Banking:</strong> Transaction times may vary based on bank processing schedules</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentGatewaysAdmin;