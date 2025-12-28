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
      <Route
        path="/"
        element={
          <div className="page">
            <h1>Property Search</h1>

            <SearchForm onSearch={handleSearch} />

            <div style={{ marginBottom: 10, color: "#555" }}>
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
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  const droppedId = e.dataTransfer.getData("text/plain");
                  addFavourite(droppedId);
                }}
                style={{
                  border: "2px dashed #aaa",
                  borderRadius: 12,
                  padding: 12,
                  minHeight: 140,
                }}
              >
                <h2 style={{ marginTop: 0 }}>Favourites (Drop Here)</h2>

                {favourites.length === 0 && <p>No favourites yet.</p>}

                {favourites.map((id) => {
                  const property = properties.find((p) => p.id === id);
                  if (!property) return null;

                  return (
                    <div
                      key={id}
                      style={{
                        border: "1px solid #ccc",
                        padding: 10,
                        marginBottom: 8,
                        borderRadius: 10,
                      }}
                    >
                      <strong>£{property.price.toLocaleString()}</strong>
                      <div>
                        {property.bedrooms} bed • {property.type}
                      </div>
                      <button type="button" onClick={() => removeFavourite(id)}>
                        Remove
                      </button>
                    </div>
                  );
                })}

                {favourites.length > 0 && (
                  <button type="button" onClick={clearFavourites}>
                    Clear all favourites
                  </button>
                )}
              </div>
            </div>
          </div>
        }
      />

      <Route path="/property/:id" element={<PropertyDetails />} />
    </Routes>
  );
}
