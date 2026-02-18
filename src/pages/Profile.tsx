import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  User,
  MapPin,
  Trash2,
  Plus,
  CheckCircle2,
  Loader2,
  Save,
  ShieldCheck,
  Circle,
} from "lucide-react";

import Container from "@/components/ui/customs/Container";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { cn } from "@/libs/utils";
import { useAddresses } from "@/features/home/hooks/useAddresses";

// --- 1. Validation Schemas ---

const profileSchema = z.object({
  firstName: z.string().min(2, "First name is too short"),
  lastName: z.string().min(2, "Last name is too short"),
  phoneNumber: z.string().regex(/^\+?[0-9]{10,15}$/, "Invalid phone number format"),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "New password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const addressSchema = z.object({
  title: z.string().min(2, "Title is required (e.g. Home, Office)"),
  street: z.string().min(5, "Street address is too short"),
  city: z.string().min(2, "City is required"),
  phoneNumber: z.string().regex(/^\+?[0-9]{10,15}$/, "Invalid phone number"),
});

type ProfileForm = z.infer<typeof profileSchema>;
type PasswordForm = z.infer<typeof passwordSchema>;
type AddressForm = z.infer<typeof addressSchema>;

const ProfilePage = () => {
  const { user, updateProfile, changePassword, isLoading: authLoading } = useAuth();
  const {
    addresses,
    isLoading: addrLoading,
    createAddress,
    deleteAddress,
    setDefaultAddress,
    isCreating,
  } = useAddresses();

  const [showAddrForm, setShowAddrForm] = useState(false);
  const [showPassForm, setShowPassForm] = useState(false);

  // --- 2. Form Initializations with distinct names ---

  // Profile Form
  const {
    register: regProfile,
    handleSubmit: handleProfileSubmit,
    reset: resetProfile,
    formState: { errors: pErrors },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      phoneNumber: user?.phoneNumber || "",
    },
  });

  // Password Form
  const {
    register: regPass,
    handleSubmit: handlePassSubmit,
    reset: resetPass,
    formState: { errors: passErrors },
  } = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
  });

  // Address Form
  const {
    register: regAddr,
    handleSubmit: handleAddrSubmit,
    reset: resetAddr,
    formState: { errors: aErrors },
  } = useForm<AddressForm>({
    resolver: zodResolver(addressSchema),
  });

  // 🔄 Sync the profile form whenever user data changes in AuthContext
  useEffect(() => {
    if (user) {
      resetProfile({
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
      });
    }
  }, [user, resetProfile]);

  // --- 3. Handlers ---

  const onUpdateProfile = async (data: ProfileForm) => {
    await updateProfile(data); // Calls PATCH /auth/profile
  };

  const onChangePass = async (data: PasswordForm) => {
    await changePassword(data);
    setShowPassForm(false);
    resetPass();
  };

  const onAddAddress = (data: AddressForm) => {
    createAddress(data, {
      onSuccess: () => {
        setShowAddrForm(false);
        resetAddr();
      },
    });
  };

  return (
    <main className="bg-bg-page dark:bg-dark-bg-page py-10 md:py-16 min-h-screen font-sans">
      <Container>
        <h1 className="text-4xl font-black text-text-main mb-12 tracking-tight italic">
          Account <span className="text-primary">Profile</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* --- Left Column: Personal Info & Security --- */}
          <div className="lg:col-span-4 space-y-8">
            {/* 👤 Personal Details Card */}
            <div className="bg-bg-surface dark:bg-dark-bg-surface p-8 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800">
              <h3 className="text-xl font-black text-text-main mb-6 flex items-center gap-2 italic">
                <User size={20} className="text-primary" /> Personal Details
              </h3>
              <form onSubmit={handleProfileSubmit(onUpdateProfile)} className="space-y-4">
                <div className="space-y-1">
                  <input
                    {...regProfile("firstName")}
                    placeholder="First Name"
                    className="w-full p-4 bg-bg-soft dark:bg-dark-bg-soft border border-transparent rounded-2xl outline-none focus:border-primary font-bold text-sm transition-all"
                  />
                  {pErrors.firstName && (
                    <p className="text-red-500 text-[10px] font-bold ml-2">
                      {pErrors.firstName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <input
                    {...regProfile("lastName")}
                    placeholder="Last Name"
                    className="w-full p-4 bg-bg-soft dark:bg-dark-bg-soft border border-transparent rounded-2xl outline-none focus:border-primary font-bold text-sm transition-all"
                  />
                  {pErrors.lastName && (
                    <p className="text-red-500 text-[10px] font-bold ml-2">
                      {pErrors.lastName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <input
                    {...regProfile("phoneNumber")}
                    placeholder="Phone Number"
                    className="w-full p-4 bg-bg-soft dark:bg-dark-bg-soft border border-transparent rounded-2xl outline-none focus:border-primary font-bold text-sm transition-all"
                  />
                  {pErrors.phoneNumber && (
                    <p className="text-red-500 text-[10px] font-bold ml-2">
                      {pErrors.phoneNumber.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full py-4 bg-primary text-white rounded-2xl font-black shadow-lg shadow-primary/20 cursor-pointer hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {authLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <div className="flex items-center gap-2">
                      <Save size={18} /> Update Profile
                    </div>
                  )}
                </button>
              </form>
            </div>

            {/* 🔐 Security Section Card */}
            <div className="bg-bg-surface dark:bg-dark-bg-surface p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
              <h3 className="text-xl font-black text-text-main mb-4 flex items-center gap-2 italic">
                <ShieldCheck size={22} className="text-primary" /> Security
              </h3>

              {!showPassForm ? (
                <button
                  onClick={() => setShowPassForm(true)}
                  className="w-full py-3 border-2 border-slate-100 dark:border-slate-800 text-text-main font-bold rounded-2xl hover:bg-bg-soft transition-all cursor-pointer"
                >
                  Change Password
                </button>
              ) : (
                <form
                  onSubmit={handlePassSubmit(onChangePass)}
                  className="space-y-3 animate-in slide-in-from-top-2 duration-300"
                >
                  <div className="space-y-1">
                    <input
                      type="password"
                      {...regPass("currentPassword")}
                      placeholder="Current Password"
                      size={1}
                      className="w-full p-4 bg-bg-soft rounded-xl text-sm font-bold outline-none border focus:border-primary"
                    />
                    {passErrors.currentPassword && (
                      <p className="text-red-500 text-[10px] font-bold ml-2">
                        {passErrors.currentPassword.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <input
                      type="password"
                      {...regPass("newPassword")}
                      placeholder="New Password"
                      size={1}
                      className="w-full p-4 bg-bg-soft rounded-xl text-sm font-bold outline-none border focus:border-primary"
                    />
                    {passErrors.newPassword && (
                      <p className="text-red-500 text-[10px] font-bold ml-2">
                        {passErrors.newPassword.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <input
                      type="password"
                      {...regPass("confirmPassword")}
                      placeholder="Confirm Password"
                      size={1}
                      className="w-full p-4 bg-bg-soft rounded-xl text-sm font-bold outline-none border focus:border-primary"
                    />
                    {passErrors.confirmPassword && (
                      <p className="text-red-500 text-[10px] font-bold ml-2">
                        {passErrors.confirmPassword.message}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      disabled={authLoading}
                      className="flex-1 py-3 bg-text-main text-white dark:bg-white dark:text-text-main rounded-xl font-black text-xs cursor-pointer"
                    >
                      {authLoading ? (
                        <Loader2 size={14} className="animate-spin mx-auto" />
                      ) : (
                        "Save"
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowPassForm(false)}
                      className="px-4 py-3 bg-slate-100 dark:bg-slate-800 text-text-main rounded-xl font-black text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* --- Right Column: Address Management --- */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-bg-surface dark:bg-dark-bg-surface p-8 md:p-10 rounded-[3rem] shadow-xl border border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h3 className="text-2xl font-black text-text-main italic flex items-center gap-3">
                    <MapPin size={26} className="text-primary" /> Delivery Addresses
                  </h3>
                  <p className="text-text-muted text-sm font-medium">
                    Manage your delivery locations
                  </p>
                </div>
                <button
                  onClick={() => setShowAddrForm(!showAddrForm)}
                  className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 cursor-pointer",
                    showAddrForm
                      ? "bg-text-main text-white rotate-45"
                      : "bg-primary text-white hover:rotate-90 shadow-primary/20",
                  )}
                >
                  <Plus size={24} />
                </button>
              </div>

              {/* Add Address Form */}
              {showAddrForm && (
                <form
                  onSubmit={handleAddrSubmit(onAddAddress)}
                  className="bg-bg-soft dark:bg-dark-bg-soft p-8 rounded-[2.5rem] mb-10 grid grid-cols-1 md:grid-cols-2 gap-5 animate-in slide-in-from-top-6 duration-500"
                >
                  <div className="md:col-span-2 space-y-1">
                    <input
                      {...regAddr("title")}
                      placeholder="Address Title (e.g. Home)"
                      className="w-full p-4 bg-bg-surface rounded-xl outline-none font-bold text-sm border border-transparent focus:border-primary transition-all"
                    />
                    {aErrors.title && (
                      <p className="text-red-500 text-[10px] font-bold ml-2">
                        {aErrors.title.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <input
                      {...regAddr("city")}
                      placeholder="City"
                      className="w-full p-4 bg-bg-surface rounded-xl outline-none font-bold text-sm border border-transparent focus:border-primary transition-all"
                    />
                    {aErrors.city && (
                      <p className="text-red-500 text-[10px] font-bold ml-2">
                        {aErrors.city.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <input
                      {...regAddr("phoneNumber")}
                      placeholder="Phone"
                      className="w-full p-4 bg-bg-surface rounded-xl outline-none font-bold text-sm border border-transparent focus:border-primary transition-all"
                    />
                    {aErrors.phoneNumber && (
                      <p className="text-red-500 text-[10px] font-bold ml-2">
                        {aErrors.phoneNumber.message}
                      </p>
                    )}
                  </div>
                  <div className="md:col-span-2 space-y-1">
                    <textarea
                      {...regAddr("street")}
                      placeholder="Full address details..."
                      rows={2}
                      className="w-full p-4 bg-bg-surface rounded-xl outline-none font-bold text-sm resize-none border border-transparent focus:border-primary transition-all"
                    />
                    {aErrors.street && (
                      <p className="text-red-500 text-[10px] font-bold ml-2">
                        {aErrors.street.message}
                      </p>
                    )}
                  </div>
                  <div className="md:col-span-2 flex gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={isCreating}
                      className="flex-1 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs cursor-pointer shadow-lg"
                    >
                      {isCreating ? (
                        <Loader2 className="animate-spin mx-auto" />
                      ) : (
                        "Save New Address"
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddrForm(false)}
                      className="px-8 py-4 bg-slate-200 dark:bg-slate-700 text-text-main dark:text-white rounded-2xl font-black text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Address List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {addrLoading ? (
                  <div className="md:col-span-2 flex justify-center py-10">
                    <Loader2 className="animate-spin text-primary" />
                  </div>
                ) : addresses.length === 0 ? (
                  <div className="md:col-span-2 py-16 text-center bg-bg-soft dark:bg-dark-bg-soft rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
                    <MapPin size={48} className="mx-auto mb-4 text-slate-300" />
                    <p className="font-black text-text-muted">No delivery addresses yet.</p>
                  </div>
                ) : (
                  addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className={cn(
                        "p-7 rounded-[2.5rem] border-2 transition-all duration-500 relative group overflow-hidden",
                        addr.isDefault
                          ? "border-primary bg-primary/5 shadow-xl shadow-primary/10"
                          : "border-slate-100 dark:border-slate-800 bg-bg-surface hover:border-primary/30",
                      )}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <span className="font-black text-text-main text-lg italic">
                          {addr.title}
                        </span>
                        <button
                          onClick={() => deleteAddress(addr.id)}
                          className="p-2 text-slate-400 hover:text-red-500 transition-all cursor-pointer"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>

                      <p className="text-sm text-text-muted font-bold line-clamp-2 leading-relaxed mb-6">
                        {addr.fullAddress}
                      </p>

                      {addr.isDefault ? (
                        <div className="flex items-center gap-1.5 px-4 py-1.5 bg-primary text-white text-[10px] font-black uppercase rounded-full w-fit shadow-md shadow-primary/20">
                          <CheckCircle2 size={12} /> Default Address
                        </div>
                      ) : (
                        <button
                          onClick={() => setDefaultAddress(addr.id)}
                          className="flex items-center gap-1.5 px-4 py-1.5 border border-slate-200 dark:border-slate-700 text-text-muted text-[10px] font-black uppercase rounded-full w-fit hover:border-primary hover:text-primary transition-all cursor-pointer"
                        >
                          <Circle size={12} /> Set as Default
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default ProfilePage;
