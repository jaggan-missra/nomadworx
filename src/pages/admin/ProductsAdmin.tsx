import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Filter } from 'lucide-react';
import { products } from '../../data/products';
import ImageUpload from '../../components/admin/ImageUpload';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  images: string[];
  description: string;
  details: string;
  inStock: boolean;
  featured: boolean;
}

const ProductsAdmin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productList, setProductList] = useState<Product[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    category: 'wood-carvings',
    price: 0,
    image: '',
    images: [''],
    description: '',
    details: '',
    inStock: true,
    featured: false
  });

  const categories = ['all', 'wood-carvings', 'sculptures', 'custom-work', 'tools-supplies', 'gifts'];

  // Load products from localStorage or use default products
  useEffect(() => {
    const savedProducts = localStorage.getItem('admin_products');
    if (savedProducts) {
      try {
        const parsedProducts = JSON.parse(savedProducts);
        setProductList(parsedProducts);
      } catch (error) {
        console.error('Error loading saved products:', error);
        setProductList(products);
      }
    } else {
      setProductList(products);
    }
  }, []);

  // Save products to localStorage whenever productList changes
  useEffect(() => {
    if (productList.length > 0) {
      localStorage.setItem('admin_products', JSON.stringify(productList));
    }
  }, [productList]);

  const filteredProducts = productList.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'wood-carvings',
      price: 0,
      image: '',
      images: [''],
      description: '',
      details: '',
      inStock: true,
      featured: false
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name.trim()) {
      alert('Product name is required');
      return;
    }
    
    if (formData.price <= 0) {
      alert('Price must be greater than 0');
      return;
    }
    
    // Filter out empty image URLs and ensure we have at least one image
    const validImages = formData.images.filter(img => img.trim() !== '');
    const mainImage = validImages.length > 0 ? validImages[0] : formData.image || 'https://images.pexels.com/photos/6980307/pexels-photo-6980307.jpeg?auto=compress&cs=tinysrgb&w=800';
    const finalImages = validImages.length > 0 ? validImages : [mainImage];
    
    if (editingProduct) {
      // Update existing product
      const updatedProduct: Product = {
        ...editingProduct,
        name: formData.name.trim(),
        category: formData.category,
        price: Number(formData.price),
        image: mainImage,
        images: finalImages,
        description: formData.description.trim(),
        details: formData.details.trim(),
        inStock: formData.inStock,
        featured: formData.featured
      };
      
      setProductList(prevList => {
        const newList = prevList.map(product => 
          product.id === editingProduct.id ? updatedProduct : product
        );
        return newList;
      });
      
      alert('Product updated successfully!');
    } else {
      // Add new product
      const newProduct: Product = {
        id: Date.now().toString(),
        name: formData.name.trim(),
        category: formData.category,
        price: Number(formData.price),
        image: mainImage,
        images: finalImages,
        description: formData.description.trim(),
        details: formData.details.trim(),
        inStock: formData.inStock,
        featured: formData.featured
      };
      
      setProductList(prevList => {
        const newList = [newProduct, ...prevList];
        return newList;
      });
      
      alert('Product added successfully!');
    }

    // Reset form and close modal
    resetForm();
    setShowAddModal(false);
    setEditingProduct(null);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
      images: product.images.length > 0 ? product.images : [''],
      description: product.description,
      details: product.details,
      inStock: product.inStock,
      featured: product.featured
    });
    setShowAddModal(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProductList(prevList => {
        const newList = prevList.filter(product => product.id !== id);
        return newList;
      });
      alert('Product deleted successfully!');
    }
  };

  const addImageField = () => {
    if (formData.images.length < 5) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, '']
      }));
    }
  };

  const removeImageField = (index: number) => {
    if (formData.images.length > 1) {
      const newImages = formData.images.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        images: newImages
      }));
    }
  };

  const updateImageField = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData(prev => ({
      ...prev,
      images: newImages,
      // Update main image if it's the first image
      image: index === 0 ? value : prev.image
    }));
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingProduct(null);
    resetForm();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-800">Products</h1>
          <p className="text-stone-600">Manage your product catalog ({productList.length} products)</p>
        </div>
        <button
          onClick={() => {
            setEditingProduct(null);
            resetForm();
            setShowAddModal(true);
          }}
          className="flex items-center px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-stone-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">All Categories</option>
              <option value="wood-carvings">Wood Carvings</option>
              <option value="sculptures">Sculptures</option>
              <option value="custom-work">Custom Work</option>
              <option value="tools-supplies">Tools & Supplies</option>
              <option value="gifts">Gifts</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-stone-50 border-b border-stone-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-stone-800">Product</th>
                <th className="text-left py-3 px-4 font-medium text-stone-800">Category</th>
                <th className="text-left py-3 px-4 font-medium text-stone-800">Price</th>
                <th className="text-left py-3 px-4 font-medium text-stone-800">Stock</th>
                <th className="text-left py-3 px-4 font-medium text-stone-800">Status</th>
                <th className="text-left py-3 px-4 font-medium text-stone-800">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-stone-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-medium text-stone-800">{product.name}</p>
                        <p className="text-stone-500 text-sm truncate max-w-xs">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 bg-stone-100 text-stone-800 rounded-full text-xs font-medium capitalize">
                      {product.category.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-medium text-stone-800">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-stone-600">In Stock</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.inStock
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.inStock ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-stone-400 hover:text-blue-600 transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-1 text-stone-400 hover:text-amber-600 transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-1 text-stone-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-stone-600 text-sm">Total Products</p>
          <p className="text-2xl font-bold text-stone-800">{productList.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-stone-600 text-sm">In Stock</p>
          <p className="text-2xl font-bold text-green-600">
            {productList.filter(p => p.inStock).length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-stone-600 text-sm">Out of Stock</p>
          <p className="text-2xl font-bold text-red-600">
            {productList.filter(p => !p.inStock).length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-stone-600 text-sm">Featured</p>
          <p className="text-2xl font-bold text-amber-600">
            {productList.filter(p => p.featured).length}
          </p>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-stone-200">
              <h2 className="text-xl font-bold text-stone-800">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Enter product name"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        Category *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        required
                        className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="wood-carvings">Wood Carvings</option>
                        <option value="sculptures">Sculptures</option>
                        <option value="custom-work">Custom Work</option>
                        <option value="tools-supplies">Tools & Supplies</option>
                        <option value="gifts">Gifts</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        Price ($) *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                        required
                        className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Enter product description"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Details
                    </label>
                    <textarea
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      rows={4}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Enter detailed product information"
                    />
                  </div>

                  <div className="flex items-center space-x-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.inStock}
                        onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                        className="rounded border-stone-300 text-amber-600 focus:ring-amber-500"
                      />
                      <span className="ml-2 text-sm text-stone-700">In Stock</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="rounded border-stone-300 text-amber-600 focus:ring-amber-500"
                      />
                      <span className="ml-2 text-sm text-stone-700">Featured Product</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Product Images
                    </label>
                    <div className="space-y-4">
                      {formData.images.map((image, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-stone-600">
                              Image {index + 1} {index === 0 && '(Main)'}
                            </span>
                            {formData.images.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeImageField(index)}
                                className="text-red-600 hover:text-red-700 text-sm"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                          <ImageUpload
                            value={image}
                            onChange={(url) => updateImageField(index, url)}
                            label=""
                            description={`Upload image ${index + 1}`}
                          />
                        </div>
                      ))}
                      
                      {formData.images.length < 5 && (
                        <button
                          type="button"
                          onClick={addImageField}
                          className="w-full py-2 px-4 border border-dashed border-stone-300 rounded-lg text-stone-600 hover:border-stone-400 hover:text-stone-700 transition-colors"
                        >
                          + Add Another Image
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 pt-4 border-t border-stone-200">
                <button
                  type="submit"
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  {editingProduct ? 'Update' : 'Create'} Product
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 bg-stone-300 hover:bg-stone-400 text-stone-700 font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsAdmin;