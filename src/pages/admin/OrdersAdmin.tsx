import React, { useState } from 'react';
import { Search, Filter, Eye, Download, Package, Truck, CheckCircle } from 'lucide-react';

const OrdersAdmin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const orders = [
    {
      id: '#001',
      customer: 'John Smith',
      email: 'john@example.com',
      products: ['Majestic Eagle Carving'],
      total: 285.00,
      status: 'completed',
      date: '2024-01-15',
      paymentMethod: 'Razorpay',
      shippingAddress: '123 Main St, New York, NY 10001'
    },
    {
      id: '#002',
      customer: 'Sarah Johnson',
      email: 'sarah@example.com',
      products: ['Rustic Bear Family'],
      total: 425.00,
      status: 'processing',
      date: '2024-01-14',
      paymentMethod: 'PayU',
      shippingAddress: '456 Oak Ave, Los Angeles, CA 90210'
    },
    {
      id: '#003',
      customer: 'Mike Wilson',
      email: 'mike@example.com',
      products: ['Owl Wisdom Keeper', 'Carved Wooden Bowl Set'],
      total: 254.00,
      status: 'shipped',
      date: '2024-01-13',
      paymentMethod: 'PhonePe',
      shippingAddress: '789 Pine St, Chicago, IL 60601'
    },
    {
      id: '#004',
      customer: 'Emily Davis',
      email: 'emily@example.com',
      products: ['Mountain Landscape Relief'],
      total: 195.00,
      status: 'pending',
      date: '2024-01-12',
      paymentMethod: 'UPI',
      shippingAddress: '321 Elm St, Houston, TX 77001'
    },
    {
      id: '#005',
      customer: 'David Brown',
      email: 'david@example.com',
      products: ['Wolf Pack Leader'],
      total: 275.00,
      status: 'cancelled',
      date: '2024-01-11',
      paymentMethod: 'CCAvenue',
      shippingAddress: '654 Maple Dr, Phoenix, AZ 85001'
    }
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Package className="h-4 w-4" />;
      case 'processing': return <Package className="h-4 w-4" />;
      case 'shipped': return <Truck className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-stone-100 text-stone-800';
    }
  };

  const orderStats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    completed: orders.filter(o => o.status === 'completed').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
    totalRevenue: orders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.total, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-800">Orders</h1>
          <p className="text-stone-600">Manage customer orders and fulfillment</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors">
          <Download className="h-5 w-5 mr-2" />
          Export Orders
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-stone-600 text-sm">Total Orders</p>
          <p className="text-2xl font-bold text-stone-800">{orderStats.total}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-stone-600 text-sm">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">{orderStats.pending}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-stone-600 text-sm">Processing</p>
          <p className="text-2xl font-bold text-blue-600">{orderStats.processing}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-stone-600 text-sm">Shipped</p>
          <p className="text-2xl font-bold text-purple-600">{orderStats.shipped}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-stone-600 text-sm">Completed</p>
          <p className="text-2xl font-bold text-green-600">{orderStats.completed}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-stone-600 text-sm">Cancelled</p>
          <p className="text-2xl font-bold text-red-600">{orderStats.cancelled}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-stone-600 text-sm">Revenue</p>
          <p className="text-2xl font-bold text-green-600">${orderStats.totalRevenue.toFixed(2)}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-400" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-stone-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-stone-50 border-b border-stone-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-stone-800">Order ID</th>
                <th className="text-left py-3 px-4 font-medium text-stone-800">Customer</th>
                <th className="text-left py-3 px-4 font-medium text-stone-800">Products</th>
                <th className="text-left py-3 px-4 font-medium text-stone-800">Total</th>
                <th className="text-left py-3 px-4 font-medium text-stone-800">Status</th>
                <th className="text-left py-3 px-4 font-medium text-stone-800">Date</th>
                <th className="text-left py-3 px-4 font-medium text-stone-800">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-stone-50">
                  <td className="py-4 px-4 font-medium text-stone-800">{order.id}</td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-stone-800">{order.customer}</p>
                      <p className="text-stone-500 text-sm">{order.email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="max-w-xs">
                      {order.products.map((product, index) => (
                        <p key={index} className="text-stone-600 text-sm truncate">
                          {product}
                        </p>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-4 font-medium text-stone-800">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1 capitalize">{order.status}</span>
                    </span>
                  </td>
                  <td className="py-4 px-4 text-stone-600">
                    {new Date(order.date).toLocaleDateString()}
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
    </div>
  );
};

export default OrdersAdmin;