import { describe, it, expect } from "vitest";
import { applyFilters } from "./applyFilters";

const data = [
  {
    id: "prop1",
    type: "House",
    bedrooms: 3,
    price: 750000,
    location: "London BR5",
    added: { month: "October", day: 12, year: 2022 },
  },
  {
    id: "prop2",
    type: "Flat",
    bedrooms: 2,
    price: 400000,
    location: "London BR6",
    added: { month: "September", day: 14, year: 2022 },
  },
];

// FULL default criteria (matches your real app)
const baseCriteria = {
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
};

describe("applyFilters", () => {
  it("filters by property type", () => {
    const result = applyFilters(data, {
      ...baseCriteria,
      type: "House",
    });
    expect(result.length).toBe(1);
  });

  it("filters by minimum price", () => {
    const result = applyFilters(data, {
      ...baseCriteria,
      minPrice: "700000",
    });
    expect(result.length).toBe(1);
  });

  it("filters by postcode", () => {
    const result = applyFilters(data, {
      ...baseCriteria,
      postcode: "BR6",
    });
    expect(result[0].id).toBe("prop2");
  });
});
