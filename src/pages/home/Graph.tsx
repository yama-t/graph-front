import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { PrefecturePopulation } from "@/types/prefecture";

const graphTitle = "";
const seriesDefaultName = "都道府県名";
const xAxisText = "年度";
const yAxisText = "人口数";

interface Props {
  data: PrefecturePopulation[];
}

interface PopulationData {
  categories: Highcharts.XAxisOptions["categories"];
  series: Highcharts.SeriesOptionsType[];
}

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
const createPopulationData = function (
  rawData: PrefecturePopulation[]
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

export default function Graph({ data }: Props) {
  const { categories, series } = createPopulationData(data);
  const options: Highcharts.Options = {
    title: { text: graphTitle },
    xAxis: { title: { text: xAxisText }, categories },
    yAxis: {
      title: {
        text: yAxisText,
        // ラベルを上部に水平表示する
        align: "high",
        offset: 0,
        rotation: 0,
        y: 10,
      },
      lineWidth: 1,
      tickWidth: 1,
    },
    series,
  };

  return (
    <div className="graph">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
