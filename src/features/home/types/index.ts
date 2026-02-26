export interface CategorySectionProps {
  selectedCategory: number | null;
  onSelectCategory: (id: number | null) => void;
}
