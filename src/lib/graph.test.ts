import { sortByPrefCode, removeByPrefCode } from "./graph";
import { prefecturesPopulation } from "@/mocks/data/prefecturesPopulation";
import { test, expect } from "vitest";

test("sortByPrefCode", () => {
  const data = prefecturesPopulation.slice();
  sortByPrefCode(data);
  const prefCodes = data.map((item) => item.prefCode);
  expect(prefCodes).toMatchObject([9, 16, 23, 26]);
});

test("sortByPrefCode", () => {
  const prefCode = 16;
  const data = prefecturesPopulation.slice();
  const removedData = removeByPrefCode(data, prefCode);
  const prefCodes = removedData.map((item) => item.prefCode);
  expect(removedData).toHaveLength(3);
  expect(prefCodes).not.toContain(16);
});
