import { rest } from "msw";
import prefectures from "./api/prefectures";
import population from "./api/population";

const getPrefectures = rest.get("/api/v1/prefectures", prefectures.get);
const getPopulation = rest.get(
  "/api/v1/population/composition/perYear",
  population.get
);

const handlers = [getPrefectures, getPopulation];

export { handlers };
