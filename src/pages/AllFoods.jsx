import { BsSearch } from "react-icons/bs";
import { useState } from "react";
import products from "../assets/data/products";
import Foods from "../components/popular/Foods";
import Footer from "../components/footer/Footer";
import CopyRight from "../components/footer/CopyRight";

function AllFoods() {
  const [allProducts, setAllProducts] = useState(products);
  return (
    <>
      <section className="backgroundImageFood h-64 w-full">
        <div className="mx-auto max-w-[1500px] px-[2.4rem]">
          <h1 className="text-5xl font-bold italic text-white">AllFoods</h1>
        </div>
      </section>
      <section className="w-full bg-gray-200 pb-10">
        <div className="mx-auto max-w-[1500px] px-[2.4rem]">
          <div className="flex items-center justify-between gap-3 pt-10">
            <div className="relative w-[50%]">
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-5">
                <BsSearch className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </div>
              <input
                type="search"
                className="text-md block w-full appearance-none rounded-lg border border-gray-400 bg-gray-200 p-4 focus:border-red-600 focus:ring-red-600"
                placeholder="Search"
              />
            </div>
            <div className="w-[50%]">
              <select
                defaultValue={"All Foods"}
                className="text-md block w-full appearance-none rounded-lg border border-gray-400 bg-gray-200 p-4 focus:border-red-600 focus:ring-red-600"
              >
                <option value="All Foods">All Foods</option>
                <option value="Burger">Burger</option>
                <option value="Pizza">Pizza</option>
                <option value="Bread">Bread</option>
              </select>
            </div>
          </div>
          <div className="grid gap-5 pt-10 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {allProducts.map((product) => (
              <Foods item={product} key={product.id} />
            ))}
          </div>
        </div>
      </section>
      <section>
        <Footer />
        <CopyRight />
      </section>
    </>
  );
}

export default AllFoods;
