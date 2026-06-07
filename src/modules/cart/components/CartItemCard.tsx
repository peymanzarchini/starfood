import { Minus, Plus, Trash2 } from "lucide-react";
import { formatPrice } from "@/utils/formatPrice";
import type { CartItem } from "../types";

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (itemId: number, quantity: number) => void;
  onRemoveItem: (itemId: number) => void;
}

export const CartItemCard = ({ item, onUpdateQuantity, onRemoveItem }: CartItemCardProps) => {
  return (
    <div className="bg-bg-surface dark:bg-dark-bg-surface p-4 md:p-6 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center gap-6">
      <div className="w-24 h-24 bg-bg-soft dark:bg-dark-bg-soft rounded-2xl p-2 shrink-0">
        <img
          src={item.product.imageUrl}
          alt={item.product.name}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="flex-1 text-center md:text-left">
        <h3 className="text-lg font-black text-text-main">{item.product.name}</h3>
        <p className="text-sm font-bold text-primary">
          ${formatPrice(item.product.finalPrice)}{" "}
          <span className="text-text-muted text-xs line-through ml-2 opacity-50">
            ${formatPrice(item.product.price)}
          </span>
        </p>
      </div>

      <div className="flex items-center gap-3 bg-bg-soft dark:bg-dark-bg-soft p-1.5 rounded-xl border border-slate-100 dark:border-slate-800">
        <button
          onClick={() => item.quantity > 1 && onUpdateQuantity(item.id, item.quantity - 1)}
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-bg-surface dark:bg-dark-bg-surface text-text-main hover:text-primary transition-colors cursor-pointer"
        >
          <Minus size={14} />
        </button>
        <span className="w-8 text-center font-black">{item.quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-bg-surface dark:bg-dark-bg-surface text-text-main hover:text-primary transition-colors cursor-pointer"
        >
          <Plus size={14} />
        </button>
      </div>

      <div className="flex items-center gap-6">
        <span className="text-lg font-black text-text-main min-w-20 text-right">
          ${formatPrice(item.itemTotal)}
        </span>
        <button
          onClick={() => onRemoveItem(item.id)}
          className="p-2 text-slate-300 hover:text-red-500 transition-colors cursor-pointer"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};
