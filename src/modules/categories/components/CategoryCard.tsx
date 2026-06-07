import { cn } from "@/libs/utils";
import type { CategoryCardProps } from "../types";

const CategoryCard = ({ category, isSelected, onClick }: CategoryCardProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-3 w-28 shrink-0 snap-start py-5 px-3 rounded-3xl transition-all duration-300 border-2 cursor-pointer group relative overflow-hidden",
        isSelected
          ? "bg-primary border-primary text-white shadow-xl shadow-primary/30 scale-105"
          : "bg-white dark:bg-dark-bg-surface border-slate-100 dark:border-slate-800 hover:border-primary/50 text-text-main",
      )}
    >
      <div
        className={cn(
          "w-16 h-16 rounded-2xl overflow-hidden flex items-center justify-center transition-all duration-300",
          isSelected
            ? "bg-white/20 backdrop-blur-sm"
            : "bg-slate-50 dark:bg-slate-800 group-hover:bg-primary/10",
        )}
      >
        {category.imageUrl ? (
          <img
            src={category.imageUrl}
            alt={category.name}
            className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <span className="text-2xl">🍔</span>
        )}
      </div>

      <span
        className={cn(
          "text-xs font-black uppercase tracking-wider transition-colors line-clamp-1",
          isSelected ? "text-white" : "text-text-muted group-hover:text-primary",
        )}
      >
        {category.name}
      </span>

      {isSelected && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-white rounded-t-full" />
      )}
    </button>
  );
};

export default CategoryCard;
