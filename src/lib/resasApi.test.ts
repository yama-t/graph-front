import { getPrefectures } from "./resasApi";
import { test, expect } from "vitest";

const dummyApiKey = "dummy-api-key";

test("getPrefectures", async () => {
  const jsonData = await getPrefectures(dummyApiKey);
  const prefectures = jsonData.result;
  expect(prefectures.length).toBe(5);
  expect(prefectures[0].prefName).toBe("北海道");
});
