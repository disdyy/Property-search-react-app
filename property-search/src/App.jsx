import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import data from "./data/properties.json";
import PropertyCard from "./Components/PropertyCard";
import SearchForm from "./Components/SearchForm";
import PropertyDetails from "./Components/PropertyDetails";
import { applyFilters } from "./utils/applyFilters";
import "./App.css";
import Navbar from "./Components/Navbar";

const properties = data.properties;

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
              {/* Search */}
              <SearchForm onSearch={handleSearch} />

              <div className="count">
                Showing {filtered.length} result(s)
              </div>

              <div className="layout">
                {/* LEFT: SEARCH RESULTS */}
                <div className="results" id="results">
                  {filtered.map((p) => (
                    <PropertyCard
                      key={p.id}
                      p={p}
                      onAddFavourite={addFavourite}
                    />
                  ))}
                </div>

                {/* RIGHT: FAVOURITES */}
                <div
                  className="favourites"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    const droppedId = e.dataTransfer.getData("text/plain");
                    addFavourite(droppedId);
                  }}
                >
                  <h2>Favourites</h2>

                  {favourites.length === 0 && <p>No favourites yet.</p>}

                  <div className="fav-grid">
                    {favourites.map((id) => {
                      const property = properties.find((p) => p.id === id);
                      if (!property) return null;

                      return (
                        <div key={id} className="fav-item">
                          <div className="fav-price">
                            £{property.price.toLocaleString()}
                          </div>

                          <div className="fav-meta">
                            {property.bedrooms} bed • {property.type}
                          </div>

                          <button
                            type="button"
                            className="btn"
                            onClick={() => removeFavourite(id)}
                          >
                            Remove
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {favourites.length > 0 && (
                    <button
                      type="button"
                      className="btn"
                      onClick={clearFavourites}
                      style={{ marginTop: 12 }}
                    >
                      Clear all favourites
                    </button>
                  )}
                </div>
              </div>

              {/* ABOUT SECTION */}
              <div id="about" className="section-box">
                <h2>Who Are We?</h2>
                <p>
                  Property Finder is a modern property listing platform designed to
                  simplify the process of buying and renting homes. We help users
                  discover properties that match their needs through clear listings,
                  powerful search tools, and an easy way to save favourites.
                </p>
                <p>
                  Our focus is on providing a clean, accessible, and user-friendly
                  experience using modern web technologies, making property searches
                  more efficient and stress-free.
                </p>
              </div>

              {/* CONTACT SECTION */}
              <div id="contact" className="section-box">
                <h2>Contact Us</h2>
                <p className="section-subtext">
                  Fill in the form below and we’ll get back to you as soon as possible.
                </p>

                <ContactForm />
              </div>
            </div>
          }
        />

        {/* DETAILS PAGE */}
        <Route path="/property/:id" element={<PropertyDetails />} />
      </Routes>
    </>
  );
}

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

    if (!form.name || !form.email || !form.phone || !form.reason || !form.message) {
      setStatus("Please fill in all fields.");
      return;
    }

    if (!form.agree) {
      setStatus("Please agree with the details and requirements.");
      return;
    }

    setStatus("Message sent successfully! We will contact you soon.");

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
