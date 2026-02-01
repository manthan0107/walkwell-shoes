import React from 'react';
import { Star, Award, Truck, Shield, Users, Globe, Heart, Zap } from 'lucide-react';

export default function WalkwellAboutPage() {
  const stats = [
    { number: '50K+', label: 'Happy Customers', icon: Users },
    { number: '500+', label: 'Shoe Styles', icon: Star },
    { number: '25+', label: 'Countries', icon: Globe },
    { number: '10', label: 'Years Experience', icon: Award }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passion for Comfort',
      description: 'Every shoe is designed with your comfort in mind, using premium materials and ergonomic designs.'
    },
    {
      icon: Zap,
      title: 'Innovation First',
      description: 'We constantly push boundaries with cutting-edge technology and sustainable manufacturing processes.'
    },
    {
      icon: Shield,
      title: 'Quality Guarantee',
      description: 'Each pair undergoes rigorous quality testing to ensure durability and long-lasting performance.'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'From local communities to international markets, we bring premium footwear to everyone.'
    }
  ];

  const team = [
    {
      name: 'Sarah Chen',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
      bio: '15 years in fashion industry, passionate about sustainable footwear.'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Head of Design',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      bio: 'Award-winning designer with expertise in athletic and casual footwear.'
    },
    {
      name: 'Emily Watson',
      role: 'Sustainability Director',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      bio: 'Environmental scientist dedicated to eco-friendly manufacturing.'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-200 to-pink-200 bg-clip-text text-transparent">
              WALKWELL
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Blazing trails in footwear innovation since 2014. Where comfort meets style, and dreams take flight.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-white text-indigo-900 font-semibold rounded-full hover:bg-gray-100 transition-colors">
                Our Story
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">{stat.number}</h3>
                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Our Journey
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Born from a simple belief that everyone deserves shoes that feel as good as they look, Walkwell began in a small workshop with big dreams. Our founders noticed a gap in the market for footwear that truly balanced style, comfort, and sustainability.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                What started as a passion project has evolved into a global movement. Today, we're proud to serve customers across 25 countries, each pair of shoes crafted with the same attention to detail and commitment to excellence that defined our very first design.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our name 'Walkwell' represents our mission: to help you move through life with speed, grace, and a brilliant trail of confidence behind you.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&h=450&fit=crop"
                  alt="Walkwell shoe craftsmanship"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full blur-2xl opacity-30"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              What Drives Us
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our core values shape every decision we make and every shoe we create
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-card p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow group">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}


      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Why Choose Walkwell?
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Experience the difference that premium quality and thoughtful design can make
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              <Truck className="w-12 h-12 text-blue-300 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Free Shipping</h3>
              <p className="text-gray-200">Complimentary shipping on all orders over $75. Fast, reliable delivery worldwide.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              <Shield className="w-12 h-12 text-green-300 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Lifetime Warranty</h3>
              <p className="text-gray-200">We stand behind our craftsmanship with comprehensive warranty coverage.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              <Award className="w-12 h-12 text-yellow-300 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Award Winning</h3>
              <p className="text-gray-200">Recognized by industry leaders for innovation and sustainable practices.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Join the Journey?
          </h2>
          <p className="text-xl mb-8 text-gray-100">
            Discover your perfect pair and experience the Walkwell difference today
          </p>
        </div>
      </section>

      {/* Footer */}

    </div>
  );
}