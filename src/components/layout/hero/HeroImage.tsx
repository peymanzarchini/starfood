import heroImg from "@/assets/images/hero.webp";

const HeroImage = () => {
  return (
    <div className="relative order-1 lg:order-2">
      <div className="relative z-10 w-full animate-bounce-slow">
        <img
          src={heroImg}
          alt="Delicious fast food"
          className="sm:w-150 mx-auto lg:w-full h-auto object-contain drop-shadow-2xl"
        />
      </div>
      {/* Background Decorative Circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 lg:w-96 lg:h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
    </div>
  );
};

export default HeroImage;
