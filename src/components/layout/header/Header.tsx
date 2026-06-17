import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, ShoppingCart } from "lucide-react";
import { useAuth } from "@/modules/auth";
import { useCart } from "@/modules/cart";
import UserMenu from "./UserMenu";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { cn } from "@/libs/utils";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const { isAuthenticated } = useAuth();
  const { count } = useCart();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/foods", label: "Menu" },
    { to: "/about-us", label: "About Us" },
    { to: "/contact-us", label: "Contact Us" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-500",
          isScrolled
            ? "bg-bg-page/80 backdrop-blur-xl py-3 shadow-lg border-b border-slate-200/50 dark:border-slate-800/50"
            : "bg-transparent py-6 border-b border-transparent",
        )}
      >
        <Container>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 text-text-main hover:bg-primary/10 hover:text-primary rounded-full transition-all cursor-pointer"
              >
                <Menu size={26} />
              </button>
              <Logo />
            </div>

            <nav className="hidden lg:flex items-center gap-x-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    cn(
                      "text-base font-bold transition-all duration-300 hover:text-primary relative group",
                      isActive ? "text-primary" : "text-text-main",
                    )
                  }
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-x-2 md:gap-x-4">
              <ThemeToggle />
              <Link
                to="/cart"
                className="relative p-2.5 bg-bg-surface dark:bg-dark-bg-surface shadow-sm rounded-full text-text-main transition-all cursor-pointer group"
              >
                <ShoppingCart size={22} className="group-hover:scale-110 transition-transform" />
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-bg-page animate-in zoom-in">
                    {count}
                  </span>
                )}
              </Link>

              {isAuthenticated ? (
                <UserMenu />
              ) : (
                <Link
                  to="/login"
                  className="px-6 py-2.5 bg-primary text-white font-black text-sm rounded-full shadow-lg hover:scale-105 transition-all cursor-pointer"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </Container>
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      <div className="h-24 lg:h-28" />
    </>
  );
};

export default Header;
