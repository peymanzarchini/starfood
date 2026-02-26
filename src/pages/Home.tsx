import Category from "@/components/layout/category/Category";
import Hero from "@/components/layout/hero/Hero";
import ProductList from "@/features/home/components/products/ProductList";
import { useState } from "react";

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  return (
    <main className="min-h-screen">
      <Hero />
      <Category selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />

      <div className="text-center -mb-10 pt-10">
        <h2 className="text-3xl font-black text-text-main">Popular Foods</h2>
        <div className="w-20 h-1.5 bg-primary mx-auto mt-2 rounded-full" />
      </div>
      <ProductList selectedCategory={selectedCategory} />
    </main>
  );
};

export default HomePage;
