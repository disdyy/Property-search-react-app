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
              {/* Removed <h1>Property Finder</h1> because it's in Navbar now */}

              <SearchForm onSearch={handleSearch} />

              <div className="count">Showing {filtered.length} result(s)</div>

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

                {/* RIGHT: FAVOURITES (DROP ZONE) */}
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

                  {/* FAVOURITES GRID WRAPPER */}
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

              {/* Optional sections to match navbar links */}
              <div id="about" className="section-box">
              <h2>Who Are We?</h2>
              <p>
               We are a dedicated real estate platform committed to helping people find the right place to call home.
              Our focus is on connecting buyers with a wide range of quality properties, including houses, flats, and 
              apartments, that suit different lifestyles and budgets. We believe t hat property buying should be simple, 
              transparent, and stress-free, so we provide clear property information, honest pricing, and user-friendly 
              browsing experiences. With a strong emphasis on trust, professionalism, and customer satisfaction, we aim to 
              support our clients at every step of their property journey and help them make confident, well-informed decisions.
              </p>
              </div>

              <div id="contact" className="section-box">
                <h2>Contact Us</h2>
                <p>Email: example@email.com</p>
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