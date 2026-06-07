import { Clock, CheckCircle2, Truck, XCircle, Package } from "lucide-react";
import { cn } from "@/libs/utils";
import type { OrderStatus } from "../types";
import type { ReactNode } from "react";

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; icon: ReactNode }> = {
  pending: {
    label: "Pending",
    color: "text-amber-600 bg-amber-50 dark:bg-amber-900/20",
    icon: <Clock size={14} />,
  },
  confirmed: {
    label: "Confirmed",
    color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20",
    icon: <CheckCircle2 size={14} />,
  },
  preparing: {
    label: "Preparing",
    color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20",
    icon: <Package size={14} />,
  },
  ready: {
    label: "Ready",
    color: "text-cyan-600 bg-cyan-50 dark:bg-cyan-900/20",
    icon: <Package size={14} />,
  },
  delivering: {
    label: "On the way",
    color: "text-purple-600 bg-purple-50 dark:bg-purple-900/20",
    icon: <Truck size={14} />,
  },
  delivered: {
    label: "Delivered",
    color: "text-green-600 bg-green-50 dark:bg-green-900/20",
    icon: <CheckCircle2 size={14} />,
  },
  cancelled: {
    label: "Cancelled",
    color: "text-red-600 bg-red-50 dark:bg-red-900/20",
    icon: <XCircle size={14} />,
  },
};

export const StatusBadge = ({ status }: { status: OrderStatus }) => {
  const config = STATUS_CONFIG[status];
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest w-fit",
        config.color,
      )}
    >
      {config.icon} {config.label}
    </div>
  );
};
