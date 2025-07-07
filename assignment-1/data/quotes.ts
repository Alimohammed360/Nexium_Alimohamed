export interface Quote {
  id: number;
  text: string;
  author: string;
  category: string;
}

export const quotes: Quote[] = [
  {
    id: 1,
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: "motivation"
  },
  {
    id: 2,
    text: "Life is what happens to you while you're busy making other plans.",
    author: "John Lennon",
    category: "life"
  },
  {
    id: 3,
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    category: "dreams"
  },
  {
    id: 4,
    text: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle",
    category: "motivation"
  },
  {
    id: 5,
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    category: "success"
  },
  {
    id: 6,
    text: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins",
    category: "motivation"
  },
  {
    id: 7,
    text: "In the end, we will remember not the words of our enemies, but the silence of our friends.",
    author: "Martin Luther King Jr.",
    category: "friendship"
  },
  {
    id: 8,
    text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
    author: "Ralph Waldo Emerson",
    category: "life"
  },
  {
    id: 9,
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
    category: "innovation"
  },
  {
    id: 10,
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
    category: "action"
  },
  {
    id: 11,
    text: "Don't let yesterday take up too much of today.",
    author: "Will Rogers",
    category: "motivation"
  },
  {
    id: 12,
    text: "You learn more from failure than from success. Don't let it stop you. Failure builds character.",
    author: "Unknown",
    category: "failure"
  },
  {
    id: 13,
    text: "If you are working on something that you really care about, you don't have to be pushed. The vision pulls you.",
    author: "Steve Jobs",
    category: "passion"
  },
  {
    id: 14,
    text: "People who are crazy enough to think they can change the world, are the ones who do.",
    author: "Rob Siltanen",
    category: "change"
  },
  {
    id: 15,
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
    category: "belief"
  },
  {
    id: 16,
    text: "The only person you are destined to become is the person you decide to be.",
    author: "Ralph Waldo Emerson",
    category: "identity"
  },
  {
    id: 17,
    text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
    author: "Ralph Waldo Emerson",
    category: "inner strength"
  },
  {
    id: 18,
    text: "The mind is everything. What you think you become.",
    author: "Buddha",
    category: "mindset"
  },
  {
    id: 19,
    text: "Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do.",
    author: "Mark Twain",
    category: "regret"
  },
  {
    id: 20,
    text: "Life is 10% what happens to you and 90% how you react to it.",
    author: "Charles R. Swindoll",
    category: "perspective"
  }
];

export function getRandomQuotes(count: number = 3): Quote[] {
  const shuffled = [...quotes].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}