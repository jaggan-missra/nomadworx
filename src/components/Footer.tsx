import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Shield } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

const Footer = () => {
  const { settings } = useSettings();

  // Parse address for better display
  const addressLines = settings.address.split(',').map(line => line.trim());

  return (
    <footer className="bg-stone-800 text-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-amber-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">NW</span>
              </div>
              <span className="text-xl font-bold">{settings.siteName}</span>
            </div>
            <p className="text-stone-400 mb-4 max-w-md">
              {settings.siteDescription}. Each piece tells a unique story of craftsmanship and natural beauty.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-stone-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-stone-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-stone-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-stone-400 hover:text-white transition-colors">All Products</Link></li>
              <li><Link to="/products/wood-carvings" className="text-stone-400 hover:text-white transition-colors">Wood Carvings</Link></li>
              <li><Link to="/products/sculptures" className="text-stone-400 hover:text-white transition-colors">Sculptures</Link></li>
              <li><Link to="/products/custom-work" className="text-stone-400 hover:text-white transition-colors">Custom Work</Link></li>
              <li><Link to="/blog" className="text-stone-400 hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/about" className="text-stone-400 hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-stone-400 mt-0.5 flex-shrink-0" />
                <div className="text-stone-400 text-sm">
                  {addressLines.map((line, index) => (
                    <div key={index}>{line}</div>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-stone-400" />
                <a 
                  href={`tel:${settings.contactPhone}`}
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  {settings.contactPhone}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-stone-400" />
                <a 
                  href={`mailto:${settings.contactEmail}`}
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  {settings.contactEmail}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-700 mt-8 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-stone-400">
              © 2024 {settings.siteName}. All rights reserved. Handcrafted with care.
            </p>
            <Link 
              to="/admin/login" 
              className="flex items-center text-stone-500 hover:text-stone-300 transition-colors text-sm mt-2 sm:mt-0"
            >
              <Shield className="h-4 w-4 mr-1" />
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;