import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const graphTitle = "";
const seriesDefaultName = "都道府県名";
const xAxisText = "年度";
const yAxisText = "人口数";

export default function Graph() {
  const categories: string[] = [];
  const series: Highcharts.SeriesOptionsType[] = [
    { type: "line", name: seriesDefaultName, data: [] },
  ];
  const options: Highcharts.Options = {
    title: { text: graphTitle },
    xAxis: { title: { text: xAxisText }, categories },
    yAxis: { title: { text: yAxisText } },
    series,
  };

  return (
    <div className="graph">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
