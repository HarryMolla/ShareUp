import CountUp from "react-countup";
import MaxProfitCounter from "./MaxProfitCounter";
import { SquareArrowOutUpRight } from "lucide-react";

const Cards = () => {
  return (
    <div className="grid md:grid-cols-3 gap-5 justify-between w-full">
      <div className="bg-white  rounded-4xl ">
        <div className="w-full h-64 rounded-t-4xl bg-gray-100 overflow-hidden flex items-center justify-center">
          <img
            className="w-full h-full object-cover object-center transform transition-transform duration-300 hover:scale-105"
            src="https://assets.kogan.com/files/product/2023/2023_airpod/Apple_AirPods_3rd_Gen.jpg?auto=webp&bg-color=fff&canvas=1200%2C800&dpr=1&enable=upscale&fit=bounds&height=800&quality=90&width=1200"
            alt="product"
          />
        </div>

        <div className="px-6 pb-6 grid justify-center">
          <div className="py-6">
            <h1 className="text-lg font-bold text-gray-700 line-clamp-1">
              Wireless earbuds with noise cancellation
            </h1>
            <p className="text-normal font-normal text-gray-400 line-clamp-1">
              Wireless earbuds with noise cancellation descriptions that make it
              even bothering of
            </p>
          </div>
          <div className="flex divide-x-2 divide-gray-100 mb-6">
            <div className="w-1/2 text-left ">
              <p className="text-gray-400">Base Price</p>
              <p className="font-bold text-lg text-gray-700 texxt-center">
                500 ETB
              </p>
            </div>
            <div className="w-1/2 text-right">
              <p className="text-gray-400">Max Retail</p>
              <p className="font-bold text-lg text-gray-700">800 ETB</p>
            </div>
          </div>
          <div className="grid grid-cols-[3fr_1fr] gap-2">
            <div className=" rounded-2xl">
              <p className="text-gray-400 font-medium text-left">
                Max Profite
                <span className="font-bold text-3xl text-green-400 block">
                  <MaxProfitCounter />
                </span>
              </p>
            </div>
            <div className="p-4 bg-green-50 hover:bg-green-200 rounded-2xl hover:text flex justify-center">
              <SquareArrowOutUpRight className="size-10 text-center text-green-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
