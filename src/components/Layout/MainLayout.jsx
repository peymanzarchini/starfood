import Header from "../header/Header";
import Routers from "../../routes/Routers";
import Footer from "../footer/Footer";
import CopyRight from "../footer/CopyRight";

function MainLayout() {
  return (
    <>
      <Header />
      <div>
        <Routers />
      </div>
      <Footer />
      <CopyRight />
    </>
  );
}

export default MainLayout;
