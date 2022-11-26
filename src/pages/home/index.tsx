import React from "react";
import PageHeader from "@/components/PageHeader";
import PopuLationGraph from "./PopulationGraph";

const pageTitle = "都道府県別の総人口推移グラフ";

export default function Home() {
  return (
    <div className="home">
      <PageHeader title={pageTitle} />
      <PopuLationGraph />
    </div>
  );
}
