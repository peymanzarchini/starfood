import { useMutation, useQueryClient } from "@tanstack/react-query";
import { profileApi } from "@/api/services/profile.service";
import { useAuth } from "@/modules/auth";
import { toast } from "sonner";

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
