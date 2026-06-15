/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight, Utensils } from "lucide-react";
import Container from "@/components/ui/Container";
import { cn } from "@/libs/utils";
import { useProducts, ProductCard } from "@/modules/product";
import type { GetProductsQuery } from "@/modules/product";

type SortByValue = NonNullable<GetProductsQuery["sortBy"]>;
type SortOrderValue = NonNullable<GetProductsQuery["sortOrder"]>;

interface SortOption {
  label: string;
  value: SortByValue;
  order: SortOrderValue;
}

const FoodsPage = () => {
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortByValue>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrderValue>("desc");
  const [page, setPage] = useState<number>(1);

  const sortOptions: SortOption[] = [
    { label: "Newest", value: "createdAt", order: "desc" },
    { label: "Price: Low", value: "price", order: "asc" },
    { label: "Price: High", value: "price", order: "desc" },
    { label: "Name", value: "name", order: "asc" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, sortBy, sortOrder]);

  const { data, isLoading, isError } = useProducts({
    page,
    limit: 8,
    search: debouncedSearch || undefined,
    sortBy,
    sortOrder,
    isAvailable: true,
  });

  return (
    <main className="min-h-screen bg-bg-page dark:bg-dark-bg-page py-12">
      <Container>
        <div className="flex flex-col items-center text-center mb-12">
          <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mb-4 rotate-3">
            <Utensils size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-text-main tracking-tight">
            Explore Our <span className="text-primary">Delicious Menu</span>
          </h1>
          <p className="text-text-muted mt-3 max-w-lg font-medium">
            Discover the best fast food in town, made with fresh ingredients.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 mb-12 items-center justify-between">
          <div className="relative w-full lg:max-w-md group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors">
              <Search size={20} />
            </div>
            <input
              type="text"
              placeholder="Search for pizza, burger, sushi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-bg-surface dark:bg-dark-bg-surface border border-slate-200 dark:border-slate-800 rounded-4xl shadow-sm outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all font-bold text-sm"
            />
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto pb-2 no-scrollbar">
            <div className="flex items-center gap-2 mr-2 text-text-muted font-bold text-sm shrink-0">
              <SlidersHorizontal size={18} /> Sort by:
            </div>
            {sortOptions.map((option) => (
              <button
                key={`${option.value}-${option.order}`}
                onClick={() => {
                  setSortBy(option.value);
                  setSortOrder(option.order);
                }}
                className={cn(
                  "px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all shrink-0 border cursor-pointer",
                  sortBy === option.value && sortOrder === option.order
                    ? "bg-primary border-primary text-white shadow-lg shadow-primary/40"
                    : "bg-bg-surface dark:bg-dark-bg-surface border-slate-200 dark:border-slate-800 text-text-muted hover:border-primary/50",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-95 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-[2.5rem]"
              />
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-20 bg-bg-surface dark:bg-dark-bg-surface rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
            <p className="text-red-500 font-bold">
              Failed to load the menu. Please check your connection.
            </p>
          </div>
        ) : data?.body.length === 0 ? (
          <div className="text-center py-20 bg-bg-surface dark:bg-dark-bg-surface rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
            <h3 className="text-xl font-black text-text-main mb-2">No menu items found</h3>
            <p className="text-text-muted">Try a different search term or reset your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {data?.body.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {!isLoading && data && data.totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-16">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={data.pageNumber <= 1} // محاسبه مستقیم از دیتای بک اند
              className="w-12 h-12 flex items-center justify-center rounded-full bg-bg-surface dark:bg-dark-bg-surface border border-slate-200 dark:border-slate-800 text-text-main disabled:opacity-30 transition-all hover:border-primary hover:text-primary shadow-sm active:scale-90 cursor-pointer"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: data.totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={cn(
                    "w-10 h-10 rounded-xl font-black transition-all cursor-pointer",
                    page === i + 1
                      ? "bg-primary text-white shadow-lg shadow-primary/40 scale-110"
                      : "text-text-muted hover:bg-primary/10 hover:text-primary",
                  )}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={data.pageNumber >= data.totalPages} // محاسبه مستقیم از دیتای بک اند
              className="w-12 h-12 flex items-center justify-center rounded-full bg-bg-surface dark:bg-dark-bg-surface border border-slate-200 dark:border-slate-800 text-text-main disabled:opacity-30 transition-all hover:border-primary hover:text-primary shadow-sm active:scale-90 cursor-pointer"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
      </Container>
    </main>
  );
};

export default FoodsPage;
