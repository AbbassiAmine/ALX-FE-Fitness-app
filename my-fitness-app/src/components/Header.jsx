function Header({ setCurrentPage }) {
    return (
        <header className="bg-[#2d3436] text-white p-4 flex justify-between items-center shadow-lg">
            <h1 className="text-xl font-bold ">My Fitness</h1>
            <div className="flex gap-x-1 mr-5">
                <button onClick={() => setCurrentPage('home')} className="hover:text-[#00cec9]">Home</button>
                <button onClick={() => setCurrentPage('creator')} className="hover:text-[#00cec9]">Create Workout</button>
                <button onClick={() => setCurrentPage('progress')} className="hover:text-[#00cec9]">Progress</button>
                <button onClick={() => setCurrentPage('exercises')} className="hover:text-[#00cec9]">Exercises</button>
            </div>
        </header>
    );
}

export default Header;