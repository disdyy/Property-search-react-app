import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import data from "./data/properties.json";
import PropertyCard from "./Components/PropertyCard";
import SearchForm from "./Components/SearchForm";
import PropertyDetails from "./Components/PropertyDetails";
import { applyFilters } from "./utils/applyFilters";
import "./App.css";

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
    <Routes>
      {/* HOME PAGE */}
      <Route
        path="/"
        element={
          <div className="page">
            <h1>Property Search</h1>

            <SearchForm onSearch={handleSearch} />

            <div className="count">
              Showing {filtered.length} result(s)
            </div>

            <div className="layout">
              {/* LEFT: SEARCH RESULTS */}
              <div className="results">
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
          </div>
        }
      />

      {/* DETAILS PAGE */}
      <Route path="/property/:id" element={<PropertyDetails />} />
    </Routes>
  );
}