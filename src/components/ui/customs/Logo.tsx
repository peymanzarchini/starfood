import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="text-3xl md:text-4xl font-black tracking-tight">
      <Link to="/" className="group relative inline-block italic">
        <span className="text-text-main">StarF</span>

        <span className="relative text-primary font-extrabold">
          oo
          <span className="absolute -bottom-1 left-0 w-full h-0.75 bg-primary rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </span>

        <span className="text-text-main">D</span>
      </Link>
    </div>
  );
};

export default Logo;
