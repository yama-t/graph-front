type PrefCode = number;
type PrefName = string;
type Prefectures = Array<Prefecture>;
type PrefCodes = Array<PrefCode>;

interface Prefecture {
  prefCode: PrefCode;
  prefName: PrefName;
}

export type { PrefCode, PrefName, Prefecture, Prefectures, PrefCodes };
