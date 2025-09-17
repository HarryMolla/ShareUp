import { SearchIcon } from "lucide-react";
import { useRef } from "react";

const Search = () => {
  const inputRef = useRef(null);
  const handleDivClick = () => {
    inputRef.current?.focus();
  };
  return (
    <div
      className="flex justify-center w-5xl bg-white shadow-md p-6 rounded-2xl border-2 border-white hover:border-green-300 gap-8 shadow-even"
      onClick={handleDivClick}
    >
      <SearchIcon className="text-gray-600 size-8" />
      <input
        ref={inputRef}
        type="text"
        placeholder="Search Products..."
        className="focus:outline-none flex-1 text-2xl"
      />
    </div>
  );
};
export default Search;
