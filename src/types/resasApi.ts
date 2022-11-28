import { Prefecture } from "./prefecture";

/*
GET api/v1/prefectures
sample: https://opendata.resas-portal.go.jp/docs/api/v1/prefectures.html
*/

type Message = string | null;

interface ResasPrefecturesResponses {
  message: Message;
  result: Prefecture[];
}

/*
GET api/v1/population/composition/perYear
sample: https://opendata.resas-portal.go.jp/docs/api/v1/population/composition/perYear.html
*/
interface ResasPopulationResponses {
  message: Message;
  result: ResasPopulationResult;
}

interface ResasPopulationResult {
  data: ResasPopulation[];
  boundaryYear: number;
}

interface ResasPopulation {
  data: ResasPopulationPerYear[];
  label: string;
}

interface ResasPopulationPerYear {
  value: number;
  year: number;
  rate?: number;
}

export type {
  ResasPrefecturesResponses,
  ResasPopulationResponses,
  ResasPopulationResult,
  ResasPopulation,
  ResasPopulationPerYear,
};
