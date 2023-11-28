import { Formik } from "formik";
import LoginPhoto from "../assets/images/login.png";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "../validation";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../reducer/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    fullname: "",
    email: "",
    password: "",
  };

  const handleSubmit = (values, onSubmitProps) => {
    dispatch(signInSuccess(values));
    navigate("/");
    onSubmitProps.resetForm();
  };

  return (
    <>
      <section className="backgroundImageFood h-64 w-full">
        <div className="mx-auto max-w-[1500px] px-[2.4rem]">
          <h1 className="text-5xl font-bold italic text-white">Sign in</h1>
        </div>
      </section>
      <section className="py-5">
        {/* <h1 className="text-center text-3xl font-semibold text-gray-700">Sign in</h1> */}
        <div className="mx-auto max-w-[1500px] px-[2.4rem]">
          <div className="flex flex-wrap items-center justify-center gap-12 py-10 lg:flex-nowrap lg:justify-between lg:gap-0">
            <div className="mr-14 w-[95%] sm:mr-20 sm:w-[60%] lg:w-[50%]">
              <img src={LoginPhoto} alt="signin" className="mx-auto rounded-sm" />
            </div>
            <div className="flex w-[100%] flex-col sm:w-[80%] lg:w-[50%]">
              <Formik
                initialValues={initialValues}
                validationSchema={loginSchema}
                onSubmit={handleSubmit}
              >
                {({ values, setFieldValue, handleSubmit, handleBlur, touched, errors }) => (
                  <form
                    className="flex w-[100%] flex-col gap-4 sm:mx-auto sm:w-[80%]"
                    onSubmit={handleSubmit}
                  >
                    <input
                      type="text"
                      placeholder="Fullname"
                      className="rounded-lg border p-3"
                      value={values.fullname}
                      name="fullname"
                      onChange={(e) => setFieldValue("fullname", e.target.value)}
                      onBlur={handleBlur}
                    />
                    {touched.fullname && errors.fullname ? (
                      <div className="text-base text-red-600">{errors.fullname}</div>
                    ) : null}
                    <input
                      type="text"
                      placeholder="Email"
                      className="rounded-lg border p-3"
                      name="email"
                      value={values.email}
                      onChange={(e) => setFieldValue("email", e.target.value)}
                      onBlur={handleBlur}
                    />
                    {touched.email && errors.email ? (
                      <div className="text-base text-red-600">{errors.email}</div>
                    ) : null}
                    <input
                      type="password"
                      placeholder="Password"
                      className="rounded-lg border p-3"
                      name="password"
                      value={values.password}
                      onChange={(e) => setFieldValue("password", e.target.value)}
                      onBlur={handleBlur}
                    />
                    {touched.password && errors.password ? (
                      <div className="text-base text-red-600">{errors.fullname}</div>
                    ) : null}
                    <button
                      type="submit"
                      className="mt-3 rounded-lg bg-slate-700 p-3 text-white hover:opacity-95"
                    >
                      Sign in
                    </button>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
