"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Sparkles } from "lucide-react";

const formSchema = z.object({
  topic: z.string().min(1, {
    message: "Please enter a topic to explore quotes about.",
  }).max(50, {
    message: "Topic must be 50 characters or less.",
  }),
});

interface TopicFormProps {
  onSubmit: (topic: string) => void;
  isLoading?: boolean;
}

export function TopicForm({ onSubmit, isLoading = false }: TopicFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
    },
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    onSubmit(values.topic);
    form.reset();
  }

  return (
    <Card className="border-muted bg-gradient-to-br from-card to-card/80">
      <CardHeader className="text-center space-y-2">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
          <Sparkles className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Discover Inspiring Quotes
        </CardTitle>
        <CardDescription className="text-base text-muted-foreground max-w-md mx-auto">
          Enter any topic and we'll show you three carefully curated quotes to inspire and motivate you.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">
                    What topic interests you today?
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="e.g., motivation, success, happiness..."
                        {...field}
                        className="pl-10 h-12 text-base border-muted focus:border-primary transition-colors"
                        disabled={isLoading}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full h-12 text-base font-medium bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all duration-200 shadow-md hover:shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                  Finding Quotes...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Explore Quotes
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}