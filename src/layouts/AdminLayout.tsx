import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ClipboardList,
  Users,
  LogOut,
  Menu,
  X,
  Star,
  ExternalLink,
} from "lucide-react";
import { useAuth } from "@/modules/auth";
import { cn } from "@/libs/utils";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: <LayoutDashboard size={20} />, end: true },
  { to: "/admin/products", label: "Products", icon: <Package size={20} />, end: false },
  { to: "/admin/categories", label: "Categories", icon: <FolderTree size={20} />, end: false },
  { to: "/admin/orders", label: "Orders", icon: <ClipboardList size={20} />, end: false },
  { to: "/admin/users", label: "Users", icon: <Users size={20} />, end: false },
];

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-bg-page dark:bg-dark-bg-page">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 h-screen w-72 bg-bg-surface dark:bg-dark-bg-surface border-r border-slate-100 dark:border-slate-800 z-50 transition-transform duration-300 flex flex-col",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30 rotate-[-5deg]">
              <Star size={20} className="text-white fill-white" />
            </div>
            <div>
              <h2 className="font-black text-text-main tracking-tight">StarFood</h2>
              <p className="text-[10px] font-black text-primary uppercase tracking-widest">
                Admin Panel
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 text-text-muted hover:text-primary cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition-all duration-200",
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "text-text-muted hover:bg-primary/5 hover:text-primary",
                )
              }
            >
              {item.icon} {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-3 p-3 bg-bg-soft dark:bg-dark-bg-soft rounded-2xl mb-3">
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center font-black">
              {user?.firstName?.charAt(0) || "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-black text-text-main truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-text-muted truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors cursor-pointer"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      <div className="lg:ml-72 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 h-20 bg-bg-surface dark:bg-dark-bg-surface border-b border-slate-100 dark:border-slate-800 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-text-main hover:bg-primary/5 rounded-xl cursor-pointer"
            >
              <Menu size={24} />
            </button>
            <div className="hidden lg:block">
              <h3 className="font-black text-text-main">Welcome back, {user?.firstName} 👋</h3>
              <p className="text-xs text-text-muted font-medium">
                Here's what's happening with your store today.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-primary/10 text-primary rounded-2xl font-black text-sm hover:bg-primary hover:text-white transition-all cursor-pointer"
            >
              <ExternalLink size={16} /> View Website
            </a>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
