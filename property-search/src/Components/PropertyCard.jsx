export default function PropertyCard({ p }) {
  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: 12,
      padding: 12,
      display: "flex",
      gap: 12
    }}>
      <img
        src={p.picture}
        alt={p.type}
        style={{ width: 140, height: 100, objectFit: "cover", borderRadius: 10 }}
      />

      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: 18 }}>£{p.price.toLocaleString()}</div>
        <div style={{ marginTop: 4 }}>
          {p.bedrooms} bed • {p.type}
        </div>
        <div style={{ marginTop: 6, color: "#444" }}>{p.description}</div>
        <div style={{ marginTop: 8, fontSize: 12, color: "#666" }}>{p.location}</div>
      </div>
    </div>
  );
}