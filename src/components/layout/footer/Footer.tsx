import { Link } from "react-router-dom";
import { Star, Facebook, Instagram, Twitter, Phone, MapPin } from "lucide-react";
import Container from "@/components/ui/Container";

const Footer = () => {
  return (
    <footer className="bg-bg-surface dark:bg-dark-bg-surface border-t border-slate-100 dark:border-slate-800 mt-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          {/* Brand & Social */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="relative flex items-center justify-center w-10 h-10 bg-primary rounded-xl shadow-lg shadow-primary/30 rotate-[-5deg]">
                <span className="relative z-10 text-white font-black text-xl italic">S</span>
              </div>
              <span className="font-black italic tracking-tighter text-xl text-text-main">
                StarFood
              </span>
            </Link>
            <p className="text-sm text-text-muted font-medium leading-relaxed">
              Delivering happiness one bite at a time. Experience the best fast food in town, made
              with love and premium ingredients.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-bg-soft dark:bg-dark-bg-soft rounded-xl flex items-center justify-center text-text-muted hover:bg-primary hover:text-white transition-all cursor-pointer"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-bg-soft dark:bg-dark-bg-soft rounded-xl flex items-center justify-center text-text-muted hover:bg-primary hover:text-white transition-all cursor-pointer"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-bg-soft dark:bg-dark-bg-soft rounded-xl flex items-center justify-center text-text-muted hover:bg-primary hover:text-white transition-all cursor-pointer"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-black text-text-main uppercase tracking-widest text-xs mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-sm font-bold text-text-muted hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/foods"
                  className="text-sm font-bold text-text-muted hover:text-primary transition-colors"
                >
                  Our Menu
                </Link>
              </li>
              <li>
                <Link
                  to="/about-us"
                  className="text-sm font-bold text-text-muted hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact-us"
                  className="text-sm font-bold text-text-muted hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-black text-text-main uppercase tracking-widest text-xs mb-6">
              Policies
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-sm font-bold text-text-muted hover:text-primary transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm font-bold text-text-muted hover:text-primary transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm font-bold text-text-muted hover:text-primary transition-colors"
                >
                  Refund Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm font-bold text-text-muted hover:text-primary transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-black text-text-main uppercase tracking-widest text-xs mb-6">
              Get In Touch
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary shrink-0 mt-1" />
                <span className="text-sm font-bold text-text-muted">
                  123 Main Street, New York, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary shrink-0" />
                <span className="text-sm font-bold text-text-muted">+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-100 dark:border-slate-800 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-bold text-text-muted">
            © {new Date().getFullYear()} StarFood. All rights reserved.
          </p>
          <p className="text-xs font-bold text-text-muted flex items-center gap-1">
            Made with <Star size={12} className="text-primary fill-primary" /> for food lovers
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
