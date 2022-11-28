import React from "react";
import { Prefecture, PrefName, PrefCode } from "@/types/prefecture";

interface Props {
  prefectures: Prefecture[];
  onCnangeFunction: (prefName: PrefName, prefCode: PrefCode) => void;
}

export default function PrefectureCheckbox({
  prefectures,
  onCnangeFunction,
}: Props) {
  const labelName = "prefecture";

  if (!prefectures) {
    return <ul className="prefectures"></ul>;
  }

  const prefectureItems = prefectures.map((prefecture, i) => {
    const { prefName, prefCode } = prefecture;
    const labelId = `${labelName}${prefCode}`;
    return (
      <li key={i} className="prefecture-items">
        <input
          type="checkbox"
          name={labelName}
          id={labelId}
          value={prefCode}
          className="prefecture-checkbox"
          onChange={() => onCnangeFunction(prefName, prefCode)}
        />
        <label className="prefecture-label" htmlFor={labelId}>
          {prefName}
        </label>
      </li>
    );
  });
  return <ul className="prefectures">{prefectureItems}</ul>;
}
