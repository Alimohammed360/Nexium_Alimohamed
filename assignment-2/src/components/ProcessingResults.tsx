import React from 'react';
import { ExternalLink, User, Calendar, CheckCircle, Globe } from 'lucide-react';

interface ProcessedContent {
  url: string;
  title: string;
  author: string;
  date: string;
  originalContent: string;
  summary: string;
  keyTakeaways: string[];
  urduTranslation: string;
  timestamp: string;
}

interface ProcessingResultsProps {
  content: ProcessedContent;
}

export const ProcessingResults: React.FC<ProcessingResultsProps> = ({ content }) => {
  return (
    <div className="space-y-6">
      {/* Article Metadata */}
      <div className="glass-card rounded-2xl p-8 relative z-10">
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-3xl font-bold text-gradient-gold pr-4">
            {content.title}
          </h2>
          <a
            href={content.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 hover:bg-white/10 text-accent-gold border border-accent-gold/30"
          >
            <ExternalLink className="h-5 w-5" />
            View Original
          </a>
        </div>
        
        <div className="flex flex-wrap gap-6 text-base text-white/80">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-accent-gold" />
            <span className="font-medium">{content.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-accent-gold" />
            <span className="font-medium">{new Date(content.date).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="glass-card rounded-2xl p-8 relative z-10">
        <h3 className="text-2xl font-bold mb-6 text-gradient-navy">
          AI Summary
        </h3>
        <div className="prose max-w-none text-white/90">
          <p className="leading-relaxed whitespace-pre-line text-lg">{content.summary}</p>
        </div>
      </div>

      {/* Key Takeaways */}
      <div className="glass-card rounded-2xl p-8 relative z-10">
        <h3 className="text-2xl font-bold mb-6 text-gradient-maroon">
          Key Takeaways
        </h3>
        <ul className="space-y-4">
          {content.keyTakeaways.map((takeaway, index) => (
            <li key={index} className="flex items-start gap-4">
              <CheckCircle className="h-6 w-6 mt-1 flex-shrink-0 text-accent-gold" />
              <span className="text-white/90 text-base leading-relaxed">{takeaway}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Urdu Translation */}
      <div className="glass-card rounded-2xl p-8 relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <Globe className="h-6 w-6 text-accent-gold" />
          <h3 className="text-2xl font-bold text-gradient-gold">
            Urdu Translation
          </h3>
        </div>
        <div 
          className="prose max-w-none p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
          style={{ 
            direction: 'rtl',
            textAlign: 'right',
            color: 'rgba(255, 255, 255, 0.9)',
            fontFamily: 'Arial, sans-serif'
          }}
        >
          <p className="leading-relaxed whitespace-pre-line text-lg">{content.urduTranslation}</p>
        </div>
        
        <div className="mt-6 p-4 bg-accent-gold/10 rounded-xl border border-accent-gold/20">
          <p className="text-sm text-accent-gold font-medium">
            📝 Translation generated using AI-powered dictionary mapping
          </p>
        </div>
      </div>

      {/* Storage Confirmation */}
      <div className="glass-card rounded-2xl p-8 relative z-10">
        <h3 className="text-2xl font-bold mb-6 text-white">
          Storage Status
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-4 p-4 bg-green-500/10 rounded-xl border border-green-500/20">
            <CheckCircle className="h-6 w-6 text-green-400" />
            <div>
              <p className="font-semibold text-green-300 text-lg">Supabase</p>
              <p className="text-sm text-green-400">Summary & metadata stored</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-green-500/10 rounded-xl border border-green-500/20">
            <CheckCircle className="h-6 w-6 text-green-400" />
            <div>
              <p className="font-semibold text-green-300 text-lg">MongoDB</p>
              <p className="text-sm text-green-400">Full content archived</p>
            </div>
          </div>
        </div>
        <p className="mt-6 text-base text-white/70 font-medium">
          Processed at: {new Date(content.timestamp).toLocaleString()}
        </p>
      </div>
    </div>
  );
};