import React, { useEffect, useState, useCallback } from "react";
import {
  Prefecture,
  PrefName,
  PrefCode,
  PrefecturePopulation,
} from "@/types/prefecture";
import ResasApi from "@/lib/resasApi";
import {
  sortByPrefCode,
  removeByPrefCode,
  createPopulationDataWithPrefecture,
} from "@/lib/graph";
import PrefectureCheckbox from "./PrefecturesCheckbox";
import Graph from "./Graph";
import "./PopulationGraph.css";

type PrefecturePopulationCache = Map<number, PrefecturePopulation>;

const apiKey = import.meta.env.VITE_RESAS_API_KEY;

export const useCheckFlag = function () {
  const [flag, setFlag] = useState(false);
  const on = useCallback(() => setFlag(true), []);
  const off = useCallback(() => setFlag(false), []);
  return {
    flag,
    on,
    off,
  };
};

export const setGraphData = function (
  existingData: PrefecturePopulation[],
  addData: PrefecturePopulation,
  setState: React.Dispatch<React.SetStateAction<PrefecturePopulation[]>>
) {
  const newPopulationData = [...existingData, addData];
  sortByPrefCode(newPopulationData);
  setState(newPopulationData);
};

// 取得した人口データをキャッシュする
export const cachePopulation = function (
  existCache: PrefecturePopulationCache,
  prefCode: PrefCode,
  addData: PrefecturePopulation,
  setState: React.Dispatch<React.SetStateAction<PrefecturePopulationCache>>
) {
  const newCache = new Map(existCache);
  newCache.set(prefCode, addData);
  setState(newCache);
};

export default function PopuLationGraph() {
  const checkFlag = useCheckFlag();
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [prefecturesPopulation, setPrefecturesPopulation] = useState<
    PrefecturePopulation[]
  >([]);
  const [prefecturesPopulationCache, setPrefecturesPopulationCache] =
    useState<PrefecturePopulationCache>(new Map());

  const getPrefectures = async () => {
    const jsonData = await ResasApi.getPrefectures(apiKey);
    setPrefectures(jsonData.result);
  };

  const checkPrefecture = function (
    checked: boolean,
    prefName: PrefName,
    prefCode: PrefCode
  ) {
    // checkedかつキャッシュがある場合は、キャッシュからデータを取り出してグラフに適用する
    const cache = prefecturesPopulationCache.get(prefCode);
    if (checked && cache) {
      setGraphData(prefecturesPopulation, cache, setPrefecturesPopulation);
      return;
    }

    // 連打対応。checkFlagが既にtrueの場合、処理を行わない
    if (checkFlag.flag) {
      return;
    }
    checkFlag.on();

    // チェックを付けた場合だけ人口を取得する
    if (checked) {
      getPopulation(prefName, prefCode);
    } else {
      // チェックを外した場合はデータを取り除く
      const removedData = removeByPrefCode(prefecturesPopulation, prefCode);
      setPrefecturesPopulation(removedData);
      checkFlag.off();
    }
  };

  const getPopulation = async (prefName: PrefName, prefCode: PrefCode) => {
    const jsonData = await ResasApi.getPopulation(prefCode, apiKey);
    // 都道府県名と都道府県コードを加えたデータを生成して配列に追加する
    const newPopulationData = createPopulationDataWithPrefecture(
      prefName,
      prefCode,
      jsonData.result
    );
    // グラフ用データのセット
    setGraphData(
      prefecturesPopulation,
      newPopulationData,
      setPrefecturesPopulation
    );
    // キャッシュデータのセット
    cachePopulation(
      prefecturesPopulationCache,
      prefCode,
      newPopulationData,
      setPrefecturesPopulationCache
    );
    checkFlag.off();
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
