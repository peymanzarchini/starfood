import LoginPhoto from "../assets/images/login.png";
import { useNavigate } from "react-router-dom";
import { loginSchema, TLoginSchema } from "../validation/index";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../reducer/userSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
    },
  });

  const handleLoginSubmit = (data: TLoginSchema) => {
    dispatch(signInSuccess(data));
    navigate("/");
    reset();
  };

  return (
    <>
      <section className="backgroundImageFood h-64 w-full">
        <div className="mx-auto max-w-[1500px] px-[2.4rem]">
          <h1 className="text-5xl font-bold italic text-white">Sign in</h1>
        </div>
      </section>
      <section className="py-5">
        <div className="mx-auto max-w-[1500px] px-[2.4rem]">
          <div className="flex flex-wrap items-center justify-center gap-12 py-10 lg:flex-nowrap lg:justify-between lg:gap-0">
            <div className="mr-14 w-[95%] sm:mr-20 sm:w-[60%] lg:w-[50%]">
              <img src={LoginPhoto} alt="signin" className="mx-auto rounded-sm" />
            </div>
            <div className="flex w-[100%] flex-col sm:w-[80%] lg:w-[50%]">
              <form
                className="flex w-[100%] flex-col gap-4 sm:mx-auto sm:w-[80%]"
                onSubmit={handleSubmit(handleLoginSubmit)}
              >
                <input
                  type="text"
                  placeholder="Fullname"
                  className="rounded-lg border p-3"
                  {...register("fullname")}
                />
                {errors.fullname && <p className="text-red-500">{errors.fullname.message}</p>}

                <input
                  type="text"
                  placeholder="Email"
                  className="rounded-lg border p-3"
                  {...register("email")}
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                <input
                  type="password"
                  placeholder="Password"
                  className="rounded-lg border p-3"
                  {...register("password")}
                />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}

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
      </section>
    </>
  );
};

export default Login;
