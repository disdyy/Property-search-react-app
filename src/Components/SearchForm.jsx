import { useState } from "react";

export default function SearchForm({ onSearch }) {
  const [type, setType] = useState("Any");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [minBeds, setMinBeds] = useState("");
  const [maxBeds, setMaxBeds] = useState("");

  const [postcode, setPostcode] = useState("");

  // Date mode: "after" or "between"
  const [dateMode, setDateMode] = useState("after");
  const [afterDate, setAfterDate] = useState(""); // YYYY-MM-DD

  const [fromDate, setFromDate] = useState(""); // YYYY-MM-DD
  const [toDate, setToDate] = useState("");   // YYYY-MM-DD

  function handleSubmit(e) {
    e.preventDefault();

    onSearch({
      type,
      minPrice,
      maxPrice,
      minBeds,
      maxBeds,
      postcode,
      dateMode,
      afterDate,
      fromDate,
      toDate,
    });
  }

  function handleClear() {
    setType("Any");
    setMinPrice("");
    setMaxPrice("");
    setMinBeds("");
    setMaxBeds("");
    setPostcode("");
    setDateMode("after");
    setAfterDate("");
    setFromDate("");
    setToDate("");

    onSearch({
      type: "Any",
      minPrice: "",
      maxPrice: "",
      minBeds: "",
      maxBeds: "",
      postcode: "",
      dateMode: "after",
      afterDate: "",
      fromDate: "",
      toDate: "",
    });
  }

  return (
    <form onSubmit={handleSubmit} style={{ border: "1px solid #ddd", padding: 12, borderRadius: 12, marginBottom: 16 }}>
      <h2 style={{ marginTop: 0 }}>Search</h2>

      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
        {/* Type */}
        <label>
          Property Type
          <select value={type} onChange={(e) => setType(e.target.value)} style={{ width: "100%", padding: 8, marginTop: 4 }}>
            <option>Any</option>
            <option>House</option>
            <option>Flat</option>
          </select>
        </label>

        {/* Price */}
        <label>
          Min Price
          <input value={minPrice} onChange={(e) => setMinPrice(e.target.value)} type="number" min="0" style={{ width: "100%", padding: 8, marginTop: 4 }} />
        </label>

        <label>
          Max Price
          <input value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} type="number" min="0" style={{ width: "100%", padding: 8, marginTop: 4 }} />
        </label>

        {/* Bedrooms */}
        <label>
          Min Bedrooms
          <input value={minBeds} onChange={(e) => setMinBeds(e.target.value)} type="number" min="0" style={{ width: "100%", padding: 8, marginTop: 4 }} />
        </label>

        <label>
          Max Bedrooms
          <input value={maxBeds} onChange={(e) => setMaxBeds(e.target.value)} type="number" min="0" style={{ width: "100%", padding: 8, marginTop: 4 }} />
        </label>

        {/* Postcode area */}
        <label>
          Postcode Area (e.g., BR5)
          <input value={postcode} onChange={(e) => setPostcode(e.target.value)} placeholder="BR5" style={{ width: "100%", padding: 8, marginTop: 4 }} />
        </label>

        {/* Date */}
        <label>
          Date Filter Mode
          <select value={dateMode} onChange={(e) => setDateMode(e.target.value)} style={{ width: "100%", padding: 8, marginTop: 4 }}>
            <option value="after">Added After</option>
            <option value="between">Added Between</option>
          </select>
        </label>

        {dateMode === "after" ? (
          <label>
            Added After
            <input value={afterDate} onChange={(e) => setAfterDate(e.target.value)} type="date" style={{ width: "100%", padding: 8, marginTop: 4 }} />
          </label>
        ) : (
          <>
            <label>
              From
              <input value={fromDate} onChange={(e) => setFromDate(e.target.value)} type="date" style={{ width: "100%", padding: 8, marginTop: 4 }} />
            </label>
            <label>
              To
              <input value={toDate} onChange={(e) => setToDate(e.target.value)} type="date" style={{ width: "100%", padding: 8, marginTop: 4 }} />
            </label>
          </>
        )}
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
        <button type="submit" style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #222" }}>
          Search
        </button>
        <button type="button" onClick={handleClear} style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #aaa" }}>
          Clear
        </button>
      </div>
    </form>
  );
}