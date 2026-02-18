/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormValues } from "../validation";
import { ArrowRight, Loader2 } from "lucide-react";

const RegisterForm = () => {
  const { register: signup, isLoading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await signup(data);
      navigate("/login");
    } catch (error) {
      // Errors handled by context
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-widest ml-1">First Name</label>
          <input
            {...register("firstName")}
            className="w-full px-4 py-3 bg-bg-soft dark:bg-dark-bg-soft border border-slate-200 dark:border-slate-700 rounded-2xl focus:border-primary outline-none transition-all text-sm font-bold"
            placeholder="John"
          />
          {errors.firstName && (
            <p className="text-red-500 text-[10px] font-bold">{errors.firstName.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-black uppercase tracking-widest ml-1">Last Name</label>
          <input
            {...register("lastName")}
            className="w-full px-4 py-3 bg-bg-soft dark:bg-dark-bg-soft border border-slate-200 dark:border-slate-700 rounded-2xl focus:border-primary outline-none transition-all text-sm font-bold"
            placeholder="Doe"
          />
          {errors.lastName && (
            <p className="text-red-500 text-[10px] font-bold">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-widest ml-1">Email</label>
        <input
          {...register("email")}
          className="w-full px-4 py-3 bg-bg-soft dark:bg-dark-bg-soft border border-slate-200 dark:border-slate-700 rounded-2xl focus:border-primary outline-none transition-all text-sm font-bold"
          placeholder="john@example.com"
        />
        {errors.email && (
          <p className="text-red-500 text-[10px] font-bold">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-widest ml-1">Phone Number</label>
        <input
          {...register("phoneNumber")}
          className="w-full px-4 py-3 bg-bg-soft dark:bg-dark-bg-soft border border-slate-200 dark:border-slate-700 rounded-2xl focus:border-primary outline-none transition-all text-sm font-bold"
          placeholder="+1234567890"
        />
        {errors.phoneNumber && (
          <p className="text-red-500 text-[10px] font-bold">{errors.phoneNumber.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-black uppercase tracking-widest ml-1">Password</label>
        <input
          {...register("password")}
          type="password"
          className="w-full px-4 py-3 bg-bg-soft dark:bg-dark-bg-soft border border-slate-200 dark:border-slate-700 rounded-2xl focus:border-primary outline-none transition-all text-sm font-bold"
          placeholder="••••••••"
        />
        {errors.password && (
          <p className="text-red-500 text-[10px] font-bold leading-tight">
            {errors.password.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 bg-primary text-white rounded-2xl font-black shadow-lg shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-x-2 mt-6"
      >
        {isLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <>
            Create Account <ArrowRight size={20} />
          </>
        )}
      </button>
    </form>
  );
};

export default RegisterForm;
