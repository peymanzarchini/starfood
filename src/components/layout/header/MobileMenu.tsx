import { Link, NavLink } from "react-router-dom";
import {
  X,
  Home,
  UtensilsCrossed,
  Info,
  UserCircle,
  Package,
  LogOut,
  PhoneCall,
} from "lucide-react";
import { useAuth } from "@/modules/auth";
import { cn } from "@/libs/utils";
import Logo from "@/components/ui/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { isAuthenticated, logout } = useAuth();

  const links = [
    { to: "/", label: "Home", icon: <Home size={20} /> },
    { to: "/foods", label: "Our Menu", icon: <UtensilsCrossed size={20} /> },
    { to: "/about-us", label: "About Us", icon: <Info size={20} /> },
    { to: "/contact-us", label: "Contact", icons: <PhoneCall size={20} /> },
  ];

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-60 transition-opacity duration-500 lg:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
      />

      {/* Floating Side Drawer (Tailwind v4 style) */}
      <aside
        className={cn(
          "fixed top-4 left-4 bottom-4 w-72 bg-bg-surface/95 dark:bg-dark-bg-surface/95 backdrop-blur-2xl z-70 shadow-2xl transition-all duration-500 ease-out lg:hidden rounded-4xl flex flex-col overflow-hidden border border-white/20",
          isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0",
        )}
      >
        {/* Header */}
        <div className="p-6 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
          <Logo />
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center bg-bg-soft dark:bg-dark-bg-soft rounded-full text-text-muted hover:text-primary transition-all cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-4 p-4 rounded-2xl font-bold transition-all duration-300",
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/20 translate-x-2"
                    : "text-text-main hover:bg-primary/5 hover:translate-x-2",
                )
              }
            >
              {link.icon} {link.label}
            </NavLink>
          ))}

          {isAuthenticated && (
            <>
              <div className="h-px bg-slate-100 dark:bg-slate-800 my-4 mx-4" />
              <NavLink
                to="/profile"
                onClick={onClose}
                className="flex items-center gap-4 p-4 text-text-main font-bold hover:bg-primary/5 rounded-2xl transition-all hover:translate-x-2"
              >
                <UserCircle size={20} className="text-primary" /> Profile Settings
              </NavLink>
              <NavLink
                to="/orders"
                onClick={onClose}
                className="flex items-center gap-4 p-4 text-text-main font-bold hover:bg-primary/5 rounded-2xl transition-all hover:translate-x-2"
              >
                <Package size={20} className="text-primary" /> My Orders
              </NavLink>
            </>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800">
          <div className="mb-6 flex justify-center">
            <ThemeToggle />
          </div>

          {isAuthenticated ? (
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="flex items-center justify-center gap-3 w-full p-4 bg-white dark:bg-slate-800 text-red-500 rounded-2xl font-black shadow-sm hover:bg-red-500 hover:text-white transition-all cursor-pointer active:scale-95"
            >
              <LogOut size={20} /> Sign Out
            </button>
          ) : (
            <Link
              to="/login"
              onClick={onClose}
              className="flex items-center justify-center w-full p-4 bg-primary text-white rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-105 transition-transform cursor-pointer"
            >
              Get Started
            </Link>
          )}
        </div>
      </aside>
    </>
  );
};

export default MobileMenu;
