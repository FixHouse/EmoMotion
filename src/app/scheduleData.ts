export type LocationKey = 'praha2' | 'praha9';

export type LocationConfig = {
  key: LocationKey;
  nameKey: string;
  addressKey: string;
  daysKey: string;
  daysFullKey: string;
  mapUrl: string;
  navigateUrl: string;
  color: string;
};

export type ScheduleSlot = {
  id: string;
  ageKey: string;
  timeKey: string;
  titleKey?: string;
  color: string;
  spots: string;
  dayOverrideKey?: string;
};

export const locations: LocationConfig[] = [
  {
    key: 'praha2',
    nameKey: 'locPraha2',
    addressKey: 'locPraha2Addr',
    daysKey: 'locPraha2Days',
    daysFullKey: 'locPraha2DaysFull',
    mapUrl:
      'https://www.google.com/maps?q=Francouzsk%C3%A1+31%2C+Praha+2&hl=cs&z=17&output=embed',
    navigateUrl:
      'https://www.google.com/maps/search/?api=1&query=Francouzsk%C3%A1+31%2C+Praha+2',
    color: '#FF69B4',
  },
  {
    key: 'praha9',
    nameKey: 'locPraha9',
    addressKey: 'locPraha9Addr',
    daysKey: 'locPraha9Days',
    daysFullKey: 'locPraha9DaysFull',
    mapUrl:
      'https://www.google.com/maps?q=Jandova+207%2F4%2C+Praha+9&hl=cs&z=17&output=embed',
    navigateUrl:
      'https://www.google.com/maps/search/?api=1&query=Jandova+207%2F4%2C+Praha+9',
    color: '#8b5cf6',
  },
];

const C_23_UA = '#FACC15';
const C_23_CZ = '#F472B6';
const C_35 = '#0EA5E9';
const C_58 = '#6366F1';

export const scheduleByLocation: Record<LocationKey, ScheduleSlot[]> = {
  praha2: [
    { id: 'p2-23ua-1045', ageKey: 'ageLoc23', timeKey: 'timeLoc1045', titleKey: 'mamMalUA', color: C_23_UA, spots: '7 з 8' },
    { id: 'p2-23cz-1130', ageKey: 'ageLoc23', timeKey: 'timeLoc1130', titleKey: 'mamMalCZ', color: C_23_CZ, spots: '1 з 8' },
    { id: 'p2-35-1630', ageKey: 'ageLoc35', timeKey: 'timeLoc1630', color: C_35, spots: '10 з 10' },
    { id: 'p2-58-1730', ageKey: 'ageLoc58', timeKey: 'timeLoc1730', color: C_58, spots: '4 з 8' },
  ],
  praha9: [
    { id: 'p9-23ua-1045', ageKey: 'ageLoc23', timeKey: 'timeLoc1045', titleKey: 'mamMalUA', color: C_23_UA, spots: '2 з 8' },
    { id: 'p9-23cz-1130', ageKey: 'ageLoc23', timeKey: 'timeLoc1130', titleKey: 'mamMalCZ', color: C_23_CZ, spots: '1 з 8' },
    { id: 'p9-35-1630', ageKey: 'ageLoc35', timeKey: 'timeLoc1630', color: C_35, spots: '9 з 10' },
    { id: 'p9-58-1730-po', ageKey: 'ageLoc58', timeKey: 'timeLoc1730', color: C_58, spots: '4 з 8', dayOverrideKey: 'dayPoOnly' },
    { id: 'p9-58-1715-st', ageKey: 'ageLoc58', timeKey: 'timeLoc1715', color: C_58, spots: '0 з 10', dayOverrideKey: 'dayStOnly' },
  ],
};

export const getSlotById = (
  id: string,
): { slot: ScheduleSlot; location: LocationConfig } | null => {
  for (const loc of locations) {
    const slot = scheduleByLocation[loc.key].find((s) => s.id === id);
    if (slot) return { slot, location: loc };
  }
  return null;
};

export type DisplayGroup = {
  ageKey: string;
  titleKey?: string;
  color: string;
  times: Array<{ id: string; timeKey: string; dayOverrideKey?: string; spots: string }>;
};

export function groupSlots(slots: ScheduleSlot[]): DisplayGroup[] {
  const groups = new Map<string, DisplayGroup>();
  for (const slot of slots) {
    const key = `${slot.ageKey}::${slot.titleKey || ''}`;
    if (!groups.has(key)) {
      groups.set(key, {
        ageKey: slot.ageKey,
        titleKey: slot.titleKey,
        color: slot.color,
        times: [],
      });
    }
    groups.get(key)!.times.push({
      id: slot.id,
      timeKey: slot.timeKey,
      dayOverrideKey: slot.dayOverrideKey,
      spots: slot.spots,
    });
  }
  return Array.from(groups.values());
}
