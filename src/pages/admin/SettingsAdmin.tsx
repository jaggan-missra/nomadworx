import React, { useState, useEffect } from 'react';
import { Save, Upload, Bell, Shield, Globe, Mail, CreditCard, Truck, Key, CheckCircle } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

const SettingsAdmin = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const { settings, updateSettings } = useSettings();
  const [localSettings, setLocalSettings] = useState(settings);

  // Update local settings when global settings change
  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const tabs = [
    { id: 'general', name: 'General', icon: Globe },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'payments', name: 'Payments', icon: CreditCard },
    { id: 'shipping', name: 'Shipping', icon: Truck },
    { id: 'seo', name: 'SEO & Analytics', icon: Mail }
  ];

  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update global settings
      updateSettings(localSettings);
      
      // Show success message
      setSaveSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
      
      console.log('Settings saved successfully:', localSettings);
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (section: string, field: string, value: any) => {
    setLocalSettings(prev => ({
      ...prev,
      [section]: typeof prev[section as keyof typeof prev] === 'object' 
        ? { ...prev[section as keyof typeof prev], [field]: value }
        : value
    }));
  };

  const handleDirectChange = (field: string, value: any) => {
    setLocalSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-800">Settings</h1>
          <p className="text-stone-600">Configure your store settings and preferences</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => window.location.href = '/admin/payment-gateways'}
            className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            <Key className="h-5 w-5 mr-2" />
            Payment Gateways
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center px-4 py-2 bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white font-medium rounded-lg transition-colors"
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : saveSuccess ? (
              <>
                <CheckCircle className="h-5 w-5 mr-2" />
                Saved!
              </>
            ) : (
              <>
                <Save className="h-5 w-5 mr-2" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* Success Message */}
      {saveSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            Settings saved successfully! Contact page and footer have been updated.
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-amber-100 text-amber-800'
                        : 'text-stone-600 hover:bg-stone-100 hover:text-stone-800'
                    }`}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-stone-800">General Settings</h2>
                  <div className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    Updates Contact & Footer
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Site Name
                    </label>
                    <input
                      type="text"
                      value={localSettings.siteName}
                      onChange={(e) => handleDirectChange('siteName', e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      value={localSettings.contactEmail}
                      onChange={(e) => handleDirectChange('contactEmail', e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Site Description
                  </label>
                  <textarea
                    value={localSettings.siteDescription}
                    onChange={(e) => handleDirectChange('siteDescription', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      value={localSettings.contactPhone}
                      onChange={(e) => handleDirectChange('contactPhone', e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Timezone
                    </label>
                    <select
                      value={localSettings.timezone}
                      onChange={(e) => handleDirectChange('timezone', e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="Asia/Kolkata">India Standard Time (GMT +5:30)</option>
                      <option value="America/Denver">Mountain Time (GMT -7)</option>
                      <option value="America/New_York">Eastern Time (GMT -5)</option>
                      <option value="America/Chicago">Central Time (GMT -6)</option>
                      <option value="America/Los_Angeles">Pacific Time (GMT -8)</option>
                      <option value="Europe/London">Greenwich Mean Time (GMT +0)</option>
                      <option value="Europe/Paris">Central European Time (GMT +1)</option>
                      <option value="Asia/Dubai">Gulf Standard Time (GMT +4)</option>
                      <option value="Asia/Singapore">Singapore Time (GMT +8)</option>
                      <option value="Asia/Tokyo">Japan Standard Time (GMT +9)</option>
                      <option value="Australia/Sydney">Australian Eastern Time (GMT +10)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Business Address
                  </label>
                  <textarea
                    value={localSettings.address}
                    onChange={(e) => handleDirectChange('address', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Street Address, City, State ZIP"
                  />
                  <p className="text-xs text-stone-500 mt-1">
                    Use commas to separate address components (e.g., "123 Main St, City, State 12345")
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Default Currency
                  </label>
                  <select
                    value={localSettings.currency}
                    onChange={(e) => handleDirectChange('currency', e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="USD">US Dollar (USD)</option>
                    <option value="INR">Indian Rupee (INR)</option>
                    <option value="EUR">Euro (EUR)</option>
                    <option value="GBP">British Pound (GBP)</option>
                    <option value="CAD">Canadian Dollar (CAD)</option>
                    <option value="AUD">Australian Dollar (AUD)</option>
                  </select>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-stone-800">Notification Settings</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-stone-800">Email Notifications</h3>
                      <p className="text-stone-600 text-sm">Receive general email notifications</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={localSettings.emailNotifications}
                        onChange={(e) => handleDirectChange('emailNotifications', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-stone-800">Order Notifications</h3>
                      <p className="text-stone-600 text-sm">Get notified about new orders</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={localSettings.orderNotifications}
                        onChange={(e) => handleDirectChange('orderNotifications', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-stone-800">Low Stock Alerts</h3>
                      <p className="text-stone-600 text-sm">Alert when products are running low</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={localSettings.lowStockAlerts}
                        onChange={(e) => handleDirectChange('lowStockAlerts', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-stone-800">Customer Signup Notifications</h3>
                      <p className="text-stone-600 text-sm">Get notified when new customers register</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={localSettings.customerSignupNotifications}
                        onChange={(e) => handleDirectChange('customerSignupNotifications', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-stone-800">Security Settings</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-stone-800">Two-Factor Authentication</h3>
                      <p className="text-stone-600 text-sm">Add an extra layer of security to your account</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={localSettings.twoFactorAuth}
                        onChange={(e) => handleDirectChange('twoFactorAuth', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        Session Timeout (minutes)
                      </label>
                      <input
                        type="number"
                        value={localSettings.sessionTimeout}
                        onChange={(e) => handleDirectChange('sessionTimeout', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        Password Expiry (days)
                      </label>
                      <input
                        type="number"
                        value={localSettings.passwordExpiry}
                        onChange={(e) => handleDirectChange('passwordExpiry', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Maximum Login Attempts
                    </label>
                    <input
                      type="number"
                      value={localSettings.loginAttempts}
                      onChange={(e) => handleDirectChange('loginAttempts', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Payment Settings */}
            {activeTab === 'payments' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-stone-800">Payment Settings</h2>
                  <button
                    onClick={() => window.location.href = '/admin/payment-gateways'}
                    className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                  >
                    <Key className="h-5 w-5 mr-2" />
                    Configure Gateways
                  </button>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-medium text-blue-800 mb-2">Payment Gateway Management</h3>
                  <p className="text-blue-700 text-sm mb-3">
                    Configure API credentials, test connections, and manage webhook settings for all payment gateways.
                  </p>
                  <button
                    onClick={() => window.location.href = '/admin/payment-gateways'}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    Go to Payment Gateways →
                  </button>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-stone-800">Quick Gateway Status</h3>
                  {Object.entries(localSettings.paymentGateways).map(([gateway, config]) => (
                    <div key={gateway} className="border border-stone-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium text-stone-800 capitalize">{gateway}</h3>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={config.enabled}
                            onChange={(e) => handleInputChange('paymentGateways', gateway, {...config, enabled: e.target.checked})}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                        </label>
                      </div>
                      {config.enabled && (
                        <div className="flex items-center">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={config.testMode}
                              onChange={(e) => handleInputChange('paymentGateways', gateway, {...config, testMode: e.target.checked})}
                              className="rounded border-stone-300 text-amber-600 focus:ring-amber-500"
                            />
                            <span className="ml-2 text-sm text-stone-600">Test Mode</span>
                          </label>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Shipping Settings */}
            {activeTab === 'shipping' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-stone-800">Shipping Settings</h2>
                  <div className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    Updates Contact Page
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Free Shipping Threshold ($)
                    </label>
                    <input
                      type="number"
                      value={localSettings.freeShippingThreshold}
                      onChange={(e) => handleDirectChange('freeShippingThreshold', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Processing Time
                    </label>
                    <input
                      type="text"
                      value={localSettings.processingTime}
                      onChange={(e) => handleDirectChange('processingTime', e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Domestic Shipping Rate ($)
                    </label>
                    <input
                      type="number"
                      value={localSettings.shippingRates.domestic}
                      onChange={(e) => handleInputChange('shippingRates', 'domestic', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      International Shipping Rate ($)
                    </label>
                    <input
                      type="number"
                      value={localSettings.shippingRates.international}
                      onChange={(e) => handleInputChange('shippingRates', 'international', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* SEO Settings */}
            {activeTab === 'seo' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-stone-800">SEO & Analytics Settings</h2>
                
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    value={localSettings.metaTitle}
                    onChange={(e) => handleDirectChange('metaTitle', e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Meta Description
                  </label>
                  <textarea
                    value={localSettings.metaDescription}
                    onChange={(e) => handleDirectChange('metaDescription', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Meta Keywords
                  </label>
                  <input
                    type="text"
                    value={localSettings.metaKeywords}
                    onChange={(e) => handleDirectChange('metaKeywords', e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Google Analytics ID
                    </label>
                    <input
                      type="text"
                      value={localSettings.googleAnalytics}
                      onChange={(e) => handleDirectChange('googleAnalytics', e.target.value)}
                      placeholder="GA-XXXXXXXXX-X"
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Facebook Pixel ID
                    </label>
                    <input
                      type="text"
                      value={localSettings.facebookPixel}
                      onChange={(e) => handleDirectChange('facebookPixel', e.target.value)}
                      placeholder="XXXXXXXXXXXXXXX"
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsAdmin;