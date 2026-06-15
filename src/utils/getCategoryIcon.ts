export const getCategoryIcon = (name: string): string => {
  const lowerName = name.toLowerCase();

  if (lowerName.includes("pizza")) return "🍕";
  if (lowerName.includes("burger") || lowerName.includes("ham")) return "🍔";
  if (lowerName.includes("chicken")) return "🍗";
  if (
    lowerName.includes("drink") ||
    lowerName.includes("beverage") ||
    lowerName.includes("soda") ||
    lowerName.includes("نوش")
  )
    return "🥤";
  if (lowerName.includes("salad") || lowerName.includes("سالاد")) return "🥗";
  if (lowerName.includes("dessert") || lowerName.includes("sweet") || lowerName.includes("دسر"))
    return "🍰";
  if (lowerName.includes("fries") || lowerName.includes("سیب")) return "🍟";
  if (lowerName.includes("sandwich") || lowerName.includes("ساند")) return "🥪";
  if (lowerName.includes("coffee") || lowerName.includes("قهوه")) return "☕";
  if (lowerName.includes("tea") || lowerName.includes("چای")) return "🫖";
  if (lowerName.includes("seafood") || lowerName.includes("ماهی")) return "🐟";
  if (lowerName.includes("pasta") || lowerName.includes("پاستا")) return "🍝";
  if (lowerName.includes("breakfast") || lowerName.includes("صبح")) return "🥞";
  if (lowerName.includes("kebab") || lowerName.includes("کباب")) return "🥩";
  if (lowerName.includes("soup") || lowerName.includes("سوپ")) return "🍲";
  if (lowerName.includes("sushi") || lowerName.includes("سوشی")) return "🍣";
  if (lowerName.includes("rice") || lowerName.includes("برنج")) return "🍚";

  return "🍽️";
};
