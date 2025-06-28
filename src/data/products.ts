export interface Product {
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

export const products: Product[] = [
  {
    id: '1',
    name: 'Majestic Eagle Carving',
    category: 'wood-carvings',
    price: 285.00,
    image: 'https://images.pexels.com/photos/6980307/pexels-photo-6980307.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/6980307/pexels-photo-6980307.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Hand-carved majestic eagle from premium basswood. A stunning centerpiece that captures the spirit of freedom.',
    details: 'Dimensions: 12" x 8" x 6". Carved from sustainably sourced basswood with natural oil finish. Each piece is unique and may vary slightly from the photo.',
    inStock: true,
    featured: true
  },
  {
    id: '2',
    name: 'Rustic Bear Family',
    category: 'sculptures',
    price: 425.00,
    image: 'https://images.pexels.com/photos/8186126/pexels-photo-8186126.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/8186126/pexels-photo-8186126.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Beautiful bear family sculpture carved from solid oak. Perfect for cabin or home decoration.',
    details: 'Dimensions: 10" x 6" x 8". Hand-carved from solid oak with weathered finish. Signed by the artist.',
    inStock: true,
    featured: true
  },
  {
    id: '3',
    name: 'Mountain Landscape Relief',
    category: 'wood-carvings',
    price: 195.00,
    image: 'https://images.pexels.com/photos/6980292/pexels-photo-6980292.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/6980292/pexels-photo-6980292.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Detailed mountain landscape carved in relief style. Brings the beauty of nature indoors.',
    details: 'Dimensions: 16" x 12" x 2". Carved from pine with natural stain finish. Ready to hang with mounted backing.',
    inStock: true,
    featured: false
  },
  {
    id: '4',
    name: 'Owl Wisdom Keeper',
    category: 'sculptures',
    price: 165.00,
    image: 'https://images.pexels.com/photos/7679659/pexels-photo-7679659.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/7679659/pexels-photo-7679659.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Wise owl sculpture with intricate feather detail. A symbol of wisdom and knowledge.',
    details: 'Dimensions: 8" x 5" x 7". Hand-carved from maple with natural finish. Each feather individually detailed.',
    inStock: true,
    featured: true
  },
  {
    id: '5',
    name: 'Fish Jumping Sculpture',
    category: 'sculptures',
    price: 125.00,
    image: 'https://images.pexels.com/photos/8186157/pexels-photo-8186157.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/8186157/pexels-photo-8186157.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Dynamic fish sculpture capturing the moment of a salmon jump. Perfect for fishing enthusiasts.',
    details: 'Dimensions: 9" x 4" x 6". Carved from cedar with natural oil finish. Includes wooden base.',
    inStock: true,
    featured: false
  },
  {
    id: '6',
    name: 'Native American Chief',
    category: 'wood-carvings',
    price: 345.00,
    image: 'https://images.pexels.com/photos/6980291/pexels-photo-6980291.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/6980291/pexels-photo-6980291.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Respectful tribute to Native American heritage with detailed headdress and facial features.',
    details: 'Dimensions: 14" x 8" x 6". Carved from walnut with hand-painted details. Created with cultural sensitivity.',
    inStock: false,
    featured: true
  },
  {
    id: '7',
    name: 'Wolf Pack Leader',
    category: 'sculptures',
    price: 275.00,
    image: 'https://images.pexels.com/photos/8186123/pexels-photo-8186123.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/8186123/pexels-photo-8186123.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Powerful wolf sculpture showcasing the leader of the pack in a howling pose.',
    details: 'Dimensions: 11" x 7" x 9". Hand-carved from oak with dark stain finish. Captures the wild spirit perfectly.',
    inStock: true,
    featured: false
  },
  {
    id: '8',
    name: 'Carved Wooden Bowl Set',
    category: 'gifts',
    price: 89.00,
    image: 'https://images.pexels.com/photos/6980308/pexels-photo-6980308.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/6980308/pexels-photo-6980308.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Set of three hand-carved wooden bowls perfect for serving or decoration.',
    details: 'Set includes 3 bowls: Large (8"), Medium (6"), Small (4"). Carved from cherry wood with food-safe finish.',
    inStock: true,
    featured: false
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'all') return products;
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};