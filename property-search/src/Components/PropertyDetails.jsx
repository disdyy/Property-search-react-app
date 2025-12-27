import properties from "../data/properties.json";
import { useState } from "react";

export default function PropertyDetails() {
  const { id } = useParams();
  const property = properties.find((p) => p.id === id);

  const [tab, setTab] = useState("description");

  if (!property) {
    return <div>Property not found</div>;
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 16 }}>
      <Link to="/" style={{ display: "inline-block", marginBottom: 12 }}>
        ← Back to search
      </Link>

      <h1>£{property.price.toLocaleString()}</h1>
      <div style={{ marginBottom: 10 }}>
        {property.bedrooms} bed • {property.type}
      </div>
      <div style={{ color: "#555", marginBottom: 16 }}>
        {property.location}
      </div>

      {/* Main image */}
      <img
        src={property.picture}
        alt="Property"
        style={{ width: "100%", borderRadius: 12, marginBottom: 16 }}
      />

      {/* Tabs */}
      <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
        <button onClick={() => setTab("description")}>Description</button>
        <button onClick={() => setTab("floor")}>Floor Plan</button>
        <button onClick={() => setTab("map")}>Map</button>
      </div>

      {/* Tab content */}
      <div style={{ border: "1px solid #ddd", padding: 12, borderRadius: 10 }}>
        {tab === "description" && <p>{property.description}</p>}

        {tab === "floor" && (
          <img
            src={property.picture}
            alt="Floor plan"
            style={{ width: "100%" }}
          />
        )}

        {tab === "map" && (
          <iframe
            title="map"
            width="100%"
            height="300"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src="https://maps.google.com/maps?q=London&z=12&output=embed"
          />
        )}
      </div>
    </div>
  );
}