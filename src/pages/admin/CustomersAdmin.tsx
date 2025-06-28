import React, { useState } from 'react';
import { Search, Filter, Eye, Mail, Phone, MapPin } from 'lucide-react';

const CustomersAdmin = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const customers = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
      totalOrders: 3,
      totalSpent: 845.00,
      lastOrder: '2024-01-15',
      status: 'active',
      joinDate: '2023-08-15'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '+1 (555) 234-5678',
      location: 'Los Angeles, CA',
      totalOrders: 5,
      totalSpent: 1250.00,
      lastOrder: '2024-01-14',
      status: 'active',
      joinDate: '2023-06-20'
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike@example.com',
      phone: '+1 (555) 345-6789',
      location: 'Chicago, IL',
      totalOrders: 2,
      totalSpent: 419.00,
      lastOrder: '2024-01-13',
      status: 'active',
      joinDate: '2023-11-10'
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily@example.com',
      phone: '+1 (555) 456-7890',
      location: 'Houston, TX',
      totalOrders: 1,
      totalSpent: 195.00,
      lastOrder: '2024-01-12',
      status: 'active',
      joinDate: '2024-01-05'
    },
    {
      id: '5',
      name: 'David Brown',
      email: 'david@example.com',
      phone: '+1 (555) 567-8901',
      location: 'Phoenix, AZ',
      totalOrders: 4,
      totalSpent: 980.00,
      lastOrder: '2024-01-10',
      status: 'inactive',
      joinDate: '2023-04-12'
    }
  ];

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const customerStats = {
    total: customers.length,
    active: customers.filter(c => c.status === 'active').length,
    inactive: customers.filter(c => c.status === 'inactive').length,
    totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
    averageOrderValue: customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.reduce((sum, c) => sum + c.totalOrders, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-stone-800">Customers</h1>
        <p className="text-stone-600">Manage your customer relationships</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-stone-600 text-sm">Total Customers</p>
          <p className="text-2xl font-bold text-stone-800">{customerStats.total}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-stone-600 text-sm">Active</p>
          <p className="text-2xl font-bold text-green-600">{customerStats.active}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-stone-600 text-sm">Inactive</p>
          <p className="text-2xl font-bold text-red-600">{customerStats.inactive}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-stone-600 text-sm">Total Revenue</p>
          <p className="text-2xl font-bold text-green-600">${customerStats.totalRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-stone-600 text-sm">Avg Order Value</p>
          <p className="text-2xl font-bold text-amber-600">${customerStats.averageOrderValue.toFixed(2)}</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-400" />
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-stone-50 border-b border-stone-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-stone-800">Customer</th>
                <th className="text-left py-3 px-4 font-medium text-stone-800">Contact</th>
                <th className="text-left py-3 px-4 font-medium text-stone-800">Location</th>
                <th className="text-left py-3 px-4 font-medium text-stone-800">Orders</th>
                <th className="text-left py-3 px-4 font-medium text-stone-800">Total Spent</th>
                <th className="text-left py-3 px-4 font-medium text-stone-800">Last Order</th>
                <th className="text-left py-3 px-4 font-medium text-stone-800">Status</th>
                <th className="text-left py-3 px-4 font-medium text-stone-800">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-stone-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                        <span className="text-amber-800 font-bold text-sm">
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-stone-800">{customer.name}</p>
                        <p className="text-stone-500 text-sm">
                          Joined {new Date(customer.joinDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center text-stone-600 text-sm">
                        <Mail className="h-4 w-4 mr-2" />
                        {customer.email}
                      </div>
                      <div className="flex items-center text-stone-600 text-sm">
                        <Phone className="h-4 w-4 mr-2" />
                        {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center text-stone-600 text-sm">
                      <MapPin className="h-4 w-4 mr-2" />
                      {customer.location}
                    </div>
                  </td>
                  <td className="py-4 px-4 font-medium text-stone-800">
                    {customer.totalOrders}
                  </td>
                  <td className="py-4 px-4 font-medium text-stone-800">
                    ${customer.totalSpent.toFixed(2)}
                  </td>
                  <td className="py-4 px-4 text-stone-600">
                    {new Date(customer.lastOrder).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      customer.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button className="p-1 text-stone-400 hover:text-blue-600 transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Customers */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-stone-200">
          <h2 className="text-lg font-semibold text-stone-800">Top Customers</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {customers
              .sort((a, b) => b.totalSpent - a.totalSpent)
              .slice(0, 5)
              .map((customer, index) => (
                <div key={customer.id} className="flex items-center justify-between p-4 bg-stone-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                      <span className="text-amber-800 font-bold text-sm">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-stone-800">{customer.name}</p>
                      <p className="text-stone-500 text-sm">{customer.totalOrders} orders</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-stone-800">${customer.totalSpent.toFixed(2)}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomersAdmin;