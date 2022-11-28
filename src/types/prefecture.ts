type PrefCode = number;
type PrefName = string;

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
  PrefecturePopulation,
  Population,
};
