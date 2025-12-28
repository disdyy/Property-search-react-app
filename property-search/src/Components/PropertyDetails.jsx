import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import data from "../data/properties.json";

export default function PropertyDetails() {
  const { id } = useParams();

  const properties = data.properties;
  const property = properties.find((p) => p.id === id);

  const [tab, setTab] = useState("description");

  // Gallery images (use property.gallery if available, else fallback to property.picture)
  const gallery =
    property?.gallery && property.gallery.length > 0
      ? property.gallery
      : property?.picture
      ? [property.picture]
      : [];

  //  Main image for gallery tab
  const [mainImage, setMainImage] = useState(gallery[0] || "");

  if (!property) {
    return (
      <div style={{ maxWidth: 900, margin: "0 auto", padding: 16 }}>
        <Link to="/">← Back to search</Link>
        <h2 style={{ marginTop: 12 }}>Property not found</h2>
        <p>The property id "{id}" does not exist in your JSON file.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 16 }}>
      <Link to="/" style={{ display: "inline-block", marginBottom: 12 }}>
        ← Back to search
      </Link>

      <h1>£{property.price.toLocaleString()}</h1>

      <div style={{ marginBottom: 6 }}>
        {property.bedrooms} bed • {property.type}
      </div>

      <div style={{ color: "#555", marginBottom: 16 }}>{property.location}</div>

      {/* Main image (always show first image) */}
      {gallery.length > 0 ? (
        <img
          src={gallery[0]}
          alt="Property"
          style={{ width: "100%", borderRadius: 12, marginBottom: 16 }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: 250,
            borderRadius: 12,
            border: "1px solid #ddd",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 16,
            color: "#777",
          }}
        >
          No image available
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
        <button type="button" onClick={() => setTab("description")}>
          Description
        </button>
        <button type="button" onClick={() => setTab("gallery")}>
          Property Gallery
        </button>
        <button type="button" onClick={() => setTab("map")}>
          Map
        </button>
      </div>

      {/* Tab content */}
      <div style={{ border: "1px solid #ddd", padding: 12, borderRadius: 10 }}>
        {/* Description Tab */}
        {tab === "description" && <p>{property.description}</p>}

        {/* Gallery Tab */}
        {tab === "gallery" && (
          <div>
            {gallery.length === 0 ? (
              <p>No gallery images available.</p>
            ) : (
              <>
                {/* Big image */}
                <div style={{ marginBottom: 12 }}>
                  <img
                    src={mainImage}
                    alt="Property Gallery"
                    style={{
                      width: "100%",
                      maxHeight: 450,
                      objectFit: "cover",
                      borderRadius: 12,
                      border: "1px solid #ccc",
                    }}
                  />
                </div>

                {/* Thumbnails */}
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {gallery.map((img) => (
                    <img
                      key={img}
                      src={img}
                      alt="Thumbnail"
                      onClick={() => setMainImage(img)}
                      style={{
                        width: 120,
                        height: 80,
                        objectFit: "cover",
                        borderRadius: 10,
                        border:
                          mainImage === img
                            ? "2px solid #000"
                            : "1px solid #ccc",
                        cursor: "pointer",
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Map Tab */}
        {tab === "map" && (
          <iframe
            title="map"
            width="100%"
            height="300"
            style={{ border: 0 }}
            loading="lazy"
            src="https://maps.google.com/maps?q=London&z=12&output=embed"
          />
        )}
      </div>
    </div>
  );
}