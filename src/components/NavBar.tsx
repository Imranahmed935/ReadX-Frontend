import { Link } from "react-router-dom";
import { Menu } from "lucide-react"; 

const NavBar = () => {
  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">

        <Link to="/" className="text-2xl font-bold hover:text-accent-foreground">
          ReadX
        </Link>

      
        <nav className="hidden md:flex gap-6">
          <Link to="/all" className="hover:text-accent-foreground transition">
            All Books
          </Link>
          <Link to="/add" className="hover:text-accent-foreground transition">
            Add Book
          </Link>
          <Link to="/borrow" className="hover:text-accent-foreground transition">
            Borrow Summary
          </Link>
          
        </nav>

     
        <div className="md:hidden">
          <button className="p-2 rounded-md hover:bg-secondary">
            <Menu size={24} />
          </button>
        </div>
      </div>

    </header>
  );
};

export default NavBar;
