import React from 'react';
import { Award, Users, Heart, Hammer } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-900 via-amber-800 to-stone-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
          <p className="text-xl text-amber-100 max-w-3xl mx-auto">
            Three generations of master craftsmen dedicated to preserving the ancient art of wood carving 
            while creating beautiful, timeless pieces for modern homes.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-stone-800 mb-6">Crafting Excellence Since 1952</h2>
              <div className="space-y-4 text-stone-600">
                <p>
                  NoMadWorx began as a small family workshop in the heart of Montana's 
                  Rocky Mountains. What started with grandfather Samuel's passion for transforming 
                  simple blocks of wood into works of art has grown into a respected studio known 
                  for exceptional craftsmanship.
                </p>
                <p>
                  Each piece we create tells a story - not just of the wood's natural beauty, 
                  but of the hands that shaped it and the traditions passed down through generations. 
                  We believe that in our fast-paced digital world, there's something deeply meaningful 
                  about owning something crafted entirely by hand.
                </p>
                <p>
                  Today, we continue Samuel's legacy, combining traditional techniques with carefully 
                  selected tools and sustainably sourced materials to create heirloom-quality pieces 
                  that will be treasured for generations to come.
                </p>
              </div>
            </div>
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src="https://images.pexels.com/photos/6980296/pexels-photo-6980296.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Master craftsman at work"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-800 mb-4">Our Values</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Every piece we create is guided by principles that have shaped our craft for over seven decades.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Hammer className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Traditional Craftsmanship</h3>
              <p className="text-stone-600">
                Using time-honored techniques passed down through generations of master carvers.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Sustainable Materials</h3>
              <p className="text-stone-600">
                Carefully sourced wood from sustainable forests, respecting nature's gifts.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Uncompromising Quality</h3>
              <p className="text-stone-600">
                Each piece is meticulously crafted to meet our exacting standards of excellence.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Personal Connection</h3>
              <p className="text-stone-600">
                Building lasting relationships with customers who appreciate handcrafted artistry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-800 mb-4">Meet Our Craftsmen</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Our team of skilled artisans brings decades of combined experience to every piece we create.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-square overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/8186126/pexels-photo-8186126.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Master Carver"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-stone-800 mb-2">Robert "Bob" Nomad</h3>
                <p className="text-amber-600 font-medium mb-2">Master Carver & Owner</p>
                <p className="text-stone-600 text-sm">
                  Third-generation carver with 35+ years of experience. Specializes in wildlife sculptures 
                  and custom architectural elements.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-square overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/6980307/pexels-photo-6980307.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Senior Artisan"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-stone-800 mb-2">Maria Gonzalez</h3>
                <p className="text-amber-600 font-medium mb-2">Senior Artisan</p>
                <p className="text-stone-600 text-sm">
                  Expert in detailed relief carving and restoration work. Known for her incredible 
                  attention to detail and artistic vision.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-square overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Craftsman"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-stone-800 mb-2">David Chen</h3>
                <p className="text-amber-600 font-medium mb-2">Craftsman & Finisher</p>
                <p className="text-stone-600 text-sm">
                  Specializes in wood finishing and preservation techniques. Ensures every piece 
                  meets our durability and beauty standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-amber-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Commission Your Piece?</h2>
          <p className="text-amber-100 text-lg mb-8 max-w-2xl mx-auto">
            Whether you're looking for a piece from our collection or want to discuss a custom creation, 
            we'd love to help bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="inline-flex items-center px-8 py-3 bg-white text-amber-800 hover:bg-amber-50 font-semibold rounded-lg transition-colors"
            >
              Browse Our Work
            </a>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-amber-800 font-semibold rounded-lg transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;