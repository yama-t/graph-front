type PrefCode = number;
type PrefName = string;
type Prefectures = Array<Prefecture>;
type PrefCodes = Array<PrefCode>;

interface Prefecture {
  prefCode: PrefCode;
  prefName: PrefName;
}

interface PrefecturePopulation {
  data: Population[];
  prefName: PrefName;
  prefCode: PrefCode;
}

interface Population {
  value: number;
  year: number;
}

export type {
  PrefCode,
  PrefName,
  Prefecture,
  Prefectures,
  PrefCodes,
  PrefecturePopulation,
  Population,
};
