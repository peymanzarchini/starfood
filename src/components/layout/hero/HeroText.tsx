import { MoveRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const HeroText = () => {
  return (
    <div className="flex flex-col gap-y-6 text-center lg:text-left order-2 lg:order-1">
      <h5 className="text-primary font-bold tracking-widest uppercase text-sm md:text-base">
        Easy way to make an order
      </h5>

      <h1 className="text-4xl xl:text-6xl font-black leading-tight text-text-main">
        <span className="text-primary text-5xl xl:text-7xl">HUNGRY?</span> Just wait <br />
        food at <span className="text-primary">your door</span>
      </h1>

      <p className="text-text-muted text-base lg:text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed">
        Experience the fastest food delivery service in town. Fresh, hot, and delicious meals
        delivered right to your doorstep in minutes.
      </p>

      <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-4">
        <Link
          to="/foods"
          className="flex items-center gap-x-2 px-8 py-3 bg-primary text-white rounded-full font-bold shadow-lg shadow-primary/30 hover:bg-primary-hover hover:scale-105 transition-all duration-300"
        >
          Order Now <MoveRight size={20} />
        </Link>

        <Link
          to="/foods"
          className="flex items-center gap-x-2 px-8 py-3 border-2 border-primary text-primary rounded-full font-bold hover:bg-primary hover:text-white transition-all duration-300"
        >
          See all foods
        </Link>
      </div>

      {/* Features Mini */}
      <div className="flex items-center justify-center lg:justify-start gap-x-8 mt-6 text-sm font-semibold text-text-main">
        <div className="flex items-center gap-x-2">
          <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <ShoppingBag size={16} />
          </span>
          No shipping fee
        </div>
        <div className="flex items-center gap-x-2">
          <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <ShoppingBag size={16} />
          </span>
          100% Secure checkout
        </div>
      </div>
    </div>
  );
};

export default HeroText;
