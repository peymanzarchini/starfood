import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminUserApi } from "../services/user.admin.service";

export const useAdminUsers = (params?: { page?: number; limit?: number; search?: string }) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["admin", "users", params],
    queryFn: () => adminUserApi.getAll(params),
  });

  const updateRoleMutation = useMutation({
    mutationFn: ({ id, role }: { id: number; role: "admin" | "customer" }) =>
      adminUserApi.updateRole(id, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      toast.success("User role updated successfully");
    },
  });

  const toggleStatusMutation = useMutation({
    mutationFn: adminUserApi.toggleStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      toast.success("User status updated successfully");
    },
  });

  return {
    usersData: query.data,
    isLoading: query.isLoading,
    updateRole: updateRoleMutation.mutate,
    toggleStatus: toggleStatusMutation.mutate,
    isUpdating: updateRoleMutation.isPending || toggleStatusMutation.isPending,
  };
};
