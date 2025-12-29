import { describe, it, expect } from "vitest";
import { extractPostcodeArea, addedToDate } from "./filters";

describe("filters helpers", () => {
  it("gets postcode area", () => {
    expect(
      extractPostcodeArea("Petts Wood Road, Orpington BR5")
    ).toBe("BR5");
  });

  it("creates a valid Date from added object", () => {
    const d = addedToDate({ month: "October", day: 12, year: 2022 });
    expect(d instanceof Date).toBe(true);
  });
});
