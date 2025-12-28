import { Link } from "react-router-dom";

export default function PropertyCard({ p, onAddFavourite }) {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", p.id);
      }}
      style={{
        border: "1px solid #ddd",
        borderRadius: 12,
        padding: 12,
        display: "flex",
        gap: 12,
        cursor: "grab",
      }}
    >
      <img
        src={p.picture}
        alt={p.type}
        style={{
          width: 140,
          height: 100,
          objectFit: "cover",
          borderRadius: 10,
        }}
      />

      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: 18 }}>
          £{p.price.toLocaleString()}
        </div>

        <div style={{ marginTop: 4 }}>
          {p.bedrooms} bed • {p.type}
        </div>

        <div style={{ marginTop: 6, color: "#444" }}>{p.description}</div>

        <div style={{ marginTop: 8, fontSize: 12, color: "#666" }}>
          {p.location}
        </div>

        <div style={{ marginTop: 10, display: "flex", gap: 12 }}>
          <Link
            to={`/property/${p.id}`}
            style={{
              color: "#0066cc",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            View property
          </Link>

          <button
            type="button"
            onClick={() => onAddFavourite(p.id)}
            style={{
              padding: "4px 10px",
              borderRadius: 8,
              border: "1px solid #888",
              cursor: "pointer",
            }}
          >
            Add to favourites
          </button>
        </div>
      </div>
    </div>
  );
}