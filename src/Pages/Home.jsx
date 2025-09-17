import Cards from "../Components.jsx/Cards";
import Search from "../Components.jsx/Search";
import Categories from "../Components.jsx/categories";

const Home = () => {
  return (
    <div className="flex flex-col items-center mx-20 mt-20">
      <div className="grid justify-center mb-15 gap-4">
        <h1 className="font-bold text-7xl text-center text-gray-800">
          Discover Products
        </h1>
        <p className="font-medium text-3xl text-center">&</p>
        <h1 className="font-medium text-4xl text-center">
          Share them/sell them/ and share the profite
        </h1>
      </div>
      <Search />
      <Categories/>
      <Cards/>
    </div>
  );
};
export default Home;
