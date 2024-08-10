import { FaPlus } from "react-icons/fa";

const About = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20">
      <h1 className="mb-4 text-3xl font-bold text-slate-800">
        About StarF<span className="text-red-600">oo</span>D
      </h1>
      <p className="mb-4 text-slate-700">
        At the same time that Starfood started its activity, with the full supervision of the
        management and the support of the experienced staff in the preparation of raw materials and
        cooking matters, it will continue to maintain its special quality and quantity.
      </p>
      <p className="mb-4 text-slate-700">
        Some of the factors that make StarF<span className="text-red-600">oo</span>D worthy of your
        choice :
      </p>
      <ul className="flex flex-col gap-5">
        <li className="flex items-center gap-3">
          <FaPlus fontSize={21} className="text-slate-700" />
          <span>Use of fresh mutton</span>
        </li>
        <li className="flex items-center gap-3">
          <FaPlus fontSize={21} className="text-slate-700" />
          <span>
            Using vegetables, frangipani and sifijat on a daily basis and basic disinfection
          </span>
        </li>
        <li className="flex items-center gap-3">
          <FaPlus fontSize={21} className="text-slate-700" />
          <span>Attendance of personnel in environmental health classes</span>
        </li>
        <li className="flex items-center gap-3">
          <FaPlus fontSize={21} className="text-slate-700" />
          <span>Cook fried foods with fresh oil only</span>
        </li>
        <li className="flex items-center gap-3">
          <FaPlus fontSize={21} className="text-slate-700" />
          <span>Cooperation with food testing laboratories on a monthly basis</span>
        </li>
      </ul>
    </div>
  );
};

export default About;
