import person from "../../assets/images/eating.jpg";

const Register = () => {
  return (
    <section className="w-[100%] pt-52">
      <div className="grid grid-cols-6 rounded-xl bg-gray-300">
        <div className="col-span-6 p-10  lg:col-span-4">
          <h1 className="mb-5 text-4xl text-starfood-colorText">Get your first meal for free!</h1>
          <p className="max-w-5xl text-xl leading-10 text-starfood-colorText">
            Healthy, tasty and hassle-free meals are waiting for you. Start eating well today. You
            can cancel or pause anytime. And the first meal is on us!
          </p>
          <form className="w-full max-w-2xl">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="fullname"
                    className="block text-lg font-medium leading-6 text-starfood-colorText"
                  >
                    FullName
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="fullname"
                      id="fullname"
                      placeholder="John Smith"
                      className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="email"
                    className="block text-lg font-medium leading-6 text-starfood-colorText"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="me@example.com"
                      className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-lg font-medium leading-6 text-starfood-colorText"
                  >
                    Where did you hear from us?
                  </label>
                  <div className="mt-2">
                    <select
                      id="country"
                      name="country"
                      className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option>Friends and family</option>
                      <option>YouTube video</option>
                      <option>Podcast</option>
                      <option>Facebook ad</option>
                      <option>Others</option>
                    </select>
                  </div>
                </div>

                <div className="self-end xs:mt-5 sm:col-span-3 sm:mt-0">
                  <button className="w-full rounded-md bg-red-600 py-2 text-white hover:bg-red-800">
                    Sign up
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="col-span-2 hidden opacity-70 lg:inline">
          <img src={person} alt="person" className="h-[100%] w-[100%] rounded-xl" />
        </div>
      </div>
    </section>
  );
};

export default Register;
