// Add new agents here — the explorer renders whatever is in this list.
export type Agent = {
  id: string;
  name: string;
  category: string;
  emoji: string;
  tagline: string;
  greeting: string;
};

export const agents: Agent[] = [
  { id: "real-estate", name: "Ava", category: "Real Estate", emoji: "🏡", tagline: "Find, view & book properties", greeting: "Hi, I'm Ava. Looking to buy, rent, or sell a home today?" },
  { id: "travel", name: "Leo", category: "Travel & Tourism", emoji: "✈️", tagline: "Plan trips, flights & hotels", greeting: "Hello! I'm Leo. Where would you like to travel next?" },
  { id: "grocery", name: "Mira", category: "Online Grocery", emoji: "🛒", tagline: "Order fresh groceries by voice", greeting: "Hey, I'm Mira. What would you like to add to your basket?" },
  { id: "restaurant", name: "Omar", category: "Food & Dining", emoji: "🍽️", tagline: "Reserve tables & order meals", greeting: "Welcome! I'm Omar. Hungry, or booking a table?" },
  { id: "health", name: "Sara", category: "Healthcare", emoji: "🩺", tagline: "Book doctor appointments", greeting: "Hi, I'm Sara. How can I help with your appointment?" },
  { id: "support", name: "Max", category: "Customer Support", emoji: "🎧", tagline: "24/7 help for any question", greeting: "Hi there, I'm Max. What can I help you with?" },
  { id: "geospatial", name: "Nova", category: "Geospatial", emoji: "🌍", tagline: "Maps, GIS & location FAQs", greeting: "Hi, I'm Nova. Ask me anything about maps, GIS data or location services." },
  { id: "ai-software", name: "Atlas", category: "AI Software", emoji: "🤖", tagline: "Product, pricing & API FAQs", greeting: "Hello, I'm Atlas. Questions about our AI platform, pricing or APIs?" },
  { id: "legal", name: "Lex", category: "Legal", emoji: "⚖️", tagline: "Contracts & legal FAQs", greeting: "Hi, I'm Lex. What legal question can I help you with today?" },
  { id: "matchmaking", name: "Ruby", category: "Matchmaking", emoji: "💞", tagline: "Find your life partner", greeting: "Hello, I'm Ruby. Tell me what you're looking for in a partner." },
];
