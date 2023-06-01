import { Link } from "react-router-dom";

function Foods({ item }) {
  return (
    <div className="rounded-lg p-4 text-center shadow-xl">
      <img
        src={item.image01}
        alt="img1"
        className="mx-auto mb-3 w-[50%] transition duration-500 hover:scale-110"
      />
      <Link to={`/foods/${item.id}`} className="text-xl font-semibold text-starfood-colorText">
        {item.title}
      </Link>
      <div className="flex items-center justify-between pt-12">
        <div className="space-x-1 text-2xl text-starfood-colorText">
          <span>$</span>
          <span>{item.price}</span>
        </div>
        <button type="button" className="rounded-md bg-red-600 px-5 py-3 text-white">
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default Foods;
