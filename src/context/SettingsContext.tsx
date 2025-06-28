import React, { createContext, useContext, useState, useEffect } from 'react';

interface Settings {
  // General Settings
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  timezone: string;
  currency: string;
  
  // Notification Settings
  emailNotifications: boolean;
  orderNotifications: boolean;
  lowStockAlerts: boolean;
  customerSignupNotifications: boolean;
  
  // Security Settings
  twoFactorAuth: boolean;
  sessionTimeout: number;
  passwordExpiry: number;
  loginAttempts: number;
  
  // Payment Settings
  paymentGateways: {
    [key: string]: { enabled: boolean; testMode: boolean };
  };
  
  // Shipping Settings
  freeShippingThreshold: number;
  shippingRates: {
    domestic: number;
    international: number;
  };
  processingTime: string;
  
  // SEO Settings
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  googleAnalytics: string;
  facebookPixel: string;
}

const defaultSettings: Settings = {
  // General Settings
  siteName: 'NoMadWorx',
  siteDescription: 'Handcrafted Wood Art & Sculptures',
  contactEmail: 'info@nomadworx.com',
  contactPhone: '(555) 123-4567',
  address: '123 Nomad Street, Craftsville, MT 59718',
  timezone: 'Asia/Kolkata',
  currency: 'USD',
  
  // Notification Settings
  emailNotifications: true,
  orderNotifications: true,
  lowStockAlerts: true,
  customerSignupNotifications: true,
  
  // Security Settings
  twoFactorAuth: false,
  sessionTimeout: 30,
  passwordExpiry: 90,
  loginAttempts: 5,
  
  // Payment Settings
  paymentGateways: {
    razorpay: { enabled: true, testMode: false },
    payu: { enabled: true, testMode: false },
    paypal: { enabled: true, testMode: true },
    stripe: { enabled: false, testMode: true },
    ccavenue: { enabled: true, testMode: false },
    easebuzz: { enabled: false, testMode: true }
  },
  
  // Shipping Settings
  freeShippingThreshold: 100,
  shippingRates: {
    domestic: 15,
    international: 45
  },
  processingTime: '2-3 business days',
  
  // SEO Settings
  metaTitle: 'NoMadWorx - Handcrafted Wood Art',
  metaDescription: 'Discover unique, handmade wood carvings and sculptures created with traditional techniques.',
  metaKeywords: 'wood carving, sculptures, handmade, crafts, art',
  googleAnalytics: '',
  facebookPixel: ''
};

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
  refreshSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  const loadSettings = () => {
    const savedSettings = localStorage.getItem('admin_settings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(prevSettings => ({ ...prevSettings, ...parsedSettings }));
      } catch (error) {
        console.error('Error loading saved settings:', error);
        setSettings(defaultSettings);
      }
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prevSettings => {
      const updatedSettings = { ...prevSettings, ...newSettings };
      localStorage.setItem('admin_settings', JSON.stringify(updatedSettings));
      return updatedSettings;
    });
  };

  const refreshSettings = () => {
    loadSettings();
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, refreshSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};