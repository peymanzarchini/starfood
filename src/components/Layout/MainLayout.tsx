import Header from "../header/Header";
import Routers from "../../routes/Routers";
import Footer from "../footer/Footer";
import CopyRight from "../footer/CopyRight";

function MainLayout() {
  return (
    <section className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <Header />
      <div>
        <Routers />
      </div>
      <Footer />
      <CopyRight />
    </section>
  );
}

export default MainLayout;
