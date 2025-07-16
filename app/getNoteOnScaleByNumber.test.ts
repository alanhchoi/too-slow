import { expect, test } from "vitest";
import { getNoteOnScaleByNumber } from "./getNoteOnScaleByNumber";

test("Sixth of C7 scale is A", () => {
  expect(getNoteOnScaleByNumber("C", 6)).toBe("A");
});

test("Seventh of F7 scale is Eb", () => {
  expect(getNoteOnScaleByNumber("F", 7)).toBe("Eb");
});
