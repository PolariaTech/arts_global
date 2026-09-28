export type HistoryClaim = {
  id: number;
  date: string;
  description: string;
  amount: string;
};

export type StorageType = 'Hangar' | 'Amarre exterior';

export type HistoryStepData = {
  noClaims: boolean;
  claims: HistoryClaim[];
  violations: boolean | null;
  violationsDetail: string;
  dui: boolean | null;
  duiDetail: string;
  felony: boolean | null;
  felonyDetail: string;
  useType: string;
  annualHours: string;
  compensation: boolean | null;
  baseAirport: string;
  storage: StorageType;
  unpaved: boolean | null;
  unpavedDetail: string;
  terrain: string[];
  countries: string;
};
