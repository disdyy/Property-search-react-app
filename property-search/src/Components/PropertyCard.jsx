import { Link } from "react-router-dom";

export default function PropertyCard({ p, onAddFavourite }) {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", p.id);
      }}
      className="property-card"
    >
      <img
        src={p.picture}
        alt={p.type}
        className="property-image"
      />

      <div className="property-content">
        <div className="property-price">
          £{p.price.toLocaleString()}
        </div>

        <div className="property-meta">
          {p.bedrooms} bed • {p.type}
        </div>

        <div className="property-location">
          {p.location}
        </div>

        {/* ACTION BUTTONS */}
        <div className="property-actions">
          {/* View Property as BUTTON */}
          <Link to={`/property/${p.id}`} className="btn btn-link">
            View property
          </Link>

          {/* Add to favourites BUTTON */}
          <button
            type="button"
            className="btn"
            onClick={() => onAddFavourite(p.id)}
          >
            Add to favourites
          </button>
        </div>
      </div>
    </div>
  );
}