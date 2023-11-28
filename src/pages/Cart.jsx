import { useDispatch, useSelector } from "react-redux";
import { FaRegTrashAlt, FaPlus, FaMinus } from "react-icons/fa";
import { decrease, increase, removeCart } from "../reducer/userSlice";

const Cart = () => {
  const cart = useSelector((state) => state.user.cart);
  const dispatch = useDispatch();

  const addition = (acc, currentvalue) => {
    return acc + currentvalue.price * currentvalue.quantity;
  };

  const total = cart.reduce(addition, 0);

  return (
    <>
      <section className="backgroundImageFood h-64 w-full">
        <div className="mx-auto max-w-[1500px] px-[2.4rem]">
          <h1 className="text-5xl font-bold italic text-white">Cart</h1>
        </div>
      </section>
      <section className="py-5 pb-10">
        <div className="mx-auto max-w-[1500px] px-[2.4rem]">
          <div className="mt-8 grid grid-cols-2 gap-8">
            <div>
              {cart?.length === 0 && (
                <div className="text-2xl">No products in your shopping cart</div>
              )}
              {cart?.length > 0 &&
                cart.map((product) => (
                  <div className="flex items-center gap-4 border-b py-4" key={product.id}>
                    <div className="w-24">
                      <img
                        src={product.image}
                        alt={"product"}
                        className="mx-auto mb-3 w-[50%] transition duration-500 hover:scale-110"
                      />
                    </div>
                    <div className="grow">
                      <h3 className="font-semibold">{product.title}</h3>

                      <div className="text-base text-gray-500">
                        <div>{product.category}</div>
                      </div>
                      <div className="text-lg text-gray-500">
                        <div>${product.price}</div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        className="rounded-full bg-red-600 p-2 text-white"
                        onClick={() => {
                          if (product.quantity > 1) {
                            dispatch(decrease({ id: product.id }));
                          } else {
                            dispatch(removeCart({ id: product.id }));
                          }
                        }}
                      >
                        <FaMinus />
                      </button>
                      <span className="text-lg text-gray-700">{product.quantity}</span>
                      <button
                        type="button"
                        className="rounded-full bg-green-600 p-2 text-white"
                        onClick={() => dispatch(increase({ id: product.id }))}
                      >
                        <FaPlus />
                      </button>
                      <button
                        type="button"
                        onClick={() => dispatch(removeCart({ id: product.id }))}
                        className="rounded-full bg-red-600 p-2 text-white"
                      >
                        <FaRegTrashAlt />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
            <div className="rounded-lg bg-gray-100 p-4">
              <h2 className="text-center text-lg text-slate-700">Checkout</h2>
              <form className="mt-3 flex flex-col gap-4">
                <label>Phone</label>
                <input type="tel" placeholder="Phone number" className="rounded-lg border p-3" />
                <label>Street address</label>
                <input type="text" placeholder="Street address" />
                <button
                  type="button"
                  className="mt-3 rounded-lg bg-red-600 p-3 text-white hover:opacity-95"
                >
                  Pay ${total}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
