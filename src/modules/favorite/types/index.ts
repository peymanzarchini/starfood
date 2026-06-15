export interface FavoriteProduct {
  id: number;
  name: string;
  price: number;
  finalPrice: number;
  discount: number;
  imageUrl: string;
  isAvailable: boolean;
}

export interface Favorite {
  id: number;
  productId: number;
  product: FavoriteProduct;
  createdAt: string;
}
