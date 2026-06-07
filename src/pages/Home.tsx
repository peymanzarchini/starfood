import { CategorySection } from "@/modules/categories";
import Hero from "@/components/layout/hero/Hero";
import { useState } from "react";
import { ProductList } from "@/modules/product";

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  return (
    <main className="min-h-screen">
      <Hero />
      <CategorySection selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />

      <div className="text-center -mb-10 pt-10">
        <h2 className="text-3xl font-black text-text-main">Popular Foods</h2>
        <div className="w-20 h-1.5 bg-primary mx-auto mt-2 rounded-full" />
      </div>

      <ProductList queryOptions={{ categoryId: selectedCategory || undefined, limit: 12 }} />
    </main>
  );
};

export default HomePage;
