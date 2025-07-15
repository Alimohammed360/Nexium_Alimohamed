import React, { useState } from 'react';
import { Link, Send } from 'lucide-react';

interface URLInputProps {
  onSubmit: (url: string) => void;
  disabled?: boolean;
}

export const URLInput: React.FC<URLInputProps> = ({ onSubmit, disabled }) => {
  const [url, setUrl] = useState('');
  const [isValid, setIsValid] = useState(false);

  const validateURL = (input: string): boolean => {
    try {
      const urlObj = new URL(input);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    setIsValid(validateURL(newUrl));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid && !disabled) {
      onSubmit(url);
    }
  };

  return (
    <div className="glass-card rounded-2xl p-8 relative z-10 hover:shadow-glass-lg transition-all duration-300">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="url" className="block text-lg font-semibold mb-3 text-white">
            Blog URL
          </label>
          <div className="relative">
            <Link className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-accent-gold" />
            <input
              type="url"
              id="url"
              value={url}
              onChange={handleInputChange}
              placeholder="https://example.com/blog-post"
              className="w-full pl-14 pr-6 py-4 bg-white/10 backdrop-blur-sm border-2 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-accent-gold focus:border-accent-gold transition-all duration-300 text-lg"
              style={{ 
                borderColor: url ? (isValid ? '#d4af37' : '#e11d48') : 'rgba(255, 255, 255, 0.3)'
              }}
              disabled={disabled}
              required
            />
          </div>
          {url && !isValid && (
            <p className="mt-3 text-sm text-accent-rose font-medium">
              Please enter a valid URL (must start with http:// or https://)
            </p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={!isValid || disabled}
          className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
          style={{ 
            background: isValid && !disabled 
              ? 'linear-gradient(135deg, #d4af37, #800000, #000080)' 
              : 'rgba(255, 255, 255, 0.1)',
            boxShadow: isValid && !disabled ? '0 8px 24px rgba(212, 175, 55, 0.4)' : 'none'
          }}
        >
          <Send className="h-6 w-6" />
          Process Blog Content
        </button>
      </form>
    </div>
  );
};