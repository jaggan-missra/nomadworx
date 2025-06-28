import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from 'lucide-react';

const AnalyticsAdmin = () => {
  const metrics = [
    {
      name: 'Revenue',
      value: '$12,345',
      change: '+12.5%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      name: 'Orders',
      value: '156',
      change: '+8.2%',
      changeType: 'positive',
      icon: ShoppingCart,
      color: 'bg-blue-500'
    },
    {
      name: 'Customers',
      value: '89',
      change: '+15.3%',
      changeType: 'positive',
      icon: Users,
      color: 'bg-purple-500'
    },
    {
      name: 'Products Sold',
      value: '234',
      change: '-2.1%',
      changeType: 'negative',
      icon: Package,
      color: 'bg-amber-500'
    }
  ];

  const salesData = [
    { month: 'Jan', sales: 4200, orders: 45 },
    { month: 'Feb', sales: 3800, orders: 38 },
    { month: 'Mar', sales: 5200, orders: 52 },
    { month: 'Apr', sales: 4800, orders: 48 },
    { month: 'May', sales: 6200, orders: 62 },
    { month: 'Jun', sales: 7100, orders: 71 },
  ];

  const topProducts = [
    { name: 'Majestic Eagle Carving', sales: 45, revenue: 12825 },
    { name: 'Rustic Bear Family', sales: 32, revenue: 13600 },
    { name: 'Owl Wisdom Keeper', sales: 28, revenue: 4620 },
    { name: 'Wolf Pack Leader', sales: 22, revenue: 6050 },
    { name: 'Mountain Landscape Relief', sales: 18, revenue: 3510 },
  ];

  const trafficSources = [
    { source: 'Direct', visitors: 2340, percentage: 45 },
    { source: 'Google Search', visitors: 1560, percentage: 30 },
    { source: 'Social Media', visitors: 780, percentage: 15 },
    { source: 'Email', visitors: 520, percentage: 10 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-stone-800">Analytics</h1>
        <p className="text-stone-600">Track your business performance and insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.name} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-stone-600 text-sm font-medium">{metric.name}</p>
                  <p className="text-2xl font-bold text-stone-800 mt-1">{metric.value}</p>
                </div>
                <div className={`w-12 h-12 ${metric.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                {metric.changeType === 'positive' ? (
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm font-medium ${
                  metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change}
                </span>
                <span className="text-stone-500 text-sm ml-1">from last month</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-stone-800 mb-4">Sales Overview</h2>
          <div className="space-y-4">
            {salesData.map((data, index) => (
              <div key={data.month} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                    <span className="text-amber-800 font-bold text-sm">{data.month}</span>
                  </div>
                  <div>
                    <p className="font-medium text-stone-800">${data.sales.toLocaleString()}</p>
                    <p className="text-stone-500 text-sm">{data.orders} orders</p>
                  </div>
                </div>
                <div className="w-24 bg-stone-200 rounded-full h-2">
                  <div 
                    className="bg-amber-600 h-2 rounded-full" 
                    style={{ width: `${(data.sales / 8000) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-stone-800 mb-4">Top Products</h2>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-800 font-bold text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-stone-800">{product.name}</p>
                    <p className="text-stone-500 text-sm">{product.sales} sales</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-stone-800">${product.revenue.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Sources */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-stone-800 mb-4">Traffic Sources</h2>
          <div className="space-y-4">
            {trafficSources.map((source) => (
              <div key={source.source} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-stone-800">{source.source}</p>
                  <p className="text-stone-500 text-sm">{source.visitors.toLocaleString()} visitors</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-20 bg-stone-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full" 
                      style={{ width: `${source.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-stone-600 text-sm font-medium">{source.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-stone-800 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-stone-800 text-sm">New order #156 received</p>
                <p className="text-stone-500 text-xs">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-stone-800 text-sm">Product "Eagle Carving" updated</p>
                <p className="text-stone-500 text-xs">15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div>
                <p className="text-stone-800 text-sm">New customer registered</p>
                <p className="text-stone-500 text-xs">1 hour ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
              <div>
                <p className="text-stone-800 text-sm">Order #154 shipped</p>
                <p className="text-stone-500 text-xs">3 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
              <div>
                <p className="text-stone-800 text-sm">Low stock alert: Wolf Sculpture</p>
                <p className="text-stone-500 text-xs">5 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsAdmin;