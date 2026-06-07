import LoadingSpinner from "@/components/ui/Loading";
import Container from "@/components/ui/Container";
import { cn } from "@/libs/utils";
import { LayoutGrid } from "lucide-react";
import { useActiveCategories } from "../hooks/useActiveCategories";
import CategoryCard from "./CategoryCard";

interface CategorySectionProps {
  selectedCategory: number | null;
  onSelectCategory: (id: number | null) => void;
}

export const CategorySection = ({ selectedCategory, onSelectCategory }: CategorySectionProps) => {
  const { data: categories, isLoading } = useActiveCategories();

  return (
    <section className="py-12 bg-bg-page">
      <Container>
        <div className="flex flex-col gap-y-8">
          {/* Header */}
          <div>
            <h2 className="text-3xl font-black text-text-main tracking-tight">
              Browse <span className="text-primary">Menu</span>
            </h2>
            <p className="text-text-muted text-sm font-medium mt-1">Pick your favorite category</p>
          </div>

          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-linear-to-r from-bg-page to-transparent z-10 pointer-events-none lg:hidden" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-linear-to-l from-bg-page to-transparent z-10 pointer-events-none lg:hidden" />

            <div
              className="flex items-center gap-4 overflow-x-auto pb-4 pt-2 px-4 no-scrollbar scroll-smooth snap-x snap-mandatory max-w-full"
              style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-x" }}
            >
              <button
                onClick={() => onSelectCategory(null)}
                className={cn(
                  "flex flex-col items-center justify-center gap-3 w-28 shrink-0 snap-start py-5 px-3 rounded-3xl transition-all duration-300 border-2 cursor-pointer group relative overflow-hidden",
                  selectedCategory === null
                    ? "bg-primary border-primary text-white shadow-xl shadow-primary/30 scale-105"
                    : "bg-white dark:bg-dark-bg-surface border-slate-100 dark:border-slate-800 hover:border-primary/50 text-text-main",
                )}
              >
                <div
                  className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300",
                    selectedCategory === null
                      ? "bg-white/20 backdrop-blur-sm"
                      : "bg-slate-50 dark:bg-slate-800 group-hover:bg-primary/10",
                  )}
                >
                  <LayoutGrid
                    size={32}
                    className={cn(
                      "transition-colors duration-300",
                      selectedCategory === null
                        ? "text-white"
                        : "text-text-muted group-hover:text-primary",
                    )}
                  />
                </div>

                <span
                  className={cn(
                    "text-xs font-black uppercase tracking-wider transition-colors",
                    selectedCategory === null
                      ? "text-white"
                      : "text-text-muted group-hover:text-primary",
                  )}
                >
                  All Menu
                </span>

                {selectedCategory === null && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-white rounded-t-full" />
                )}
              </button>

              {isLoading ? (
                <div className="flex-1 flex justify-center py-8">
                  <LoadingSpinner size="md" label="Loading..." variant="pizza" />
                </div>
              ) : (
                categories?.map((category) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    isSelected={selectedCategory === category.id}
                    onClick={() => onSelectCategory(category.id)}
                  />
                ))
              )}

              <div className="w-4 shrink-0 lg:hidden" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
