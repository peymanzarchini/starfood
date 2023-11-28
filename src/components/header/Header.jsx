import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { BsBasket } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOutSuccess } from "../../reducer/userSlice";
import { Menu, Transition } from "@headlessui/react";

function Header() {
  const navlinks = [
    { display: "Home", path: "/" },
    { display: "About", path: "/about" },
    { display: "Foods", path: "/foods" },
  ];

  const [mediaQuery, setMediaQuery] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [changePosition, setChangePosition] = useState(false);

  const location = useLocation();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.user.cart);

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
                {cart?.length > 0 ? (
                  <span className="absolute right-3 top-[-5px] z-0 mr-2 rounded-full bg-red-500 px-2.5 py-0.5 text-xs font-medium text-white">
                    {cart.length}
                  </span>
                ) : null}
              </Link>
            </div>
            {user ? (
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-white hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
                      alt="avatar"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-[75px] mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1">
                      <Menu.Item>
                        <div className="group flex w-full cursor-pointer items-center gap-2 rounded-md hover:bg-slate-500">
                          {user?.fullname}
                        </div>
                      </Menu.Item>
                    </div>
                    <div className="px-1 py-1">
                      <Menu.Item>
                        <div className="group flex w-full cursor-pointer items-center gap-2 rounded-md hover:bg-slate-500">
                          <Link to="/" className="flex items-center gap-3">
                            <IoIosLogOut fontSize={23} />
                            <p className="text-base" onClick={() => dispatch(signOutSuccess())}>
                              Logout
                            </p>
                          </Link>
                        </div>
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <Link to="/login">
                <AiOutlineUser fontSize={"23px"} className="cursor-pointer" />
              </Link>
            )}
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
