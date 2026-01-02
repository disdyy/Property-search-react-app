import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* LEFT: SITE NAME */}
        <Link to="/" className="navbar-brand">
          Property Finder
        </Link>

        {/* MIDDLE: NAV LINKS */}
        <nav className="navbar-links">
          <a href="#home" className="navbar-link">Home</a>
          <a href="#results" className="navbar-link">Browse</a>
          <a href="#about" className="navbar-link">About Us</a>
          <a href="#contact" className="navbar-link">Contact Us</a>
        </nav>
      </div>
    </header>
  );
}