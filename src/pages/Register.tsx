import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import Container from "@/components/ui/Container";
import { useAuth, registerSchema, type RegisterFormValues } from "@/modules/auth";
import { handleApiError } from "@/utils/handleApiError";

const RegisterPage = () => {
  const navigate = useNavigate();

  const { register: signupUser, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await signupUser(data);
      reset();
      navigate("/login");
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center py-16">
      <Container className="max-w-125">
        <div className="bg-bg-surface dark:bg-dark-bg-surface p-8 md:p-10 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-800">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-text-main tracking-tight">
              Create <span className="text-primary">Account</span>
            </h1>
            <p className="text-text-muted mt-2 text-sm">Join StarFood and get delicious meals!</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Fields (Grid) */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-widest ml-1">
                  First Name
                </label>
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
                <label className="text-xs font-black uppercase tracking-widest ml-1">
                  Last Name
                </label>
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

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-widest ml-1">Email</label>
              <input
                {...register("email")}
                type="email"
                className="w-full px-4 py-3 bg-bg-soft dark:bg-dark-bg-soft border border-slate-200 dark:border-slate-700 rounded-2xl focus:border-primary outline-none transition-all text-sm font-bold"
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-[10px] font-bold">{errors.email.message}</p>
              )}
            </div>

            {/* Phone Number Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-widest ml-1">
                Phone Number
              </label>
              <input
                {...register("phoneNumber")}
                className="w-full px-4 py-3 bg-bg-soft dark:bg-dark-bg-soft border border-slate-200 dark:border-slate-700 rounded-2xl focus:border-primary outline-none transition-all text-sm font-bold"
                placeholder="+1234567890"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-[10px] font-bold">{errors.phoneNumber.message}</p>
              )}
            </div>

            {/* Password Field */}
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-primary text-white rounded-2xl font-black shadow-lg shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-x-2 mt-6 disabled:opacity-70 cursor-pointer"
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

          {/* Footer */}
          <p className="text-center mt-8 text-sm text-text-muted font-medium">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-black hover:underline ml-1">
              Login
            </Link>
          </p>
        </div>
      </Container>
    </div>
  );
};

export default RegisterPage;
