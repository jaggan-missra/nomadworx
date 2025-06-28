export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime: number;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Art of Wood Selection: Choosing the Right Material',
    excerpt: 'Learn how to select the perfect wood for your carving projects. Different woods have unique characteristics that affect the final result.',
    content: `Selecting the right wood is crucial for any successful carving project. Each species has unique characteristics that will affect both the carving process and the final appearance of your piece.

**Softwoods vs Hardwoods**

Softwoods like pine, cedar, and basswood are excellent for beginners. They're easier to carve and less likely to split. Basswood, in particular, is prized by carvers for its fine grain and consistent texture.

Hardwoods such as oak, maple, and walnut are more challenging but offer superior durability and beautiful grain patterns. These woods are ideal for pieces that will see regular handling or outdoor display.

**Grain Direction**

Understanding grain direction is essential. Always carve with the grain when possible, and be extra careful when carving against it. Cross-grain carving requires sharp tools and light cuts to prevent tear-out.

**Moisture Content**

Green wood is easier to carve but will crack as it dries. Kiln-dried lumber is stable but harder to work. For beginners, I recommend starting with properly dried wood to avoid disappointment.

**Wood Preparation**

Before starting any project, inspect your wood for defects like knots, cracks, or insect damage. A few minutes of careful selection can save hours of frustration later.`,
    image: 'https://images.pexels.com/photos/6980300/pexels-photo-6980300.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Master Carver John Smith',
    date: '2024-01-15',
    category: 'techniques',
    readTime: 5
  },
  {
    id: '2',
    title: 'Essential Tools Every Wood Carver Needs',
    excerpt: 'A comprehensive guide to building your wood carving tool collection, from basic knives to specialized gouges.',
    content: `Building a quality tool collection is an investment in your craft. Here are the essential tools every wood carver should have:

**Basic Carving Knives**

Start with a good quality carving knife with a 2-3 inch blade. Look for high-carbon steel that holds an edge well. A detail knife with a 1-inch blade is perfect for fine work.

**Gouges and Chisels**

U-gouges are essential for removing large amounts of material quickly. Start with a few basic sizes: 1/4", 1/2", and 3/4". V-tools are perfect for creating lines and adding detail work.

**Sharpening Equipment**

Sharp tools are safe tools. Invest in quality sharpening stones - start with 220 grit for major sharpening and 1000 grit for honing. A leather strop with compound will keep your edges razor-sharp.

**Safety Equipment**

Never compromise on safety. Cut-resistant gloves, thumb guards, and safety glasses should be standard equipment. A good carving apron protects your clothes and provides tool storage.

**Maintenance**

Keep your tools clean and properly stored. A light coat of oil prevents rust, and proper storage prevents nicks and damage to cutting edges.`,
    image: 'https://images.pexels.com/photos/6980296/pexels-photo-6980296.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Sarah Williams',
    date: '2024-01-10',
    category: 'tools',
    readTime: 7
  },
  {
    id: '3',
    title: 'Finishing Techniques for Outdoor Wood Carvings',
    excerpt: 'Protect your outdoor carvings from the elements with proper finishing techniques and material selection.',
    content: `Outdoor wood carvings face unique challenges from weather, UV rays, and moisture. Proper finishing is essential for longevity.

**Wood Selection for Outdoor Use**

Choose naturally weather-resistant woods like cedar, teak, or cypress. These species contain natural oils that repel moisture and resist decay.

**Surface Preparation**

Sand your carving progressively from 120 to 220 grit. Remove all dust with a tack cloth before applying any finish.

**Finish Options**

Marine spar varnish offers excellent UV protection and water resistance. Apply thin coats, sanding lightly between applications.

Penetrating oil finishes like teak oil enhance the natural grain while providing protection. These finishes are easier to maintain but require more frequent reapplication.

**Maintenance Schedule**

Inspect outdoor carvings twice yearly. Clean with mild soap and water, and reapply finish as needed. Most finishes need renewal every 2-3 years depending on exposure.

**Placement Considerations**

Even with proper finishing, consider placement carefully. Partial shade is ideal - enough light to enjoy the carving but protection from direct sun and driving rain.`,
    image: 'https://images.pexels.com/photos/6980305/pexels-photo-6980305.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Mike Johnson',
    date: '2024-01-05',
    category: 'finishing',
    readTime: 6
  }
];

export const getBlogPostById = (id: string): BlogPost | undefined => {
  return blogPosts.find(post => post.id === id);
};

export const getBlogPostsByCategory = (category: string): BlogPost[] => {
  if (category === 'all') return blogPosts;
  return blogPosts.filter(post => post.category === category);
};