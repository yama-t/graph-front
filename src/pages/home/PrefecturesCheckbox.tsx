import React from "react";
import { Prefectures } from "@/types/prefecture";

interface Props {
  prefectures: Prefectures;
  onCnangeFunction: (value: string) => void;
}

export default function PrefectureCheckbox({
  prefectures,
  onCnangeFunction,
}: Props) {
  return (
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
                onChange={(e) => onCnangeFunction(e.target.value)}
              />
              {prefecture.prefName}
            </label>
          </li>
        ))}
      ;
    </ul>
  );
}
