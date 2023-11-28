import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInSuccess } from "../../reducer/userSlice";
import { AiOutlineClose } from "react-icons/ai";

const ModalAuth = ({ closeModal }) => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = {
    fullname,
    email,
    password,
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signInSuccess(user));
    navigate("/");
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden px-5 outline-none focus:outline-none">
        <div className="relative mx-auto my-6 w-[500px]">
          {/*content*/}
          <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
            {/*header*/}
            <div className="border-blueGray-200 flex items-start justify-between rounded-t border-b border-solid p-5">
              <h1 className="text-2xl font-semibold">Sign in</h1>
              <button
                className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black outline-none focus:outline-none"
                onClick={closeModal}
              >
                <AiOutlineClose fontSize={25} />
              </button>
            </div>
            {/*body*/}
            <form onSubmit={handleSubmit} className="relative flex flex-col gap-3 p-6">
              <input
                type="text"
                placeholder="Fullname"
                name="fullname"
                className="w-full rounded-lg border p-3"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
              <input
                type="text"
                placeholder="Email"
                className="w-full rounded-lg border p-3"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full rounded-lg border p-3"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="submit"
                className="mt-3 rounded-lg bg-slate-700 p-3 text-white hover:opacity-95"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  );
};

export default ModalAuth;
