import { getPrefectures, getPopulation } from "./resasApi";
import { test, expect } from "vitest";

const dummyApiKey = "dummy-api-key";

test("getPrefectures", async () => {
  const jsonData = await getPrefectures(dummyApiKey);
  const prefectures = jsonData.result;
  expect(prefectures.length).toBe(5);
  expect(prefectures[0].prefName).toBe("北海道");
});

test("getPopulation", async () => {
  const prefCode = 1;
  const jsonData = await getPopulation(prefCode, dummyApiKey);
  const population = jsonData.result;
  const data = population.data[0];
  expect(data.label).toBe("総人口");
  expect(data.data[0].value).toBeTypeOf("number");
});
