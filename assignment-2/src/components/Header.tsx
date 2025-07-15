import React from 'react';
import { Globe, BookOpen } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="py-12 text-center relative z-10">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="p-4 rounded-full glass-card-dark hover:scale-110 transition-transform duration-300">
          <BookOpen className="h-10 w-10 text-accent-gold" />
        </div>
        <div className="p-4 rounded-full glass-card-dark hover:scale-110 transition-transform duration-300">
          <Globe className="h-10 w-10 text-white" />
        </div>
      </div>
      <h1 className="text-5xl font-bold mb-4 text-gradient-gold drop-shadow-lg">
        Blog Content Processor
      </h1>
      <p className="text-xl text-white/90 font-medium max-w-2xl mx-auto leading-relaxed">
        Extract, summarize, and translate blog content with AI-powered insights
      </p>
      <div className="mt-6 w-24 h-1 bg-gradient-to-r from-maroon-600 to-navy-600 mx-auto rounded-full"></div>
    </header>
  );
};