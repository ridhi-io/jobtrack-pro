function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="🔍 Search by company or role..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="
          w-full
          p-3
          rounded-xl
          border
          border-gray-300
          dark:border-gray-700
          bg-white
          dark:bg-gray-800
          text-gray-800
          dark:text-white
          placeholder:text-gray-400
          dark:placeholder:text-gray-500
          shadow-sm
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          transition-all
          duration-300
        "
      />
    </div>
  );
}

export default SearchBar;