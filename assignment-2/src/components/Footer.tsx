import React from 'react';
import { Heart, Code } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 text-center border-t border-white/10 mt-16 relative z-10">
      <div className="flex items-center justify-center gap-3 text-base text-white/80">
        <span>Built with</span>
        <Heart className="h-5 w-5 text-accent-rose animate-pulse" />
        <span>using</span>
        <Code className="h-5 w-5 text-accent-gold" />
        <span className="font-semibold">React & TypeScript</span>
      </div>
      <p className="mt-4 text-sm text-white/60">
        © 2025 Blog Content Processor. All rights reserved.
      </p>
    </footer>
  );
};