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
  const inputName = "prefecture";

  if (!prefectures) {
    return <ul className="prefecture-list"></ul>;
  }

  const prefectureItems = prefectures.map((prefecture, i) => {
    const { prefName, prefCode } = prefecture;
    const inputId = `${inputName}${prefCode}`;
    return (
      <li key={i} className="prefecture-item">
        <input
          type="checkbox"
          name={inputName}
          id={inputId}
          value={prefCode}
          className="prefecture-checkbox"
          onChange={() => onCnangeFunction(prefName, prefCode)}
        />
        <label className="prefecture-label" htmlFor={inputId}>
          {prefName}
        </label>
      </li>
    );
  });
  return <ul className="prefecture-list">{prefectureItems}</ul>;
}
