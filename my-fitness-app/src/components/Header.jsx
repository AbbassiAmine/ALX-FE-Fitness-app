function Header() {
    return (
        <header className="bg-black text-white p-4 flex justify-between items-center shadow-md">
            <h1 className="text-xl font-bold mr-5">Logo here</h1>
            <div className="flex space-x-4">
                <span className="hover:text-strong-accent cursor-pointer">Home</span>
                <span className="hover:text-strong-accent cursor-pointer">Log Workout</span>
                <span className="hover:text-strong-accent cursor-pointer">Progress</span>
                <span className="hover:text-strong-accent cursor-pointer">Profile</span>
            </div>
        </header>
    );
}

export default Header;