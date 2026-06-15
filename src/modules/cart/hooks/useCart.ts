import { useState } from "react";
import { useAuth } from "@/modules/auth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { AddToCartInput, PreviewDiscountResponse } from "../types";
import { cartApi } from "../services/cart.service";

export const useCart = () => {
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  const [appliedDiscount, setAppliedDiscount] = useState<PreviewDiscountResponse | null>(null);

  const cartQuery = useQuery({
    queryKey: ["cart"],
    queryFn: cartApi.get,
    enabled: isAuthenticated,
  });

  const cartCountQuery = useQuery({
    queryKey: ["cart-count"],
    queryFn: cartApi.getCount,
    enabled: isAuthenticated,
    staleTime: 0,
  });

  const refreshCart = () => {
    queryClient.invalidateQueries({ queryKey: ["cart"] });
    queryClient.invalidateQueries({ queryKey: ["cart-count"] });

    setAppliedDiscount(null);
  };

  const addItemMutation = useMutation({
    mutationFn: cartApi.addItem,
    onSuccess: () => {
      refreshCart();
      toast.success("Added to cart!");
    },
  });

  const updateQuantityMutation = useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: number; quantity: number }) =>
      cartApi.updateItem(itemId, { quantity }),
    onSuccess: () => refreshCart(),
  });

  const removeItemMutation = useMutation({
    mutationFn: cartApi.removeItem,
    onSuccess: () => {
      refreshCart();
      toast.success("Item removed");
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: cartApi.clear,
    onSuccess: () => {
      refreshCart();
      toast.success("Cart cleared");
    },
  });

  const applyDiscountMutation = useMutation({
    mutationFn: cartApi.previewDiscount,
    onSuccess: (data) => {
      if (data.isValid) {
        setAppliedDiscount(data);
        toast.success(data.message);
      } else {
        setAppliedDiscount(null);
        toast.error(data.message);
      }
    },
    onError: () => {
      setAppliedDiscount(null);
      toast.error("Failed to apply discount code");
    },
  });

  const removeDiscount = () => {
    setAppliedDiscount(null);
    toast.info("Discount code removed");
  };

  return {
    cart: cartQuery.data,
    count: cartCountQuery.data || 0,
    isLoading: cartQuery.isLoading,
    addItem: (data: AddToCartInput) => addItemMutation.mutate(data),
    isAdding: addItemMutation.isPending,
    updateQuantity: updateQuantityMutation.mutate,
    removeItem: removeItemMutation.mutate,
    clearCart: () => clearCartMutation.mutateAsync(undefined),
    appliedDiscount,
    applyDiscount: (code: string) => applyDiscountMutation.mutate(code),
    isApplyingDiscount: applyDiscountMutation.isPending,
    removeDiscount,
  };
};
