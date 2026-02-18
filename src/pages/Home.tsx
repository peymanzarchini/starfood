import CategorySection from "@/features/home/components/Category";
import Hero from "@/features/home/components/Hero";
import ProductList from "@/features/home/components/products/ProductList";
import { useState } from "react";

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  return (
    <main className="min-h-screen">
      <Hero />
      <CategorySection selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />

      <div className="">
        <div className="text-center -mb-10 pt-10">
          <h2 className="text-3xl font-black text-text-main">Popular Foods</h2>
          <div className="w-20 h-1.5 bg-primary mx-auto mt-2 rounded-full" />
        </div>
        <ProductList selectedCategory={selectedCategory} />
      </div>
    </main>
  );
};

export default HomePage;
