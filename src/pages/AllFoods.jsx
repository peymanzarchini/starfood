import { BsSearch } from "react-icons/bs";
import { useState } from "react";
import products from "../assets/data/products";
import Foods from "../components/popular/Foods";
import Footer from "../components/footer/Footer";
import CopyRight from "../components/footer/CopyRight";

function AllFoods() {
  const [allProducts, setAllProducts] = useState(products);
  const [query, setQuery] = useState("");
  const [getSort, setSort] = useState("");

  const key = ["title"];

  const handleSortItem = (e) => {
    if (e.target.value === "all") {
      setSort(e.target.value);
      setAllProducts(products);
    } else if (e.target.value === "high") {
      setSort(e.target.value);
      setAllProducts(products.filter((item) => item.price >= 50));
    } else if (e.target.value === "low") {
      setSort(e.target.value);
      setAllProducts(products.filter((item) => item.price < 50));
    } else {
      setSort(e.target.value);
      setAllProducts(products);
    }
  };

  const handleSearchItem = (data) => {
    return data.filter((item) => key.some((k) => item[k].toLowerCase().includes(query)));
  };

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
                {query === "" && <BsSearch className="h-5 w-5 text-gray-500 dark:text-gray-400" />}
              </div>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="search"
                className="text-md block w-full appearance-none rounded-lg border border-gray-400 bg-gray-200 p-4 focus:border-red-600 focus:ring-red-600"
                placeholder="Search"
              />
            </div>
            <div className="w-[50%]">
              <select
                value={getSort}
                onChange={handleSortItem}
                className="text-md block w-full appearance-none rounded-lg border border-gray-400 bg-gray-200 p-4 focus:border-red-600 focus:ring-red-600"
              >
                <option value="">Search by Price</option>
                <option value="all">All</option>
                <option value="high">High Price</option>
                <option value="low">Low Price</option>
              </select>
            </div>
          </div>
          <div className="grid gap-5 pt-10 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {handleSearchItem(allProducts).map((product) => (
              <Foods item={product} key={product.id} />
            ))}
          </div>
        </div>
        {handleSearchItem(allProducts).length === 0 && (
          <h1 className="text-center text-3xl text-red-600">No food found</h1>
        )}
      </section>
      <section>
        <Footer />
        <CopyRight />
      </section>
    </>
  );
}

export default AllFoods;
