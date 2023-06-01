import chef1 from "../../assets/images/chef_1.jpg";
import chef2 from "../../assets/images/chef_2.jpg";
import chef3 from "../../assets/images/chef_3.jpg";
import chef4 from "../../assets/images/chef_4.jpg";
import { BsFacebook } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsYoutube } from "react-icons/bs";

function Team() {
  return (
    <section className="w-[100%] pb-28 pt-52">
      <h1 className="mb-3 text-2xl font-bold text-starfood-colorText">Our Team</h1>
      <p className="text-3xl font-semibold text-red-600">Meet Our Expert Chefs</p>
      <div className="grid grid-cols-1 gap-5 pt-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div className="card-clip relative mx-auto w-full max-w-sm overflow-hidden rounded bg-slate-200 shadow-2xl">
          <div className="relative top-7 z-10 mx-auto h-[200px] w-[200px] rounded-full border-[10px] border-solid border-white bg-red-600 p-3">
            <img src={chef1} alt="chef1" className="h-[100%] w-[100%] rounded-full" />
          </div>
          <div className="pt-10 text-center">
            <h3 className="pb-1 text-2xl text-black">Ismat Joha</h3>
            <p className="text-md text-black">Senior Chef</p>
          </div>
          <div className="flex items-center justify-center gap-5 pb-4 pt-7">
            <a
              href="#"
              className="h-[30px] w-[30px] rounded-full bg-gray-400 p-[22px] transition duration-500 hover:bg-red-600 hover:text-white"
            >
              <BsFacebook
                fontSize={"25px"}
                className="-translate-x-3 -translate-y-3 cursor-pointer"
              />
            </a>
            <a
              href="#"
              className="h-[30px] w-[30px] rounded-full bg-gray-400 p-[22px] transition duration-500 hover:bg-red-600 hover:text-white"
            >
              <BsTwitter
                fontSize={"25px"}
                className="-translate-x-3 -translate-y-3 cursor-pointer"
              />
            </a>
            <a
              href="#"
              className="h-[30px] w-[30px] rounded-full bg-gray-400 p-[22px] transition duration-500 hover:bg-red-600 hover:text-white"
            >
              <BsInstagram
                fontSize={"25px"}
                className="-translate-x-3 -translate-y-3 cursor-pointer"
              />
            </a>
            <a
              href="#"
              className="h-[30px] w-[30px] rounded-full bg-gray-400 p-[22px] transition duration-500 hover:bg-red-600 hover:text-white"
            >
              <BsYoutube
                fontSize={"25px"}
                className="-translate-x-3 -translate-y-3 cursor-pointer"
              />
            </a>
          </div>
        </div>
        <div className="card-clip relative mx-auto w-full max-w-sm overflow-hidden rounded bg-slate-200 shadow-2xl">
          <div className="relative top-7 z-10 mx-auto h-[200px] w-[200px] rounded-full border-[10px] border-solid border-white bg-red-600 p-3">
            <img src={chef2} alt="chef2" className="h-[100%] w-[100%] rounded-full" />
          </div>
          <div className="pt-10 text-center">
            <h3 className="pb-1 text-2xl text-black">Arun Chandra</h3>
            <p className="text-md text-black">Senior Chef</p>
          </div>
          <div className="flex items-center justify-center gap-5 pb-4 pt-7">
            <a
              href="#"
              className="h-[30px] w-[30px] rounded-full bg-gray-400 p-[22px] transition duration-500 hover:bg-red-600 hover:text-white"
            >
              <BsFacebook
                fontSize={"25px"}
                className="-translate-x-3 -translate-y-3 cursor-pointer"
              />
            </a>
            <a
              href="#"
              className="h-[30px] w-[30px] rounded-full bg-gray-400 p-[22px] transition duration-500 hover:bg-red-600 hover:text-white"
            >
              <BsTwitter
                fontSize={"25px"}
                className="-translate-x-3 -translate-y-3 cursor-pointer"
              />
            </a>
            <a
              href="#"
              className="h-[30px] w-[30px] rounded-full bg-gray-400 p-[22px] transition duration-500 hover:bg-red-600 hover:text-white"
            >
              <BsInstagram
                fontSize={"25px"}
                className="-translate-x-3 -translate-y-3 cursor-pointer"
              />
            </a>
            <a
              href="#"
              className="h-[30px] w-[30px] rounded-full bg-gray-400 p-[22px] transition duration-500 hover:bg-red-600 hover:text-white"
            >
              <BsYoutube
                fontSize={"25px"}
                className="-translate-x-3 -translate-y-3 cursor-pointer"
              />
            </a>
          </div>
        </div>
        <div className="card-clip relative mx-auto w-full max-w-sm overflow-hidden rounded bg-slate-200 shadow-2xl">
          <div className="relative top-7 z-10 mx-auto h-[200px] w-[200px] rounded-full border-[10px] border-solid border-white bg-red-600 p-3">
            <img src={chef3} alt="chef3" className="h-[100%] w-[100%] rounded-full" />
          </div>
          <div className="pt-10 text-center">
            <h3 className="pb-1 text-2xl text-black">Isita Rahman</h3>
            <p className="text-md text-black">Senior Chef</p>
          </div>
          <div className="flex items-center justify-center gap-5 pb-4 pt-7">
            <a
              href="#"
              className="h-[30px] w-[30px] rounded-full bg-gray-400 p-[22px] transition duration-500 hover:bg-red-600 hover:text-white"
            >
              <BsFacebook
                fontSize={"25px"}
                className="-translate-x-3 -translate-y-3 cursor-pointer"
              />
            </a>
            <a
              href="#"
              className="h-[30px] w-[30px] rounded-full bg-gray-400 p-[22px] transition duration-500 hover:bg-red-600 hover:text-white"
            >
              <BsTwitter
                fontSize={"25px"}
                className="-translate-x-3 -translate-y-3 cursor-pointer"
              />
            </a>
            <a
              href="#"
              className="h-[30px] w-[30px] rounded-full bg-gray-400 p-[22px] transition duration-500 hover:bg-red-600 hover:text-white"
            >
              <BsInstagram
                fontSize={"25px"}
                className="-translate-x-3 -translate-y-3 cursor-pointer"
              />
            </a>
            <a
              href="#"
              className="h-[30px] w-[30px] rounded-full bg-gray-400 p-[22px] transition duration-500 hover:bg-red-600 hover:text-white"
            >
              <BsYoutube
                fontSize={"25px"}
                className="-translate-x-3 -translate-y-3 cursor-pointer"
              />
            </a>
          </div>
        </div>
        <div className="card-clip relative mx-auto w-full max-w-sm overflow-hidden rounded bg-slate-200 shadow-2xl">
          <div className="relative top-7 z-10 mx-auto h-[200px] w-[200px] rounded-full border-[10px] border-solid border-white bg-red-600 p-3">
            <img src={chef4} alt="chef4" className="h-[100%] w-[100%] rounded-full" />
          </div>
          <div className="pt-10 text-center">
            <h3 className="pb-1 text-2xl text-black">Naurin Nipu</h3>
            <p className="text-md text-black">Senior Chef</p>
          </div>
          <div className="flex items-center justify-center gap-5 pb-4 pt-7">
            <a
              href="#"
              className="h-[30px] w-[30px] rounded-full bg-gray-400 p-[22px] transition duration-500 hover:bg-red-600 hover:text-white"
            >
              <BsFacebook
                fontSize={"25px"}
                className="-translate-x-3 -translate-y-3 cursor-pointer"
              />
            </a>
            <a
              href="#"
              className="h-[30px] w-[30px] rounded-full bg-gray-400 p-[22px] transition duration-500 hover:bg-red-600 hover:text-white"
            >
              <BsTwitter
                fontSize={"25px"}
                className="-translate-x-3 -translate-y-3 cursor-pointer"
              />
            </a>
            <a
              href="#"
              className="h-[30px] w-[30px] rounded-full bg-gray-400 p-[22px] transition duration-500 hover:bg-red-600 hover:text-white"
            >
              <BsInstagram
                fontSize={"25px"}
                className="-translate-x-3 -translate-y-3 cursor-pointer"
              />
            </a>
            <a
              href="#"
              className="h-[30px] w-[30px] rounded-full bg-gray-400 p-[22px] transition duration-500 hover:bg-red-600 hover:text-white"
            >
              <BsYoutube
                fontSize={"25px"}
                className="-translate-x-3 -translate-y-3 cursor-pointer"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Team;
