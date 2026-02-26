import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  if (!resolvedTheme) return null;

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="
        relative w-10 h-10 flex items-center justify-center 
        rounded-full
        transition-all duration-500
        hover:scale-110
      "
    >
      {/* Soft background glow */}
      <span
        className={`
          absolute inset-0 rounded-full transition-all duration-500
          ${isDark ? "bg-amber-400/10" : "bg-slate-900/5"}
        `}
      />

      <div
        className={`
          relative transition-all duration-500
          ${isDark ? "rotate-180 scale-110" : ""}
        `}
      >
        {isDark ? (
          // ☀️ Sun
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-amber-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle cx="12" cy="12" r="5" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 7.05l-1.414-1.414M6.464 6.464 5.05 5.05m12.728 0-1.414 1.414M6.464 17.536l-1.414 1.414"
            />
          </svg>
        ) : (
          // 🌙 Moon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-slate-700"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M21 12.79A9 9 0 0111.21 3c0-.34.02-.67.05-1A9 9 0 1021 12.79z" />
          </svg>
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
