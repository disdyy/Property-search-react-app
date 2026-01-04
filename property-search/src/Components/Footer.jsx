export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* LEFT */}
        <div>
          <div className="footer-title">PROPERTY FINDER</div>
          <p className="footer-text">
            Property Finder provides well-designed apartments, premium
            residences, and reliable property investments.
          </p>
        </div>

        {/* MIDDLE */}
        <div>
          <div className="footer-subtitle">Property Finder</div>
          <ul className="footer-links">
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#results">Browse</a>
            </li>
            <li>
              <a href="#about">About Us</a>
            </li>
            <li>
              <a href="#contact">Contact Us</a>
            </li>
          </ul>
        </div>

        {/* RIGHT */}
        <div>
          <div className="footer-subtitle">Contact</div>
          <p className="footer-text">+44 20 7123 4567</p>
          <p className="footer-text">
            63 Farburn Terrace <br />
            Little Ouseburn, United Kingdom
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <div>© 2026 PROPERTY FINDER. All rights reserved.</div>
        <div className="footer-credit">Created by Disadhi Ranasinghe</div>
      </div>
    </footer>
  );
}
