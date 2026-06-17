import { Link } from "react-router-dom";
import Container from "@/components/ui/Container";
import {
  UtensilsCrossed,
  Truck,
  ShieldCheck,
  Clock,
  HeartHandshake,
  ArrowRight,
  Star,
  Users,
  PackageCheck,
} from "lucide-react";

const AboutUs = () => {
  const features = [
    {
      icon: <UtensilsCrossed size={28} />,
      title: "Premium Quality",
      desc: "We use only the freshest ingredients sourced from local farms to ensure every bite is delicious and healthy.",
    },
    {
      icon: <Truck size={28} />,
      title: "Lightning Fast Delivery",
      desc: "Our optimized delivery network ensures your food arrives hot and fresh, usually in under 30 minutes.",
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "Secure Payments",
      desc: "Multiple secure payment options including credit cards, digital wallets, and cash on delivery.",
    },
    {
      icon: <Clock size={28} />,
      title: "Open Late",
      desc: "Cravings don't have a schedule. That's why we're open late every day to serve you when you need it most.",
    },
  ];

  const stats = [
    { icon: <Users size={24} />, value: "50K+", label: "Happy Customers" },
    { icon: <PackageCheck size={24} />, value: "120K+", label: "Orders Delivered" },
    { icon: <Star size={24} />, value: "4.9/5", label: "Average Rating" },
    { icon: <HeartHandshake size={24} />, value: "15+", label: "Partner Chefs" },
  ];

  return (
    <main className="bg-bg-page dark:bg-dark-bg-page min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-160 h-160 bg-primary/5 rounded-full blur-3xl -z-10" />
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <span className="px-4 py-1.5 bg-primary/10 text-primary text-xs font-black uppercase tracking-widest rounded-full">
              Our Story
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-text-main tracking-tight mt-6 leading-tight">
              More Than Just <span className="text-primary italic">Fast Food</span>
            </h1>
            <p className="text-text-muted text-base md:text-lg mt-6 leading-relaxed font-medium">
              At StarFood, we believe that great food shouldn't compromise on quality or speed. What
              started as a small kitchen with a big dream has become the city's favorite destination
              for premium fast food.
            </p>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-10 mb-16">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-bg-surface dark:bg-dark-bg-surface p-6 rounded-4xl border border-slate-100 dark:border-slate-800 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-black text-text-main tracking-tight">{stat.value}</h3>
                <p className="text-xs font-black text-text-muted uppercase tracking-widest mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-10">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-text-main tracking-tight">
              Why Choose <span className="text-primary italic">Us?</span>
            </h2>
            <p className="text-text-muted mt-3 font-medium max-w-xl mx-auto">
              We are committed to providing an exceptional dining experience from the moment you
              place your order.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-bg-surface dark:bg-dark-bg-surface p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 flex gap-6 items-start group hover:border-primary/20 transition-all duration-500"
              >
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-black text-text-main mb-2">{feature.title}</h3>
                  <p className="text-text-muted leading-relaxed text-sm font-medium">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <Container>
          <div className="bg-linear-to-r from-primary to-red-600 rounded-[3rem] p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                Ready to Taste the Difference?
              </h2>
              <p className="text-white/80 mt-4 max-w-xl mx-auto font-medium">
                Explore our delicious menu and get your favorite meals delivered right to your
                doorstep.
              </p>
              <Link
                to="/foods"
                className="inline-flex items-center gap-2 px-10 py-4 bg-white text-primary rounded-full font-black shadow-xl mt-8 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                Explore Menu <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
};

export default AboutUs;
