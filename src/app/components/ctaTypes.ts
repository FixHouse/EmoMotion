import type { LocationKey } from '../scheduleData';

export type SchedulePrefill = {
  location: LocationKey;
  slotId: string;
};

export type CTARequest =
  | string
  | {
      planKey?: string;
      schedule?: SchedulePrefill;
    };
