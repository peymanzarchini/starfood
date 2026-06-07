export interface Category {
  id: number;
  name: string;
  description: string | null;
  imageUrl: string | null;
  displayOrder: number;
  isActive: boolean;
  productCount?: number;
}

export interface CategorySectionProps {
  selectedCategory: number | null;
  onSelectCategory: (id: number | null) => void;
}

export interface CategoryCardProps {
  category: Category;
  isSelected: boolean;
  onClick: () => void;
}
