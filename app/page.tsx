import { MoveRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto px-6">
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
          Welcome to
          <span className="block text-blue-600 mt-2 dark:text-blue-400">FoodDelivery</span>
        </h1>
        
        <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
          Delicious food delivered right to your doorstep. 
          Browse our menu and order your favorite meals with just a few clicks.
        </p>
        
        <Link 
          href="/menu"
          className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-primary-foreground font-semibold text-lg rounded-full hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-lg dark:hover:shadow-blue-500/25 gap-2"
        >
          View Menu
          <MoveRight />
        </Link>
      </div>
    </div>
  );
}
