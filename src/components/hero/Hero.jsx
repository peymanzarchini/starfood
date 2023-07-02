import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import heroImg from "../../assets/images/hero.webp";
import categoryImage1 from "../../assets/images/category-01.png";
import categoryImage2 from "../../assets/images/category-02.png";
import categoryImage3 from "../../assets/images/category-03.png";
import categoryImage4 from "../../assets/images/category-04.png";

function Hero() {
  const categoryData = [
    {
      display: "FastFood",
      imageUrl: categoryImage1,
    },
    {
      display: "Pizza",
      imageUrl: categoryImage2,
    },
    {
      display: "Asian Food",
      imageUrl: categoryImage3,
    },
    {
      display: "Row Meat",
      imageUrl: categoryImage4,
    },
  ];

  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-32 lg:flex-nowrap lg:justify-between lg:gap-0">
        <div className="text-center lg:text-left">
          <p className="mb-3 text-3xl font-medium italic">Easy way to make an order</p>
          <h1 className="text-6xl font-bold leading-[5rem]">
            <span className="text-red-600">HUNGRY?</span>
            {"  "}
            <span className="text-starfood-colorText"> Just wait </span>
            <br />
            <span className="text-starfood-colorText">food at</span>
            {"  "}
            <span className="text-red-600">your door</span>
          </h1>
          <p className="mb-8 mt-3 max-w-lg text-xl font-medium">
            The smart 365-days-per-year food subscription that will make you eat healthy again.
            Tailored to your personal tastes and nutritional needs.
          </p>
          <div className="flex items-center justify-center gap-5 lg:justify-start">
            <button
              type="button"
              className="inline-flex items-center justify-between rounded-lg border border-red-600 bg-red-600 px-5 py-3 text-center text-lg font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 xs:text-sm sm:text-lg"
            >
              Order now
              <AiOutlineArrowRight className="ml-2 mt-1" />
            </button>
            <button className="inline-flex items-center rounded-lg border border-red-600 px-5 py-3 pr-5 text-center text-lg font-medium text-starfood-colorText focus:outline-none focus:ring-4 xs:text-sm sm:text-lg">
              <Link to={"/foods"}>See all foods</Link>
            </button>
          </div>
        </div>
        <div className="w-[95%] lg:w-[50%]">
          <img src={heroImg} alt="hero" className="mx-auto w-[85%]" />
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-5 pt-20">
        {categoryData.map((item, index) => (
          <div
            className="mx-auto flex h-28 cursor-pointer items-center gap-3 bg-gray-300 p-4 transition duration-500 hover:-translate-y-5 xs:w-[100%] sm:w-[45%] lg:w-[23%]"
            key={index}
          >
            <img src={item.imageUrl} alt={item.display} />
            <h3 className="font-semibold">{item.display}</h3>
          </div>
        ))}
      </div>
    </>
  );
}

export default Hero;
