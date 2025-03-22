// import logo from "../assets/logo.png"; // Replace with your logo

function Navbar() {
    return (
        <nav className="w-full bg-white shadow-md py-4 px-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
                {/* <img src={logo} alt="Logo" className="h-10 w-10" /> */}
                <h1 className="text-xl font-bold text-gray-800">Amazon Scraper</h1>
            </div>
            <a href="https://github.com/abhijeetkumarshukla" target="_blank" className="text-blue-500 hover:text-blue-700 font-medium">GitHub</a>
        </nav>
    );
}

export default Navbar;
