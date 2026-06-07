import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { cn } from "@/libs/utils";

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <Link
      to="/"
      className={cn(
        "flex items-center gap-2 sm:gap-3 group select-none transition-transform active:scale-95",
        className,
      )}
    >
      <div className="relative flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 bg-primary rounded-xl sm:rounded-2xl shadow-lg shadow-primary/30 rotate-[-5deg] group-hover:rotate-0 transition-all duration-500 shrink-0">
        <div className="absolute inset-0 bg-linear-to-tr from-black/20 to-transparent" />

        <span className="relative z-10 text-white font-black text-xl sm:text-2xl italic tracking-tighter">
          S
        </span>

        <div className="absolute -top-1 -right-1 bg-amber-400 p-0.5 sm:p-1 rounded-full shadow-sm group-hover:scale-110 transition-transform">
          <Star size={8} className="sm:w-2.5 sm:h-2.5 fill-white text-white" />
        </div>
      </div>

      <div className="hidden sm:flex flex-col leading-none">
        <div className="flex items-baseline font-black italic tracking-tighter text-xl sm:text-2xl">
          <span className="text-text-main group-hover:text-primary transition-colors hidden xs:block">
            Star
          </span>
          <span className="text-primary ml-0.5 xs:ml-0">Food</span>
        </div>

        <span className="text-[7px] sm:text-[8px] font-black uppercase tracking-[0.3em] text-text-muted mt-1 opacity-60 hidden md:block">
          Premium Quality
        </span>
      </div>
    </Link>
  );
};

export default Logo;
