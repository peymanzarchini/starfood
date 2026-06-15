import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { favoritesApi } from "../services/favorite.service";
import { useAuth } from "@/modules/auth";

export const useFavorites = () => {
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["favorites"],
    queryFn: favoritesApi.getAll,
    enabled: isAuthenticated,
  });

  const toggleMutation = useMutation({
    mutationFn: favoritesApi.toggle,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      toast.success(data.message);
    },
  });

  return {
    favorites: query.data || [],
    isLoading: query.isLoading,
    toggleFavorite: toggleMutation.mutate,
    isToggling: toggleMutation.isPending,
  };
};
