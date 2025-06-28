import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { blogPosts } from '../data/blog';

const Blog = () => {
  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-stone-800 mb-4">Wood Carving Blog</h1>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Discover techniques, tips, and stories from the world of woodcarving. 
            Learn from master craftsmen and explore the art of working with wood.
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-12">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="aspect-video lg:aspect-square overflow-hidden">
                <img
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center text-sm text-stone-500 mb-4">
                  <User className="h-4 w-4 mr-1" />
                  <span className="mr-4">{blogPosts[0].author}</span>
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="mr-4">{new Date(blogPosts[0].date).toLocaleDateString()}</span>
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{blogPosts[0].readTime} min read</span>
                </div>
                <h2 className="text-2xl font-bold text-stone-800 mb-4">{blogPosts[0].title}</h2>
                <p className="text-stone-600 mb-6">{blogPosts[0].excerpt}</p>
                <Link
                  to={`/blog/${blogPosts[0].id}`}
                  className="inline-flex items-center text-amber-600 hover:text-amber-700 font-semibold transition-colors"
                >
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <Link to={`/blog/${post.id}`}>
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>
              <div className="p-6">
                <div className="flex items-center text-sm text-stone-500 mb-3">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="mr-4">{new Date(post.date).toLocaleDateString()}</span>
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{post.readTime} min read</span>
                </div>
                <Link to={`/blog/${post.id}`}>
                  <h3 className="text-xl font-semibold text-stone-800 mb-3 hover:text-amber-800 transition-colors">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-stone-600 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-stone-500">
                    <User className="h-4 w-4 mr-1" />
                    <span>{post.author}</span>
                  </div>
                  <Link
                    to={`/blog/${post.id}`}
                    className="text-amber-600 hover:text-amber-700 font-medium text-sm transition-colors"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-amber-800 rounded-lg text-white p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
          <p className="text-amber-100 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest woodcarving tips, techniques, and product updates 
            delivered straight to your inbox.
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-l-lg text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-300"
            />
            <button className="px-6 py-3 bg-amber-600 hover:bg-amber-700 rounded-r-lg font-semibold transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;