export interface Category {
  id: number;
  name: string;
  description: string | null;
  imageUrl: string | null;
  displayOrder: number;
  isActive: boolean;
  productCount?: number;
}

export interface CreateCategoryInput {
  name: string;
  description?: string;
  imageUrl?: string;
  displayOrder?: number;
  isActive?: boolean;
}

export type UpdateCategoryInput = Partial<CreateCategoryInput>;
