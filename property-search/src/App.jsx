import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import data from "./data/properties.json";
import PropertyCard from "./Components/PropertyCard";
import SearchForm from "./Components/SearchForm";
import PropertyDetails from "./Components/PropertyDetails";
import FavouritesPage from "./Components/FavouritesPage";
import { applyFilters } from "./utils/applyFilters";
import "./App.css";
import Navbar from "./Components/Navbar";

const properties = data.properties;

/* ---------------- CONTACT FORM COMPONENT ---------------- */

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
    message: "",
    agree: false,
  });

  const [status, setStatus] = useState("");

  function updateField(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Simple validation
    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.reason ||
      !form.message
    ) {
      setStatus("Please fill in all fields.");
      return;
    }

    if (!form.agree) {
      setStatus("Please agree to the details and requirements.");
      return;
    }

    //send
    setStatus("Message sent successfully! We will contact you soon.");

    // Clear form after submit
    setForm({
      name: "",
      email: "",
      phone: "",
      reason: "",
      message: "",
      agree: false,
    });
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input
        className="contact-input"
        type="text"
        name="name"
        placeholder="Enter Your Name"
        value={form.name}
        onChange={updateField}
      />

      <input
        className="contact-input"
        type="email"
        name="email"
        placeholder="Enter Your Email"
        value={form.email}
        onChange={updateField}
      />

      <input
        className="contact-input"
        type="tel"
        name="phone"
        placeholder="Enter Your Phone Number"
        value={form.phone}
        onChange={updateField}
      />

      <select
        className="contact-input"
        name="reason"
        value={form.reason}
        onChange={updateField}
      >
        <option value="">What can I help you with?</option>
        <option value="Buying">Buying a property</option>
        <option value="Renting">Renting a property</option>
        <option value="Viewing">Booking a viewing</option>
        <option value="Mortgage">Mortgage advice</option>
        <option value="Other">Other</option>
      </select>

      <textarea
        className="contact-textarea"
        name="message"
        placeholder="Message"
        value={form.message}
        onChange={updateField}
      />

      <label className="contact-check">
        <input
          type="checkbox"
          name="agree"
          checked={form.agree}
          onChange={updateField}
        />
        <span>I agree with above details and requirements.</span>
      </label>

      {status && <div className="contact-status">{status}</div>}

      <button className="contact-btn" type="submit">
        Send
      </button>
    </form>
  );
}

export default function App() {
  const [filtered, setFiltered] = useState(properties);
  const [favourites, setFavourites] = useState([]);

  function handleSearch(criteria) {
    const results = applyFilters(properties, criteria);
    setFiltered(results);
  }

  function addFavourite(id) {
    if (!id) return;
    if (!favourites.includes(id)) {
      setFavourites([...favourites, id]);
    }
  }

  function removeFavourite(id) {
    setFavourites(favourites.filter((favId) => favId !== id));
  }

  function clearFavourites() {
    setFavourites([]);
  }

  return (
    <>
      {/* NAVBAR (Shows on all pages) */}
      <Navbar />

      <Routes>
        {/* HOME PAGE */}
        <Route
          path="/"
          element={
            <div className="page" id="home">
              <SearchForm onSearch={handleSearch} />

              <div className="count">Showing {filtered.length} result(s)</div>

              {/* RESULTS ONLY (no favourites column now) */}
              <div className="results" id="results">
                {filtered.map((p) => (
                  <PropertyCard key={p.id} p={p} onAddFavourite={addFavourite} />
                ))}
              </div>

              {/* About section */}
              <div id="about" className="section-box">
                <h2>Who Are We?</h2>
                <p>
                  Property Finder is a modern property listing platform created to
                  simplify the process of buying and renting properties. Our goal is to
                  help users quickly find homes that match their preferences by
                  providing clear property information, powerful search and filtering
                  options, and an easy way to save favourite listings for later
                  comparison.
                </p>

                <p>
                  We focus on delivering a clean and accessible user experience using
                  modern web technologies. By combining structured property data with
                  an intuitive interface, Property Finder enables users to explore
                  available properties confidently and efficiently, making the property
                  search process more organised and less time-consuming.
                </p>
              </div>

              {/* Contact section */}
              <div id="contact" className="section-box">
                <h2>Contact Us</h2>
                <p className="section-subtext">
                  Fill in the form below and we’ll get back to you as soon as possible.
                </p>

                {/*Contact form added back */}
                <ContactForm />
              </div>
            </div>
          }
        />

        {/* FAVOURITES PAGE */}
        <Route
          path="/favourites"
          element={
            <FavouritesPage
              favourites={favourites}
              properties={properties}
              onRemoveFavourite={removeFavourite}
              onClearFavourites={clearFavourites}
            />
          }
        />

        {/* DETAILS PAGE */}
        <Route path="/property/:id" element={<PropertyDetails />} />
      </Routes>
    </>
  );
}
