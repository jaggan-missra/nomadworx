import React from 'react';
import { 
  TrendingUp, 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign,
  Eye,
  MessageSquare,
  Star
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      name: 'Total Revenue',
      value: '$12,345',
      change: '+12.5%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      name: 'Total Orders',
      value: '156',
      change: '+8.2%',
      changeType: 'positive',
      icon: ShoppingCart,
      color: 'bg-blue-500'
    },
    {
      name: 'Total Products',
      value: '24',
      change: '+2',
      changeType: 'positive',
      icon: Package,
      color: 'bg-amber-500'
    },
    {
      name: 'Total Customers',
      value: '89',
      change: '+15.3%',
      changeType: 'positive',
      icon: Users,
      color: 'bg-purple-500'
    }
  ];

  const recentOrders = [
    { id: '#001', customer: 'John Smith', product: 'Majestic Eagle Carving', amount: '$285.00', status: 'completed' },
    { id: '#002', customer: 'Sarah Johnson', product: 'Rustic Bear Family', amount: '$425.00', status: 'processing' },
    { id: '#003', customer: 'Mike Wilson', product: 'Owl Wisdom Keeper', amount: '$165.00', status: 'shipped' },
    { id: '#004', customer: 'Emily Davis', product: 'Mountain Landscape Relief', amount: '$195.00', status: 'pending' },
  ];

  const topProducts = [
    { name: 'Majestic Eagle Carving', sales: 45, revenue: '$12,825' },
    { name: 'Rustic Bear Family', sales: 32, revenue: '$13,600' },
    { name: 'Owl Wisdom Keeper', sales: 28, revenue: '$4,620' },
    { name: 'Wolf Pack Leader', sales: 22, revenue: '$6,050' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-stone-800">Dashboard</h1>
        <p className="text-stone-600">Welcome to your NoMadWorx admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-stone-600 text-sm font-medium">{stat.name}</p>
                  <p className="text-2xl font-bold text-stone-800 mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-600 text-sm font-medium">{stat.change}</span>
                <span className="text-stone-500 text-sm ml-1">from last month</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-stone-200">
            <h2 className="text-lg font-semibold text-stone-800">Recent Orders</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-stone-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-stone-800">{order.id}</span>
                      <span className="font-semibold text-stone-800">{order.amount}</span>
                    </div>
                    <p className="text-stone-600 text-sm">{order.customer}</p>
                    <p className="text-stone-500 text-xs">{order.product}</p>
                  </div>
                  <div className="ml-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-stone-200">
            <h2 className="text-lg font-semibold text-stone-800">Top Products</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                      <span className="text-amber-800 font-bold text-sm">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-stone-800">{product.name}</p>
                      <p className="text-stone-500 text-sm">{product.sales} sales</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-stone-800">{product.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-stone-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <button className="flex flex-col items-center p-4 bg-stone-50 hover:bg-stone-100 rounded-lg transition-colors">
            <Package className="h-8 w-8 text-amber-600 mb-2" />
            <span className="text-sm font-medium text-stone-800">Add Product</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-stone-50 hover:bg-stone-100 rounded-lg transition-colors">
            <ShoppingCart className="h-8 w-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-stone-800">View Orders</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-stone-50 hover:bg-stone-100 rounded-lg transition-colors">
            <Users className="h-8 w-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-stone-800">Customers</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-stone-50 hover:bg-stone-100 rounded-lg transition-colors">
            <Eye className="h-8 w-8 text-green-600 mb-2" />
            <span className="text-sm font-medium text-stone-800">Analytics</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-stone-50 hover:bg-stone-100 rounded-lg transition-colors">
            <MessageSquare className="h-8 w-8 text-indigo-600 mb-2" />
            <span className="text-sm font-medium text-stone-800">Messages</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-stone-50 hover:bg-stone-100 rounded-lg transition-colors">
            <Star className="h-8 w-8 text-yellow-600 mb-2" />
            <span className="text-sm font-medium text-stone-800">Reviews</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;