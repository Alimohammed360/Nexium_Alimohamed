import React, { useState } from 'react';
import { URLInput } from './URLInput';
import { ProcessingResults } from './ProcessingResults';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorDisplay } from './ErrorDisplay';
import { blogService } from '../services/blogService';
import { translationService } from '../services/translationService';
import { storageService } from '../services/storageService';

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

export const BlogProcessor: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [processedContent, setProcessedContent] = useState<ProcessedContent | null>(null);

  const handleProcessBlog = async (url: string) => {
    setIsProcessing(true);
    setError(null);
    setProcessedContent(null);

    try {
      // Step 1: Scrape blog content
      const scrapedContent = await blogService.scrapeContent(url);
      
      // Step 2: Generate AI summary
      const summary = await blogService.generateSummary(scrapedContent.content);
      
      // Step 3: Translate to Urdu
      const urduTranslation = await translationService.translateToUrdu(summary.text);
      
      // Step 4: Prepare processed content
      const processedData: ProcessedContent = {
        url,
        title: scrapedContent.title,
        author: scrapedContent.author,
        date: scrapedContent.date,
        originalContent: scrapedContent.content,
        summary: summary.text,
        keyTakeaways: summary.takeaways,
        urduTranslation,
        timestamp: new Date().toISOString()
      };

      // Step 5: Store in databases
      await storageService.saveToSupabase(processedData);
      await storageService.saveToMongoDB(processedData);

      setProcessedContent(processedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      <URLInput onSubmit={handleProcessBlog} disabled={isProcessing} />
      
      {isProcessing && <LoadingSpinner />}
      
      {error && <ErrorDisplay error={error} onRetry={() => setError(null)} />}
      
      {processedContent && <ProcessingResults content={processedContent} />}
    </div>
  );
};