import React, { useEffect, useState } from "react";
import { Prefectures, PrefCodes, PrefCode } from "@/types/prefecture";
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
  const [prefCodes, setPrefCodes] = useState<PrefCodes>([]);

  const getPrefectures = async () => {
    const response = await fetch(getPrefecturesUrl, {
      headers: { "X-API-KEY": apiKey },
    });
    const jsonData = await response.json();
    setPrefectures(jsonData.result);
  };

  const getPopulation = async (prefCode: PrefCode) => {
    const params = new URLSearchParams({ prefCode: `${prefCode}` });
    const getUrl = `${getPopulationUrl}?${params}`;
    const response = await fetch(getUrl, {
      headers: { "X-API-KEY": apiKey },
    });
    const jsonData = await response.json();
  };

  const checkPrefecture = function (input: string) {
    const changeCode = Number(input);
    // isChecked:true（値が配列に含まれていない）
    // isChecked:false（値が既に配列に含まれている）
    const isChecked = !prefCodes.includes(changeCode);
    const newPrefCodes = isChecked
      ? // チェックを付けた場合は、保持している配列に追加する
        [...prefCodes, changeCode]
      : // チェックを外した場合は、保持している配列から取り除く
        prefCodes.filter((item) => item !== changeCode);
    setPrefCodes(newPrefCodes);

    // チェックを付けた場合だけ人口を取得する（外した場合は動作しない）
    if (isChecked) {
      getPopulation(changeCode);
    }
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
