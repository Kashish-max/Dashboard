import { useCallback } from "react";

const Search = ({setSearch, delay}) => {

    const debounce = (func, delay) => {
        let timer;
        return function(...args) {
            const context = this;
            if(timer) clearTimeout(timer);
            timer = setTimeout(() => {
                timer = null;
                func.apply(context, args);
            }, delay);
        }
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const optimizedSearch = useCallback(debounce(handleSearch, delay), []);

    return (
        <div className="w-full flex items-center px-4 py-2 bg-white border-[1.5px] border-gray-200 text-gray-200 rounded-lg transition-all focus-within:text-gray-600 focus-within:shadow-sm focus-within:border-gray-500">
            <img className="h-[18px] w-[18px]" src="/assets/search.svg" alt="Search" />
            <input 
                type="text"
                placeholder="Type to search"
                className="flex-grow px-3 py-1 text-xs text-gray-700 bg-transparent outline-none font-medium"
                onChange={optimizedSearch}
            />
        </div>
    )
}

export default Search;