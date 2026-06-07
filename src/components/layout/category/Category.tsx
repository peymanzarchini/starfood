import Container from "@/components/ui/Container";
import { useActiveCategories } from "@/features/home/hooks/useGategories";
import { cn } from "@/libs/utils";
import LoadingSpinner from "@/components/ui/Loading";

interface CategorySectionProps {
  selectedCategory: number | null;
  onSelectCategory: (id: number | null) => void;
}

const Category = ({ selectedCategory, onSelectCategory }: CategorySectionProps) => {
  const { data: categories, isLoading, isError } = useActiveCategories();

  if (isError) return null;

  return (
    <section className="py-12 bg-bg-page">
      <Container>
        <div className="flex flex-col gap-y-6">
          {/* Header */}
          <div className="flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-black text-text-main tracking-tight italic">
              Delicious <span className="text-primary">Categories</span>
            </h2>
            <div className="w-12 h-1 bg-primary mt-2 rounded-full opacity-80" />
          </div>

          {/* Categories List Container - Flex with Scroll */}
          <div
            className="
              flex items-center gap-5 
              overflow-x-auto 
              pt-12 pb-6 
              snap-x snap-mandatory 
              scroll-smooth
            "
          >
            <div className="w-1 shrink-0 md:hidden" />

            {/* "All" Category */}
            <div className="snap-center shrink-0">
              <button
                onClick={() => onSelectCategory(null)}
                className={cn(
                  "shrink-0 flex flex-col items-center justify-center w-28 h-32 rounded-[2.5rem] transition-all duration-500 border cursor-pointer",
                  selectedCategory === null
                    ? "bg-primary border-primary shadow-2xl shadow-primary/40 -translate-y-6 scale-110"
                    : "bg-bg-surface dark:bg-dark-bg-surface border-slate-200 dark:border-slate-800 hover:border-primary/20",
                )}
              >
                <div
                  className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center text-xs font-black mb-3 transition-all duration-500 shadow-sm",
                    selectedCategory === null
                      ? "bg-white text-primary"
                      : "bg-bg-soft dark:bg-dark-bg-soft text-text-muted",
                  )}
                >
                  ALL
                </div>
                <span
                  className={cn(
                    "text-[10px] font-black uppercase tracking-widest",
                    selectedCategory === null ? "text-white" : "text-text-muted",
                  )}
                >
                  Menu
                </span>
              </button>
            </div>

            {/* Loading State */}
            {isLoading ? (
              <div className="w-full flex-1 flex justify-center items-center h-32">
                <LoadingSpinner size="lg" label="Loading..." variant="pizza" />
              </div>
            ) : (
              // Categories
              categories?.map((category) => (
                <div key={category.id} className="snap-center shrink-0">
                  <button
                    onClick={() => onSelectCategory(category.id)}
                    className={cn(
                      "shrink-0 flex flex-col items-center justify-center w-28 h-32 rounded-[2.5rem] transition-all duration-500 border cursor-pointer group/item",
                      selectedCategory === category.id
                        ? "bg-primary border-primary shadow-2xl shadow-primary/40 -translate-y-6 scale-110"
                        : "bg-bg-surface dark:bg-dark-bg-surface border-slate-200 dark:border-slate-800 hover:border-primary/20",
                    )}
                  >
                    <div
                      className={cn(
                        "w-14 h-14 rounded-full overflow-hidden p-2.5 mb-3 transition-all duration-500 shadow-sm",
                        selectedCategory === category.id
                          ? "bg-white"
                          : "bg-bg-soft dark:bg-dark-bg-soft",
                      )}
                    >
                      <img
                        src={category.imageUrl || "/placeholder-food.png"}
                        alt={category.name}
                        className="w-full h-full object-contain group-hover/item:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <span
                      className={cn(
                        "text-[10px] font-black uppercase tracking-widest text-center px-2 line-clamp-1",
                        selectedCategory === category.id ? "text-white" : "text-text-muted",
                      )}
                    >
                      {category.name}
                    </span>
                  </button>
                </div>
              ))
            )}

            <div className="w-1 shrink-0 md:hidden" />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Category;
