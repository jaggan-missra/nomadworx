import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Share2 } from 'lucide-react';
import { getBlogPostById } from '../data/blog';

const BlogPost = () => {
  const { id } = useParams();
  const post = getBlogPostById(id || '');

  if (!post) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-stone-800 mb-4">Blog Post Not Found</h2>
          <Link
            to="/blog"
            className="inline-flex items-center px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center text-stone-600 hover:text-amber-800 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </div>

        {/* Article Header */}
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="aspect-video overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-8">
            <div className="flex items-center text-sm text-stone-500 mb-6">
              <User className="h-4 w-4 mr-1" />
              <span className="mr-6">{post.author}</span>
              <Calendar className="h-4 w-4 mr-1" />
              <span className="mr-6">{new Date(post.date).toLocaleDateString()}</span>
              <Clock className="h-4 w-4 mr-1" />
              <span>{post.readTime} min read</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-stone-800 mb-6">{post.title}</h1>
            
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-stone-200">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-stone-500">Share:</span>
                <button className="p-2 text-stone-400 hover:text-amber-600 transition-colors">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Article Content */}
            <div className="prose prose-stone max-w-none">
              {post.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return (
                    <h3 key={index} className="text-xl font-semibold text-stone-800 mt-8 mb-4">
                      {paragraph.slice(2, -2)}
                    </h3>
                  );
                }
                return (
                  <p key={index} className="text-stone-600 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Article Footer */}
            <div className="mt-8 pt-6 border-t border-stone-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-amber-800 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">
                      {post.author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-800">{post.author}</h4>
                    <p className="text-stone-500 text-sm">Master Wood Carver</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <span className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts CTA */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-stone-800 mb-4">Explore More Articles</h3>
          <Link
            to="/blog"
            className="inline-flex items-center px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors"
          >
            View All Blog Posts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;