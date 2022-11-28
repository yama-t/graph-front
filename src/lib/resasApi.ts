import { PrefCode } from "@/types/prefecture";
import {
  ResasPopulationResponses,
  ResasPrefecturesResponses,
} from "@/types/resasApi";

const apiEndPoint = "https://opendata.resas-portal.go.jp";
const getPrefecturesApi = "/api/v1/prefectures";
const getPrefecturesUrl = apiEndPoint + getPrefecturesApi;
const getPopulationApi = "/api/v1/population/composition/perYear";
const getPopulationUrl = apiEndPoint + getPopulationApi;

const getPrefectures = async (
  apiKey: string
): Promise<ResasPrefecturesResponses> => {
  const response = await fetch(getPrefecturesUrl, {
    headers: { "X-API-KEY": apiKey },
  });
  return await response.json();
};

const getPopulation = async (
  prefCode: PrefCode,
  apiKey: string
): Promise<ResasPopulationResponses> => {
  const params = new URLSearchParams({ prefCode: `${prefCode}` });
  const url = `${getPopulationUrl}?${params}`;
  const response = await fetch(url, {
    headers: { "X-API-KEY": apiKey },
  });
  return await response.json();
};

export default {
  getPrefectures,
  getPopulation,
};

export { getPrefectures, getPopulation };
