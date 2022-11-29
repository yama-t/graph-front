import Highcharts from "highcharts";
import { PrefName, PrefCode, PrefecturePopulation } from "@/types/prefecture";
import { ResasPopulationResult } from "@/types/resasApi";

interface PopulationData {
  categories: Highcharts.XAxisOptions["categories"];
  series: Highcharts.SeriesOptionsType[];
}

const createPopulationDataWithPrefecture = function (
  prefName: PrefName,
  prefCode: PrefCode,
  populationData: ResasPopulationResult
) {
  const totalPopulation = populationData?.data[0]?.data ?? [];
  return {
    prefName,
    prefCode,
    data: totalPopulation,
  };
};

/*
## categories
["1960", "1965", "1970", "1975", "1980"]...

## series
 [
    {
        data: [9683802, 10869244...]
        name: "東京都"
        type: "line"
    },
    {
        data: [3443176, 4430743,...]
        name: "神奈川県"
        type: "line"
    }
    ...
 ]
*/
const createHighchartsPopulationData = function (
  rawData: PrefecturePopulation[],
  seriesDefaultName = ""
): PopulationData {
  // X軸（年）
  const categories: Highcharts.XAxisOptions["categories"] = [];
  // Y軸（人口）
  let series: Highcharts.SeriesOptionsType[] = [];

  for (const rd of rawData) {
    const data = [];

    for (const population of rd.data) {
      data.push(population.value);
      categories.push(String(population.year));
    }

    series.push({
      type: "line",
      name: rd.prefName,
      data,
    });
  }

  if (series.length === 0) {
    series = [{ type: "line", name: seriesDefaultName, data: [] }];
  }

  return { categories, series };
};

export { createPopulationDataWithPrefecture, createHighchartsPopulationData };
