import Cards from "../Components/Cards";
import Categories from "../Components/Categories";
import Search from "../Components/Search";


const Home = () => {
  return (
    <div className="flex flex-col gap-10 items-center md:mx-30 mx-4 mt-15">
      <div className="grid justify-center gap-4">
        <h1 className="font-bold text-5xl text-center text-gray-800">
          Discover Products
        </h1>
        <p className="font-medium text-2xl text-center">&</p>
        <h1 className="font-medium text-3xl text-center">
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
