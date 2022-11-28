import React, { useEffect, useState } from "react";
import {
  Prefecture,
  PrefName,
  PrefCode,
  PrefecturePopulation,
} from "@/types/prefecture";
import {
  ResasPrefecturesResponses,
  ResasPopulationResponses,
  ResasPopulationResult,
} from "@/types/resasApi";
import PrefectureCheckbox from "./PrefecturesCheckbox";
import Graph from "./Graph";
import "./PopulationGraph.css";

const apiEndPoint = "https://opendata.resas-portal.go.jp";
const apiKey = import.meta.env.VITE_RESAS_API_KEY;
const getPrefecturesApi = "/api/v1/prefectures";
const getPrefecturesUrl = apiEndPoint + getPrefecturesApi;
const getPopulationApi = "/api/v1/population/composition/perYear";
const getPopulationUrl = apiEndPoint + getPopulationApi;

export default function PopuLationGraph() {
  const [checkFlag, setCheckFlag] = useState(false);
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [prefecturesPopulation, setPrefecturesPopulation] = useState<
    PrefecturePopulation[]
  >([]);

  const getPrefectures = async () => {
    const response = await fetch(getPrefecturesUrl, {
      headers: { "X-API-KEY": apiKey },
    });
    const jsonData: ResasPrefecturesResponses = await response.json();
    setPrefectures(jsonData.result);
  };

  const checkPrefecture = function (
    checked: boolean,
    prefName: PrefName,
    prefCode: PrefCode
  ) {
    // 連打対応。checkFlagが既にtrueの場合、処理を行わない
    if (checkFlag) {
      return;
    }

    setCheckFlag(true);

    // チェックを付けた場合だけ人口を取得する
    if (checked) {
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
    const jsonData: ResasPopulationResponses = await response.json();
    addPopulation(prefName, prefCode, jsonData.result);
  };

  const createPopulationData = function (
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

  const addPopulation = function (
    prefName: PrefName,
    prefCode: PrefCode,
    populationData: ResasPopulationResult
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
    setCheckFlag(false);
  };

  const removePopulation = function (prefCode: PrefCode) {
    // prefCodeが一致するデータを取り除く（一致しないものだけ残す）
    const newPrefecturesPopulation = prefecturesPopulation.filter(
      (item) => item.prefCode !== prefCode
    );
    setPrefecturesPopulation(newPrefecturesPopulation);
    setCheckFlag(false);
  };

  useEffect(() => {
    getPrefectures();
  }, []);

  return (
    <div className="graph-contents">
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
        <Graph data={prefecturesPopulation} />
      </section>
    </div>
  );
}
