import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import AddBookModal from "./AddBookModal";

const NavBar = () => {
  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold hover:text-accent-foreground transition"
        >
          ReadX
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-accent-foreground transition">
            All Books
          </Link>
          <AddBookModal />
          <Link
            to="/borrow"
            className="hover:text-accent-foreground transition"
          >
            Borrow Summary
          </Link>
        </nav>

        <div className="md:hidden">
          <button className="p-2 rounded-md hover:bg-secondary transition">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
