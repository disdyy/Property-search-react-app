import { useParams, Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import data from "../data/properties.json";

export default function PropertyDetails() {
  const { id } = useParams();

  const properties = data.properties;

  // FIX: id from URL is a string, JSON id might be a number
  const property = useMemo(() => {
    return properties.find((p) => String(p.id) === String(id));
  }, [id, properties]);

  const [tab, setTab] = useState("description");

  // Gallery images (use property.gallery if available, else fallback to property.picture)
  const gallery = useMemo(() => {
    if (!property) return [];
    if (property.gallery && property.gallery.length > 0) return property.gallery;
    if (property.picture) return [property.picture];
    return [];
  }, [property]);

  // Main image for gallery tab
  const [mainImage, setMainImage] = useState("");

  // FIX: update main image when gallery loads/changes
  useEffect(() => {
    setMainImage(gallery[0] || "");
  }, [gallery]);

  if (!property) {
    return (
      <div style={{ maxWidth: 900, margin: "0 auto", padding: 16 }}>
        <Link to="/" className="btn btn-link details-back">
          ← Back to search
        </Link>
        <h2 style={{ marginTop: 12 }}>Property not found</h2>
        <p>The property id "{id}" does not exist in your JSON file.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 16 }}>
      <Link to="/" className="btn btn-link details-back">
        ← Back to search
      </Link>

      <h1>£{Number(property.price).toLocaleString()}</h1>

      <div style={{ marginBottom: 6 }}>
        {property.bedrooms} bed • {property.type}
      </div>

      <div style={{ color: "#555", marginBottom: 16 }}>{property.location}</div>

      {/* Main image (always show first image) */}
      {gallery.length > 0 ? (
        <img
          src={gallery[0]}
          alt="Property"
          className="details-hero"
        />
      ) : (
        <div className="details-noimage">No image available</div>
      )}

      {/* Tabs */}
      <div className="details-tabs">
        <button
          type="button"
          className={`btn details-tab ${tab === "description" ? "details-tab-active" : ""}`}
          onClick={() => setTab("description")}
        >
          Description
        </button>

        <button
          type="button"
          className={`btn details-tab ${tab === "gallery" ? "details-tab-active" : ""}`}
          onClick={() => setTab("gallery")}
        >
          Property Gallery & Floor Plan
        </button>

        <button
          type="button"
          className={`btn details-tab ${tab === "map" ? "details-tab-active" : ""}`}
          onClick={() => setTab("map")}
        >
          Map
        </button>
      </div>

      {/* Tab content */}
      <div className="details-panel">
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
                    className="details-gallery-main"
                  />
                </div>

                {/* Thumbnails */}
                <div className="details-thumbs">
                  {gallery.map((img) => (
                    <img
                      key={img}
                      src={img}
                      alt="Thumbnail"
                      onClick={() => setMainImage(img)}
                      className={`details-thumb ${mainImage === img ? "details-thumb-active" : ""}`}
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