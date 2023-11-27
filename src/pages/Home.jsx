import Hero from "../components/hero/Hero";
import PhotosGallery from "../components/photoAlbum/PhotosGallery";
import Popular from "../components/popular/Popular";
import Register from "../components/register/Register";
import Serve from "../components/serve/Serve";
import Team from "../components/team/Team";
import Testimonials from "../components/testimonials/Testimonials";

function Home() {
  return (
    <>
      <section className="min-h-[89vh] w-[100%] bg-gray-200 bg-cover bg-center  pt-[3rem]">
        <div className="mx-auto max-w-[1500px] px-[2.4rem]">
          <Hero />
          <Serve />
          <Popular />
          <Testimonials />
          <PhotosGallery />
          <Register />
          <Team />
        </div>
      </section>
    </>
  );
}

export default Home;
