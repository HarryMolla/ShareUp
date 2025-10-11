import { SearchIcon } from 'lucide-react';
import { useRef } from 'react';

const Search = ({ onSearch }) => {
  const inputRef = useRef(null);

  const handleDivClick = () => {
    inputRef.current?.focus();
  };

  const handleChange = (e) => {
    onSearch(e.target.value); // send input to parent
  };

  return (
    <div
      className='flex justify-items-center md:w-3xl w-full bg-white shadow-sm p-4 rounded-2xl border-2 border-white hover:border-green-300 gap-8'
      onClick={handleDivClick}
    >
      <SearchIcon className='text-gray-600 size-7' />
      <input
        ref={inputRef}
        type="text"
        placeholder='Search Products...'
        className='focus:outline-none flex-1 text-1xl'
        onChange={handleChange}
      />
    </div>
  );
};

export default Search;
