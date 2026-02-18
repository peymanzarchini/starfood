import { cartApi } from "@/services/cart.service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCart = () => {
  const queryClient = useQueryClient();

  // 1. Get Full Cart
  const cartQuery = useQuery({
    queryKey: ["cart"],
    queryFn: cartApi.get,
  });

  // 2. Get Cart Count (For Header)
  const cartCountQuery = useQuery({
    queryKey: ["cart-count"],
    queryFn: cartApi.getCount,
    staleTime: 0, // Always fresh
  });

  // Helper to refresh all cart data
  const refreshCart = () => {
    queryClient.invalidateQueries({ queryKey: ["cart"] });
    queryClient.invalidateQueries({ queryKey: ["cart-count"] });
  };

  // 3. Add Item Mutation
  const addItemMutation = useMutation({
    mutationFn: cartApi.addItem,
    onSuccess: () => {
      refreshCart();
      toast.success("Added to cart!");
    },
  });

  // 4. Update Quantity
  const updateQuantityMutation = useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: number; quantity: number }) =>
      cartApi.updateItem(itemId, { quantity }),
    onSuccess: () => refreshCart(),
  });

  // 5. Remove Item
  const removeItemMutation = useMutation({
    mutationFn: (itemId: number) => cartApi.removeItem(itemId),
    onSuccess: () => {
      refreshCart();
      toast.success("Item removed");
    },
  });

  return {
    cart: cartQuery.data,
    count: cartCountQuery.data || 0,
    isLoading: cartQuery.isLoading,
    addItem: addItemMutation.mutate,
    isAdding: addItemMutation.isPending,
    updateQuantity: updateQuantityMutation.mutate,
    removeItem: removeItemMutation.mutate,
    clearCart: () => cartApi.clear().then(refreshCart),
  };
};
