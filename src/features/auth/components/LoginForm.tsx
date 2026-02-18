/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormValues } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Get the page the user was trying to access before login
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/";
  const { login, isLoading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data);
      navigate(from, { replace: true });
    } catch (error) {
      // Errors handled by AuthContext and Interceptor
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Email Field */}
      <div className="space-y-1.5">
        <label className="text-sm font-bold ml-1 text-text-main">Email Address</label>
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
            <Mail size={18} />
          </div>
          <input
            {...register("email")}
            type="email"
            placeholder="name@example.com"
            className="w-full pl-12 pr-4 py-3.5 bg-bg-soft dark:bg-dark-bg-soft border border-slate-200 dark:border-slate-700 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all font-medium text-sm"
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-xs font-bold ml-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center px-1">
          <label className="text-sm font-bold text-text-main">Password</label>
          <Link to="/forgot-password" className="text-xs font-bold text-primary hover:underline">
            Forgot Password?
          </Link>
        </div>
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
            <Lock size={18} />
          </div>
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="w-full pl-12 pr-12 py-3.5 bg-bg-soft dark:bg-dark-bg-soft border border-slate-200 dark:border-slate-700 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all font-medium text-sm"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs font-bold ml-1">{errors.password.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 bg-primary text-white rounded-2xl font-black shadow-lg shadow-primary/30 hover:bg-primary-hover hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-x-2 disabled:opacity-70 disabled:pointer-events-none mt-4"
      >
        {isLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <>
            Login <ArrowRight size={20} />
          </>
        )}
      </button>
    </form>
  );
};

export default LoginForm;
