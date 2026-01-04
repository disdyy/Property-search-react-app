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
    <form className="search-card" onSubmit={handleSubmit}>
      <h2>Search</h2>

      <div className="search-grid">
        {/* Type */}
        <label>
          Property Type
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option>Any</option>
            <option>House</option>
            <option>Flat</option>
          </select>
        </label>

        {/* Price */}
        <label>
          Min Price
          <input
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            type="number"
            min="0"
            placeholder="0"
          />
        </label>

        <label>
          Max Price
          <input
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            type="number"
            min="0"
            placeholder="Any"
          />
        </label>

        {/* Bedrooms */}
        <label>
          Min Bedrooms
          <input
            value={minBeds}
            onChange={(e) => setMinBeds(e.target.value)}
            type="number"
            min="0"
            placeholder="0"
          />
        </label>

        <label>
          Max Bedrooms
          <input
            value={maxBeds}
            onChange={(e) => setMaxBeds(e.target.value)}
            type="number"
            min="0"
            placeholder="Any"
          />
        </label>

        {/* Postcode area */}
        <label>
          Postcode Area (e.g., BR5)
          <input
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            placeholder="BR5"
          />
        </label>

        {/* Date */}
        <label>
          Date Filter Mode
          <select value={dateMode} onChange={(e) => setDateMode(e.target.value)}>
            <option value="after">Added After</option>
            <option value="between">Added Between</option>
          </select>
        </label>

        {dateMode === "after" ? (
          <label>
            Added After
            <input
              value={afterDate}
              onChange={(e) => setAfterDate(e.target.value)}
              type="date"
            />
          </label>
        ) : (
          <>
            <label>
              From
              <input
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                type="date"
              />
            </label>
            <label>
              To
              <input
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                type="date"
              />
            </label>
          </>
        )}
      </div>

      <div className="search-actions">
        <button type="submit">Search</button>
        <button type="button" onClick={handleClear}>
          Clear
        </button>
      </div>
    </form>
  );
}