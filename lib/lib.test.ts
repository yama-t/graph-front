import { envCheck, calcSquare } from "./lib";
import { test, expect } from "vitest";

test("envCheckTest", () => {
  expect(envCheck("env-check")).toBeTruthy();
});

test("calcTest", () => {
  expect(calcSquare(2)).toBe(4);
});
