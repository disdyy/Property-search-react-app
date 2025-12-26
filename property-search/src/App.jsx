import properties from "./data/properties.json";
import PropertyCard from "./Components/PropertyCard";

export default function App() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 16 }}>
      <h1 style={{ marginBottom: 16 }}>Property Search</h1>

      <div style={{ display: "grid", gap: 12 }}>
        {properties.map((p) => (
          <PropertyCard key={p.id} p={p} />
        ))}
      </div>
    </div>
  );
}