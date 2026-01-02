import { Link } from "react-router-dom";

export default function PropertyCard({ p, onAddFavourite }) {
  const shortDesc =
    p.description && p.description.length > 160
      ? p.description.slice(0, 160) + "..."
      : p.description;

  return (
    <div
      className="property-card"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", p.id);
      }}
    >
      <div className="property-image">
        <img src={p.picture} alt={p.type} />
      </div>

      <div className="property-info">
        <div>
          <div className="property-price">£{p.price.toLocaleString()}</div>
          <div className="property-meta">
            {p.bedrooms} bed • {p.type}
          </div>

          <div className="property-desc">{shortDesc}</div>
          <div className="property-location">{p.location}</div>
        </div>

        <div className="property-actions">
          <Link className="btn-link" to={`/property/${p.id}`}>
            View property
          </Link>

          <button className="btn" type="button" onClick={() => onAddFavourite(p.id)}>
            Add to favourites
          </button>
        </div>
      </div>
    </div>
  );
}