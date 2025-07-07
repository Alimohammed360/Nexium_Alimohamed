"use client";

import { useState, useEffect } from "react";
import { TopicForm } from "@/components/topic-form";
import { QuoteCard } from "@/components/quote-card";
import { getRandomQuotes, Quote } from "@/data/quotes";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { RefreshCw } from "lucide-react";
import { useRef } from "react";

export default function Home() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [currentTopic, setCurrentTopic] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const quotesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuotes(getRandomQuotes(3));
  }, []);

  const handleTopicSubmit = async (topic: string) => {
    setIsLoading(true);
    setCurrentTopic(topic);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newQuotes = getRandomQuotes(3);
    setQuotes(newQuotes);
    setIsLoading(false);
    
    setTimeout(() => {
      quotesRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
            Quote Explorer
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover wisdom, inspiration, and insights through carefully curated quotes. 
            Enter a topic that speaks to you and let the words of great minds guide your journey.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <TopicForm onSubmit={handleTopicSubmit} isLoading={isLoading} />
        </div>

        {currentTopic && (
          <div className="max-w-2xl mx-auto mb-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full border border-border">
              <RefreshCw className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Exploring quotes about</span>
              <Badge variant="outline" className="font-medium">
                {currentTopic}
              </Badge>
            </div>
          </div>
        )}

        <Separator className="mb-12 max-w-2xl mx-auto" />

        <div ref={quotesRef} className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-semibold mb-2">
              {currentTopic ? `Quotes About "${currentTopic}"` : "Featured Quotes"}
            </h2>
            <p className="text-muted-foreground">
              {isLoading ? "Curating the perfect quotes for you..." : "Three handpicked quotes to inspire your day"}
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-muted/50 rounded-lg h-48 border border-border"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
              {quotes.map((quote, index) => (
                <div
                  key={quote.id}
                  className="animate-in fade-in-50 slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <QuoteCard quote={quote} index={index} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}