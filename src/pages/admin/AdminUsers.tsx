import { useState, useEffect } from "react";
import {
  Loader2,
  Search,
  ShieldCheck,
  User as UserIcon,
  Ban,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useAdminUsers } from "@/modules/admin/hooks/useAdminUsers";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { cn } from "@/libs/utils";

const AdminUsersPage = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [banId, setBanId] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  const { usersData, isLoading, updateRole, toggleStatus, isUpdating } = useAdminUsers({
    page,
    limit: 10,
    search: debouncedSearch || undefined,
  });

  const handleBanConfirm = () => {
    if (banId !== null) {
      toggleStatus(banId);
      setBanId(null);
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-text-main tracking-tight italic">Users</h1>
          <p className="text-text-muted text-sm font-medium mt-1">Manage customers and staff</p>
        </div>

        <div className="relative w-full md:w-72 group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors">
            <Search size={20} />
          </div>
          <input
            type="text"
            placeholder="Search name, email, phone..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-12 pr-4 py-3 bg-bg-surface dark:bg-dark-bg-surface border border-slate-200 dark:border-slate-800 rounded-2xl focus:border-primary outline-none transition-all font-bold text-sm"
          />
        </div>
      </div>

      <div className="bg-bg-surface dark:bg-dark-bg-surface rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-primary" size={40} />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-bg-soft dark:bg-dark-bg-soft border-b border-slate-100 dark:border-slate-800">
                <tr className="text-text-muted text-xs font-black uppercase tracking-widest">
                  <th className="p-4 pl-8 text-left">User</th>
                  <th className="p-4 hidden md:table-cell text-center">Phone</th>
                  <th className="p-4 text-center">Role</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {usersData?.body.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-bg-soft/50 dark:hover:bg-dark-bg-soft/50 transition-colors"
                  >
                    {/* ستون کاربر */}
                    <td className="p-4 pl-8 text-left">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center font-black">
                          {user.firstName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-black text-text-main">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-xs text-text-muted">{user.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* ستون شماره تماس */}
                    <td className="p-4 hidden md:table-cell text-center text-sm font-bold text-text-muted">
                      {user.phoneNumber}
                    </td>

                    {/* ستون نقش */}
                    <td className="p-4 text-center">
                      <span
                        className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-600"
                            : "bg-blue-100 text-blue-600",
                        )}
                      >
                        {user.role}
                      </span>
                    </td>

                    {/* ستون وضعیت */}
                    <td className="p-4 text-center">
                      <span
                        className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                          user.status === "active"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600",
                        )}
                      >
                        {user.status}
                      </span>
                    </td>

                    {/* ستون اکشن‌ها */}
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        {/* دکمه تغییر نقش */}
                        {user.role !== "admin" ? (
                          <button
                            onClick={() => updateRole({ id: user.id, role: "admin" })}
                            disabled={isUpdating}
                            className="p-2 hover:bg-purple-50 text-text-muted hover:text-purple-500 rounded-lg cursor-pointer transition-colors"
                            title="Make Admin"
                          >
                            <ShieldCheck size={16} />
                          </button>
                        ) : (
                          <button
                            onClick={() => updateRole({ id: user.id, role: "customer" })}
                            disabled={isUpdating}
                            className="p-2 hover:bg-blue-50 text-text-muted hover:text-blue-500 rounded-lg cursor-pointer transition-colors"
                            title="Make Customer"
                          >
                            <UserIcon size={16} />
                          </button>
                        )}

                        {/* دکمه مسدودسازی (فقط برای مشتری‌ها) */}
                        {user.role !== "admin" && (
                          <button
                            onClick={() => setBanId(user.id)}
                            disabled={isUpdating}
                            className={cn(
                              "p-2 rounded-lg cursor-pointer transition-colors",
                              user.status === "active"
                                ? "hover:bg-red-50 text-text-muted hover:text-red-500"
                                : "hover:bg-green-50 text-text-muted hover:text-green-500",
                            )}
                            title={user.status === "active" ? "Ban User" : "Unban User"}
                          >
                            {user.status === "active" ? (
                              <Ban size={16} />
                            ) : (
                              <CheckCircle size={16} />
                            )}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {!isLoading && usersData && usersData.totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={usersData.pageNumber <= 1}
            className="p-2 rounded-xl border border-slate-200 disabled:opacity-30 cursor-pointer hover:border-primary hover:text-primary"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="font-bold text-text-muted">
            Page {usersData.pageNumber} of {usersData.totalPages}
          </span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={usersData.pageNumber >= usersData.totalPages}
            className="p-2 rounded-xl border border-slate-200 disabled:opacity-30 cursor-pointer hover:border-primary hover:text-primary"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      <ConfirmDialog
        isOpen={banId !== null}
        onClose={() => setBanId(null)}
        onConfirm={handleBanConfirm}
        title="Change User Status?"
        message="Are you sure you want to change this user's access status?"
        isLoading={isUpdating}
      />
    </div>
  );
};

export default AdminUsersPage;
