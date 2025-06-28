import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

const Contact = () => {
  const { settings } = useSettings();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  // Parse address for better display
  const addressLines = settings.address.split(',').map(line => line.trim());
  const [streetAddress, ...locationParts] = addressLines;
  const location = locationParts.join(', ');

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-900 via-amber-800 to-stone-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-xl text-amber-100 max-w-2xl mx-auto">
            Ready to discuss your custom piece or have questions about our work? 
            We'd love to hear from you.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-stone-800 mb-6">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-800 mb-1">Studio Address</h3>
                  <div className="text-stone-600">
                    <p>{streetAddress}</p>
                    <p>{location}</p>
                    <p>United States</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-800 mb-1">Phone</h3>
                  <p className="text-stone-600">{settings.contactPhone}</p>
                  <p className="text-stone-500 text-sm">Call us during business hours</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-800 mb-1">Email</h3>
                  <p className="text-stone-600">{settings.contactEmail}</p>
                  <p className="text-stone-500 text-sm">We'll respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-800 mb-1">Business Hours</h3>
                  <div className="text-stone-600 space-y-1">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 4:00 PM</p>
                    <p>Sunday: By appointment only</p>
                  </div>
                  <p className="text-stone-500 text-sm mt-2">
                    Timezone: {settings.timezone.replace('_', ' ').replace('/', ' / ')}
                  </p>
                </div>
              </div>
            </div>

            {/* Custom Work Info */}
            <div className="mt-8 p-6 bg-amber-50 rounded-lg">
              <h3 className="font-semibold text-stone-800 mb-2">Custom Work Consultations</h3>
              <p className="text-stone-600 text-sm mb-4">
                Interested in a custom piece? We offer free initial consultations to discuss 
                your vision, timeline, and budget. Custom work typically takes 4-8 weeks depending 
                on complexity.
              </p>
              <p className="text-stone-600 text-sm">
                <strong>Please include:</strong> Detailed description, preferred dimensions, 
                wood preferences, and any reference images when contacting us about custom work.
              </p>
            </div>

            {/* Company Info */}
            <div className="mt-8 p-6 bg-stone-100 rounded-lg">
              <h3 className="font-semibold text-stone-800 mb-2">About {settings.siteName}</h3>
              <p className="text-stone-600 text-sm mb-3">{settings.siteDescription}</p>
              <div className="text-stone-600 text-sm space-y-1">
                <p><strong>Processing Time:</strong> {settings.processingTime}</p>
                <p><strong>Free Shipping:</strong> Orders over ${settings.freeShippingThreshold}</p>
                <p><strong>Domestic Shipping:</strong> ${settings.shippingRates.domestic}</p>
                <p><strong>International Shipping:</strong> ${settings.shippingRates.international}</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-stone-800 mb-6">Send Us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-stone-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="custom-work">Custom Work Inquiry</option>
                    <option value="product-question">Product Question</option>
                    <option value="shipping">Shipping & Returns</option>
                    <option value="general">General Inquiry</option>
                    <option value="wholesale">Wholesale Inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                  placeholder="Please provide as much detail as possible about your inquiry..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors"
              >
                <Send className="mr-2 h-5 w-5" />
                Send Message
              </button>
            </form>

            {/* Quick Contact */}
            <div className="mt-8 p-6 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">Quick Contact</h3>
              <p className="text-green-700 text-sm mb-3">
                Need immediate assistance? Contact us directly:
              </p>
              <div className="space-y-2">
                <a 
                  href={`tel:${settings.contactPhone}`}
                  className="flex items-center text-green-700 hover:text-green-800 font-medium"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  {settings.contactPhone}
                </a>
                <a 
                  href={`mailto:${settings.contactEmail}`}
                  className="flex items-center text-green-700 hover:text-green-800 font-medium"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  {settings.contactEmail}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;