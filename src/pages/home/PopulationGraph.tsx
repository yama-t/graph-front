import React, { useEffect, useState } from "react";
import { Prefectures, PrefName, PrefCode } from "@/types/prefecture";
import PrefectureCheckbox from "./PrefecturesCheckbox";
import Graph from "./Graph";

const apiEndPoint = "https://opendata.resas-portal.go.jp";
const apiKey = import.meta.env.VITE_RESAS_API_KEY;
const getPrefecturesApi = "/api/v1/prefectures";
const getPrefecturesUrl = apiEndPoint + getPrefecturesApi;
const getPopulationApi = "/api/v1/population/composition/perYear";
const getPopulationUrl = apiEndPoint + getPopulationApi;

export default function PopuLationGraph() {
  const [prefectures, setPrefectures] = useState<Prefectures>([]);
  const [prefecturesPopulation, setPrefecturesPopulation] = useState([]);

  const getPrefectures = async () => {
    const response = await fetch(getPrefecturesUrl, {
      headers: { "X-API-KEY": apiKey },
    });
    const jsonData = await response.json();
    setPrefectures(jsonData.result);
  };

  const checkPrefecture = function (prefName: PrefName, prefCode: PrefCode) {
    // isChecked:true（値が配列に含まれていない）
    // isChecked:false（値が既に配列に含まれている）
    const isChecked = !prefecturesPopulation.some(
      (data) => data.prefCode === prefCode
    );
    // チェックを付けた場合だけ人口を取得する
    if (isChecked) {
      getPopulation(prefName, prefCode);
    } else {
      // チェックを外した場合はデータを取り除く
      removePopulation(prefCode);
    }
  };

  const getPopulation = async (prefName: PrefName, prefCode: PrefCode) => {
    const params = new URLSearchParams({ prefCode: `${prefCode}` });
    const getUrl = `${getPopulationUrl}?${params}`;
    const response = await fetch(getUrl, {
      headers: { "X-API-KEY": apiKey },
    });
    const jsonData = await response.json();
    addPopulation(prefName, prefCode, jsonData.result);
  };

  const createPopulationData = function (
    prefName: PrefName,
    prefCode: PrefCode,
    populationData
  ) {
    const totalPopulation = populationData?.data[0]?.data ?? [];
    return {
      prefName,
      prefCode,
      data: totalPopulation,
    };
  };

  const addPopulation = function (
    prefName: PrefName,
    prefCode: PrefCode,
    populationData
  ) {
    // 都道府県名と都道府県コードを加えたデータを生成して配列に追加する
    const newPopulationData = createPopulationData(
      prefName,
      prefCode,
      populationData
    );
    const newPrefecturesPopulation = [
      ...prefecturesPopulation,
      newPopulationData,
    ];
    setPrefecturesPopulation(newPrefecturesPopulation);
  };

  const removePopulation = function (prefCode: PrefCode) {
    // prefCodeが一致するデータを取り除く
    const index = prefecturesPopulation.findIndex(
      (item) => item.prefCode === prefCode
    );
    const newPrefecturesPopulation = prefecturesPopulation.slice();
    newPrefecturesPopulation.splice(index, 1);
    setPrefecturesPopulation(newPrefecturesPopulation);
  };

  useEffect(() => {
    getPrefectures();
  }, []);

  return (
    <>
      <section className="graph-section">
        <h2 className="section-title">都道府県</h2>
        <p className="explain">
          都道府県を選択すると、人口推移が表示されます（複数選択可）
        </p>
        <PrefectureCheckbox
          prefectures={prefectures}
          onCnangeFunction={checkPrefecture}
        />
      </section>
      <section className="graph-section">
        <h2 className="section-title">人口推移</h2>
        <Graph />
      </section>
    </>
  );
}
