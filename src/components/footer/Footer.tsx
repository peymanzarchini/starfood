import { Link } from "react-router-dom";
import { BsInstagram } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
import { BsYoutube } from "react-icons/bs";
import { BsApple } from "react-icons/bs";
import { IoLogoGoogle } from "react-icons/io";

function Footer() {
  return (
    <footer className="w-[100%] bg-red-600 py-[5rem]">
      <div className="mx-auto max-w-[1500px] px-[2.4rem]">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 xl:grid-cols-4">
          <div className="flex flex-wrap justify-between gap-5 sm:flex-col sm:gap-0">
            <Link to="/home" className="text-3xl font-semibold italic text-white">
              StarF<span>oo</span>D
            </Link>
            <div className="flex items-center gap-3 sm:pt-7">
              <a
                href="#"
                className="h-[30px] w-[30px] rounded-full bg-gray-100 p-[22px] transition duration-200 hover:bg-gray-300"
              >
                <BsFacebook
                  fontSize={"25px"}
                  className="-translate-x-3 -translate-y-3 cursor-pointer"
                />
              </a>
              <a
                href="#"
                className="h-[30px] w-[30px] rounded-full bg-gray-100 p-[22px] transition duration-200 hover:bg-gray-300"
              >
                <BsTwitter
                  fontSize={"25px"}
                  className="-translate-x-3 -translate-y-3 cursor-pointer"
                />
              </a>
              <a
                href="#"
                className="h-[30px] w-[30px] rounded-full bg-gray-100 p-[22px] transition duration-200 hover:bg-gray-300"
              >
                <BsInstagram
                  fontSize={"25px"}
                  className="-translate-x-3 -translate-y-3 cursor-pointer"
                />
              </a>
              <a
                href="#"
                className="h-[30px] w-[30px] rounded-full bg-gray-100 p-[22px] transition duration-200 hover:bg-gray-300"
              >
                <BsYoutube
                  fontSize={"25px"}
                  className="-translate-x-3 -translate-y-3 cursor-pointer"
                />
              </a>
            </div>
            <div className="pt-10">
              <h1 className="text-2xl font-semibold text-white">GET THE APP</h1>
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <button className="flex items-center gap-1 rounded bg-gray-100 px-3 py-2 hover:bg-gray-300">
                  <BsApple fontSize={20} className="cursor-pointer" />
                  App Store
                </button>
                <button className="flex items-center gap-1 rounded bg-gray-100 px-3 py-2 hover:bg-gray-300">
                  <IoLogoGoogle fontSize={20} className="cursor-pointer" />
                  Google Play
                </button>
              </div>
            </div>
          </div>
          <div className="pt-16 md:pt-0">
            <h1 className="text-2xl font-semibold text-white">Contact us</h1>
            <address className="pt-5 text-white">
              <p className="pb-5 text-xl font-semibold">
                623 Harrison St., 2nd Floor, San Francisco, CA 94107
              </p>
              <p className="pb-5 text-xl font-semibold">415-201-6370</p>
              <p className="pb-5 text-xl font-semibold">hello@starfood.com</p>
            </address>
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-white">Company</h1>
            <ul className="pt-5">
              <li className="pb-5 text-xl font-normal text-white">
                <a href="#">About Starfood</a>
              </li>
              <li className="pb-5 text-xl font-normal text-white">
                <a href="#">For Business</a>
              </li>
              <li className="pb-5 text-xl font-normal text-white">
                <a href="#">Cooking partners</a>
              </li>
              <li className="pb-5 text-xl font-normal text-white">
                <a href="#">Careers</a>
              </li>
            </ul>
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-white">Resources</h1>
            <ul className="pt-5">
              <li className="pb-5 text-xl font-normal text-white">
                <a href="#">Recipe directory</a>
              </li>
              <li className="pb-5 text-xl font-normal text-white">
                <a href="#">Help center</a>
              </li>
              <li className="pb-5 text-xl font-normal text-white">
                <a href="#">Privacy & terms</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
