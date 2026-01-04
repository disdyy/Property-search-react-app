export default function FavouritesPage({
  favourites,
  properties,
  onRemoveFavourite,
  onClearFavourites,
  onAddFavourite,
}) {
  const favouriteProps = favourites
    .map((id) => properties.find((p) => p.id === id))
    .filter(Boolean);

  function handleDrop(e) {
    e.preventDefault();
    const droppedId = e.dataTransfer.getData("text/plain");
    onAddFavourite(droppedId);
  }

  return (
    <div
      className="page"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <h2 style={{ textAlign: "center", marginTop: 20 }}>
        Favourites
      </h2>

      {favouriteProps.length === 0 && (
        <p style={{ textAlign: "center", marginTop: 12 }}>
          Drag properties here to add favourites.
        </p>
      )}

      {favouriteProps.length > 0 && (
        <>
          <div className="fav-page-grid">
            {favouriteProps.map((p) => (
              <div key={p.id} className="fav-item">
                <div className="fav-price">
                  £{p.price.toLocaleString()}
                </div>

                <div className="fav-meta">
                  {p.bedrooms} bed • {p.type}
                </div>

                <div style={{ fontSize: 13, color: "#666" }}>
                  {p.location}
                </div>

                <button
                  type="button"
                  className="btn"
                  style={{ marginTop: 12 }}
                  onClick={() => onRemoveFavourite(p.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 16, textAlign: "center" }}>
            <button
              type="button"
              className="btn"
              onClick={onClearFavourites}
            >
              Clear all favourites
            </button>
          </div>
        </>
      )}
    </div>
  );
}