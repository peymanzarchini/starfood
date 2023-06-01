import ben from "../../assets/images/ben.jpg";
import dave from "../../assets/images/dave.jpg";
import hannah from "../../assets/images/hannah.jpg";
import steve from "../../assets/images/steve.jpg";

import networkImg from "../../assets/images/network.webp";

function Testimonials() {
  return (
    <section className="mt-60 w-[100%] py-10">
      <h1 className="mb-3 text-2xl font-bold text-starfood-colorText">Testimonials</h1>
      <p className="text-3xl font-semibold text-red-600">Once you try it, you can't go back</p>
      <div className="flex flex-wrap items-center gap-10 pt-10 xl:flex-nowrap">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="mb-3 grid lg:mb-0">
            <img src={ben} alt="ben" className="mb-3 w-20 rounded-full" />
            <p className="mb-3 max-w-3xl text-lg lg:max-w-md">
              Inexpensive, healthy and great-tasting meals, without even having to order manually!
              It feels truly magical.
            </p>
            <p className="self-end">— Ben Hadley</p>
          </div>
          <div className="mb-3 grid lg:mb-0 lg:px-5">
            <img src={dave} alt="dave" className="mb-3 w-20 rounded-full" />
            <p className="mb-3 max-w-3xl self-center text-lg lg:max-w-md">
              The AI algorithm is crazy good, it chooses the right meals for me every time. It's
              amazing not to worry about food anymore!
            </p>
            <p className="self-end">— Dave Bryson</p>
          </div>
          <div className="mb-3 self-start lg:mb-0">
            <img src={hannah} alt="hannah" className="mb-3 w-20 rounded-full" />
            <p className="mb-3 max-w-3xl text-lg lg:max-w-md">
              Starfood is a life saver! I just started a company, so there's no time for cooking. I
              couldn't live without my daily meals now!
            </p>
            <p>— Hannah Smith</p>
          </div>
          <div className="mb-3 self-start lg:mb-0 lg:px-5">
            <img src={steve} alt="steve" className="mb-3 w-20 rounded-full" />
            <p className="mb-3 max-w-3xl text-lg lg:max-w-md">
              I got Starfood for the whole family, and it frees up so much time! Plus, everything is
              organic and vegan and without plastic.
            </p>
            <p>— Steve Miller</p>
          </div>
        </div>
        <div className="mx-auto w-[95%] lg:w-[50%]">
          <img src={networkImg} alt="network" className="w-[100%]" />
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
