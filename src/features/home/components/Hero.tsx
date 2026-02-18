import Container from "@/components/ui/customs/Container";
import { Link } from "react-router-dom";
import heroImg from "@/assets/images/hero.webp";
import { MoveRight, ShoppingBag } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative w-full py-12 md:py-20 overflow-hidden bg-bg-page">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* --- Left Side: Text Content --- */}
          <div className="flex flex-col gap-y-6 text-center md:text-left order-2 md:order-1">
            <h5 className="text-primary font-bold tracking-widest uppercase text-sm md:text-base">
              Easy way to make an order
            </h5>

            <h1 className="text-4xl md:text-6xl font-black leading-tight text-text-main">
              <span className="text-primary text-5xl md:text-7xl">HUNGRY?</span> Just wait <br />
              food at <span className="text-primary">your door</span>
            </h1>

            <p className="text-text-muted text-base md:text-lg max-w-lg mx-auto md:mx-0 leading-relaxed">
              Experience the fastest food delivery service in town. Fresh, hot, and delicious meals
              delivered right to your doorstep in minutes.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4">
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
            <div className="flex items-center justify-center md:justify-start gap-x-8 mt-6 text-sm font-semibold text-text-main">
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

          {/* --- Right Side: Image --- */}
          <div className="relative order-1 md:order-2">
            <div className="relative z-10 w-full animate-bounce-slow">
              <img
                src={heroImg}
                alt="Delicious fast food"
                className="w-full h-auto object-contain drop-shadow-2xl"
              />
            </div>
            {/* Background Decorative Circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
