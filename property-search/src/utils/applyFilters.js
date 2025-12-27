import { extractPostcodeArea, addedToDate } from "./filters";

export function applyFilters(properties, criteria) {
  const {
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
  } = criteria;

  let results = [...properties];

  // Type
  if (type && type !== "Any") {
    results = results.filter((p) => p.type === type);
  }

  // Price
  const minP = minPrice === "" ? null : Number(minPrice);
  const maxP = maxPrice === "" ? null : Number(maxPrice);

  if (minP !== null) results = results.filter((p) => p.price >= minP);
  if (maxP !== null) results = results.filter((p) => p.price <= maxP);

  // Bedrooms
  const minB = minBeds === "" ? null : Number(minBeds);
  const maxB = maxBeds === "" ? null : Number(maxBeds);

  if (minB !== null) results = results.filter((p) => p.bedrooms >= minB);
  if (maxB !== null) results = results.filter((p) => p.bedrooms <= maxB);

  // Postcode area
  if (postcode && postcode.trim() !== "") {
    const target = postcode.trim().toUpperCase();
    results = results.filter((p) => extractPostcodeArea(p.location) === target);
  }

  // Date added
  // We compare property addedDate to user-selected date(s)
  if (dateMode === "after" && afterDate) {
    const after = new Date(afterDate);
    results = results.filter((p) => {
      const d = addedToDate(p.added);
      return d && d >= after;
    });
  }

  if (dateMode === "between" && fromDate && toDate) {
    const from = new Date(fromDate);
    const to = new Date(toDate);
    results = results.filter((p) => {
      const d = addedToDate(p.added);
      return d && d >= from && d <= to;
    });
  }

  return results;
}