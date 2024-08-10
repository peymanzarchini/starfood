import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addCart } from "../../reducer/cartSlice";
import { useState } from "react";
import ModalAuth from "../modal/ModalAuth";
import { RootState } from "../../app/index";
import { Product } from "../../assets/data/products";

const Foods = ({ item }: { item: Product }) => {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch();

  const [openModalLogin, setOpenModalLogin] = useState<boolean>(false);

  const handleCloseModal = () => {
    setOpenModalLogin(false);
  };

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
        <button
          type="button"
          className="rounded-md bg-red-600 px-5 py-3 text-white"
          onClick={() => {
            !user
              ? setOpenModalLogin(true)
              : dispatch(
                  addCart({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    image: item.image01,
                    category: item.category,
                    quantity: item.quantity,
                  })
                );
          }}
        >
          Add To Cart
        </button>
        {openModalLogin && <ModalAuth closeModal={handleCloseModal} />}
      </div>
    </div>
  );
};

export default Foods;
