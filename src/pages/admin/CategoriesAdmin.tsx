import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Eye, FolderOpen, Image as ImageIcon } from 'lucide-react';
import ImageUpload from '../../components/admin/ImageUpload';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  productCount: number;
  status: 'active' | 'inactive';
  createdDate: string;
  image?: string;
}

const CategoriesAdmin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'active' as 'active' | 'inactive',
    image: ''
  });

  const initialCategories: Category[] = [
    {
      id: '1',
      name: 'Wood Carvings',
      slug: 'wood-carvings',
      description: 'Hand-carved wooden sculptures and decorative pieces',
      productCount: 12,
      status: 'active',
      createdDate: '2023-06-15',
      image: 'https://images.pexels.com/photos/6980307/pexels-photo-6980307.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '2',
      name: 'Sculptures',
      slug: 'sculptures',
      description: 'Three-dimensional artistic wood sculptures',
      productCount: 8,
      status: 'active',
      createdDate: '2023-06-15',
      image: 'https://images.pexels.com/photos/8186126/pexels-photo-8186126.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '3',
      name: 'Custom Work',
      slug: 'custom-work',
      description: 'Personalized and commissioned pieces',
      productCount: 3,
      status: 'active',
      createdDate: '2023-07-01',
      image: 'https://images.pexels.com/photos/6980292/pexels-photo-6980292.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '4',
      name: 'Tools & Supplies',
      slug: 'tools-supplies',
      description: 'Carving tools and woodworking supplies',
      productCount: 0,
      status: 'inactive',
      createdDate: '2023-08-10',
      image: 'https://images.pexels.com/photos/6980296/pexels-photo-6980296.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '5',
      name: 'Gifts',
      slug: 'gifts',
      description: 'Perfect wooden gifts for special occasions',
      productCount: 1,
      status: 'active',
      createdDate: '2023-09-05',
      image: 'https://images.pexels.com/photos/6980308/pexels-photo-6980308.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  // Load categories from localStorage or use default categories
  useEffect(() => {
    const savedCategories = localStorage.getItem('admin_categories');
    if (savedCategories) {
      try {
        const parsedCategories = JSON.parse(savedCategories);
        // PRESERVE existing images - don't overwrite them!
        setCategories(parsedCategories);
      } catch (error) {
        console.error('Error loading saved categories:', error);
        setCategories(initialCategories);
      }
    } else {
      setCategories(initialCategories);
    }
  }, []);

  // Save categories to localStorage whenever categories change
  useEffect(() => {
    if (categories.length > 0) {
      localStorage.setItem('admin_categories', JSON.stringify(categories));
    }
  }, [categories]);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      status: 'active',
      image: ''
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name.trim()) {
      alert('Category name is required');
      return;
    }
    
    if (editingCategory) {
      // Update existing category - preserve existing image if no new image provided
      const updatedCategory: Category = {
        ...editingCategory,
        name: formData.name.trim(),
        slug: formData.name.trim().toLowerCase().replace(/\s+/g, '-'),
        description: formData.description.trim(),
        status: formData.status,
        // IMPORTANT: Only update image if a new one is provided, otherwise keep existing
        image: formData.image.trim() || editingCategory.image
      };
      
      setCategories(prevCategories => {
        const newCategories = prevCategories.map(cat => 
          cat.id === editingCategory.id ? updatedCategory : cat
        );
        return newCategories;
      });
      
      alert('Category updated successfully!');
    } else {
      // Add new category - use provided image or default based on category type
      const getDefaultImageForCategory = (name: string) => {
        const lowerName = name.toLowerCase();
        if (lowerName.includes('carving')) {
          return 'https://images.pexels.com/photos/6980307/pexels-photo-6980307.jpeg?auto=compress&cs=tinysrgb&w=800';
        } else if (lowerName.includes('sculpture')) {
          return 'https://images.pexels.com/photos/8186126/pexels-photo-8186126.jpeg?auto=compress&cs=tinysrgb&w=800';
        } else if (lowerName.includes('custom')) {
          return 'https://images.pexels.com/photos/6980292/pexels-photo-6980292.jpeg?auto=compress&cs=tinysrgb&w=800';
        } else if (lowerName.includes('tool')) {
          return 'https://images.pexels.com/photos/6980296/pexels-photo-6980296.jpeg?auto=compress&cs=tinysrgb&w=800';
        } else if (lowerName.includes('gift')) {
          return 'https://images.pexels.com/photos/6980308/pexels-photo-6980308.jpeg?auto=compress&cs=tinysrgb&w=800';
        }
        return 'https://images.pexels.com/photos/6980307/pexels-photo-6980307.jpeg?auto=compress&cs=tinysrgb&w=800';
      };
      
      const finalImage = formData.image.trim() || getDefaultImageForCategory(formData.name);
      
      const newCategory: Category = {
        id: Date.now().toString(),
        name: formData.name.trim(),
        slug: formData.name.trim().toLowerCase().replace(/\s+/g, '-'),
        description: formData.description.trim(),
        productCount: 0,
        status: formData.status,
        createdDate: new Date().toISOString().split('T')[0],
        image: finalImage
      };
      
      setCategories(prevCategories => {
        const newCategories = [newCategory, ...prevCategories];
        return newCategories;
      });
      
      alert('Category added successfully!');
    }

    // Reset form and close modal
    resetForm();
    setShowAddModal(false);
    setEditingCategory(null);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      status: category.status,
      image: category.image || ''
    });
    setShowAddModal(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(prevCategories => {
        const newCategories = prevCategories.filter(cat => cat.id !== id);
        return newCategories;
      });
      alert('Category deleted successfully!');
    }
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingCategory(null);
    resetForm();
  };

  const categoryStats = {
    total: categories.length,
    active: categories.filter(c => c.status === 'active').length,
    inactive: categories.filter(c => c.status === 'inactive').length,
    totalProducts: categories.reduce((sum, c) => sum + c.productCount, 0)
  };

  // Get fallback image for broken images only
  const getFallbackImage = (categorySlug: string) => {
    const fallbacks = {
      'wood-carvings': 'https://images.pexels.com/photos/6980307/pexels-photo-6980307.jpeg?auto=compress&cs=tinysrgb&w=800',
      'sculptures': 'https://images.pexels.com/photos/8186126/pexels-photo-8186126.jpeg?auto=compress&cs=tinysrgb&w=800',
      'custom-work': 'https://images.pexels.com/photos/6980292/pexels-photo-6980292.jpeg?auto=compress&cs=tinysrgb&w=800',
      'tools-supplies': 'https://images.pexels.com/photos/6980296/pexels-photo-6980296.jpeg?auto=compress&cs=tinysrgb&w=800',
      'gifts': 'https://images.pexels.com/photos/6980308/pexels-photo-6980308.jpeg?auto=compress&cs=tinysrgb&w=800'
    };
    return fallbacks[categorySlug as keyof typeof fallbacks] || fallbacks['wood-carvings'];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-800">Categories</h1>
          <p className="text-stone-600">Organize your products into categories ({categories.length} categories)</p>
        </div>
        <button
          onClick={() => {
            setEditingCategory(null);
            resetForm();
            setShowAddModal(true);
          }}
          className="flex items-center px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Category
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-stone-600 text-sm">Total Categories</p>
          <p className="text-2xl font-bold text-stone-800">{categoryStats.total}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-stone-600 text-sm">Active</p>
          <p className="text-2xl font-bold text-green-600">{categoryStats.active}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-stone-600 text-sm">Inactive</p>
          <p className="text-2xl font-bold text-red-600">{categoryStats.inactive}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-stone-600 text-sm">Total Products</p>
          <p className="text-2xl font-bold text-amber-600">{categoryStats.totalProducts}</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-stone-400" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            {/* Category Image */}
            <div className="aspect-video overflow-hidden bg-stone-100 relative">
              {category.image ? (
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Only fallback if the image actually fails to load
                    const target = e.target as HTMLImageElement;
                    const fallbackUrl = getFallbackImage(category.slug);
                    if (target.src !== fallbackUrl) {
                      target.src = fallbackUrl;
                    }
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-stone-200">
                  <ImageIcon className="h-12 w-12 text-stone-400" />
                </div>
              )}
              {/* Status Badge */}
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  category.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {category.status}
                </span>
              </div>
            </div>
            
            {/* Category Content */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-stone-800">{category.name}</h3>
              </div>
              <p className="text-stone-600 text-sm mb-4 line-clamp-2">{category.description}</p>
              
              {/* Category Stats */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-stone-500 text-sm">
                  <FolderOpen className="h-4 w-4 mr-1" />
                  {category.productCount} products
                </div>
                <span className="text-stone-500 text-xs">
                  Created {new Date(category.createdDate).toLocaleDateString()}
                </span>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleEdit(category)}
                  className="flex-1 flex items-center justify-center px-3 py-2 bg-amber-100 text-amber-800 hover:bg-amber-200 rounded-lg transition-colors"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </button>
                <button className="px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <ImageIcon className="h-16 w-16 text-stone-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-stone-800 mb-2">No categories found</h3>
          <p className="text-stone-600 mb-6">
            {searchTerm ? 'Try adjusting your search terms' : 'Get started by creating your first category'}
          </p>
          {!searchTerm && (
            <button
              onClick={() => {
                setEditingCategory(null);
                resetForm();
                setShowAddModal(true);
              }}
              className="inline-flex items-center px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Your First Category
            </button>
          )}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-stone-200">
              <h2 className="text-xl font-bold text-stone-800">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Category Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Enter category name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Enter category description"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div>
                  <ImageUpload
                    value={formData.image}
                    onChange={(url) => setFormData({ ...formData, image: url })}
                    label="Category Image"
                    description="Upload a category image (recommended: 800x450px)"
                  />
                  {editingCategory && !formData.image && editingCategory.image && (
                    <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-xs text-blue-700">
                        <strong>Current image will be preserved</strong> if no new image is uploaded.
                      </p>
                    </div>
                  )}
                  {!editingCategory && !formData.image && (
                    <p className="text-xs text-stone-500 mt-2">
                      If no image is provided, a default image will be selected based on the category name.
                    </p>
                  )}
                </div>
              </div>

              <div className="flex space-x-3 pt-4 border-t border-stone-200">
                <button
                  type="submit"
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  {editingCategory ? 'Update' : 'Create'} Category
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

export default CategoriesAdmin;