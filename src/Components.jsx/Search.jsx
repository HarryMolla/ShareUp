import { SearchIcon} from 'lucide-react'
import { useRef } from 'react';

const Search = () => {
    const inputRef = useRef(null)
  const handleDivClick = () => {
    inputRef.current?.focus();
  };
  return (
    <div className='flex justify-center md:w-3xl w-full bg-white shadow-md p-4 rounded-2xl border-2 border-white hover:border-green-300 gap-8 shadow-even'
    onClick={handleDivClick}
    >
        <SearchIcon className='text-gray-600 size-7'/>
        <input 
        ref={inputRef}
        type="text"
        placeholder='Search Products...'
        className='focus:outline-none flex-1 text-1xl'
        />
    </div>
  )
}
export default Search