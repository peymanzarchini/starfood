import type { CreateAddressInput } from "@/features/dashboard/address/types";
import { addressesApi } from "@/api/services/address.service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddresses = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["addresses"],
    queryFn: addressesApi.getAll,
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateAddressInput) => addressesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      toast.success("New address added successfully");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => addressesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      toast.success("Address deleted");
    },
  });

  const setDefaultMutation = useMutation({
    mutationFn: (id: number) => addressesApi.setDefault(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      toast.success("Default address updated");
    },
  });

  return {
    addresses: query.data || [],
    isLoading: query.isLoading,
    createAddress: createMutation.mutate,
    isCreating: createMutation.isPending,
    deleteAddress: deleteMutation.mutate,
    setDefaultAddress: setDefaultMutation.mutate,
  };
};
