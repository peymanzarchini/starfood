import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { User as UserIcon, LogOut, UserCircle, Package, Heart, ChevronDown } from "lucide-react";
import { useAuth } from "@/modules/auth";
import { cn } from "@/libs/utils";

const UserMenu = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-x-2 p-1.5 rounded-full transition-all duration-300 font-bold text-sm cursor-pointer group",
          isOpen ? "bg-primary text-white" : "bg-primary/10 text-primary hover:bg-primary/20",
        )}
      >
        <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center border-2 border-white/20">
          <UserIcon size={18} />
        </div>
        <span className="hidden md:inline max-w-25 truncate">{user?.firstName}</span>
        <ChevronDown size={14} className={cn("transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-60 bg-bg-surface border border-slate-100 dark:border-slate-800 rounded-4xl shadow-2xl p-2 z-50 transition-all">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800/50 mb-2">
            <p className="text-[10px] text-text-muted font-black uppercase tracking-widest mb-1">
              Authenticated as
            </p>
            <p className="text-sm font-black text-text-main truncate italic">{user?.email}</p>
          </div>
          <div className="space-y-1">
            <Link
              to={"/profile"}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-3.5 hover:bg-primary/5 rounded-2xl text-sm font-bold text-text-main transition-colors group"
            >
              <UserCircle
                size={18}
                className="text-text-muted group-hover:text-primary transition-colors"
              />
              Profile Settings
            </Link>
            <Link
              to="/orders"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-3.5 hover:bg-primary/5 rounded-2xl text-sm font-bold text-text-main transition-colors group"
            >
              <Package
                size={18}
                className="text-text-muted group-hover:text-primary transition-colors"
              />
              My Orders
            </Link>
            <Link
              to="/favorites"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-3.5 hover:bg-primary/5 rounded-2xl text-sm font-bold text-text-main transition-colors group"
            >
              <Heart
                size={18}
                className="text-text-muted group-hover:text-primary transition-colors"
              />
              My Favorites
            </Link>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/50">
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="flex items-center gap-3 w-full p-4 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-2xl text-sm font-black transition-all cursor-pointer group active:scale-95"
            >
              <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
              Logout Session
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
