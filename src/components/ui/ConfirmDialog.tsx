import { Loader2, AlertTriangle } from "lucide-react";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  isLoading?: boolean;
}

const ConfirmDialog = ({
  isOpen,
  message,
  onClose,
  onConfirm,
  title,
  isLoading,
}: ConfirmDialogProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-60 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-bg-surface dark:bg-dark-bg-surface w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle size={32} className="text-red-500" />
        </div>
        <h2 className="text-2xl font-black text-text-main mb-2">{title}</h2>
        <p className="text-text-muted text-sm font-medium mb-8">{message}</p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 text-text-main rounded-2xl font-black text-sm cursor-pointer hover:bg-slate-200 transition-all disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 py-3 bg-red-500 text-white rounded-2xl font-black text-sm cursor-pointer hover:bg-red-600 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isLoading ? <Loader2 size={16} className="animate-spin" /> : "Yes, Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
