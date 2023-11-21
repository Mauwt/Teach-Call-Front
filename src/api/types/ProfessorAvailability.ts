export type DayTimeSlot = {
  slotId: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
};

export type TimeRange = {
  startTime: string;
  endTime: string;
};

export type WeekAvailabilityRes = {
  availableDays: Array<number>;
};

export type SetAvailabilityByWeekNumber = {
  professorEmail: string;
  weekNumber: number;
  timeRanges: Record<number, TimeRange>;
};

export type WeekAndDayAvailabilityResponse = {
  professorId: number;
  dayTimeSlots: Map<number, Array<DayTimeSlot>>;
};
