import { Utensils, Pizza } from "lucide-react";
import { cn } from "@/libs/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  label?: string;
  className?: string;
  variant?: "burger" | "pizza" | "utensils";
}

const LoadingSpinner = ({
  size = "md",
  label,
  className,
  variant = "utensils",
}: LoadingSpinnerProps) => {
  const sizeMap = {
    sm: { container: "w-8 h-8", icon: 16, ring: "border-2" },
    md: { container: "w-16 h-16", icon: 28, ring: "border-3" },
    lg: { container: "w-24 h-24", icon: 40, ring: "border-4" },
    xl: { container: "w-32 h-32", icon: 56, ring: "border-[6px]" },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
      <div className={cn("relative flex items-center justify-center", currentSize.container)}>
        <div
          className={cn(
            "absolute inset-0 rounded-full border-solid border-primary/20 animate-spin",
            currentSize.ring,
            "border-t-primary",
          )}
        />

        <div
          className={cn(
            "absolute inset-1 rounded-full border-dotted border-primary/40 animate-spin-slow",
            currentSize.ring,
          )}
        />

        {/* آیکون مرکزی با انیمیشن نبضی (Pulse) */}
        <div className="relative z-10 text-primary animate-bounce-gentle">
          {variant === "pizza" && <Pizza size={currentSize.icon} />}
          {variant === "utensils" && <Utensils size={currentSize.icon} />}
          {variant === "burger" && (
            <svg
              width={currentSize.icon}
              height={currentSize.icon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 15V17C7 18.6569 8.34315 20 10 20H14C15.6569 20 17 18.6569 17 17V15" />
              <path d="M2 12C2 13.6569 3.34315 15 5 15H19C20.6569 15 22 13.6569 22 12" />
              <path d="M5 12V12C5 7.02944 9.02944 3 14 3H14C18.9706 3 23 7.02944 23 12V12" />
              <path d="M2 12C2 12 5 11 12 11C19 11 22 12 22 12" />
            </svg>
          )}
        </div>
      </div>

      {label && (
        <p className="text-sm font-black text-text-muted uppercase tracking-[0.2em] animate-pulse">
          {label}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
