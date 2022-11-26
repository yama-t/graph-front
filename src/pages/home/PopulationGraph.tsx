import React, { useEffect, useState } from "react";

type PrefCode = number;
type PrefName = string;
type Prefectures = Array<Prefecture>;
type PrefCodes = Array<PrefCode>;

interface Prefecture {
  prefCode: PrefCode;
  prefName: PrefName;
}

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
        <ul className="prefectures">
          {prefectures &&
            prefectures.map((prefecture, i) => (
              <li key={i} className="prefecture-items">
                <label className="prefecture-label">
                  <input
                    type="checkbox"
                    name="prefecture"
                    value={prefecture.prefCode}
                    className="prefecture-checkbox"
                    onChange={(e) => checkPrefecture(e.target.value)}
                  />
                  {prefecture.prefName}
                </label>
              </li>
            ))}
          ;
        </ul>
      </section>
      <div className="graph"></div>
    </>
  );
}
