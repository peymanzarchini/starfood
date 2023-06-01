import service1 from "../../assets/images/service-01.png";
import service2 from "../../assets/images/service-02.png";
import service3 from "../../assets/images/service-03.png";

import mobileImg from "../../assets/images/Group 1.png";
import labtopImg from "../../assets/images/Group 2.png";
import tabletImg from "../../assets/images/Group 3.png";

function Serve() {
  return (
    <section className="w-[100%] pt-40">
      <h2 className="mb-3 text-xl text-red-600">What we serve</h2>
      <h1 className="text-xl font-bold leading-[3rem]">
        <span className="text-4xl text-starfood-colorText">Just sit back at home</span>
        <br />
        <span className="text-2xl text-starfood-colorText">we will</span>{" "}
        <span className="text-2xl text-red-600">take care</span>
      </h1>
      <div className="pt-24 lg:pt-5">
        <div className="flex w-[100%] flex-wrap items-center gap-5 lg:flex-nowrap">
          <div className="order-last flex w-[100%] flex-col lg:order-1 lg:w-[50%]">
            <img src={service1} alt="service1" className="w-[20%]" />
            <h2 className="mb-3 text-2xl font-bold text-starfood-colorText">
              Tell us what you like (and what not)
            </h2>
            <p className="text-lg leading-8">
              Never waste time thinking about what to eat again. Starfood is the place that can
              bring you good moments with delicious food.
            </p>
          </div>
          <div className="mb-20 w-[100%] lg:order-2 lg:mb-0 lg:w-[50%]">
            <img
              src={mobileImg}
              alt="mobileImg"
              className="mx-auto w-[60%] sm:w-[40%] lg:w-[35%]"
            />
          </div>
        </div>

        <div className="mt-40 flex w-[100%] flex-wrap items-center gap-5 lg:flex-nowrap">
          <div className="mb-20 w-[100%] lg:order-1 lg:mb-0 lg:w-[50%]">
            <img
              src={tabletImg}
              alt="tabletImg"
              className="mx-auto w-[65%] sm:w-[45%] lg:w-[45%]"
            />
          </div>
          <div className="flex w-[100%] flex-col lg:order-2 lg:w-[50%]">
            <img src={service2} alt="service1" className="w-[20%]" />
            <h2 className="mb-3 text-2xl font-bold text-starfood-colorText">
              We're here to feed and foster communities
            </h2>
            <p className="text-lg leading-8">
              At Starfood, when we say, “billions served,” we’re not just talking about foods. We’re
              talking about serving our communities, customers, crew, farmers, franchisees and
              suppliers. As we look to the future, we believe we can have an even greater impact by
              focusing on four areas that matter most.
            </p>
          </div>
        </div>

        <div className="mt-40 flex w-[100%] flex-wrap items-center gap-5 lg:flex-nowrap">
          <div className="order-last flex w-[100%] flex-col lg:order-1 lg:w-[50%]">
            <img src={service3} alt="service1" className="w-[20%]" />
            <h2 className="mb-3 text-2xl font-bold text-starfood-colorText">
              Starfood Strong Performance Continues
            </h2>
            <p className="text-lg leading-8">
              Our Golden Arches can be found all over the world, but our franchises are small
              businesses owned by community members. This is how we scale our impact — person by
              person, city by city, one neighborhood at a time
            </p>
          </div>
          <div className="mb-20 w-[100%] lg:order-2 lg:mb-0 lg:w-[50%]">
            <img
              src={labtopImg}
              alt="labtopImg"
              className="mx-auto w-[85%] sm:w-[70%] lg:w-[60%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Serve;
