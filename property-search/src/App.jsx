import { useState } from "react";
import data from "./data/properties.json";
import PropertyCard from "./components/PropertyCard";
import SearchForm from "./Components/SearchForm";
import { applyFilters } from "./utils/applyFilters";

const properties = data.properties; // get the array from the object

export default function App() {
  const [filtered, setFiltered] = useState(properties);

  function handleSearch(criteria) {
    const results = applyFilters(properties, criteria);
    setFiltered(results);
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 16 }}>
      <h1 style={{ marginBottom: 12 }}>Property Search</h1>

      <SearchForm onSearch={handleSearch} />

      <div style={{ marginBottom: 10, color: "#555" }}>
        Showing {filtered.length} result(s)
      </div>

      <div style={{ display: "grid", gap: 12 }}>
        {filtered.map((p) => (
          <PropertyCard key={p.id} p={p} />
        ))}
      </div>
    </div>
  );
}