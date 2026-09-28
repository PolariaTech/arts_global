export type PilotRecord = {
  id: number;
  name: string;
  dob: string;
  license: string;
  licenseType: string;
  ratings: string[];
  medicalClass: string;
  medicalExpiry: string;
  training: string;
  totalHours: string;
  last12: string;
  makeModel: string;
  makeModel12: string;
  retract: string;
  turbine: string;
  tailwheel: string;
  helicopter: string;
};

export type FleetFlags = {
  needsRetract: boolean;
  needsTurbine: boolean;
  needsHeli: boolean;
};

export type ConditionalHourKey = 'retract' | 'turbine' | 'tailwheel' | 'helicopter';
