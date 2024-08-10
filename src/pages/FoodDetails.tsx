import { useParams } from "react-router-dom";
import products from "../assets/data/products";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../reducer/cartSlice";
import ModalAuth from "../components/modal/ModalAuth";
import { AppDispatch, RootState } from "../app/index";

function FoodDetails() {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();

  const [openModalLogin, setOpenModalLogin] = useState<boolean>(false);

  const singleProduct = products.find((p) => p.id === params.foodId);
  const [prevImage, setPrevImage] = useState(singleProduct?.image01);

  const handleCloseModal = () => {
    setOpenModalLogin(false);
  };
  return (
    <>
      <section className="backgroundImageFood h-64 w-full">
        <div className="mx-auto max-w-[1500px] px-[2.4rem]">
          <h1 className="text-5xl font-bold italic text-white">{singleProduct?.title}</h1>
        </div>
      </section>
      <section className="w-full bg-gray-200 pb-10">
        <div className="mx-auto max-w-[1500px] px-[2.4rem]">
          <div className="flex flex-wrap items-center justify-center gap-16 pt-10 sm:flex-nowrap sm:justify-normal sm:gap-5">
            <div className="order-2 flex w-64 gap-5 sm:order-1 sm:flex-col">
              <div
                className="w-[50%] cursor-pointer"
                onClick={() => setPrevImage(singleProduct?.image01)}
              >
                <img src={singleProduct?.image01} alt="img" />
              </div>
              <div
                className="w-[50%] cursor-pointer"
                onClick={() => setPrevImage(singleProduct?.image02)}
              >
                <img src={singleProduct?.image02} alt="img" />
              </div>
              <div
                className="w-[50%] cursor-pointer"
                onClick={() => setPrevImage(singleProduct?.image03)}
              >
                <img src={singleProduct?.image03} alt="img" />
              </div>
            </div>
            <div className="order-1 w-96 self-center md:self-auto lg:order-2">
              <img src={prevImage} alt="prevImage" className="w-full sm:w-[70%]" />
            </div>
            <div className="order-3 flex flex-col gap-10 self-start">
              <h1 className="text-2xl font-semibold text-starfood-colorText">
                {singleProduct?.title}
              </h1>
              <h3 className="text-2xl font-semibold text-starfood-colorText">
                Price:<span className="ml-2 text-red-600">{singleProduct?.price}$</span>
              </h3>
              <h4 className="text-2xl font-semibold text-starfood-colorText">
                Category:{" "}
                <span className="ml-2 rounded-full bg-red-100 px-3 py-2 text-xl">
                  {singleProduct?.category}
                </span>
              </h4>
              <button
                type="button"
                className="rounded-md bg-red-600 px-5 py-3 text-white"
                onClick={() => {
                  !user
                    ? setOpenModalLogin(true)
                    : dispatch(
                        addCart({
                          id: singleProduct?.id,
                          title: singleProduct?.title,
                          price: singleProduct?.price,
                          image: singleProduct?.image01,
                          category: singleProduct?.category,
                          quantity: 1,
                        })
                      );
                }}
              >
                Add To Cart
              </button>
              {openModalLogin && <ModalAuth closeModal={handleCloseModal} />}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default FoodDetails;
