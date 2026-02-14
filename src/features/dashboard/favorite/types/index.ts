export interface Favorite {
  id: number;
  productId: number;
  product: {
    id: number;
    name: string;
    price: number;
    finalPrice: number;
    discount: number;
    imageUrl: string;
    isAvailable: boolean;
  };
  createdAt: string;
}
