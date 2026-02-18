import { NavLink } from "react-router-dom";

interface MenuListProps {
  onItemClick?: () => void;
  isMobile?: boolean;
}

const MenuList = ({ onItemClick, isMobile }: MenuListProps) => {
  const navItems = [
    { to: "/", label: "Home" },
    { to: "/foods", label: "Foods" },
    { to: "/cart", label: "Cart" },
    { to: "/about-us", label: "About Us" },
  ];

  const baseStyle = isMobile
    ? "text-xl font-bold p-4 w-full border-b border-gray-100 dark:border-gray-800"
    : "relative text-[15px] font-semibold tracking-wide transition-all duration-300";

  return (
    <nav className={isMobile ? "flex flex-col mt-10" : "flex items-center gap-x-8"}>
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          onClick={onItemClick}
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? "text-primary" : "text-text-main hover:text-primary"}`
          }
        >
          {item.label}
          {!isMobile && (
            <span className="absolute left-0 -bottom-1 h-0.75 bg-primary transition-all duration-300 w-0" />
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default MenuList;
