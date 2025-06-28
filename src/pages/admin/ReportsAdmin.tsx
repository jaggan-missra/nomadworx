import React, { useState } from 'react';
import { Download, Calendar, TrendingUp, DollarSign, ShoppingCart, Users, Package, FileText } from 'lucide-react';

const ReportsAdmin = () => {
  const [dateRange, setDateRange] = useState('last-30-days');
  const [reportType, setReportType] = useState('sales');

  const reportTypes = [
    { id: 'sales', name: 'Sales Report', icon: DollarSign, description: 'Revenue and sales analytics' },
    { id: 'orders', name: 'Orders Report', icon: ShoppingCart, description: 'Order status and fulfillment' },
    { id: 'customers', name: 'Customer Report', icon: Users, description: 'Customer behavior and demographics' },
    { id: 'products', name: 'Product Report', icon: Package, description: 'Product performance and inventory' },
    { id: 'traffic', name: 'Traffic Report', icon: TrendingUp, description: 'Website traffic and engagement' },
    { id: 'financial', name: 'Financial Report', icon: FileText, description: 'Comprehensive financial overview' }
  ];

  const salesData = {
    totalRevenue: 45680,
    totalOrders: 234,
    averageOrderValue: 195.23,
    conversionRate: 3.2,
    topProducts: [
      { name: 'Majestic Eagle Carving', revenue: 12825, units: 45 },
      { name: 'Rustic Bear Family', revenue: 13600, units: 32 },
      { name: 'Owl Wisdom Keeper', revenue: 4620, units: 28 },
      { name: 'Wolf Pack Leader', revenue: 6050, units: 22 }
    ],
    monthlyData: [
      { month: 'Jan', revenue: 6200, orders: 32 },
      { month: 'Feb', revenue: 5800, orders: 28 },
      { month: 'Mar', revenue: 7200, orders: 38 },
      { month: 'Apr', revenue: 6800, orders: 35 },
      { month: 'May', revenue: 8200, orders: 42 },
      { month: 'Jun', revenue: 11480, orders: 59 }
    ]
  };

  const customerData = {
    totalCustomers: 156,
    newCustomers: 23,
    returningCustomers: 133,
    customerLifetimeValue: 342.50,
    topCustomers: [
      { name: 'Sarah Johnson', orders: 8, spent: 1850 },
      { name: 'Mike Wilson', orders: 6, spent: 1420 },
      { name: 'Emily Davis', orders: 5, spent: 1180 },
      { name: 'John Smith', orders: 4, spent: 980 }
    ],
    demographics: [
      { location: 'California', customers: 45, percentage: 28.8 },
      { location: 'New York', customers: 32, percentage: 20.5 },
      { location: 'Texas', customers: 28, percentage: 17.9 },
      { location: 'Florida', customers: 22, percentage: 14.1 },
      { location: 'Others', customers: 29, percentage: 18.6 }
    ]
  };

  const generateReport = () => {
    // In a real application, this would generate and download the actual report
    alert(`Generating ${reportTypes.find(r => r.id === reportType)?.name} for ${dateRange}...`);
  };

  const exportData = (format: string) => {
    alert(`Exporting data in ${format.toUpperCase()} format...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-800">Reports & Analytics</h1>
          <p className="text-stone-600">Generate detailed business reports and insights</p>
        </div>
        <button
          onClick={generateReport}
          className="flex items-center px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors"
        >
          <Download className="h-5 w-5 mr-2" />
          Generate Report
        </button>
      </div>

      {/* Report Configuration */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-stone-800 mb-4">Report Configuration</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Report Type
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {reportTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Date Range
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="last-7-days">Last 7 Days</option>
              <option value="last-30-days">Last 30 Days</option>
              <option value="last-90-days">Last 90 Days</option>
              <option value="last-year">Last Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Export Format
            </label>
            <div className="flex space-x-2">
              <button
                onClick={() => exportData('pdf')}
                className="flex-1 px-3 py-2 bg-red-100 text-red-800 hover:bg-red-200 rounded-lg transition-colors text-sm"
              >
                PDF
              </button>
              <button
                onClick={() => exportData('excel')}
                className="flex-1 px-3 py-2 bg-green-100 text-green-800 hover:bg-green-200 rounded-lg transition-colors text-sm"
              >
                Excel
              </button>
              <button
                onClick={() => exportData('csv')}
                className="flex-1 px-3 py-2 bg-blue-100 text-blue-800 hover:bg-blue-200 rounded-lg transition-colors text-sm"
              >
                CSV
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Report Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportTypes.map((type) => {
          const Icon = type.icon;
          return (
            <div
              key={type.id}
              className={`bg-white rounded-lg shadow-md p-6 cursor-pointer transition-all hover:shadow-lg ${
                reportType === type.id ? 'ring-2 ring-amber-500 bg-amber-50' : ''
              }`}
              onClick={() => setReportType(type.id)}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  reportType === type.id ? 'bg-amber-600 text-white' : 'bg-stone-100 text-stone-600'
                }`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-stone-800">{type.name}</h3>
                  <p className="text-stone-500 text-sm">{type.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sales Report Preview */}
      {reportType === 'sales' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-stone-800 mb-4">Sales Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-600 text-sm font-medium">Total Revenue</p>
                    <p className="text-2xl font-bold text-green-800">${salesData.totalRevenue.toLocaleString()}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 text-sm font-medium">Total Orders</p>
                    <p className="text-2xl font-bold text-blue-800">{salesData.totalOrders}</p>
                  </div>
                  <ShoppingCart className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-600 text-sm font-medium">Avg Order Value</p>
                    <p className="text-2xl font-bold text-purple-800">${salesData.averageOrderValue}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
              </div>
              <div className="bg-amber-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-amber-600 text-sm font-medium">Conversion Rate</p>
                    <p className="text-2xl font-bold text-amber-800">{salesData.conversionRate}%</p>
                  </div>
                  <Users className="h-8 w-8 text-amber-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-stone-800 mb-4">Monthly Sales Trend</h3>
              <div className="space-y-3">
                {salesData.monthlyData.map((data) => (
                  <div key={data.month} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                        <span className="text-amber-800 font-bold text-sm">{data.month}</span>
                      </div>
                      <div>
                        <p className="font-medium text-stone-800">${data.revenue.toLocaleString()}</p>
                        <p className="text-stone-500 text-sm">{data.orders} orders</p>
                      </div>
                    </div>
                    <div className="w-24 bg-stone-200 rounded-full h-2">
                      <div 
                        className="bg-amber-600 h-2 rounded-full" 
                        style={{ width: `${(data.revenue / 12000) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-stone-800 mb-4">Top Performing Products</h3>
              <div className="space-y-3">
                {salesData.topProducts.map((product, index) => (
                  <div key={product.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-800 font-bold text-sm">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium text-stone-800">{product.name}</p>
                        <p className="text-stone-500 text-sm">{product.units} units sold</p>
                      </div>
                    </div>
                    <p className="font-semibold text-stone-800">${product.revenue.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Customer Report Preview */}
      {reportType === 'customers' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-stone-800 mb-4">Customer Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-blue-600 text-sm font-medium">Total Customers</p>
                <p className="text-2xl font-bold text-blue-800">{customerData.totalCustomers}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-green-600 text-sm font-medium">New Customers</p>
                <p className="text-2xl font-bold text-green-800">{customerData.newCustomers}</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-purple-600 text-sm font-medium">Returning Customers</p>
                <p className="text-2xl font-bold text-purple-800">{customerData.returningCustomers}</p>
              </div>
              <div className="bg-amber-50 rounded-lg p-4">
                <p className="text-amber-600 text-sm font-medium">Avg Lifetime Value</p>
                <p className="text-2xl font-bold text-amber-800">${customerData.customerLifetimeValue}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-stone-800 mb-4">Top Customers</h3>
              <div className="space-y-3">
                {customerData.topCustomers.map((customer, index) => (
                  <div key={customer.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-800 font-bold text-sm">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium text-stone-800">{customer.name}</p>
                        <p className="text-stone-500 text-sm">{customer.orders} orders</p>
                      </div>
                    </div>
                    <p className="font-semibold text-stone-800">${customer.spent.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-stone-800 mb-4">Customer Demographics</h3>
              <div className="space-y-3">
                {customerData.demographics.map((demo) => (
                  <div key={demo.location} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-stone-800">{demo.location}</p>
                      <p className="text-stone-500 text-sm">{demo.customers} customers</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-20 bg-stone-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${demo.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-stone-600 text-sm font-medium">{demo.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-stone-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center p-4 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors">
            <Calendar className="h-6 w-6 text-amber-600 mr-2" />
            <span className="font-medium text-amber-800">Schedule Report</span>
          </button>
          <button className="flex items-center justify-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
            <Download className="h-6 w-6 text-blue-600 mr-2" />
            <span className="font-medium text-blue-800">Download All Reports</span>
          </button>
          <button className="flex items-center justify-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
            <FileText className="h-6 w-6 text-green-600 mr-2" />
            <span className="font-medium text-green-800">Custom Report Builder</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportsAdmin;