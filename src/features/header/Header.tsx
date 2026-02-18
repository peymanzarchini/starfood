/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  ShoppingCart,
  User as UserIcon,
  LogOut,
  Home,
  UtensilsCrossed,
  Info,
  UserCircle,
  Package,
  Heart,
  ChevronDown,
} from "lucide-react";

import { useAuth } from "@/features/auth/hooks/useAuth";
import Container from "@/components/ui/customs/Container";
import Logo from "@/components/ui/customs/Logo";
import ThemeToggle from "@/components/ui/customs/ThemeToggle";
import { cn } from "@/libs/utils";
import { useCart } from "../home/hooks/useCart";

const Header = () => {
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const { count } = useCart();

  // --- States ---
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // 1. Close menus when route changes
  useEffect(() => {
    setIsMobileOpen(false);
    setIsDropdownOpen(false);
  }, [location]);

  // 2. Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 3. Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { to: "/", label: "Home", icon: <Home size={18} /> },
    { to: "/foods", label: "Menu", icon: <UtensilsCrossed size={18} /> },
    { to: "/about-us", label: "About", icon: <Info size={18} /> },
  ];

  return (
    <>
      {/* --- Main Header Navigation --- */}
      <header
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-500 font-sans",
          isScrolled
            ? "bg-bg-page/80 dark:bg-dark-bg-page/80 backdrop-blur-xl py-3 shadow-lg border-b border-slate-200/50 dark:border-slate-800/50"
            : "bg-transparent py-6 border-b border-transparent",
        )}
      >
        <Container>
          <div className="flex items-center justify-between">
            {/* Left: Hamburger (Mobile) & Logo */}
            <div className="flex items-center gap-x-4">
              <button
                onClick={() => setIsMobileOpen(true)}
                className="lg:hidden p-2 text-text-main hover:bg-primary/10 hover:text-primary rounded-full transition-all cursor-pointer"
              >
                <Menu size={26} />
              </button>
              <Logo />
            </div>

            {/* Center: Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-x-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    cn(
                      "text-[15px] font-bold transition-all duration-300 hover:text-primary relative group",
                      isActive ? "text-primary" : "text-text-main",
                    )
                  }
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </NavLink>
              ))}
            </nav>

            {/* Right: Theme, Cart, User Actions */}
            <div className="flex items-center gap-x-2 md:gap-x-4">
              <div className="hidden sm:block">
                <ThemeToggle />
              </div>

              {/* Shopping Cart Button */}
              <Link
                to="/cart"
                className="relative p-2.5 bg-bg-surface dark:bg-dark-bg-surface shadow-sm hover:shadow-md rounded-full text-text-main transition-all cursor-pointer group"
              >
                <ShoppingCart size={22} className="group-hover:scale-110 transition-transform" />
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-bg-page animate-in zoom-in duration-300">
                    {count}
                  </span>
                )}
              </Link>

              {/* User Authentication UI */}
              {isAuthenticated ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={cn(
                      "flex items-center gap-x-2 p-1.5 pr-3 rounded-full transition-all duration-300 font-bold text-sm cursor-pointer group",
                      isDropdownOpen
                        ? "bg-primary text-white"
                        : "bg-primary/10 text-primary hover:bg-primary/20",
                    )}
                  >
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center border-2 border-white/20 group-hover:rotate-12 transition-transform">
                      <UserIcon size={18} />
                    </div>
                    <span className="hidden md:inline max-w-25 truncate">{user?.firstName}</span>
                    <ChevronDown
                      size={14}
                      className={cn(
                        "transition-transform duration-300",
                        isDropdownOpen && "rotate-180",
                      )}
                    />
                  </button>

                  {/* Desktop Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-60 bg-bg-surface dark:bg-dark-bg-surface border border-slate-100 dark:border-slate-800 rounded-4xl shadow-2xl p-2 animate-in fade-in slide-in-from-top-3 duration-300">
                      <div className="p-4 border-b border-slate-50 dark:border-slate-800 mb-2">
                        <p className="text-[10px] text-text-muted font-black uppercase tracking-[0.2em] mb-1">
                          Authenticated as
                        </p>
                        <p className="text-sm font-black text-text-main truncate italic">
                          {user?.email}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <Link
                          to="/profile"
                          className="flex items-center gap-3 p-3 hover:bg-primary/5 rounded-2xl text-sm font-bold text-text-main transition-colors group"
                        >
                          <UserCircle
                            size={18}
                            className="text-text-muted group-hover:text-primary transition-colors"
                          />{" "}
                          Profile Settings
                        </Link>
                        <Link
                          to="/orders"
                          className="flex items-center gap-3 p-3 hover:bg-primary/5 rounded-2xl text-sm font-bold text-text-main transition-colors group"
                        >
                          <Package
                            size={18}
                            className="text-text-muted group-hover:text-primary transition-colors"
                          />{" "}
                          My Orders
                        </Link>
                        <Link
                          to="/favorites"
                          className="flex items-center gap-3 p-3 hover:bg-primary/5 rounded-2xl text-sm font-bold text-text-main transition-colors group"
                        >
                          <Heart
                            size={18}
                            className="text-text-muted group-hover:text-primary transition-colors"
                          />{" "}
                          My Favorites
                        </Link>
                      </div>

                      <div className="mt-2 pt-2 border-t border-slate-50 dark:border-slate-800">
                        <button
                          onClick={() => logout()}
                          className="flex items-center gap-3 w-full p-4 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-2xl text-sm font-black transition-all cursor-pointer active:scale-95"
                        >
                          <LogOut size={18} /> Logout Session
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-6 py-2.5 bg-primary text-white font-black text-sm rounded-full shadow-lg shadow-primary/30 hover:bg-primary-hover hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  Join Us
                </Link>
              )}
            </div>
          </div>
        </Container>
      </header>

      {/* --- Mobile Sidebar Overlay --- */}
      <div
        className={cn(
          "fixed inset-0 bg-text-main/40 backdrop-blur-md z-60 transition-opacity duration-500 lg:hidden",
          isMobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
        onClick={() => setIsMobileOpen(false)}
      />

      {/* --- Mobile Sidebar Drawer --- */}
      <aside
        className={cn(
          "fixed top-4 left-4 bottom-4 w-75 bg-bg-surface/95 dark:bg-dark-bg-surface/95 backdrop-blur-2xl z-70 shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] lg:hidden rounded-[2.5rem] flex flex-col overflow-hidden border border-white/20",
          isMobileOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0",
        )}
      >
        {/* Drawer Header */}
        <div className="p-8 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
          <Logo />
          <button
            onClick={() => setIsMobileOpen(false)}
            className="w-10 h-10 flex items-center justify-center bg-bg-soft dark:bg-dark-bg-soft rounded-full text-text-muted hover:text-primary transition-all cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Menu Links */}
        <div className="flex-1 px-4 py-8 space-y-2 overflow-y-auto custom-scrollbar">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-x-4 p-4 rounded-2xl font-bold transition-all duration-300",
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/30 translate-x-2"
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
                className="flex items-center gap-x-4 p-4 text-text-main font-bold hover:bg-primary/5 rounded-2xl transition-all hover:translate-x-2"
              >
                <UserCircle size={20} className="text-primary" /> Profile Settings
              </NavLink>
              <NavLink
                to="/orders"
                className="flex items-center gap-x-4 p-4 text-text-main font-bold hover:bg-primary/5 rounded-2xl transition-all hover:translate-x-2"
              >
                <Package size={20} className="text-primary" /> My Orders
              </NavLink>
            </>
          )}
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-8 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800">
          <div className="mb-6 flex justify-center lg:hidden">
            <ThemeToggle />
          </div>

          {isAuthenticated ? (
            <button
              onClick={() => logout()}
              className="flex items-center justify-center gap-x-3 w-full p-4 bg-white dark:bg-slate-800 text-red-500 rounded-2xl font-black shadow-sm hover:bg-red-500 hover:text-white transition-all cursor-pointer active:scale-95"
            >
              <LogOut size={20} /> Sign Out
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center justify-center w-full p-4 bg-primary text-white rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform cursor-pointer"
            >
              Get Started
            </Link>
          )}
        </div>
      </aside>

      {/* Spacer to push page content below the fixed header */}
      <div className="h-24 lg:h-28" />
    </>
  );
};

export default Header;
