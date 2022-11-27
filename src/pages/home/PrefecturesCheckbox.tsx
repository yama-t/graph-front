import React from "react";
import { Prefectures } from "@/types/prefecture";

interface Props {
  prefectures: Prefectures;
  onCnangeFunction: (checkboxValue: string) => void;
}

export default function PrefectureCheckbox({
  prefectures,
  onCnangeFunction,
}: Props) {
  const labelName = "prefecture";
  const prefectureItems = prefectures.map((prefecture, i) => {
    const prefCode = prefecture.prefCode;
    const labelId = `${labelName}${prefCode}`;
    return (
      <li key={i} className="prefecture-items">
        <input
          type="checkbox"
          name={labelName}
          id={labelId}
          value={prefCode}
          className="prefecture-checkbox"
          onChange={(e) => onCnangeFunction(e.target.value)}
        />
        <label className="prefecture-label" htmlFor={labelId}>
          {prefecture.prefName}
        </label>
      </li>
    );
  });
  return <ul className="prefectures">{prefectures && prefectureItems}</ul>;
}
