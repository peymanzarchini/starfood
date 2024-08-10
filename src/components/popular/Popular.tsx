import hamburger from "../../assets/images/hamburger.png";
import Pizza from "../../assets/images/pizza.png";
import Bread from "../../assets/images/bread.png";
import products from "../../assets/data/products";
import { useEffect, useState } from "react";
import Foods from "./Foods";

const Popular = () => {
  const [category, setCategory] = useState<"All" | "Burger" | "Pizza" | "Bread">("All");
  const [allProducts, setAllProducts] = useState(products);

  useEffect(() => {
    if (category === "All") {
      setAllProducts(products);
    }
    if (category === "Burger") {
      const filteredProduct = products.filter((item) => item.category === "Burger");
      setAllProducts(filteredProduct);
    }
    if (category === "Pizza") {
      const filteredProduct = products.filter((item) => item.category === "Pizza");
      setAllProducts(filteredProduct);
    }
    if (category === "Bread") {
      const filteredProduct = products.filter((item) => item.category === "Bread");
      setAllProducts(filteredProduct);
    }
  }, [category]);

  return (
    <section className="w-[100%] pt-60">
      <h1 className="text-2xl font-bold text-starfood-colorText">Popular Foods</h1>
      <ul className="mt-4 flex w-[100%] flex-wrap items-center justify-center gap-9 rounded-md bg-gray-300 p-7 md:flex-nowrap">
        <li
          className={`cursor-pointer text-starfood-colorText ${
            category === "All" ? "activeElement" : ""
          }`}
          onClick={() => setCategory("All")}
        >
          All
        </li>

        <li
          className={`flex cursor-pointer items-center gap-2 text-starfood-colorText ${
            category === "Burger" ? "activeElement" : ""
          }`}
          onClick={() => setCategory("Burger")}
        >
          <img src={hamburger} alt="hamburger" className="w-5" />
          <p>Burger</p>
        </li>

        <li
          className={`flex cursor-pointer items-center gap-2 text-starfood-colorText ${
            category === "Pizza" ? "activeElement" : ""
          }`}
          onClick={() => setCategory("Pizza")}
        >
          <img src={Pizza} alt="pizza" className="w-5" />
          <p>Pizza</p>
        </li>

        <li
          className={`flex cursor-pointer items-center gap-2 text-starfood-colorText ${
            category === "Bread" ? "activeElement" : ""
          }`}
          onClick={() => setCategory("Bread")}
        >
          <img src={Bread} alt="bread" className="w-5" />
          <p>Bread</p>
        </li>
      </ul>
      <div className="grid w-full gap-5 pt-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {allProducts.map((product) => (
          <Foods item={product} key={product.id} />
        ))}
      </div>
    </section>
  );
};

export default Popular;
