import Highcharts from "highcharts";
import { PrefName, PrefCode, PrefecturePopulation } from "@/types/prefecture";
import {
  ResasPopulationResult,
  ResasPopulationPerYear,
} from "@/types/resasApi";

// prefCodeの昇順ソート
const sortByPrefCode = function (
  prefecturesPopulation: PrefecturePopulation[]
): void {
  prefecturesPopulation.sort((a, b) => a.prefCode - b.prefCode);
};

const removeByPrefCode = function (
  prefecturesPopulation: PrefecturePopulation[],
  prefCode: PrefCode
): PrefecturePopulation[] {
  // prefCodeが一致するデータを取り除く（一致しないものだけ残す）
  return prefecturesPopulation.filter((item) => item.prefCode !== prefCode);
};

const createPopulationDataWithPrefecture = function (
  prefName: PrefName,
  prefCode: PrefCode,
  populationData: ResasPopulationResult
): { prefName: string; prefCode: PrefCode; data: ResasPopulationPerYear[] } {
  const totalPopulation = populationData?.data[0]?.data ?? [];
  return {
    prefName,
    prefCode,
    data: totalPopulation,
  };
};

/*
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
const createHighchartsSeries = function (
  rawData: PrefecturePopulation[],
  seriesDefaultName = ""
): Highcharts.SeriesOptionsType[] {
  // Y軸（人口）
  let series: Highcharts.SeriesOptionsType[] = [];

  for (const rd of rawData) {
    const data = [];

    for (const population of rd.data) {
      data.push(population.value);
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

  return series;
};

export {
  sortByPrefCode,
  removeByPrefCode,
  createPopulationDataWithPrefecture,
  createHighchartsSeries,
};
