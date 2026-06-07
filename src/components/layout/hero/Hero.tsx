import Container from "@/components/ui/Container";
import HeroText from "./HeroText";
import HeroImage from "./HeroImage";

const Hero = () => {
  return (
    <section className="relative w-full py-12 md:py-20 overflow-hidden bg-bg-page">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <HeroText />
          <HeroImage />
        </div>
      </Container>
    </section>
  );
};

export default Hero;
