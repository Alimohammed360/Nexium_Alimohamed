import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorDisplayProps {
  error: string;
  onRetry: () => void;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, onRetry }) => {
  return (
    <div className="glass-card rounded-2xl p-8 border-accent-rose/30 relative z-10">
      <div className="flex items-start gap-4">
        <AlertCircle className="h-8 w-8 text-accent-rose flex-shrink-0 mt-1" />
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-3">
            Processing Error
          </h3>
          <p className="text-white/90 mb-6 text-base leading-relaxed">
            {error}
          </p>
          <button
            onClick={onRetry}
            className="flex items-center gap-3 px-6 py-3 bg-accent-rose/20 text-white rounded-xl hover:bg-accent-rose/30 transition-all duration-300 font-semibold border border-accent-rose/40"
          >
            <RefreshCw className="h-5 w-5" />
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};