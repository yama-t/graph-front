import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { PrefecturePopulation } from "@/types/prefecture";
import { createPopulationData } from "@/lib/graph";

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

export default function Graph({ data }: Props) {
  const { categories, series } = createPopulationData(data, seriesDefaultName);
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
