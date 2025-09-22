import { NavLink } from "react-router";
import MaxProfitCounter from "./MaxProfitCounter";

const Cards = () => {
  return (
    <div className={"grid md:grid-cols-3 gap-5 justify-between w-full mb-10"}>
      <NavLink to={"/productdetail"}>
        <div className="bg-white  rounded-2xl ">
          <div className="w-full h-64 rounded-t-2xl bg-gray-100 overflow-hidden flex items-center justify-center">
            <img
              className="w-full h-full object-cover object-center transform transition-transform duration-300 hover:scale-105"
              src="https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/25626687/DSC08433.jpg?quality=90&strip=all&crop=16.675%2C0%2C66.65%2C100&w=2400"
              alt="product"
            />
          </div>

          <div className="px-4 pb-4 grid justify-center">
            <div className="py-4">
              <h1 className="text-lg font-bold text-gray-700 line-clamp-1">
                Wireless earbuds with noise cancellation
              </h1>
              <p className="text-normal font-normal text-gray-400 line-clamp-1">
                Wireless earbuds with noise cancellation descriptions that make
                it even bothering of
              </p>
            </div>
            <div className="flex divide-x-2 divide-gray-100 mb-4">
              <div className="w-1/2 text-left ">
                <p className="text-gray-400">Base Price</p>
                <p className="font-medium text-lg text-gray-700">500 ETB</p>
              </div>
              <div className="w-1/2 text-right">
                <p className="text-gray-400">Max Retail</p>
                <p className="font-medium text-lg text-gray-700">800 ETB</p>
              </div>
            </div>
            <div className="flex justify-center">
              <div className=" rounded-2xl">
                <p className="text-gray-400 font-normal text-center">
                  Max Profite
                  <span className="font-bold text-9xl text-gray-400 block">
                    <MaxProfitCounter />
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </NavLink>
      <NavLink to={"/productdetail"}>
        <div className="bg-white  rounded-2xl ">
          <div className="w-full h-64 rounded-t-2xl bg-gray-100 overflow-hidden flex items-center justify-center">
            <img
              className="w-full h-full object-cover object-center transform transition-transform duration-300 hover:scale-105"
              src="https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/25626687/DSC08433.jpg?quality=90&strip=all&crop=16.675%2C0%2C66.65%2C100&w=2400"
              alt="product"
            />
          </div>

          <div className="px-4 pb-4 grid justify-center">
            <div className="py-4">
              <h1 className="text-lg font-bold text-gray-700 line-clamp-1">
                Wireless earbuds with noise cancellation
              </h1>
              <p className="text-normal font-normal text-gray-400 line-clamp-1">
                Wireless earbuds with noise cancellation descriptions that make
                it even bothering of
              </p>
            </div>
            <div className="flex divide-x-2 divide-gray-100 mb-4">
              <div className="w-1/2 text-left ">
                <p className="text-gray-400">Base Price</p>
                <p className="font-medium text-lg text-gray-700">500 ETB</p>
              </div>
              <div className="w-1/2 text-right">
                <p className="text-gray-400">Max Retail</p>
                <p className="font-medium text-lg text-gray-700">800 ETB</p>
              </div>
            </div>
            <div className="flex justify-center">
              <div className=" rounded-2xl">
                <p className="text-gray-400 font-normal text-center">
                  Max Profite
                  <span className="font-bold text-9xl text-gray-400 block">
                    <MaxProfitCounter />
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </NavLink>
      <NavLink to={"/productdetail"}>
        <div className="bg-white  rounded-2xl ">
          <div className="w-full h-64 rounded-t-2xl bg-gray-100 overflow-hidden flex items-center justify-center">
            <img
              className="w-full h-full object-cover object-center transform transition-transform duration-300 hover:scale-105"
              src="https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/25626687/DSC08433.jpg?quality=90&strip=all&crop=16.675%2C0%2C66.65%2C100&w=2400"
              alt="product"
            />
          </div>

          <div className="px-4 pb-4 grid justify-center">
            <div className="py-4">
              <h1 className="text-lg font-bold text-gray-700 line-clamp-1">
                Wireless earbuds with noise cancellation
              </h1>
              <p className="text-normal font-normal text-gray-400 line-clamp-1">
                Wireless earbuds with noise cancellation descriptions that make
                it even bothering of
              </p>
            </div>
            <div className="flex divide-x-2 divide-gray-100 mb-4">
              <div className="w-1/2 text-left ">
                <p className="text-gray-400">Base Price</p>
                <p className="font-medium text-lg text-gray-700">500 ETB</p>
              </div>
              <div className="w-1/2 text-right">
                <p className="text-gray-400">Max Retail</p>
                <p className="font-medium text-lg text-gray-700">800 ETB</p>
              </div>
            </div>
            <div className="flex justify-center">
              <div className=" rounded-2xl">
                <p className="text-gray-400 font-normal text-center">
                  Max Profite
                  <span className="font-bold text-9xl text-gray-400 block">
                    <MaxProfitCounter />
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </NavLink>
      <NavLink to={"/productdetail"}>
        <div className="bg-white  rounded-2xl ">
          <div className="w-full h-64 rounded-t-2xl bg-gray-100 overflow-hidden flex items-center justify-center">
            <img
              className="w-full h-full object-cover object-center transform transition-transform duration-300 hover:scale-105"
              src="https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/25626687/DSC08433.jpg?quality=90&strip=all&crop=16.675%2C0%2C66.65%2C100&w=2400"
              alt="product"
            />
          </div>

          <div className="px-4 pb-4 grid justify-center">
            <div className="py-4">
              <h1 className="text-lg font-bold text-gray-700 line-clamp-1">
                Wireless earbuds with noise cancellation
              </h1>
              <p className="text-normal font-normal text-gray-400 line-clamp-1">
                Wireless earbuds with noise cancellation descriptions that make
                it even bothering of
              </p>
            </div>
            <div className="flex divide-x-2 divide-gray-100 mb-4">
              <div className="w-1/2 text-left ">
                <p className="text-gray-400">Base Price</p>
                <p className="font-medium text-lg text-gray-700">500 ETB</p>
              </div>
              <div className="w-1/2 text-right">
                <p className="text-gray-400">Max Retail</p>
                <p className="font-medium text-lg text-gray-700">800 ETB</p>
              </div>
            </div>
            <div className="flex justify-center">
              <div className=" rounded-2xl">
                <p className="text-gray-400 font-normal text-center">
                  Max Profite
                  <span className="font-bold text-9xl text-gray-400 block">
                    <MaxProfitCounter />
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </NavLink>
      <NavLink to={"/productdetail"}>
        <div className="bg-white  rounded-2xl ">
          <div className="w-full h-64 rounded-t-2xl bg-gray-100 overflow-hidden flex items-center justify-center">
            <img
              className="w-full h-full object-cover object-center transform transition-transform duration-300 hover:scale-105"
              src="https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/25626687/DSC08433.jpg?quality=90&strip=all&crop=16.675%2C0%2C66.65%2C100&w=2400"
              alt="product"
            />
          </div>

          <div className="px-4 pb-4 grid justify-center">
            <div className="py-4">
              <h1 className="text-lg font-bold text-gray-700 line-clamp-1">
                Wireless earbuds with noise cancellation
              </h1>
              <p className="text-normal font-normal text-gray-400 line-clamp-1">
                Wireless earbuds with noise cancellation descriptions that make
                it even bothering of
              </p>
            </div>
            <div className="flex divide-x-2 divide-gray-100 mb-4">
              <div className="w-1/2 text-left ">
                <p className="text-gray-400">Base Price</p>
                <p className="font-medium text-lg text-gray-700">500 ETB</p>
              </div>
              <div className="w-1/2 text-right">
                <p className="text-gray-400">Max Retail</p>
                <p className="font-medium text-lg text-gray-700">800 ETB</p>
              </div>
            </div>
            <div className="flex justify-center">
              <div className=" rounded-2xl">
                <p className="text-gray-400 font-normal text-center">
                  Max Profite
                  <span className="font-bold text-9xl text-gray-400 block">
                    <MaxProfitCounter />
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </NavLink>
      <NavLink to={"/productdetail"}>
        <div className="bg-white  rounded-2xl ">
          <div className="w-full h-64 rounded-t-2xl bg-gray-100 overflow-hidden flex items-center justify-center">
            <img
              className="w-full h-full object-cover object-center transform transition-transform duration-300 hover:scale-105"
              src="https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/25626687/DSC08433.jpg?quality=90&strip=all&crop=16.675%2C0%2C66.65%2C100&w=2400"
              alt="product"
            />
          </div>

          <div className="px-4 pb-4 grid justify-center">
            <div className="py-4">
              <h1 className="text-lg font-bold text-gray-700 line-clamp-1">
                Wireless earbuds with noise cancellation
              </h1>
              <p className="text-normal font-normal text-gray-400 line-clamp-1">
                Wireless earbuds with noise cancellation descriptions that make
                it even bothering of
              </p>
            </div>
            <div className="flex divide-x-2 divide-gray-100 mb-4">
              <div className="w-1/2 text-left ">
                <p className="text-gray-400">Base Price</p>
                <p className="font-medium text-lg text-gray-700">500 ETB</p>
              </div>
              <div className="w-1/2 text-right">
                <p className="text-gray-400">Max Retail</p>
                <p className="font-medium text-lg text-gray-700">800 ETB</p>
              </div>
            </div>
            <div className="flex justify-center">
              <div className=" rounded-2xl">
                <p className="text-gray-400 font-normal text-center">
                  Max Profite
                  <span className="font-bold text-9xl text-gray-400 block">
                    <MaxProfitCounter />
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </NavLink>
      <NavLink to={"/productdetail"}>
        <div className="bg-white  rounded-2xl ">
          <div className="w-full h-64 rounded-t-2xl bg-gray-100 overflow-hidden flex items-center justify-center">
            <img
              className="w-full h-full object-cover object-center transform transition-transform duration-300 hover:scale-105"
              src="https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/25626687/DSC08433.jpg?quality=90&strip=all&crop=16.675%2C0%2C66.65%2C100&w=2400"
              alt="product"
            />
          </div>

          <div className="px-4 pb-4 grid justify-center">
            <div className="py-4">
              <h1 className="text-lg font-bold text-gray-700 line-clamp-1">
                Wireless earbuds with noise cancellation
              </h1>
              <p className="text-normal font-normal text-gray-400 line-clamp-1">
                Wireless earbuds with noise cancellation descriptions that make
                it even bothering of
              </p>
            </div>
            <div className="flex divide-x-2 divide-gray-100 mb-4">
              <div className="w-1/2 text-left ">
                <p className="text-gray-400">Base Price</p>
                <p className="font-medium text-lg text-gray-700">500 ETB</p>
              </div>
              <div className="w-1/2 text-right">
                <p className="text-gray-400">Max Retail</p>
                <p className="font-medium text-lg text-gray-700">800 ETB</p>
              </div>
            </div>
            <div className="flex justify-center">
              <div className=" rounded-2xl">
                <p className="text-gray-400 font-normal text-center">
                  Max Profite
                  <span className="font-bold text-9xl text-gray-400 block">
                    <MaxProfitCounter />
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </NavLink>
      <NavLink to={"/productdetail"}>
        <div className="bg-white  rounded-2xl ">
          <div className="w-full h-64 rounded-t-2xl bg-gray-100 overflow-hidden flex items-center justify-center">
            <img
              className="w-full h-full object-cover object-center transform transition-transform duration-300 hover:scale-105"
              src="https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/25626687/DSC08433.jpg?quality=90&strip=all&crop=16.675%2C0%2C66.65%2C100&w=2400"
              alt="product"
            />
          </div>

          <div className="px-4 pb-4 grid justify-center">
            <div className="py-4">
              <h1 className="text-lg font-bold text-gray-700 line-clamp-1">
                Wireless earbuds with noise cancellation
              </h1>
              <p className="text-normal font-normal text-gray-400 line-clamp-1">
                Wireless earbuds with noise cancellation descriptions that make
                it even bothering of
              </p>
            </div>
            <div className="flex divide-x-2 divide-gray-100 mb-4">
              <div className="w-1/2 text-left ">
                <p className="text-gray-400">Base Price</p>
                <p className="font-medium text-lg text-gray-700">500 ETB</p>
              </div>
              <div className="w-1/2 text-right">
                <p className="text-gray-400">Max Retail</p>
                <p className="font-medium text-lg text-gray-700">800 ETB</p>
              </div>
            </div>
            <div className="flex justify-center">
              <div className=" rounded-2xl">
                <p className="text-gray-400 font-normal text-center">
                  Max Profite
                  <span className="font-bold text-9xl text-gray-400 block">
                    <MaxProfitCounter />
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default Cards;
