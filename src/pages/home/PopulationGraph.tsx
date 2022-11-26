import React, { useEffect, useState } from "react";
import { Prefectures, PrefCodes } from "@/types/prefecture";
import PrefectureCheckbox from "./PrefecturesCheckbox";

const apiEndPoint = "https://opendata.resas-portal.go.jp";
const getPrefecturesApi = "/api/v1/prefectures";
const getPrefecturesUrl = apiEndPoint + getPrefecturesApi;

export default function PopuLationGraph() {
  const [prefectures, setPrefectures] = useState<Prefectures>([]);
  const [prefCodes, setPrefCodes] = useState<PrefCodes>([]);

  const getPrefectures = async () => {
    const response = await fetch(getPrefecturesUrl, {
      headers: { "X-API-KEY": import.meta.env.VITE_RESAS_API_KEY },
    });
    const jsonData = await response.json();
    setPrefectures(jsonData.result);
  };

  useEffect(() => {
    getPrefectures();
  }, []);

  const checkPrefecture = function (input: string) {
    const changeCode = Number(input);
    const newPrefCodes = prefCodes.includes(changeCode)
      ? // チェックした値が既に含まれている場合は、保持している配列から取り除く
        prefCodes.filter((item) => item !== changeCode)
      : // 含まれていない場合は、保持している配列に追加する
        [...prefCodes, changeCode];
    setPrefCodes(newPrefCodes);
  };

  return (
    <>
      <section className="graph-section">
        <h2 className="section-title">都道府県</h2>
        <PrefectureCheckbox
          prefectures={prefectures}
          onCnangeFunction={checkPrefecture}
        />
      </section>
      <div className="graph"></div>
    </>
  );
}
