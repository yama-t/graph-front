import React, { useEffect, useState } from "react";
const apiEndPoint = "https://opendata.resas-portal.go.jp";
const getPrefecturesApi = "/api/v1/prefectures";
const getPrefecturesUrl = apiEndPoint + getPrefecturesApi;

interface Prefecture {
  prefCode: number;
  prefName: string;
}

export default function PopuLationGraph() {
  const [prefectures, setPrefectures] = useState<Array<Prefecture>>([]);

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
