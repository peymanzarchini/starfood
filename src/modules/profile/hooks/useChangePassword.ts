import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/modules/auth";
import { toast } from "sonner";
import { profileApi } from "../services/profile.service";

export const useChangePassword = () => {
  const { logout } = useAuth();

  return useMutation({
    mutationFn: profileApi.changePassword,
    onSuccess: () => {
      toast.success("Password changed successfully! Please log in again.");
      setTimeout(() => logout(), 2000);
    },
  });
};
