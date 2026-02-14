import { NavLink, Link } from "react-router-dom";

const MenuList = () => {
  const baseStyle = "relative text-[15px] font-semibold tracking-wide transition-all duration-300";

  return (
    <nav className="flex items-center gap-x-10">
      {[
        { to: "/", label: "Home" },
        { to: "/about-us", label: "About Us" },
        { to: "/foods", label: "Foods" },
      ].map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `${baseStyle} ${
              isActive ? "text-primary font-bold" : "text-text-main hover:text-primary"
            }`
          }
        >
          {({ isActive }) => (
            <span className="relative group">
              {item.label}
              <span
                className={`
                  absolute left-0 -bottom-1.5 h-0.75 rounded-full
                  bg-linear-to-r from-primary to-amber-500
                  transition-all duration-300
                  ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                `}
              />
            </span>
          )}
        </NavLink>
      ))}

      {/* 🔥 CTA Login */}
      <Link
        to="/login"
        className="
          px-5 py-2 rounded-full
          bg-primary text-white
          text-sm font-semibold
          shadow-md
          hover:shadow-lg
          hover:scale-105
          transition-all duration-300
        "
      >
        Login
      </Link>
    </nav>
  );
};

export default MenuList;
