import { Link } from "react-router-dom";
import { Github, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground shadow-inner mt-12">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo / Brand */}
        <div className="text-2xl font-bold hover:text-accent-foreground transition">
          ReadX
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col md:flex-row gap-4 text-sm md:text-base">
          <Link to="/all" className="hover:text-accent-foreground transition">
            All Books
          </Link>
          <Link to="/add" className="hover:text-accent-foreground transition">
            Add Book
          </Link>
          <Link to="/borrow" className="hover:text-accent-foreground transition">
            Borrow Summary
          </Link>
          <Link to="/about" className="hover:text-accent-foreground transition">
            About
          </Link>
        </nav>

        {/* Social Icons */}
        <div className="flex gap-4 text-primary-foreground">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent-foreground transition">
            <Github size={20} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent-foreground transition">
            <Twitter size={20} />
          </a>
          <a href="mailto:contact@readx.com" className="hover:text-accent-foreground transition">
            <Mail size={20} />
          </a>
        </div>
      </div>

      <div className="border-t border-border mt-4 text-center text-xs py-2">
        &copy; {new Date().getFullYear()} ReadX. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
