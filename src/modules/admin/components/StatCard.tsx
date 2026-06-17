const StatCard = ({
  title,
  value,
  icon,
  color,
  subText,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  subText?: string;
}) => (
  <div className="bg-bg-surface dark:bg-dark-bg-surface p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-500 group">
    <div className="flex items-center justify-between mb-4">
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color} shadow-lg transition-transform group-hover:scale-110`}
      >
        {icon}
      </div>
    </div>
    <p className="text-sm font-black text-text-muted uppercase tracking-widest mb-1">{title}</p>
    <h3 className="text-3xl font-black text-text-main tracking-tight">{value}</h3>
    {subText && <p className="text-xs font-bold text-text-muted mt-2">{subText}</p>}
  </div>
);

export default StatCard;
