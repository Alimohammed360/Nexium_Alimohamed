import React, { useState } from 'react';
import { BlogProcessor } from './components/BlogProcessor';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Fluid Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-navy-900 to-maroon-900"></div>
        <div className="absolute inset-0 opacity-80">
          <div className="fluid-wave wave-1"></div>
          <div className="fluid-wave wave-2"></div>
          <div className="fluid-wave wave-3"></div>
          <div className="fluid-wave wave-4"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header />
        <main className="py-8">
          <BlogProcessor />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;