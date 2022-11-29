import React from "react";
import Head from "@/components/Head";
import PageHeader from "@/components/PageHeader";
import PopuLationGraph from "./PopulationGraph";

const pageTitle = "都道府県別の総人口推移グラフ";
const description = "都道府県別の総人口推移グラフを表示するSPA";
const pageUrl = "https://yama-t.github.io/graph-front/";
const siteName = "Graph Front";
const image = "https://yama-t.github.io/graph-front/my_icon.svg";

export default function Home() {
  return (
    <>
      <Head
        title={pageTitle}
        description={description}
        url={pageUrl}
        siteName={siteName}
        image={image}
      />
      <div className="home">
        <PageHeader title={pageTitle} />
        <PopuLationGraph />
      </div>
    </>
  );
}
