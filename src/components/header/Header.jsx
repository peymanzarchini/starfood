import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { BsBasket } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAllCart } from "../../reducer/userSlice";

function Header() {
  const navlinks = [
    { display: "Home", path: "/" },
    { display: "About", path: "/about" },
    { display: "Foods", path: "/foods" },
    { display: "Contact", path: "/contact" },
  ];

  const [mediaQuery, setMediaQuery] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [changePosition, setChangePosition] = useState(false);
  const location = useLocation();

  const cart = useSelector(selectAllCart);

  useEffect(() => {
    function handleChangeSize() {
      if (window.innerWidth <= 767) {
        setMediaQuery(true);
      } else {
        setMediaQuery(false);
      }
    }
    handleChangeSize();
    window.addEventListener("resize", handleChangeSize);
    return () => window.removeEventListener("resize", handleChangeSize);
  }, []);

  useEffect(() => {
    function handleChangeScroll() {
      if (window.scrollY >= 300) {
        setChangePosition(true);
      } else {
        setChangePosition(false);
      }
    }
    handleChangeScroll();
    window.addEventListener("scroll", handleChangeScroll);
    return () => window.removeEventListener("scroll", handleChangeScroll);
  }, []);

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  const changeActiveElement = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };

  return (
    <header
      className={`w-[100%] bg-gray-200 py-[1.5rem] transition duration-1000 ${
        changePosition ? "fixed z-20 shadow-xl" : "static"
      }`}
    >
      <div className="mx-auto max-w-[1500px] px-[2.4rem]">
        <div className="flex items-center justify-between">
          <div className="text-3xl font-semibold">
            <Link to="/">
              StarF<span className="text-red-600">oo</span>D
            </Link>
          </div>
          <ul
            className={`fixed top-0 z-10 ${
              showMenu ? "left-0" : "left-[-100%]"
            }  flex min-h-full w-72 list-none flex-col items-center justify-start bg-black transition-all duration-300 md:static md:flex md:flex-row md:space-x-5 md:bg-transparent`}
          >
            <Link to="/" className="mb-5 mt-24 text-3xl font-semibold italic text-white md:hidden">
              StarF<span className="text-red-600">oo</span>D
            </Link>
            <li className="absolute right-5 top-5 text-white md:hidden">
              {<FaTimes fontSize={"23px"} className="cursor-pointer" onClick={handleShowMenu} />}
            </li>
            {navlinks.map((item, index) => (
              <li
                key={index}
                className={`cursor-pointer text-lg font-semibold leading-[5rem] text-gray-50 md:leading-[0] md:text-gray-700 ${
                  changeActiveElement(item.path) && "text-red-500 md:text-red-500"
                }`}
                onClick={() => window.innerWidth <= 767 && setShowMenu(false)}
              >
                <Link to={item.path}>{item.display}</Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Link to={"/cart"}>
                <BsBasket fontSize={"23px"} className="cursor-pointer" />
                {cart.length > 0 ? (
                  <span className="absolute right-3 top-[-5px] z-0 mr-2 rounded-full bg-red-500 px-2.5 py-0.5 text-xs font-medium text-white">
                    {cart.length}
                  </span>
                ) : null}
              </Link>
            </div>
            <Link to="/login">
              <AiOutlineUser fontSize={"23px"} className="cursor-pointer" />
            </Link>
            {mediaQuery ? (
              <GiHamburgerMenu
                onClick={handleShowMenu}
                fontSize={"23px"}
                className="cursor-pointer"
              />
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
