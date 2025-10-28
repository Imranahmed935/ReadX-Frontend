import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import AddBookModal from "./AddBookModal";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-[#5ea500] text-white shadow-md ">
      <div className="lg:max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
      
        <Link
          to="/"
          className="text-2xl font-bold hover:text-blue-200 transition"
        >
          ReadX
        </Link>


        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="hover:text-blue-200 transition-colors duration-200"
          >
            All Books
          </Link>
          <AddBookModal  />
          <Link
            to="/borrow"
            className="hover:text-blue-200 transition-colors duration-200"
          >
            Borrow Summary
          </Link>
        </nav>

       
        <div className="md:hidden">
          <button
            className="p-2 rounded-md hover:bg-blue-500 transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

     
      {isOpen && (
        <div className="md:hidden bg-primary border-t border-white">
          <nav className="flex flex-col  gap-2 px-4 py-3">
            <Link
              to="/"
              className="hover:text-blue-200 transition-colors duration-200 text-center"
              onClick={() => setIsOpen(false)}
            >
              All Books
            </Link>
            <AddBookModal  />
            <Link
              to="/borrow"
              className="hover:text-blue-200 transition-colors duration-200 text-center"
              onClick={() => setIsOpen(false)}
            >
              Borrow Summary
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavBar;
