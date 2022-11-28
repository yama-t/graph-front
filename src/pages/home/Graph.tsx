import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { PrefecturePopulation } from "@/types/prefecture";

const graphTitle = "";
const seriesDefaultName = "都道府県名";
const height = "600px"; // グラフ表示領域の高さ
const xAxisText = "年度";
const yAxisText = "人口数";
const pointStart = 1960; // 描画を始めるX軸の年度
const maxYear = 2025; // X軸の最大値（年度）
const pointInterval = 10; // グラフの点を描画する間隔（年）
const xAxisTickInterval = 10; // X軸の目盛り間隔（年）
const yAxisTickInterval = 1000000; // Y軸の目盛り間隔（人）

// Y軸表示のフォーマット設定
const formatter = function (
  this: Highcharts.AxisLabelsFormatterContextObject
): string {
  // 3桁区切りの数値で表示する
  return Highcharts.numberFormat(this.pos, 0, "", ",");
};

// 凡例の位置設定
const legend: Highcharts.LegendOptions = {
  layout: "vertical",
  align: "right",
  verticalAlign: "top",
};

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
    chart: {
      height,
    },
    xAxis: {
      title: { text: xAxisText },
      categories,
      max: maxYear,
      tickInterval: xAxisTickInterval,
    },
    yAxis: {
      title: {
        text: yAxisText,
        // ラベルを上部に水平表示する
        align: "high",
        offset: 0,
        rotation: 0,
        y: 6,
        x: 40,
      },
      lineWidth: 1,
      tickWidth: 1,
      tickInterval: yAxisTickInterval,
      min: 0,
      labels: { formatter },
    },
    series,
    legend,
    plotOptions: {
      series: {
        pointStart,
        pointInterval,
      },
    },
  };

  return (
    <div className="graph">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
