import React from 'react';
import { Loader2, Globe, BookOpen, MessageCircle, Database } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  const steps = [
    { icon: Globe, label: 'Scraping content', delay: 0 },
    { icon: BookOpen, label: 'Generating summary', delay: 1000 },
    { icon: MessageCircle, label: 'Translating to Urdu', delay: 2000 },
    { icon: Database, label: 'Storing results', delay: 3000 }
  ];

  return (
    <div className="glass-card rounded-2xl p-10 relative z-10">
      <div className="text-center">
        <div className="mb-6">
          <Loader2 className="h-16 w-16 animate-spin mx-auto text-accent-gold" />
        </div>
        
        <h3 className="text-2xl font-bold mb-8 text-white">
          Processing Blog Content
        </h3>
        
        <div className="space-y-4 max-w-md mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <step.icon className="h-6 w-6 animate-pulse text-accent-gold" />
              <span className="text-base font-semibold text-white">
                {step.label}
              </span>
            </div>
          ))}
        </div>
        
        <p className="mt-8 text-base text-white/80 font-medium">
          This may take a few moments...
        </p>
      </div>
    </div>
  );
};