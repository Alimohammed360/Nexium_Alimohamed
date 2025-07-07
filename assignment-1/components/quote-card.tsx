"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "@/data/quotes";
import { Badge } from "@/components/ui/badge";
import { QuoteIcon } from "lucide-react";

interface QuoteCardProps {
  quote: Quote;
  index: number;
}

export function QuoteCard({ quote, index }: QuoteCardProps) {
  return (
    <Card className="h-full  group hover:shadow-lg transition-all duration-300 border-muted hover:border-primary/20 bg-gradient-to-br from-card to-card/80">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-start gap-3 mb-4">
          <QuoteIcon className="h-6 w-6 text-primary/60 mt-1 flex-shrink-0 group-hover:text-primary transition-colors" />
          <blockquote className="text-lg leading-relaxed text-foreground/90 font-medium flex-1">
            "{quote.text}"
          </blockquote>
        </div>
        
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/50">
          <div>
            <cite className="text-sm font-semibold text-foreground not-italic">
              — {quote.author}
            </cite>
          </div>
          <Badge variant="secondary" className="text-xs font-medium">
            {quote.category}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}