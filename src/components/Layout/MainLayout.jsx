import Header from "../header/Header";
import Routers from "../../routes/Routers";

function MainLayout() {
  return (
    <>
      <Header />
      <div>
        <Routers />
      </div>
    </>
  );
}

export default MainLayout;
