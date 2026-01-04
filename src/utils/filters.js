// Extract postcode area from the END of the location string
// Example: "Petts Wood Road, Petts Wood, Orpington BR5" -> "BR5"
export function extractPostcodeArea(location) {
  if (!location) return "";
  const parts = location.trim().split(/\s+/);
  return parts[parts.length - 1].toUpperCase();
}

// Convert the JSON added object into a JS Date
// added: { month: "October", day: 12, year: 2022 }
export function addedToDate(added) {
  if (!added) return null;
  const { month, day, year } = added;

  // Convert month name to month index
  const monthIndex = new Date(`${month} 1, ${year}`).getMonth();
  return new Date(year, monthIndex, day);
}