import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/modules/auth";
import { toast } from "sonner";
import { profileApi } from "../services/profile.service";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { checkAuth } = useAuth();

  return useMutation({
    mutationFn: profileApi.updateProfile,
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      checkAuth();
    },
  });
};
