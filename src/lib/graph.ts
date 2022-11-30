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
  // データがない場合は初期表示を設定
  if (rawData.length === 0) {
    return [{ type: "line", name: seriesDefaultName, data: [] }];
  }
  // seriesを生成
  return rawData.map((item) => {
    const data = item.data.map((population) => population.value);
    return {
      data,
      name: item.prefName,
      type: "line",
    };
  });
};

export {
  sortByPrefCode,
  removeByPrefCode,
  createPopulationDataWithPrefecture,
  createHighchartsSeries,
};
