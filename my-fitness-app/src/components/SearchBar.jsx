function SearchBar({ onSearch }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const query = e.target.elements.search.value;
        onSearch(query);
    };

    return (
        <div className="mb-4 max-w-md mx-auto">
            <input
                type="text"
                name="search"
                placeholder="Search exercises (e.g., Bench Press)"
                className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00cec9]"
            />
            <button
                type="submit"
                className="mt-2 bg-[#00cec9] text-white rounded-md px-4 py-2 hover:bg-opacity-90"
                onClick={handleSubmit}
            >
                Search
            </button>
        </div>
    );
}

export default SearchBar;