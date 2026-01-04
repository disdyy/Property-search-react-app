import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  function goToSection(sectionId) {
    navigate("/");

    // wait for home page to render, then scroll
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }

  return (
    <div className="navbar">
      <div className="navbar-inner">
        {/* Brand */}
        <Link to="/" className="navbar-brand">
          Property Finder
        </Link>

        {/* Links */}
        <div className="navbar-links">
          <NavLink to="/" className="navbar-link">
            Home
          </NavLink>

          <button
            type="button"
            className="navbar-link"
            onClick={() => goToSection("results")}
          >
            Browse
          </button>

          <button
            type="button"
            className="navbar-link"
            onClick={() => goToSection("about")}
          >
            About Us
          </button>

          <button
            type="button"
            className="navbar-link"
            onClick={() => goToSection("contact")}
          >
            Contact Us
          </button>

          <NavLink to="/favourites" className="navbar-link">
            Favourites
          </NavLink>
        </div>
      </div>
    </div>
  );
}