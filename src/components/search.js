const Search = () => {
    return (
        <div className="w-full flex items-center px-4 py-2 bg-white border-[1.5px] border-gray-200 text-gray-200 rounded-lg transition-all focus-within:text-gray-600 focus-within:shadow-sm focus-within:border-gray-500">
            <img className="h-[18px] w-[18px]" src="/assets/search.svg" alt="Search" />
            <input 
                type="text"
                placeholder="Type to search"
                className="flex-grow px-3 py-1 text-xs text-gray-700 bg-transparent outline-none font-medium"
            />
        </div>
    )
}

export default Search;